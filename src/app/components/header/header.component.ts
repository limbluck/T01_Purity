import { Component, ElementRef, ViewChild, inject, EventEmitter, Output } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class HeaderComponent {
  
  // #region Sidebar toggle control

    @Output("toggleSidebar") toggleSidebar: EventEmitter<void> = new EventEmitter<void>()

    showSearchDropdown: boolean = false;

    headerSearch?: ElementRef;
    @ViewChild('header__search') set headerSearchSet(content: ElementRef) {
      if (content) {
        this.headerSearch = content;
      }
    } 

    headerSearchDropdown?: ElementRef;
    @ViewChild('header__searchDropdown') set headerSearchDropdownSet(content: ElementRef) {
      if (content) {
        this.headerSearchDropdown = content;
      }
    } 

    toggleSearchDropdown(): void {
      this.showSearchDropdown = !this.showSearchDropdown;
    }
  // #endregion

  // #region Language dropdown control

    showLanguageDropdown: boolean = false;

    headerLanguage?: ElementRef;
    @ViewChild('header__language') set headerLanguageSet(content: ElementRef) {
      if (content) {
        this.headerLanguage = content;
      }
    } 

    headerLanguageDropdown?: ElementRef;
    @ViewChild('header__languageDropdown') set headerLanguageDropdownSet(content: ElementRef) {
      if (content) {
        this.headerLanguageDropdown = content;
      }
    } 

    toggleLanguageDropdown(): void {
      this.showLanguageDropdown = !this.showLanguageDropdown;
    }

  // #endregion

  // #region Notifications dropdown control
  
    showNotificationsDropdown: boolean = true;

    headerNotifications?: ElementRef;
    @ViewChild('header__notifications') set headerNotificationsSet(content: ElementRef) {
      if (content) {
        this.headerNotifications = content;
      }
    } 

    headerNotificationsDropdown?: ElementRef;
    @ViewChild('header__notificationsDropdown') set headerNotificationsDropdownSet(content: ElementRef) {
      if (content) {
        this.headerNotificationsDropdown = content;
      }
    } 

    toggleNotificationsDropdown(): void {
      this.showNotificationsDropdown = !this.showNotificationsDropdown;
    }
  
  // #endregion

  // #region Profile dropdown control

    showProfileDropdown: boolean = false;

    headerProfile?: ElementRef;
    @ViewChild('header__profile') set headerProfileSet(content: ElementRef) {
      if (content) {
        this.headerProfile = content;
      }
    } 

    headerProfileDropdown?: ElementRef;
    @ViewChild('header__profileDropdown') set headerProfileDropdownSet(content: ElementRef) {
      if (content) {
        this.headerProfileDropdown = content;
      }
    } 

    toggleProfileDropdown(): void {
      this.showProfileDropdown = !this.showProfileDropdown;
    }

  // #endregion

  onClick(event: MouseEvent): void {

    // #region Dropdowns controls

    if (!this.headerProfile?.nativeElement.contains(event.target) && !this.headerProfileDropdown?.nativeElement.contains(event.target)) {
      this.showProfileDropdown = false;
    };
    if (!this.headerLanguage?.nativeElement.contains(event.target) && !this.headerLanguageDropdown?.nativeElement.contains(event.target)) {
      this.showLanguageDropdown = false;
    };
    if (!this.headerSearch?.nativeElement.contains(event.target) && !this.headerSearchDropdown?.nativeElement.contains(event.target)) {
      this.showSearchDropdown = false;
    };
    if (!this.headerNotifications?.nativeElement.contains(event.target) && !this.headerNotificationsDropdown?.nativeElement.contains(event.target)) {
      this.showNotificationsDropdown = false;
    };

    // #endregion
  }

  // #region Authorization
    AuthorizationService: AuthorizationService = inject(AuthorizationService);
    
    logIn(): void {
      this.AuthorizationService.logIn();
    };

    logOut(): void {
      this.AuthorizationService.logOut();
    };

  // #endregion

}
