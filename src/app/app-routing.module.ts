import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import { CustomerComponent } from './modules/customer/customer.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AuthGuard } from 'src/app/core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: CustomerComponent,
    children: [
      { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]
  },
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: CustomerComponent,
    children: [
      {
        path: '', loadChildren: () => import('src/app/modules/customer/customer.module').then(m => m.CustomerModule)
      },
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: AdminComponent,
    children: [
      { path: 'admin', loadChildren: () => import('src/app/modules/admin/admin.module').then(m => m.AdminModule) },
    ]
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
