import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {

  editAut = {name: ""}
  author = [];
  authorid;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.authorid = params.get('id');
      var observable = this._httpService.getAuthor(this.authorid);
      observable.subscribe(data => {
        this.editAut = data['id']
        console.log('Edit front')
   
      })
    })
  }

  editAuthor(): void {
   let observable = this._httpService.editAuthor(this.authorid, this.editAut);
   observable.subscribe(data => {
      console.log("edit", data);
      this._router.navigate(['/dash']);
   })
  }

}
