import { Injectable } from '@angular/core';

interface Authorization {
  authorized: boolean;
  logIn(): void;
  logOut(): void;
}

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService implements Authorization{

  authorized: boolean = false;

  constructor() {}

  logIn(){
    this.authorized = true;
  };

  logOut(){
    this.authorized = false;
  };
}
