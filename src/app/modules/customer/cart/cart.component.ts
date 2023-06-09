import { Component } from '@angular/core';
import { Product, ShoppingCart } from '../../../core/config/types';
import { CustomerService } from '../customer.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CartComponent {
  shoppingCart!: ShoppingCart

  constructor(
    private _customerService: CustomerService,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService
    ) { 
    this._customerService.shoppingCart$.subscribe((shoppingCart: ShoppingCart) => {
      this.shoppingCart = shoppingCart;
    });
  }
  ngOnInit(): void {
  }

  removeProductFromCart(product: Product) {
    this._customerService.removeProductFromCart(product);
    this._messageService.add({ severity: 'error', summary: 'Eliminado', detail: 'Producto eliminado del carrito' });
  }

  makePurchase() {
    this._customerService.makePurcharse();
  }

  confirm(event: Event) {
    this._confirmationService.confirm({
        target: event.target!,
        message: 'Esta seguro que desea continuar con la compra?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this._messageService.add({ severity: 'success', summary: 'Exitosa', detail: 'Compra realizada' });
            this.makePurchase();
        },
        reject: () => {
            this._messageService.add({ severity: 'error', summary: 'Problema', detail: 'No se ha procedido con la compra' });
        }
    });
}
}
