import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {
    
  constructor(private _http: HttpClient) { }

  getAuthors() {
    return this._http.get('/api/authors');
  }
  getAuthor(authorid) {
    return this._http.get(`/api/author/${authorid}`);
  }
  createAuthor(newAuthor){
    return this._http.post('/api/addAuthor', newAuthor);
  }
  editAuthor(authorid, editAut){
    return this._http.put(`/api/author/${authorid}`, editAut);
  }
  deleteAuthor(authorid){
    return this._http.delete(`/api/author/${authorid}`);
  }


  
}
