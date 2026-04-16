import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Operador } from '../operador';

@Component({
  selector: 'app-operador-form',
  templateUrl: './operador-form.component.html',
  styleUrls: ['./operador-form.component.css'],
})
export class OperadorFormComponent implements OnChanges {
  @Input() operadorEditar: Operador | null = null;
  @Output() addOperadorEvent = new EventEmitter<Operador>();
  @Output() updateOperadorEvent = new EventEmitter<Operador>();
  @Output() cancelarEvent = new EventEmitter<void>();

  editando = false;
  formOperador: Operador = this.emptyForm();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['operadorEditar'] && this.operadorEditar) {
      this.formOperador = { ...this.operadorEditar };
      this.editando = true;
    }
  }

  guardar(form: NgForm): void {
    if (form.invalid) return;
    const operador: Operador = { ...this.formOperador };
    if (this.editando) {
      this.updateOperadorEvent.emit(operador);
      this.editando = false;
    } else {
      operador.id = 0;
      this.addOperadorEvent.emit(operador);
    }
    this.resetForm(form);
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.formOperador = this.emptyForm();
    this.cancelarEvent.emit();
  }

  private resetForm(form: NgForm): void {
    this.formOperador = this.emptyForm();
    form.resetForm(this.formOperador);
  }

  private emptyForm(): Operador {
    return { id: 0, nombre: '', usuario: '', contrasena: '' };
  }
}
