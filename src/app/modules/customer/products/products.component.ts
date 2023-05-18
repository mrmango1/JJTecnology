import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Product } from '../../../core/config/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$: Observable<Product[]> = this._customerService.products$;
  products: Product[] = [];
  constructor(private _customerService: CustomerService) { }
  ngOnInit(): void {
    this._customerService.products$.subscribe((products: Product[]) => {
      this.products = products;
    }
    );
  }

  addProductToCart(product: Product) {
    this._customerService.addProductToCart(product);
  }
}
