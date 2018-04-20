import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getProducts(){
    return this._http.get('/api/products');
  }
  getProduct(productid){
    return this._http.get(`/api/viewProduct/${productid}`)
  }
  createProduct(newProduct){
    return this._http.post('/api/addProduct', newProduct);
  }
  editProduct(productid, editProd){
    return this._http.put(`/api/editProduct/${productid}`, editProd);
  }
  deleteProduct(productid){
    return this._http.delete(`/api/deleteProduct/${productid}`)
  }

}
