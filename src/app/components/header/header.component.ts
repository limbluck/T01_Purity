import { Component, ElementRef, ViewChild, inject, EventEmitter, Output } from '@angular/core';

import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class HeaderComponent {
  // showSearchDropdown: boolean = false;
  // showNotificationsDropdown: boolean = false;

  // Sidebar toggle button control

    @Output("toggleSidebar") toggleSidebar: EventEmitter<void> = new EventEmitter<void>()

  // Language dropdown control

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
  
  // Profile dropdown control

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

  // Onclick for the dropdown controls

    onClick(event: MouseEvent): void {
      if (!this.headerProfile?.nativeElement.contains(event.target) && !this.headerProfileDropdown?.nativeElement.contains(event.target)) {
        this.showProfileDropdown = false;
      };
      if (!this.headerLanguage?.nativeElement.contains(event.target) && !this.headerLanguageDropdown?.nativeElement.contains(event.target)) {
        this.showLanguageDropdown = false;
      };
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
