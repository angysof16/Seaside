import { Component, Input } from '@angular/core';
import { Producto } from '../producto';

/**
 * Componente de presentación del detalle de un producto.
 * Recibe el producto a mostrar mediante @Input desde la página contenedora.
 */
@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css'],
})
export class ProductoDetalleComponent {
  @Input()
  seleccionado!: Producto;

  constructor() {}

  ngOnInit(): void {
    console.log('Initialize on Detail');
  }

  ngOnChanges(): void {
    console.log('Changes on Detail');
  }

  ngOnDestroy(): void {
    console.log('Destroy on Detail');
  }
}
