import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    public time = new Date();

    constructor() {

        setInterval(() => {
            this.time = new Date();
          }, 1000);
    }

    ngOnInit(): void {}
}
