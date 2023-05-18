import { Component } from '@angular/core';
import { Product, ResponsiveOptions } from '../../../core/config/types';
import { CustomerService } from '../customer.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent {
  responsiveOptions: ResponsiveOptions[] = [];
  products: Product[] = [];
  constructor(
    private _customerService: CustomerService,
    private _messageService: MessageService
    ) { }
  ngOnInit(): void {

    this._customerService.products$.subscribe((products: Product[]) => {
      this.products = products;
    });

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  getSeverity(stock: number) {
    switch (true) {
      case stock > 50:
        return 'success';
      case stock > 0:
        return 'warning';
      case stock === 0:
        return 'danger';
      default:
        return 'danger';
    }
  }

  getStatus(stock: number) {
    switch (true) {
      case stock > 50:
        return 'En stock';
      case stock > 0:
        return 'Stock limitado';
      case stock === 0:
        return 'Sin stock';
      default:
        return 'Sin stock';
    }
  }

  addProductToCart(product: Product) {
    this._customerService.addProductToCart(product);
    this._messageService.add({ severity: 'success', summary: 'Agregado', detail: 'Producto agregado al carrito' });
  }

}
