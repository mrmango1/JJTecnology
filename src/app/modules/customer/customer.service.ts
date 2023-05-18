import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, tap, of } from 'rxjs'
import { Product, ShoppingCart } from '../../core/config/types'
import { API_URL } from 'src/app/core/config/endpoints'
import { CookieService } from 'ngx-cookie-service'
import { InventaryService } from '../admin/inventary/inventary.service'

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([])
  private _shoppingCart: BehaviorSubject<ShoppingCart> = new BehaviorSubject<ShoppingCart>({
    products: [],
    userId: 0,
    totalItems: 0,
    totalPrice: 0,
  })

  constructor(
    private _httpClient: HttpClient,
    private _cookieService: CookieService,
    private _inventaryService: InventaryService
    ) { 
      this._shoppingCart = new BehaviorSubject<ShoppingCart>(JSON.parse(this._cookieService.get('shoppingCart') || '{}'))
    }

  get products$(): Observable<Product[]> {
    return this._products.asObservable()
  }

  get shoppingCart$(): Observable<ShoppingCart> {
    return this._shoppingCart.asObservable()
  }

  getProducts(lenght: number = 0): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${API_URL}/products`)
      .pipe(
        tap((response) => {
          this._products.next(response.slice(0, lenght === 0 ? response.length : lenght))
        })
      )
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${API_URL}/products`)
      .pipe(
        tap((response) => {
          this._products.next(response.filter((p) => p.category === category))
        })
      )
  }

  addProductToCart(product: Product): void {
    const shoppingCart = this._shoppingCart.getValue()
    const productExists = shoppingCart.products?.find((p) => p.id === product.id)
    if (productExists) {
      productExists.quantity += 1
    } else {
      shoppingCart.products = shoppingCart.products || []
      shoppingCart.products.push({
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: 1,
        image: product.images[0]
      })
    }
    shoppingCart.totalItems = (shoppingCart.totalItems || 0) + 1
    shoppingCart.totalPrice = (shoppingCart.totalPrice || 0) + product.price
    this.setShoppingCart(shoppingCart)
  }

  removeProductFromCart(product: Product): void {
    const shoppingCart = this._shoppingCart.getValue()
    const productExists = shoppingCart.products.find((p) => p.id === product.id)
    if (productExists) {
      productExists.quantity -= 1
      if (productExists.quantity === 0) {
        shoppingCart.products = shoppingCart.products.filter((p) => p.id !== product.id)
      }
    }
    shoppingCart.totalItems -= 1
    shoppingCart.totalPrice -= product.price
    this.setShoppingCart(shoppingCart)
  }

  makePurcharse(): void {
    const shoppingCart = this._shoppingCart.getValue()
    this.getProducts().subscribe((products) => {
      const productsInCart = products.filter((p) => shoppingCart.products.find((p2) => p2.id === p.id))
      productsInCart.forEach((p) => {
        const productInCart = shoppingCart.products.find((p2) => p2.id === p.id)
        if (productInCart) {
          p.stock -= productInCart.quantity
        }
      })
      console.log(productsInCart)
      productsInCart.forEach((p) => {
        this._inventaryService.updateProduct(p).subscribe()
      })
      this.resetShoppingCart()
      // return this._httpClient.put(`${API_URL}/products`, productsInCart).subscribe()
    }
    )
  }

  resetShoppingCart(): void {
    this._shoppingCart.next({
      products: [],
      userId: 0,
      totalItems: 0,
      totalPrice: 0,
    })
    this._cookieService.delete('shoppingCart')
  }


  setShoppingCart(shoppingCart: ShoppingCart): void {
    this._shoppingCart.next(shoppingCart)
    this._cookieService.set('shoppingCart', JSON.stringify(shoppingCart))
  }
}