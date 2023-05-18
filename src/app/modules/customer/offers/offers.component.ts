import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Product } from '../../../core/config/types';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  providers: [MessageService]
})
export class OffersComponent {
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

  getDiscountedPrice(product: Product): string {
    const discountPrice =  (product.price - (product.price * product.discountPercentage / 100)).toFixed(2);
    return `Normal: ${product.price}$ Descuento: ${discountPrice}$`
  }

  addProductToCart(product: Product) {
    this._customerService.addProductToCart(product);
    this._messageService.add({ severity: 'success', summary: 'Agregado', detail: 'Producto agregado al carrito' });
  }
}
