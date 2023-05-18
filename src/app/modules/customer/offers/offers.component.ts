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
  products$: Observable<Product[]> = this._appService.products$;
  products: Product[] = [];
  constructor(private _appService: CustomerService) { }
  ngOnInit(): void {

    this._appService.products$.subscribe((products: Product[]) => {
      this.products = products;
    }
    );
  }

  getDiscountedPrice(product: Product): string {
    const discountPrice =  (product.price - (product.price * product.discountPercentage / 100)).toFixed(2);
    return `Normal: ${product.price}$ Descuento: ${discountPrice}$`
  }
}
