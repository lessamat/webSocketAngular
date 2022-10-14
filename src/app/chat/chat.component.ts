import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PadoLabsChatMessage } from '../models/padolabsMessage';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  protected socketService: SocketService;

  constructor(socketService: SocketService) {
    this.socketService = socketService;
  }

  ngOnInit(): void {
    this.socketService.openConnection();
  }

  ngOnDestroy(): void {
    this.socketService.closeConnection();
  }

  public sendMessage(sendForm: NgForm) {
    sendForm.value.name;
    const padolabsMessages = new PadoLabsChatMessage(sendForm.value.user, sendForm.value.message);
    this.socketService.sendMessage(padolabsMessages)
    sendForm.controls['message'].reset();
  }

}
