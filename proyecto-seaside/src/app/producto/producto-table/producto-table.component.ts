import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoCl } from 'src/app/model/producto-cl';

@Component({
  selector: 'app-producto-table',
  templateUrl: './producto-table.component.html',
  styleUrls: ['./producto-table.component.css'],
})
export class ProductoTableComponent {
  seleccionado!: Producto;
  productoEditar: Producto | null = null;

  productList: ProductoCl[] = [
    new ProductoCl(
      1,
      'Ceviche SeaSide',
      'Ceviche fresco de mariscos con cítricos, cebolla morada y toque especial de la casa.',
      38.99,
      'Platos Fuertes',
      20,
      true,
      'Contiene mariscos y cítricos.',
      'https://images.unsplash.com/photo-1604908176997-4310b6b4f0c5',
    ),
    new ProductoCl(
      2,
      'Langosta Thermidor',
      'Langosta gratinada en salsa cremosa con queso y especias finas.',
      89.99,
      'Platos Fuertes',
      35,
      true,
      'Contiene mariscos, lácteos y puede contener vino de cocina.',
      'https://images.unsplash.com/photo-1559847844-5315695dadae',
    ),
    new ProductoCl(
      3,
      'Paella SeaSide',
      'Paella especial con arroz, mariscos frescos, vegetales y sazón mediterránea.',
      54.99,
      'Platos Fuertes',
      30,
      true,
      'Contiene mariscos y puede contener pescado.',
      'https://images.unsplash.com/photo-1515443961218-a51367888e4b',
    ),
    new ProductoCl(
      4,
      'Bogavante a la Mantequilla',
      'Bogavante cocinado en mantequilla de hierbas con acabado suave y aromático.',
      95.99,
      'Platos Fuertes',
      40,
      true,
      'Contiene mariscos y lácteos.',
      'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62',
    ),
    new ProductoCl(
      5,
      'Camarones al Ajillo',
      'Camarones salteados en mantequilla, ajo y perejil con sabor intenso.',
      26.99,
      'Entradas',
      15,
      true,
      'Contiene mariscos y lácteos.',
      'https://images.unsplash.com/photo-1563379091339-03246963d29d',
    ),
    new ProductoCl(
      6,
      'Aros de Calamar',
      'Aros de calamar crujientes acompañados de salsa tártara o alioli.',
      22.99,
      'Entradas',
      12,
      true,
      'Contiene mariscos, gluten y huevo.',
      'https://images.unsplash.com/photo-1625943555419-56a2cb596640',
    ),
    new ProductoCl(
      7,
      'Tacos de Pescado Baja Style',
      'Tacos de pescado apanado con repollo, salsa cremosa y limón.',
      24.99,
      'Entradas',
      18,
      true,
      'Contiene pescado, gluten y lácteos.',
      'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85',
    ),
    new ProductoCl(
      8,
      'Patacones con Hogao',
      'Patacones crocantes servidos con hogao tradicional colombiano.',
      12.99,
      'Acompañamientos',
      10,
      false,
      'No contiene alérgenos comunes declarados.',
      'https://images.unsplash.com/photo-1601050690597-df0568f70950',
    ),
    new ProductoCl(
      9,
      'Arroz de Coco',
      'Arroz suave y aromático cocinado con leche de coco al estilo caribeño.',
      11.99,
      'Acompañamientos',
      15,
      false,
      'No contiene alérgenos comunes declarados.',
      'https://images.unsplash.com/photo-1512058564366-18510be2db19',
    ),
    new ProductoCl(
      10,
      'Ensalada de la Casa',
      'Ensalada fresca con mezcla de hojas verdes, vegetales de temporada y aderezo especial.',
      13.99,
      'Acompañamientos',
      8,
      false,
      'Puede contener trazas de frutos secos según preparación.',
      'https://images.unsplash.com/photo-1546793665-c74683f339c1',
    ),
    new ProductoCl(
      11,
      'Volcán de Arequipe',
      'Bizcocho tibio con centro líquido de arequipe, ideal para los amantes del dulce.',
      16.99,
      'Postres',
      14,
      true,
      'Contiene gluten, huevo y lácteos.',
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
    ),
    new ProductoCl(
      12,
      'Cheesecake de Frutos Rojos',
      'Cheesecake cremoso con base de galleta y cobertura de frutos rojos.',
      18.99,
      'Postres',
      20,
      true,
      'Contiene gluten, huevo y lácteos.',
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
    ),
    new ProductoCl(
      13,
      'Pie de Limón',
      'Postre clásico con crema de limón y merengue suave sobre base crocante.',
      15.99,
      'Postres',
      18,
      true,
      'Contiene gluten, huevo y lácteos.',
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
    ),
    new ProductoCl(
      14,
      'Tacos de Pescado Baja Style',
      'Tacos de pescado apanado con repollo, salsa cremosa y limón.',
      24.99,
      'Entradas',
      18,
      true,
      'Contiene pescado, gluten y lácteos.',
      'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85',
    ),
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
