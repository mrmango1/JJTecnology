import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/modules/customer/home/home.component';
import { ProductsComponent } from 'src/app/modules/customer/products/products.component';
import { OffersComponent } from 'src/app/modules/customer/offers/offers.component';
import { AboutComponent } from 'src/app/modules/customer/about/about.component';
import { ContactComponent } from 'src/app/modules/customer/contact/contact.component';
import { ProductsResolver } from 'src/app/modules/customer/products/products.resolver';
import { HomeResolver } from 'src/app/modules/customer/home/home.resolver';
import { OffersResolver } from 'src/app/modules/customer/offers/offers.resolver';

export const customerRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      homeResolver: HomeResolver
    }
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: ':type',
        component: ProductsComponent,
        resolve: {
          productsResolver: ProductsResolver
        }
      },
    ]
  },
  {
    path: 'offers',
    component: OffersComponent,
    resolve: {
      offersResolver: OffersResolver
    }
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];