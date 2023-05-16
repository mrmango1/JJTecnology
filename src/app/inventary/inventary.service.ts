import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, tap, of } from 'rxjs'
import { Products, ProductsResponse } from '../app.types'


@Injectable({
  providedIn: 'root',
})
export class InventaryService {
  API_URL = 'http://localhost:3000/products'

  private _productsResponse: BehaviorSubject<ProductsResponse> = new BehaviorSubject<ProductsResponse>({ products: [], total: 0, skip: 0, limit: 0 })
  private _products: BehaviorSubject<Products[]> = new BehaviorSubject<Products[]>([])

  constructor(private _httpClient: HttpClient) { }

  get productsResponse$(): Observable<ProductsResponse> {
    return this._productsResponse.asObservable()
  }

  get products$(): Observable<Products[]> {
    return this._products.asObservable()
  }

  getProducts(): Observable<Products[]> {
    return this._httpClient.get<Products[]>(this.API_URL)
      .pipe(
        tap((response) => {
          this._products.next(response)
        })
      )
  }

  createProduct(product: Products): Observable<Products> {
    return this._httpClient.post<Products>(this.API_URL, product)
      .pipe(
        tap((response) => {
          const products = this._products.getValue()
          products.push(response)
          this._products.next(products)
        })
      )
  }

  updateProduct(product: Products): Observable<Products> {
    return this._httpClient.patch<Products>(`${this.API_URL}/${product.id}`, product)
      .pipe(
        tap((response) => {
          const products = this._products.getValue()
          const index = products.findIndex((p) => p.id === response.id)
          products[index] = response
          this._products.next(products)
        })
      )
  }

  deleteProduct(id: number): Observable<Products> {
    return this._httpClient.delete<Products>(`${this.API_URL}/${id}`)
      .pipe(
        tap((response) => {
          const products = this._products.getValue()
          const index = products.findIndex((p) => p.id === id)
          products.splice(index, 1)
          this._products.next(products)
        })
      )
  }
}
