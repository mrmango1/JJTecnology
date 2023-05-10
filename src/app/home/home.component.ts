import { Component } from '@angular/core';
import { Products, ProductsResponse, ResponsiveOptions } from '../app.types';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  responsiveOptions: ResponsiveOptions[] = [];
  products: Products[] = [];
  constructor(private _appService: AppService) { }
  ngOnInit(): void {

    this._appService.getProducts(8).subscribe((data: ProductsResponse) => {
      this.products = data.products;
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
}
