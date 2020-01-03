import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { MessageModel } from '../models/message.model';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
  })
export class MessagesComponent implements OnInit {

    constructor(public messagesService: MessagesService) {}

    ngOnInit(): void {}

    onCloseAlertAndClearMessage() {
        this.messagesService.message = new MessageModel();
    }
}
