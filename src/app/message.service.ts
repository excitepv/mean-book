import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  messageCount:Number=0;
  public showMessage(msgCnt:Number):void{
  	console.log("shoeww message ser "+msgCnt);
  	this.messageCount = msgCnt;
  }

  public clearMessage():void{
  	this.messageCount = 0;
  }
}
