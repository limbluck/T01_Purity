import { Component, inject } from '@angular/core';

import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'T01_Purity';

  // Sidebar
    SidebarService: SidebarService = inject(SidebarService);
    
    toggleSidebar(){
      this.SidebarService.toggleSidebar();
    }
}
