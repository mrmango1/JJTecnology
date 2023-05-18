import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Product } from '../../../core/config/types';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [MessageService]
})
export class ProductsComponent {
  products$: Observable<Product[]> = this._customerService.products$;
  products: Product[] = [];
  constructor(
    private _customerService: CustomerService,
    private _messageService: MessageService
    ) { }
  ngOnInit(): void {
    this._customerService.products$.subscribe((products: Product[]) => {
      this.products = products;
    }
    );
  }

  addProductToCart(product: Product) {
    this._customerService.addProductToCart(product);
    this._messageService.add({ severity: 'success', summary: 'Agregado', detail: 'Producto agregado al carrito' });
  }
}
