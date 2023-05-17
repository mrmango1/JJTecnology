import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { MenubarModule } from 'primeng/menubar';

// Components
import { adminRoutes } from './admin.routing';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    RouterModule.forChild(adminRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
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
    BrowserAnimationsModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
