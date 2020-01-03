import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';

import { Location } from '@angular/common';
import { LoginService } from '../services/login.service';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

    @ViewChild('recoverForm', {static: false})
    recoverForm: NgForm;

    constructor(public loginService: LoginService,
                private messagesService: MessagesService,
                private location: Location) {}

    ngOnInit(): void {}

    public onSubmit(): void {
        this.loginService.recover_password(this.recoverForm.value)
                         .subscribe(response => {
                            this.messagesService.message.message = response.payload;
                            this.messagesService.message.type = 'success';
                         },
                         error => {
                            this.messagesService.message.message = error.error.outcome.message;
                            this.messagesService.message.type = 'alert';
                         }
        );
    }

    public back() {
        this.location.back();
    }
}
