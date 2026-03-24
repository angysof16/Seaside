import { Component } from '@angular/core';
import { Producto } from '../producto';

@Component({
  selector: 'app-producto-table',
  templateUrl: './producto-table.component.html',
  styleUrls: ['./producto-table.component.css'],
})
export class ProductoTableComponent {
  seleccionado!: Producto;
  productoEditar: Producto | null = null;

  productList: Producto[] = [
    {
      id: 1,
      nombre: 'Ceviche SeaSide',
      descripcion:
        'Ceviche fresco de mariscos con cítricos, cebolla morada y toque especial de la casa.',
      precio: 38.99,
      categoria: 'Platos Fuertes',
      imagenUrl: 'https://images.unsplash.com/photo-1604908176997-4310b6b4f0c5',
      tiempoPreparacion: 20,
      tieneAlergenos: true,
      descripcionAlergenos: 'Contiene mariscos y cítricos.',
    },
    {
      id: 2,
      nombre: 'Langosta Thermidor',
      descripcion:
        'Langosta gratinada en salsa cremosa con queso y especias finas.',
      precio: 89.99,
      categoria: 'Platos Fuertes',
      imagenUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae',
      tiempoPreparacion: 35,
      tieneAlergenos: true,
      descripcionAlergenos:
        'Contiene mariscos, lácteos y puede contener vino de cocina.',
    },
    {
      id: 3,
      nombre: 'Paella SeaSide',
      descripcion:
        'Paella especial con arroz, mariscos frescos, vegetales y sazón mediterránea.',
      precio: 54.99,
      categoria: 'Platos Fuertes',
      imagenUrl: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b',
      tiempoPreparacion: 30,
      tieneAlergenos: true,
      descripcionAlergenos: 'Contiene mariscos y puede contener pescado.',
    },
    {
      id: 4,
      nombre: 'Bogavante a la Mantequilla',
      descripcion:
        'Bogavante cocinado en mantequilla de hierbas con acabado suave y aromático.',
      precio: 95.99,
      categoria: 'Platos Fuertes',
      imagenUrl: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62',
      tiempoPreparacion: 40,
      tieneAlergenos: true,
      descripcionAlergenos: 'Contiene mariscos y lácteos.',
    },
    {
      id: 5,
      nombre: 'Camarones al Ajillo',
      descripcion:
        'Camarones salteados en mantequilla, ajo y perejil con sabor intenso.',
      precio: 26.99,
      categoria: 'Entradas',
      imagenUrl: 'https://images.unsplash.com/photo-1563379091339-03246963d29d',
      tiempoPreparacion: 15,
      tieneAlergenos: true,
      descripcionAlergenos: 'Contiene mariscos y lácteos.',
    },
    {
      id: 6,
      nombre: 'Aros de Calamar',
      descripcion:
        'Aros de calamar crujientes acompañados de salsa tártara o alioli.',
      precio: 22.99,
      categoria: 'Entradas',
      imagenUrl: 'https://images.unsplash.com/photo-1625943555419-56a2cb596640',
      tiempoPreparacion: 12,
      tieneAlergenos: true,
      descripcionAlergenos: 'Contiene mariscos, gluten y huevo.',
    },
    {
      id: 7,
      nombre: 'Tacos de Pescado Baja Style',
      descripcion:
        'Tacos de pescado apanado con repollo, salsa cremosa y limón.',
      precio: 24.99,
      categoria: 'Entradas',
      imagenUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85',
      tiempoPreparacion: 18,
      tieneAlergenos: true,
      descripcionAlergenos: 'Contiene pescado, gluten y lácteos.',
    },
    {
      id: 8,
      nombre: 'Patacones con Hogao',
      descripcion:
        'Patacones crocantes servidos con hogao tradicional colombiano.',
      precio: 12.99,
      categoria: 'Acompañamientos',
      imagenUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950',
      tiempoPreparacion: 10,
      tieneAlergenos: false,
      descripcionAlergenos: 'No contiene alérgenos comunes declarados.',
    },
    {
      id: 9,
      nombre: 'Arroz de Coco',
      descripcion:
        'Arroz suave y aromático cocinado con leche de coco al estilo caribeño.',
      precio: 11.99,
      categoria: 'Acompañamientos',
      imagenUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19',
      tiempoPreparacion: 15,
      tieneAlergenos: false,
      descripcionAlergenos: 'No contiene alérgenos comunes declarados.',
    },
    {
      id: 10,
      nombre: 'Ensalada de la Casa',
      descripcion:
        'Ensalada fresca con mezcla de hojas verdes, vegetales de temporada y aderezo especial.',
      precio: 13.99,
      categoria: 'Acompañamientos',
      imagenUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
      tiempoPreparacion: 8,
      tieneAlergenos: false,
      descripcionAlergenos:
        'Puede contener trazas de frutos secos según preparación.',
    },
    {
      id: 11,
      nombre: 'Volcán de Arequipe',
      descripcion:
        'Bizcocho tibio con centro líquido de arequipe, ideal para los amantes del dulce.',
      precio: 16.99,
      categoria: 'Postres',
      imagenUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
      tiempoPreparacion: 14,
      tieneAlergenos: true,
      descripcionAlergenos: 'Contiene gluten, huevo y lácteos.',
    },
    {
      id: 12,
      nombre: 'Cheesecake de Frutos Rojos',
      descripcion:
        'Cheesecake cremoso con cobertura de frutos rojos y base crocante.',
      precio: 17.99,
      categoria: 'Postres',
      imagenUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad',
      tiempoPreparacion: 10,
      tieneAlergenos: true,
      descripcionAlergenos: 'Contiene lácteos, gluten y huevo.',
    },
    {
      id: 13,
      nombre: 'Pie de Limón',
      descripcion:
        'Postre clásico con crema de limón y merengue suave sobre base crocante.',
      precio: 15.99,
      categoria: 'Postres',
      imagenUrl: 'https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5',
      tiempoPreparacion: 10,
      tieneAlergenos: true,
      descripcionAlergenos: 'Contiene gluten, huevo y lácteos.',
    },
    {
      id: 14,
      nombre: 'Limonada de Coco',
      descripcion: 'Bebida refrescante de coco y limón, cremosa y tropical.',
      precio: 9.99,
      categoria: 'Bebidas',
      imagenUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
      tiempoPreparacion: 5,
      tieneAlergenos: true,
      descripcionAlergenos: 'Contiene coco.',
    },
    {
      id: 15,
      nombre: 'Jugos Naturales',
      descripcion:
        'Selección de jugos naturales preparados al momento con frutas frescas.',
      precio: 8.99,
      categoria: 'Bebidas',
      imagenUrl: 'https://images.unsplash.com/photo-1546173159-315724a31696',
      tiempoPreparacion: 5,
      tieneAlergenos: false,
      descripcionAlergenos: 'Puede variar según la fruta seleccionada.',
    },
    {
      id: 16,
      nombre: 'Té Helado de la Casa',
      descripcion:
        'Té helado artesanal con toque cítrico y endulzado balanceado.',
      precio: 7.99,
      categoria: 'Bebidas',
      imagenUrl: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87',
      tiempoPreparacion: 4,
      tieneAlergenos: false,
      descripcionAlergenos: 'No contiene alérgenos comunes declarados.',
    },
  ];

  mostrarProducto(producto: Producto) {
    this.seleccionado = producto;
  }

  agregarProducto(producto: Producto) {
    this.productList.push(producto);
  }

  editarProducto(producto: Producto) {
    this.productoEditar = Object.assign({}, producto);
  }

  actualizarProducto(producto: Producto) {
    const index = this.productList.findIndex((p) => p.id === producto.id);
    if (index !== -1) {
      this.productList[index] = producto;
    }
    this.productoEditar = null;
  }

  eliminarProducto(producto: Producto) {
    var index = this.productList.indexOf(producto);
    this.productList.splice(index, 1);
  }
}
