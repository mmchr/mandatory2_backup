import { Component, OnInit } from '@angular/core';
import {Chatroom} from './chatroom.model';
import {ChatService} from './../chat.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import * as io from 'socket.io-client';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
      providers:  [ ChatService ]
})
export class ChatroomComponent implements OnInit {

  private chatrooms: Chatroom[] = [];
  title = 'MEAN app with Angular2';
  model = new Chatroom("");
  socket;

  constructor(
      private service: ChatService,
      /*private logger: Logger*/) {
  }

  getChatrooms() {
    console.log("Subscribe to service");
    this.service.getChatroomsFromServer()
        .subscribe(
            listOfChatrooms => {
              this.chatrooms = listOfChatrooms;
            },
            error =>  this.chatrooms = <any>error
        );
    return this.chatrooms;
  }

  addChatroom() {
    //console.log("-----------------------BEFORE RESET -------------------------------------- ");
    //console.log(this.model);
    this.resetModel(this.model, this.model.roomName);
    //console.log("-----------------------AFTER RESET -------------------------------------- ");
    //console.log(this.model);
    this.service.addChatroom(this.model)
        .subscribe(
            chatroom => {
              this.model = chatroom;
              this.getChatrooms();
            },
            error => this.title = <any>error
        );
  }

  //This method is needed to prevent the _id from MongoDb to be attached to the model object.
  resetModel(chatroomModel, chatroomModelRoomName) {
    chatroomModel= new Chatroom(chatroomModelRoomName)
    this.model = chatroomModel
  }

  switchRoom(roomName) {
      console.log("switchroom frontend");
      this.socket.emit('switchRoom', roomName);
      this.socket.join(roomName);
  }

  ngOnInit() {
    this.getChatrooms();
    this.socket = io.connect(window.location.origin);

    
  }

}
