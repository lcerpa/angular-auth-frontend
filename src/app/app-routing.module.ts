import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'dashboard',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule )
  },
  {
    path: '**', redirectTo: 'auth'
  }
];

@NgModule({    //esto pone un # en la ruta para que en netlify reconozca las rutas y no truene
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
