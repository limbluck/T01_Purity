import { NgModule } from '@angular/core';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    HomeComponent,
    Error404Component
  ],
  imports: [
    AppRoutingModule
  ],
  exports: [
    HomeComponent,
    Error404Component
  ]
})
export class PagesModule { }
