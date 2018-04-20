import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  authors = [];

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors(): void {
    console.log("Authors returned");
    var observable = this._httpService.getAuthors();
    observable.subscribe(data => {
      this.authors = data['authors']
      console.log("Authors", this.authors)
    });
  }

  deleteAuthor(authorid): void {
    console.log('Delete front')
    let observable = this._httpService.deleteAuthor(authorid);
    observable.subscribe(data => {
      console.log('delete front 2')
      this.getAuthors();
    })

  }



}
