import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.css']
})
export class NewAuthorComponent implements OnInit {

  newAuthor = { name: ""};

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {

  }

  addAuthor(): void {
    console.log("Added an Author", this.newAuthor)
    var observable = this._httpService.createAuthor(this.newAuthor);
    observable.subscribe(data => {
      this.newAuthor = {name: ""}
      this._router.navigate(['/dash']);
    })
  }


}
