import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  private authService = inject( AuthService );
// cualquiera de las 2 formas esta bien pero se recomienda la signal
  public user = computed( () => this.authService.currentUser() );

  // get user(){
  //   return this.authService.currentUser();
  // }

  onLogout(){
    this.authService.logout();
  }
}
