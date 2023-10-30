import { Component, inject } from '@angular/core';

import { SidebarService } from 'src/app/services/sidebar.service';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  // Sidebar
    SidebarService: SidebarService = inject(SidebarService);

    toggleSidebar(){
      this.SidebarService.toggleSidebar();
    }

  // Authorization
    AuthorizationService: AuthorizationService = inject(AuthorizationService);
    
    logIn(){
      this.AuthorizationService.logIn();
    };

    logOut(){
      this.AuthorizationService.logOut();
    };

}
