import { Component } from '@angular/core';
import { InventaryService } from './inventary.service';
import { Products } from '../app.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./inventary.component.css']
})
export class InventaryComponent {
  visible: boolean = false;
  create: boolean = false;
  products$: Observable<Products[]> = this._inventaryService.products$;
  products: Products[] = [];
  tempProduct: Products = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: [],
  }
  constructor(private _inventaryService: InventaryService) { }
  ngOnInit(): void {
    this._inventaryService.products$.subscribe((products: Products[]) => {
      this.products = products;
    }
    );
  }

  refreshData() {
    this._inventaryService.getProducts().subscribe((response) => {
      this.products = response;
    });
  }

  action() {
    if (this.create) {
      this._inventaryService.createProduct(this.tempProduct).subscribe((response) => {
        this.refreshData();
      });
    } else {
      this._inventaryService.updateProduct(this.tempProduct).subscribe((response) => {
        this.refreshData();
      });
    }
    this.visible = false;
  }

  deleteProduct(product: Products) {
    this._inventaryService.deleteProduct(product.id).subscribe((response) => {
      this.refreshData();
    });
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

  showDialog(product: Products = { id: 0, title: '', description: '', price: 0, discountPercentage: 0, rating: 0, stock: 0, brand: '', category: '', thumbnail: '', images: [] }) {
    this.tempProduct = product
    this.visible = true;
    if(product.id === 0){
      this.create = true
    } else {
      this.create = false
    }
  }
}
