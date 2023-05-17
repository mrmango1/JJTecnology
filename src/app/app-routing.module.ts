import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import { CustomerComponent } from './modules/customer/customer.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: CustomerComponent,
    // resolve: {
    //   initialData: InitialDataResolver,
    // },
    children: [
      {
        path: '', loadChildren: () => import('src/app/modules/customer/customer.module').then(m => m.CustomerModule)
      },
    ]
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    // component: CustomerComponent,
    // resolve: {
    //   initialData: InitialDataResolver,
    // },
    children: [
      { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
    ]
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
