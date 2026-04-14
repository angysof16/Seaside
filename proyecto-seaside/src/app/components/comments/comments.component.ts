import { Component } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  comments = [

    {
      text: "La comida es deliciosa y se nota la frescura de los ingredientes",
      author: "María Perez"
    },

    {
      text: "Excelente atención y un ambiente muy agradable",
      author: "Lorena Torres"
    },

    {
      text: "Un lugar acogedor con sabores auténticos del mar.",
      author: "Juan Rodriguez"
    }

  ];

}