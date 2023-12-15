import { Injectable } from '@angular/core';

/**
 * Placeholder to handle authorization toggles
 */
@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  authorized: boolean = false;

  logIn(): void {
    this.authorized = true;
  };

  logOut(): void {
    this.authorized = false;
  };
}
