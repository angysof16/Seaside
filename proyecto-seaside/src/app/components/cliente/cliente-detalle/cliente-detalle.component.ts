// cliente-detalle.component.ts
import { Component, Input } from '@angular/core';
import { Cliente } from '../../../model/cliente-cl';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.css'],
})
export class ClienteDetalleComponent {
  @Input() seleccionado!: Cliente;
}
