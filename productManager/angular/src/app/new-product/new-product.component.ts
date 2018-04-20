import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  newProduct = {
    title: "",
    price: null,
    image: ""
};
  error;
  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
  }
addProduct(): void {
  console.log("add product", this.newProduct)
  var observable = this._httpService.createProduct(this.newProduct);
  observable.subscribe(data => {
    this.newProduct = {title:"", price: null, image: ""}
    this._router.navigate(['/products']);
  })
}
}
