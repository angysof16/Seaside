import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoCl } from 'src/app/model/producto-cl';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-producto-table',
  templateUrl: './producto-table.component.html',
  styleUrls: ['./producto-table.component.css'],
})
export class ProductoTableComponent {
  seleccionado!: Producto;
  productoEditar: Producto | null = null;

  productList!: Producto[];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productList = this.productoService.findAll();
  }

  mostrarProducto(producto: Producto) {
    this.seleccionado = producto;
  }

  agregarProducto(producto: Producto) {
    this.productList.push(producto);
  }

  editarProducto(producto: Producto) {
    this.productoEditar = Object.assign({}, producto);
  }

  actualizarProducto(producto: Producto) {
    const index = this.productList.findIndex((p) => p.id === producto.id);
    if (index !== -1) {
      this.productList[index] = producto;
    }
    this.productoEditar = null;
  }

  eliminarProducto(producto: Producto) {
    var index = this.productList.indexOf(producto);
    this.productList.splice(index, 1);
  }
}
