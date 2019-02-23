import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Chat} from '../chat';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient,public messageService : MessageService) { }

  chat:Chat;
  lastSynced:Number=null;

  allChats:Chat[]=[];
  timerID;

  ngOnInit() {
    console.log( "userName "+this.route.snapshot.queryParamMap.get('userName'));
  	this.loadAllChats(true);

  	//will call loadAllChats every 5 secs
  	this.timerID = setInterval(() => {
      console.log("Timer");
      this.loadAllChats(false);
    }, 1000);

  	this.chat={
  		userID :this.route.snapshot.queryParamMap.get('_id'),
  		userName: this.route.snapshot.queryParamMap.get('userName'),
  		msg: "",
      crAt:null
  	};
  }

  onMsgSubmit():void{
  	this.http.
    post("http://localhost:3000/api/post_new_chat",this.chat).
    subscribe(
      data  => {
      console.log("Message is successful ");
      console.log(data);
      this.chat.msg="";
      },
      error  => {

      console.log("Error", error);

    });
  }

  loadAllChats(isFirstTime:boolean):void{
  	this.http.
    get("http://localhost:3000/api/get_chats/"+this.lastSynced).
    subscribe(
      data  => {
        console.log("chats loaded  successfully ");
       
       var newMsgCount=0;
       for(var key in data){
         console.log("forrr "+key);
         ++newMsgCount;
         if(isFirstTime)
            this.allChats.push(data[key]);
          else
           this.allChats.unshift(data[key]);
       }

       //to set last synced date
       
       this.lastSynced =  new Date().getTime();
       //show new message
       this.messageService.showMessage(newMsgCount);
       console.log(this.allChats);
      },
      error  => {

      console.log("Error", error);

    });
  }

}
