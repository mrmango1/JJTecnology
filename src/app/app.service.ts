import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, tap, of } from 'rxjs'

import { Products, ProductsResponse } from './app.types'


@Injectable({
  providedIn: 'root',
})
export class AppService {
  API_URL = 'https://dummyjson.com'

  private _productsResponse: BehaviorSubject<ProductsResponse> = new BehaviorSubject<ProductsResponse>({ products: [], total: 0, skip: 0, limit: 0 })
  private _products: BehaviorSubject<Products[]> = new BehaviorSubject<Products[]>([])

  constructor(private _httpClient: HttpClient) { }

  get productsResponse$(): Observable<ProductsResponse> {
    return this._productsResponse.asObservable()
  }

  get products$(): Observable<Products[]> {
    return this._products.asObservable()
  }

  getProducts(limit: number = 0, skip: number = 0, select: string = ''): Observable<ProductsResponse> {
    let params = new HttpParams()
      .set('limit', limit)
      .set('skip', skip)
      if(select.length > 0){
        params = params.set('select', select)
      }
    return this._httpClient.get<ProductsResponse>(`${this.API_URL}/products`,{params})
      .pipe(
        tap((response) => {
          this._products.next(response.products)
          this._productsResponse.next(response)
        })
      )
  }
  getProductsByCategory(category: string): Observable<ProductsResponse> {
    return this._httpClient.get<ProductsResponse>(`${this.API_URL}/products/category/${category}`)
      .pipe(
        tap((response) => {
          this._products.next(response.products)
          this._productsResponse.next(response)
        })
      )
  }
}