import { Component } from '@angular/core';
import { User } from 'src/app/core/config/types';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
  providers: [MessageService]
})
export class LoginComponent {

  tempUser: User = {
    id: 0,
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    age: 0
  }
  valCheck: string[] = ['remember'];

  constructor(
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _messageService: MessageService
    ) { }

  login() {
    this._authService.signIn(this.tempUser).subscribe(
      () => {
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
          '/admin/inventary'
        this._router.navigateByUrl(redirectURL)
        this._messageService.add({ severity: 'success', summary: 'Logeado', detail: 'Logeado exitosamente' });
      },
      response => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Correo o contraseña incorrectos' });
      }
    )
  }
}
