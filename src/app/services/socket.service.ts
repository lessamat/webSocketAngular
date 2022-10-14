import { Injectable } from '@angular/core';
import { PadoLabsChatMessage } from '../models/padolabsMessage';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private padolabsMessages: PadoLabsChatMessage[] = [];
  private socket: WebSocket | undefined;

  constructor() {
   }

   public getMessages(): PadoLabsChatMessage[] {
      return this.padolabsMessages
   }

   public openConnection () {
    this.socket = new WebSocket("ws://localhost:7000/chat/");

    this.socket.onopen = (event) => {
      console.log(event)
    }

    this.socket.onmessage = (event) => {
      console.log(event.data)
      const padoMessage = JSON.parse(event.data)
      this.padolabsMessages.push(padoMessage);
    }

    this.socket.onclose = (event) => {
      console.log(event)
    }
   }
   

   public sendMessage (padolabsMessages: PadoLabsChatMessage) {
    this.socket?.send(JSON.stringify(padolabsMessages))
   }

   public closeConnection () {
    this.socket?.close();
   }
}
