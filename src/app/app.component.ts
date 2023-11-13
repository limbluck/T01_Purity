import { Component, inject } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'T01_Purity';

  showSidebar: boolean = false;

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  };
}
