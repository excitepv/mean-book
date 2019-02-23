import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Chat} from '../chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  chat:Chat;

  allChats:Chat[]=[];
  timerID;

  ngOnInit() {
    console.log( "userName "+this.route.snapshot.queryParamMap.get('userName'));
  	this.loadAllChats();

  	//will call loadAllChats every 5 secs
  	this.timerID = setInterval(() => {
      console.log("Timer");
      this.loadAllChats();
    }, 2000);

  	this.chat={
  		userID :this.route.snapshot.queryParamMap.get('_id'),
  		userName: this.route.snapshot.queryParamMap.get('userName'),
  		msg: ""
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

  loadAllChats():void{
  	this.http.
    get("http://localhost:3000/api/get_chats").
    subscribe(
      data  => {
      console.log("chats loaded  successfully ");
      console.log(data);
     this.allChats=[];
      for (var key in data) {
      	console.log(data[key].msg);
      	this.allChats.push(data[key]);
      }
      console.log(this.allChats);

      },
      error  => {

      console.log("Error", error);

    });
  }

}
