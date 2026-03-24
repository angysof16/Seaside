import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Producto } from '../producto';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css'],
})
export class ProductoFormComponent implements OnChanges {
  @Input() productoEditar: Producto | null = null;

  @Output()
  addProductoEvent = new EventEmitter<Producto>();

  @Output()
  updateProductoEvent = new EventEmitter<Producto>();

  sendProducto!: Producto;
  editando = false;

  formProducto: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    categoriaId: 0,
    tiempoMinutos: 0,
    tieneAlergenos: false,
    descripcionAlergenos: '',
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productoEditar'] && this.productoEditar) {
      this.formProducto = Object.assign({}, this.productoEditar);
      this.editando = true;
    }
  }

  addProducto(form: any) {
    this.sendProducto = Object.assign({}, this.formProducto);

    if (this.editando) {
      this.updateProductoEvent.emit(this.sendProducto);
      this.editando = false;
    } else {
      this.addProductoEvent.emit(this.sendProducto);
    }

    this.resetForm();
  }

  cancelarEdicion() {
    this.editando = false;
    this.resetForm();
  }

  private resetForm() {
    this.formProducto = {
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      categoriaId: 0,
      tiempoMinutos: 0,
      tieneAlergenos: false,
      descripcionAlergenos: '',
    };
  }
}
