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
            icon: 'pi pi-fw pi-file',
            routerLink: '/home'
        },
        {
            label: 'Productos',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Todos',
                    icon: 'pi pi-fw pi-align-left',
                    routerLink: '/products/0',
                },
                {
                    label: 'Celulares',
                    icon: 'pi pi-fw pi-align-right',
                    routerLink: '/products/smartphones',
                },
                {
                    label: 'Laptops',
                    icon: 'pi pi-fw pi-align-center',
                    routerLink: '/products/laptops',
                },
                {
                    label: 'Accesorios',
                    icon: 'pi pi-fw pi-align-justify',
                    routerLink: '/products/furniture',
                }
            ]
        },
        {
            label: 'Ofertas',
            icon: 'pi pi-fw pi-user',
            routerLink: '/offers',
        },
        {
            label: 'Nosotros',
            icon: 'pi pi-fw pi-calendar',
            routerLink: '/about',
        },
        {
          label: 'Contacto',
          icon: 'pi pi-fw pi-power-off',
          routerLink: '/contact',
      }
    ];
}
}
