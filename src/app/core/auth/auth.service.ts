import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, Observable, of, ReplaySubject, switchMap, throwError } from 'rxjs'
import { AuthUtils } from 'src/app/core/auth/auth.utils'
import { ActivatedRoute, Router } from '@angular/router'
import { API_URL } from '../config/endpoints'
import { User } from '../config/types'

@Injectable()
export class AuthService {
  private _authenticated: boolean = false
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1)

  constructor(
    private _httpClient: HttpClient,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  set accessToken(token: string) {
    localStorage.setItem('accessToken', token)
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? ''
  }
  set user(value: User) {
    this._user.next(value)
  }
  get user$(): Observable<User> {
    return this._user.asObservable()
  }

  forgotPassword(email: string): Observable<any> {
    console.log(email)
    return this._httpClient.post(API_URL + '/backend/auth/retrievePassword', {
      email,
    })
  }

  resetPassword(password: string, uid: string): Observable<any> {
    return this._httpClient.post(API_URL + '/backend/auth/resetPassword', {
      password,
      uid,
    })
  }

  signIn(credentials: { email: string; password: string }): Observable<any> {
    if (this._authenticated) {
      return throwError('User is already logged in.')
    }
    return this._httpClient
      .post(API_URL + '/backend/user/login', credentials)
      .pipe(
        switchMap((response: any) => {
          this.accessToken = response.accessToken
          this._authenticated = true
          this._user.next(response.user)
          return of(response)
        })
      )
  }

  signInUsingToken(): Observable<any> {
    return this._httpClient
      .post(API_URL + '/backend/user/login', {
        accessToken: this.accessToken,
      })
      .pipe(
        catchError(() =>
          of(false)
        ),
        switchMap((response: any) => {
          this.accessToken = response.accessToken
          this._authenticated = true
          this._user.next(response.user)
          return of(true)
        })
      )
  }

  signOut(): Observable<any> {
    localStorage.removeItem('accessToken')
    this._authenticated = false
    return of(true)
  }

  signUp(user: {
    name: string
    email: string
    password: string
    company: string
  }): Observable<any> {
    return this._httpClient.post('api/auth/sign-up', user)
  }

  unlockSession(credentials: {
    email: string
    password: string
  }): Observable<any> {
    return this._httpClient.post('api/auth/unlock-session', credentials)
  }

  check(): Observable<boolean> {
    if (this._authenticated) {
      return of(true)
    }
    if (this.accessToken == undefined) {
      return of(false)
    }
    if (!this.accessToken) {
      return of(false)
    }
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false)
    }
    return this.signInUsingToken()
  }
}
