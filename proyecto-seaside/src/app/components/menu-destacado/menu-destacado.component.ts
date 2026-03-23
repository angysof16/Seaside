import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-destacado',
  templateUrl: './menu-destacado.component.html',
  styleUrls: ['./menu-destacado.component.css']
})
export class MenuDestacadoComponent {
    menuItems = [

    {
    image: 'assets/IMGS/menuHighlight1.jpeg',
    title: 'Ceviche SeaSide',
    description:
    'Pescado fresco marinado en limón con cebolla morada, cilantro y el toque especial de la casa.'
    },

    {
    image: 'assets/IMGS/menuHighlight2.jpeg',
    title: 'Arroz Marinero Especial',
    description:
    'Arroz preparado con camarones, calamares y especias que resaltan el sabor del mar.'
    },

    {
    image: 'assets/IMGS/menuHighlight3.jpeg',
    title: 'Picada Marina SeaSide',
    description:
    'Selección de mariscos fritos, ideal para compartir.'
    }

    ];

}
