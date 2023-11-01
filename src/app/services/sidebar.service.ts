import { Injectable } from '@angular/core';

interface Sidebar {
  showSidebar: boolean;
  toggleSidebar(): void;
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements Sidebar {

  showSidebar: boolean = false;

  toggleSidebar(){
    this.showSidebar = !this.showSidebar
  };

}