import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Chat} from './chat.model';
import {ChatService} from './../chat.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Chatroom} from "../chatroom/chatroom.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers:  [ ChatService ]
})
export class ChatComponent implements OnInit {

  private chatMessages: Chat[] = [];
  title = 'MEAN app with Angular2';
  model = new Chat("", "", "");
  selectedChatRoom: string;

  constructor(
      private service: ChatService,
      private route: ActivatedRoute,
      private router: Router,
      /*private logger: Logger*/) {
  }

  getChatMessages(selectedChatRoom) {
    console.log(selectedChatRoom);
    console.log("Subscribe to service");
    this.service.getChatMessagesFromServer(selectedChatRoom)
        .subscribe(
            listOfChatMessages => {
              //console.log("Messages:",messages);
              this.chatMessages = listOfChatMessages;
            },
            error =>  this.chatMessages = <any>error
        );
    return this.chatMessages;
  }


  addChatMessage() {
    this.resetModel(this.model, this.model.message, this.model.author, this.selectedChatRoom);
    this.service.addChatMessage(this.model)
        .subscribe(
            user => {
              this.model = user;
              //this.getChatMessages(this.selectedChatRoom);
            },
            error =>  this.title = <any>error
        );
  }

  resetModel(chatModel, chatModelMessage, chatModelAuthor, chatModelRoomname) {
    chatModel= new Chat(chatModelMessage, chatModelAuthor, chatModelRoomname)
    this.model = chatModel
    }

  ngOnInit() {
    console.log(this.route.params);
    this.route.params.subscribe((params: Params) => {
      this.selectedChatRoom = params['selectChatroom'];
      console.log(this.selectedChatRoom);
    });
          this.getChatMessages(this.selectedChatRoom);
  }
}
