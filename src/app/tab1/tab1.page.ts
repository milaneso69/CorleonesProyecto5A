import { Component } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  constructor(private iab: InAppBrowser) {}

  openFacebook() {
    this.iab.create('https://www.facebook.com/CorleonesBarberCordoba', '_system');
  }

  openInstagram() {
    this.iab.create('https://www.instagram.com/aldo_banuelos_?igsh=ZG1obGZqZHE0aXhm', '_system');
  }
}