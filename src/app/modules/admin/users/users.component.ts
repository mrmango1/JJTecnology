import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { Product, User } from 'src/app/core/config/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  visible: boolean = false;
  create: boolean = false;
  users$: Observable<User[]> = this._usersService.users$;
  users: User[] = [];
  tempUser: User = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    age: 0,
  }
  constructor(private _usersService: UsersService) { }
  ngOnInit(): void {
    this._usersService.users$.subscribe((users: User[]) => {
      this.users = users;
    }
    );
  }

  refreshData() {
    this._usersService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  action() {
    if (this.create) {
      this._usersService.registerUser(this.tempUser).subscribe((response) => {
        this.refreshData();
      });
      // enviar una notificacion si no se puede actualizar
    } else {
      this._usersService.updateUser(this.tempUser).subscribe((response) => {
        this.refreshData();
      });
    }
    this.visible = false;
  }

  deleteUser(product: Product) {
    this._usersService.deleteUser(product.id).subscribe((response) => {
      this.refreshData();
    });
  }

  showDialog(user: User = { id: 0, firstname: '', lastname: '', email: '', password: '', age: 0 }) {
    user.password = ''
    this.tempUser = user
    this.visible = true;
    if(user.id === 0){
      this.create = true
    } else {
      this.create = false
    }
  }
}
