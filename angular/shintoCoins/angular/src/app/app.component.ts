import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shinto Coins';

}

constructor(private _httpService: HttpService){}

ngOnInit(){

}