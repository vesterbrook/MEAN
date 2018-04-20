import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [

  
  { path: '', redirectTo:'/home', pathMatch: 'full' },
  { path: 'new-product', component: NewProductComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'home', component: HomeComponent},
  { path: 'products', component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
