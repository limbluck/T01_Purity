import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';
import { IfDropdownDirective } from '../directives/if-dropdown.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    AppRoutingModule,
    IfDropdownDirective
  ],
  exports: [
    HeaderComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
