import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, tap, of } from 'rxjs'
import { Product } from '../../core/config/types'
import { API_URL } from 'src/app/core/config/endpoints'

@Injectable({
  providedIn: 'root',
})
export class AppService {

  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([])

  constructor(private _httpClient: HttpClient) { }

  get products$(): Observable<Product[]> {
    return this._products.asObservable()
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
}