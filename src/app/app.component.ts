import { Component } from '@angular/core';

/**
 * @classdesc
 *   Component to define the page layout
 * 
 * @section Sidebar controls
 *   @param showSidebar: boolean
 *     Sidebar status (true - visible, false - hidden)
 *   @method toggleSidebar(): void
 *     Toggle sidebar status
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  showSidebar: boolean = false;

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
}
