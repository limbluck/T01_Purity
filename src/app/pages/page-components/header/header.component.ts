import { Component, inject, EventEmitter, Output } from '@angular/core';
import { AuthorizationService } from '../../../services/authorization.service';
/**
 * @classdesc
 *   Component to render the header
 * 
 * @section Sidebar controls
 *   @Output toggleSidebar: EventEmitter<never>
 *     Send sidebar toggle event to app-component resposible for page layout
 * 
 * @section Search dropdown control
 *   @param showSearchDropdown: boolean
 *     Search dropdown status (true - visible, false - hidden)
 *   @method toggleSearchDropdown(): void
 *     Toggle Search dropdown status
 * 
 * @section Language dropdown control
 *   @param showLanguageDropdown: boolean
 *     Language dropdown status (true - visible, false - hidden)
 *   @method toggleLanguageDropdown(): void
 *     Toggle Language dropdown status
 * 
 * @section Notifications dropdown control
 *   @param showNotificationsDropdown: boolean
 *     Notifications dropdown status (true - visible, false - hidden)
 *   @method toggleNotificationsDropdown(): void
 *     Toggle Notifications dropdown status
 * 
 * @section Profile dropdown control
 *   @param showProfileDropdown: boolean
 *     Profile dropdown status (true - visible, false - hidden)
 *   @method toggleProfileDropdown(): void
 *     Toggle Profile dropdown status
 * 
 * @section Authorization
 *   @param AuthorizationService: AuthorizationService
 *     Inject authorization service placeholder to handle template changes for authorized users
 *   @method logIn(): void
 *     Toggle authorization status to authorized
 *   @method logOut(): void
 *     Toggle authorization status to unauthorized
 */
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

  readonly AuthorizationService: AuthorizationService = inject(AuthorizationService);
  
  logIn(): void {
    this.AuthorizationService.logIn();
  };

  logOut(): void {
    this.AuthorizationService.logOut();
    this.showProfileDropdown = false;  // Fix of profile dropdown visibility
  };

}
