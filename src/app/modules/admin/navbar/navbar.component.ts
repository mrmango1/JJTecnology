import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    ) { }

  ngOnInit() {
    this.items = [
        {
            label: 'Mantenimiento de Productos',
            icon: 'pi pi-fw pi-book',
            routerLink: '/admin/inventary'
        },
        {
            label: 'Mantenimiento de Usuarios',
            icon: 'pi pi-fw pi-user',
            routerLink: '/admin/users',
        }
    ];
}

  signOut() {
    this._authService.signOut().subscribe(
      () => {
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
          '/home'
        this._router.navigateByUrl(redirectURL)
      },
    )
  }
}
