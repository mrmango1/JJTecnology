import { Routes } from '@angular/router';
import { InventaryComponent } from 'src/app/modules/admin/inventary/inventary.component';
import { InventaryResolver } from 'src/app/modules/admin/inventary/inventary.resolver';

export const adminRoutes: Routes = [
  {
    path: '',
    canActivate: [],
    canActivateChild: [],
    component: InventaryComponent,
    data: { title: 'Home' },
    children: [
      {
        path: 'inventory',
        component: InventaryComponent,
        resolve: {
          inventaryResolver: InventaryResolver
        },
      }
    ]
  },
];