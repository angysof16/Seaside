// cliente-detalle.component.ts
import { Component, Input } from '@angular/core';
import { Cliente } from '../../../model/cliente-cl';

/**
 * Componente de presentación del detalle de un cliente.
 * Recibe el cliente a mostrar mediante @Input desde la página contenedora.
 */
@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.css'],
})
export class ClienteDetalleComponent {
  @Input() seleccionado!: Cliente;
}
