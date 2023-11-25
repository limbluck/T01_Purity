import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';

import { IfDropdownDirective } from './directives/if-dropdown.directive';
import { SwipeDirective } from './directives/swipe.directive';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    SidebarComponent,

    HomeComponent,
    Error404Component,

    IfDropdownDirective,
    SwipeDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
