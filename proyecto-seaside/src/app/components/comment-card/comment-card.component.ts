import { Component, Input } from '@angular/core';

/**
 * Tarjeta de reseña individual.
 * Recibe el texto del comentario y el nombre del autor mediante @Input.
 */
@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css'],
})
export class CommentCardComponent {
  @Input() text!: string;

  @Input() author!: string;
}
