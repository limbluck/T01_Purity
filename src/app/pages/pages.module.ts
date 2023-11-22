import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    HomeComponent,
    Error404Component
  ],
  exports: [
    HomeComponent,
    Error404Component
  ]
})
export class PagesModule { }
