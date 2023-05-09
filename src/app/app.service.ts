import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, tap, of } from 'rxjs'

import { Products, ProductsResponse } from './app.types'


@Injectable({
  providedIn: 'root',
})
export class AppService {
  API_URL = 'https://dummyjson.com'

  private _products: BehaviorSubject<ProductsResponse> = new BehaviorSubject<ProductsResponse>({products: [], total: 0, skip: 0, limit: 0})

  constructor(private _httpClient: HttpClient) {}

  get products$(): Observable<ProductsResponse> {
    return this._products.asObservable()
  }

  getProducts(): Observable<ProductsResponse> {
    return this._httpClient.get<ProductsResponse>(`${this.API_URL}/products`)
      .pipe(
        tap((response) => {
          this._products.next(response)
        })
      )
  }
}