import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { User } from 'src/app/core/config/types'
import { API_URL } from 'src/app/core/config/endpoints'


@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])

  constructor(private _httpClient: HttpClient) { }

  get users$(): Observable<User[]> {
    return this._users.asObservable()
  }

  getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${API_URL}/users`)
      .pipe(
        tap((response) => {
          this._users.next(response)
        })
      )
  }

  registerUser(user: User): Observable<User> {
    return this._httpClient.post<User>(`${API_URL}/users`, user)
      .pipe(
        tap((response) => {
          const products = this._users.getValue()
          products.push(response)
          this._users.next(products)
        })
      )
  }

  updateUser(user: User): Observable<User> {
    return this._httpClient.patch<User>(`${API_URL}/users/${user.id}`, user)
      .pipe(
        tap((response) => {
          const products = this._users.getValue()
          const index = products.findIndex((p) => p.id === response.id)
          products[index] = response
          this._users.next(products)
        })
      )
  }

  deleteUser(id: number): Observable<User> {
    return this._httpClient.delete<User>(`${API_URL}/users/${id}`)
      .pipe(
        tap((response) => {
          const products = this._users.getValue()
          const index = products.findIndex((p) => p.id === id)
          products.splice(index, 1)
          this._users.next(products)
        })
      )
  }
}
