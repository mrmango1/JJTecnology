import { Component } from '@angular/core';
import { AppService } from '../customer.service';
import { Product } from '../../../core/config/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$: Observable<Product[]> = this._appService.products$;
  products: Product[] = [];
  constructor(private _appService: AppService) { }
  ngOnInit(): void {

    this._appService.products$.subscribe((products: Product[]) => {
      this.products = products;
    }
    );
  }
}
