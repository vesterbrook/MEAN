import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Product Manager';
  products = []; //empty variable now to populate with data later. Will use for functions like "this.product =" for product of products 
}
