import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
