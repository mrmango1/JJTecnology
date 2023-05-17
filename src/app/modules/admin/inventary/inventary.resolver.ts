import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { catchError, Observable, throwError } from 'rxjs'
import { InventaryService } from './inventary.service'
import { Product } from 'src/app/core/config/types';

@Injectable({
  providedIn: 'root',
})
export class InventaryResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(
    private _inventaryService: InventaryService,
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
      return this._inventaryService
      .getProducts()
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
