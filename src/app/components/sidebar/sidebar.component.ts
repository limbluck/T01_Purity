import { Component, inject } from '@angular/core';

import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  // Authorization
    AuthorizationService: AuthorizationService = inject(AuthorizationService);

    logIn(): void {
      this.AuthorizationService.logIn();
    };

    logOut(): void {
      this.AuthorizationService.logOut();
    };

}
