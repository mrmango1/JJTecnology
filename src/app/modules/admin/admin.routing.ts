import { Routes } from '@angular/router';
import { InventaryComponent } from 'src/app/modules/admin/inventary/inventary.component';
import { InventaryResolver } from 'src/app/modules/admin/inventary/inventary.resolver';
import { UsersComponent } from './users/users.component';
import { UsersResolver } from './users/users.resolver';

export const adminRoutes: Routes = [
  {
    path: 'inventary',
    component: InventaryComponent,
    resolve: {
      inventaryResolver: InventaryResolver
    },
  },
  {
    path: 'users',
    component: UsersComponent,
    resolve: {
      usersResolver: UsersResolver
    },
  }
];