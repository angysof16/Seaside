import { Component, Input } from '@angular/core';
import { Producto } from '../producto';

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
