import { Component } from '@angular/core';

/**
 * Componente de reseñas de clientes en la landing page.
 * Muestra un conjunto fijo de comentarios positivos del restaurante.
 */
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent {
  comments = [
    {
      text: 'La comida es deliciosa y se nota la frescura de los ingredientes',
      author: 'María Perez',
    },

    {
      text: 'Excelente atención y un ambiente muy agradable',
      author: 'Lorena Torres',
    },

    {
      text: 'Un lugar acogedor con sabores auténticos del mar.',
      author: 'Juan Rodriguez',
    },
  ];
}
