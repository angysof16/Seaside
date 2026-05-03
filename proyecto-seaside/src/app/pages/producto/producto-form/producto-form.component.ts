import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Producto } from '../producto';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css'],
})
export class ProductoFormComponent implements OnChanges {
  @Input() productoEditar: Producto | null = null;

  @Output() addProductoEvent = new EventEmitter<Producto>();
  @Output() updateProductoEvent = new EventEmitter<Producto>();
  @Output() cancelarEvent = new EventEmitter<void>();

  editando = false;

  formProducto: Producto = this.emptyForm();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productoEditar'] && this.productoEditar) {
      this.formProducto = { ...this.productoEditar };
      this.editando = true;
    }
  }

  addProducto(form: NgForm): void {
    if (form.invalid) return;

    const producto: Producto = { ...this.formProducto };

    if (this.editando) {
      this.updateProductoEvent.emit(producto);
      this.editando = false;
    } else {
      producto.id = Date.now();
      this.addProductoEvent.emit(producto);
    }

    this.resetForm(form);
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.formProducto = this.emptyForm();
    this.cancelarEvent.emit(); // ← línea nueva
  }

  private resetForm(form: NgForm): void {
    this.formProducto = this.emptyForm();
    form.resetForm(this.formProducto);
  }

  private emptyForm(): Producto {
    return {
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: { id: 1, nombre: '' },
      tiempoMinutos: 0,
      tieneAlergenos: false,
      descripcionAlergenos: '',
      imageUrl: '',
    };
  }
}
