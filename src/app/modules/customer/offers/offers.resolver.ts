import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { catchError, Observable, throwError } from 'rxjs'
import { AppService } from '../customer.service';
import { Product } from '../../../core/config/types';

@Injectable({
  providedIn: 'root',
})
export class OffersResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(
    private _appService: AppService,
    private _router: Router
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> {
      return this._appService
      .getProductsByCategory("smartphones")
      .pipe(
        catchError(error => {
          console.error(error)
          const parentUrl = state.url.split('/').slice(0, -1).join('/')
          this._router.navigateByUrl(parentUrl)
          return throwError(error)
        })
      )
  }
}
