import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
import { Chat } from "./chat/chat.model";
import { Chatroom } from "./chatroom/chatroom.model";
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
    private getChatUrl = 'message/get';  // URL to web API
    private postChatUrl = 'message/post';  // URL to web API
    private getChatroomsUrl = 'chatroom/get';  // URL to web API
    private postChatroomUrl = 'chatroom/post';  // URL to web API
    constructor (private http: Http) {}
    private socket;
    private url = window.location.origin;


    getChatMessagesFromServer(selectedChatRoom): Observable<Chat[]> {
        let observable = new Observable(observer => {
            console.log("Socket:",this.url + selectedChatRoom);
            this.socket = io(this.url);
            this.socket.on('refreshMessages', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    /*
    getChatMessagesFromServer(selectedChatRoom): Observable<Chat[]> {
        this.getChatUrl = 'message/get/'+selectedChatRoom
        return this.http.get(this.getChatUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    */

    addChatMessage(chat: Chat): Observable<Chat> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.postChatUrl, chat, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*
     * Get blog messages from server
     */

    getChatroomsFromServer(): Observable<Chatroom[]> {
        let observable = new Observable(observer => {
            console.log("Socket:",this.url);
            this.socket = io(this.url);
            this.socket.on('refreshChat', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }
    

    addChatroom(chatroom: Chatroom): Observable<Chatroom> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.postChatroomUrl, chatroom, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
     * Data handlers
     */
    private extractData(res: Response) {
        let body = res.json();
        //console.log(body);
        return body || { };
    }
    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //console.log(errMsg);
        return Observable.throw(errMsg);
    }
}
