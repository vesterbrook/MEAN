import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProd = {
    title: "",
    price: null,
    image: ""
  };
  product = [];
  productid;
  error;
  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
   
    this._route.paramMap.subscribe(params => {
      this.productid = params.get('id');
      var observable = this._httpService.getProduct(this.productid);
      observable.subscribe(data => {
        this.editProd = data['product']
        console.log("Projects", this.editProd)
        console.log('Edit front')
   
  })
})

}

editProduct(): void {
  let observable = this._httpService.editProduct(this.productid, this.editProd);
  observable.subscribe(data => {
    console.log("edit", data);
    this._router.navigate(['/products']);
  })
}



}