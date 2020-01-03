// // import { Injectable } from '@angular/core';
// // import { Observable } from 'rxjs/Observable';

// // import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// // import { ConfirmationDialogComponent } from './confirmation-dialog.component';

// // @Injectable()
// // export class ConfirmationDialogService {

// //   constructor(private modalService: NgbModal) { }

// //   public confirm(
// //     title: string,
// //     message: string,
// //     btnOkText: string = 'OK',
// //     btnCancelText: string = 'Cancel',
// //     dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
// //     const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize });
// //     modalRef.componentInstance.title = title;
// //     modalRef.componentInstance.message = message;
// //     modalRef.componentInstance.btnOkText = btnOkText;
// //     modalRef.componentInstance.btnCancelText = btnCancelText;

// //     return modalRef.result;
// //   }

// // }


// import { Injectable } from '@angular/core';
// import { Router, NavigationStart } from '@angular/router';
// import { Observable } from 'rxjs';
// import { Subject } from 'rxjs/Subject';

// @Injectable() export class ConfirmDialogService {

//     private subject = new Subject<any>();

//     constructor() { }

//     confirmThis(message: string, siFn: () => void, noFn: () => void) {
//         this.setConfirmation(message, siFn, noFn);
//     }

//     setConfirmation(message: string, siFn: () => void, noFn: () => void) {
//         const that = this;
//         this.subject.next({
//             type: 'confirm',
//             text: message,
//             siFn: function () {
//                 that.subject.next(); // this will close the modal
//                 siFn();
//             },
//             noFn: function () {
//                 that.subject.next();
//                 noFn();
//             }
//         });

//     }

//     getMessage(): Observable<any> {
//         return this.subject.asObservable();
//     }
// }
