import { MessageModel } from '../models/message.model';
import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {

    message = new MessageModel();
}
