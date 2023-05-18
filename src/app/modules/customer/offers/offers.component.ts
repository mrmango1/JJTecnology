import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Product } from '../../../core/config/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent {
  products$: Observable<Product[]> = this._customerService.products$;
  products: Product[] = [];
  constructor(private _customerService: CustomerService) { }
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
  }
}
