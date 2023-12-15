import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './pages/page-components/header/header.component';
import { SidebarComponent } from './pages/page-components/sidebar/sidebar.component';

import { HomeComponent } from './pages/home/home.component';

import { DropdownDirective } from './directives/dropdown.directive';
import { SwipeDetectionDirective } from './directives/swipe-detection.directive';
import { CarouselDirective } from './directives/carousel.directive';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    SidebarComponent,

    HomeComponent,

    DropdownDirective,
    SwipeDetectionDirective,
    CarouselDirective
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
