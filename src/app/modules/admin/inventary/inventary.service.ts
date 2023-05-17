import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, tap, of } from 'rxjs'
import { Product } from 'src/app/core/config/types'
import { API_URL } from 'src/app/core/config/endpoints'


@Injectable({
  providedIn: 'root',
})
export class InventaryService {

  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([])

  constructor(private _httpClient: HttpClient) { }

  get products$(): Observable<Product[]> {
    return this._products.asObservable()
  }

  getProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${API_URL}/products`)
      .pipe(
        tap((response) => {
          this._products.next(response)
        })
      )
  }

  createProduct(product: Product): Observable<Product> {
    return this._httpClient.post<Product>(`${API_URL}/products`, product)
      .pipe(
        tap((response) => {
          const products = this._products.getValue()
          products.push(response)
          this._products.next(products)
        })
      )
  }

  updateProduct(product: Product): Observable<Product> {
    return this._httpClient.patch<Product>(`${API_URL}/products/${product.id}`, product)
      .pipe(
        tap((response) => {
          const products = this._products.getValue()
          const index = products.findIndex((p) => p.id === response.id)
          products[index] = response
          this._products.next(products)
        })
      )
  }

  deleteProduct(id: number): Observable<Product> {
    return this._httpClient.delete<Product>(`${API_URL}/products/${id}`)
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
