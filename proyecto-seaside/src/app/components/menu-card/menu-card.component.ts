import { Component, Input } from '@angular/core';

/**
 * Tarjeta de presentación de un plato del menú.
 * Recibe imagen, título, descripción e id del producto mediante @Input.
 */
@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css'],
})
export class MenuCardComponent {
  @Input() productId!: number;

  @Input() image!: string;

  @Input() title!: string;

  @Input() description!: string;
}
