import { Component, inject } from '@angular/core';

import { SidebarService } from 'src/app/components/sidebar/sidebar.service';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  // Sidebar
    SidebarService: SidebarService = inject(SidebarService);

    toggleSidebar(): void {
      this.SidebarService.toggleSidebar();
    }

  // Authorization
    AuthorizationService: AuthorizationService = inject(AuthorizationService);
    
    logIn(): void {
      this.AuthorizationService.logIn();
    };

    logOut(): void {
      this.AuthorizationService.logOut();
    };

}
