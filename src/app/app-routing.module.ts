import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { OffersComponent } from './offers/offers.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { InventaryComponent } from './inventary/inventary.component';
import { ProductsResolver } from './products/products.resolver';
import { HomeResolver } from './home/home.resolver';
import { OffersResolver } from './offers/offers.resolver';
import { InventaryResolver } from './inventary/inventary.resolver';

const routes: Routes = [
  { path: 'home',
    component: HomeComponent,
    resolve: {
      homeResolver: HomeResolver
    }
  },
  { path: 'products',
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
  { path: 'offers',
    component: OffersComponent,
    resolve: {
      offersResolver: OffersResolver
    }
   },
  { path: 'inventory',
    component: InventaryComponent,
    resolve: {
      inventaryResolver: InventaryResolver
    }
   },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
