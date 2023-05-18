import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from 'src/app/modules/customer/customer.component';
import { customerRoutes } from './customer.routing';

// PrimeNG Components
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';


// Components
import { NavbarComponent } from 'src/app/modules/customer/navbar/navbar.component';
import { HomeComponent } from 'src/app/modules/customer/home/home.component';
import { ProductsComponent } from './products/products.component';
import { OffersComponent } from './offers/offers.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    CustomerComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    OffersComponent,
    AboutComponent,
    ContactComponent,
    CartComponent
  ],
  imports: [
    RouterModule.forChild(customerRoutes),
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    ButtonModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    RadioButtonModule,
    RatingModule,
    ToolbarModule,
    MenubarModule,
    CardModule,
    CarouselModule,
    TagModule,
    LeafletModule,
    FormsModule,
    ToastModule,
    ConfirmPopupModule
  ],
  exports: [CustomerComponent]
})
export class CustomerModule { }
