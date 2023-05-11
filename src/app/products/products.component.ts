import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Products } from '../app.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$: Observable<Products[]> = this._appService.products$;
  products: Products[] = [];
  constructor(private _appService: AppService) { }
  ngOnInit(): void {

    this._appService.products$.subscribe((products: Products[]) => {
      this.products = products;
    }
    );
  }
}
