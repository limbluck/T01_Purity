import { Injectable } from '@angular/core';

interface Authorization {
  // HeaderComponent
    authorized: boolean;
    logIn(): void;
    logOut(): void;
}

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService implements Authorization{

  authorized: boolean = false;

  logIn(): void {
    this.authorized = true;
  };

  logOut(): void {
    this.authorized = false;
  };
}
