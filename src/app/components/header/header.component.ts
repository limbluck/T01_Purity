import { Component, inject, EventEmitter, Output } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

    @Output() toggleSidebar: EventEmitter<never> = new EventEmitter<never>();

    showSearchDropdown: boolean = false;
    toggleSearchDropdown(): void {
      this.showSearchDropdown = !this.showSearchDropdown;
    }

    showLanguageDropdown: boolean = false;
    toggleLanguageDropdown(): void {
      this.showLanguageDropdown = !this.showLanguageDropdown;
    }

    showNotificationsDropdown: boolean = false;
    toggleNotificationsDropdown(): void {
      this.showNotificationsDropdown = !this.showNotificationsDropdown;
    }
  
    showProfileDropdown: boolean = false;
    toggleProfileDropdown(): void {
      this.showProfileDropdown = !this.showProfileDropdown;
    }

  // #region Authorization
  
    readonly AuthorizationService: AuthorizationService = inject(AuthorizationService);
    
    logIn(): void {
      this.AuthorizationService.logIn();
    };

    logOut(): void {
      this.AuthorizationService.logOut();
    };

  // #endregion

}
