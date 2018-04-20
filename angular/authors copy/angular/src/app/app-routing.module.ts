import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { NewAuthorComponent } from './new-author/new-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';

const routes: Routes = [
  { path: '', redirectTo:'/dash', pathMatch: 'full'},
  { path: 'new-author', component: NewAuthorComponent},
  { path: 'edit-author/:id', component: EditAuthorComponent},
  { path: 'dash', component: DashComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
