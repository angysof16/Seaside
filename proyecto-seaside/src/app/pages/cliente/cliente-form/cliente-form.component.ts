// cliente-form.component.ts
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../../model/cliente-cl';

/**
 * Formulario reactivo de creación y edición de clientes.
 * Detecta si hay un cliente a editar mediante @Input y emite el resultado
 * al componente padre mediante @Output.
 */
@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnChanges {
  @Input() clienteEditar: Cliente | null = null;
  @Output() addClienteEvent = new EventEmitter<Cliente>();
  @Output() updateClienteEvent = new EventEmitter<Cliente>();
  @Output() cancelarEvent = new EventEmitter<void>();

  editando = false;
  formCliente: Cliente = this.emptyForm();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clienteEditar'] && this.clienteEditar) {
      this.formCliente = { ...this.clienteEditar };
      this.editando = true;
    }
  }

  guardar(form: NgForm): void {
    if (form.invalid) return;
    const cliente: Cliente = { ...this.formCliente };
    if (this.editando) {
      this.updateClienteEvent.emit(cliente);
      this.editando = false;
    } else {
      cliente.id = 0;
      this.addClienteEvent.emit(cliente);
    }
    this.resetForm(form);
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.formCliente = this.emptyForm();
    this.cancelarEvent.emit();
  }

  private resetForm(form: NgForm): void {
    this.formCliente = this.emptyForm();
    form.resetForm(this.formCliente);
  }

  private emptyForm(): Cliente {
    return {
      id: 0,
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      direccion: '',
    };
  }
}
