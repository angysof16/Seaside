import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Operador } from '../operador';

@Component({
  selector: 'app-operador-detalle',
  templateUrl: './operador-detalle.component.html',
  styleUrls: ['./operador-detalle.component.css'],
})
export class OperadorDetalleComponent implements OnInit, OnChanges, OnDestroy {
  @Input() seleccionado!: Operador;

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
