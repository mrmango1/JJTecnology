import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
        {
            label: 'Inicio',
            icon: 'pi pi-fw pi-home',
            routerLink: '/home'
        },
        {
            label: 'Productos',
            icon: 'pi pi-shopping-cart',
            items: [
                {
                    label: 'Todos',
                    icon: 'pi pi-fw pi-wallet',
                    routerLink: '/products/0',
                },
                {
                    label: 'Celulares',
                    icon: 'pi pi-fw pi-phone',
                    routerLink: '/products/smartphones',
                },
                {
                    label: 'Laptops',
                    icon: 'pi pi-fw pi-apple',
                    routerLink: '/products/laptops',
                },
                {
                    label: 'Accesorios',
                    icon: 'pi pi-fw pi-camera',
                    routerLink: '/products/furniture',
                }
            ]
        },
        {
            label: 'Ofertas',
            icon: 'pi pi-fw pi-tags',
            routerLink: '/offers',
        },
        {
            label: 'Nosotros',
            icon: 'pi pi-fw pi-users',
            routerLink: '/about',
        },
        {
          label: 'Contacto',
          icon: 'pi pi-fw pi-building',
          routerLink: '/contact',
      }
    ];
}
}
