import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';

import { Location } from '@angular/common';
import { LoginService } from '../services/login.service';
import { MessagesService } from '../services/messages.service';
import { HttpOptions } from '../services/http-options.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.css']
})
export class RegistrateComponent implements OnInit {

    @ViewChild('registrateForm', {static: false})
    registrateForm: NgForm;

    constructor(public loginService: LoginService,
                private messagesService: MessagesService,
                private router: Router,
                private location: Location) {}

    ngOnInit(): void {}

    public onSubmit() {
        this.loginService.registrate(this.registrateForm.value)
                        .subscribe(response => {
                            this.router.navigate(['/login']);
                            this.messagesService.message.message = 'Utente ' + response.payload.username + ' registrato con successo';
                            this.messagesService.message.type = 'success';
                        },
                        error => {
                            console.log(error);
                            this.messagesService.message.message = error.error.outcome.message;
                            this.messagesService.message.type = 'alert';
                        }
        );
    }

    public onAbort(): void {
        this.location.back();
    }
}
