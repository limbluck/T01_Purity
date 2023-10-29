import { Component, inject } from '@angular/core';

import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  AuthorizationService: AuthorizationService = inject(AuthorizationService);
  
  logIn(){
    this.AuthorizationService.logIn();
  };

  logOut(){
    this.AuthorizationService.logOut();
  };

}
