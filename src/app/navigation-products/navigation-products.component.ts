import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NavigationProductsService } from '../services/navigation-products.service';

@Component({
  selector: 'app-nav-prod',
  templateUrl: './navigation-products.component.html',
  styleUrls: ['./navigation-products.component.css']
})
export class NavigationProductsComponent implements OnInit {

  constructor(public navigationProductsService: NavigationProductsService,
              public router: Router) {}

  ngOnInit(): void {}

  onNavChange(event: Event, tabChange: string): void {

    event.preventDefault();

    this.navigationProductsService.navTab = tabChange;

    if (tabChange === 'list') {
      this.router.navigate(['products']);
    } else {
      if (this.navigationProductsService.currentProduct) {
        this.router.navigate(['products/' + this.navigationProductsService.currentProduct.id]);
      } else {
        this.router.navigate(['products/0']);
      }
    }
  }
}
