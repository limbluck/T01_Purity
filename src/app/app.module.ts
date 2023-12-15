import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './pages/page-components/header/header.component';
import { SidebarComponent } from './pages/page-components/sidebar/sidebar.component';

import { HomeComponent } from './pages/home/home.component';

import { IfDropdownDirective } from './directives/if-dropdown.directive';
import { HorizontalSwipeDirective } from './directives/horizontal-swipe.directive';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    SidebarComponent,

    HomeComponent,

    IfDropdownDirective,
    HorizontalSwipeDirective
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
