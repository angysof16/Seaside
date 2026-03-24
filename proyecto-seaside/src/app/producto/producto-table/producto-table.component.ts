import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-producto-table',
  templateUrl: './producto-table.component.html',
  styleUrls: ['./producto-table.component.css'],
})
export class ProductoTableComponent implements OnInit {

  seleccionado!: Producto;
  productoEditar: Producto | null = null;
  productList: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productList = this.productoService.findAll();
  }

  mostrarProducto(producto: Producto): void {
    // Toggle: if same product is clicked again, hide it
    if (this.seleccionado?.id === producto.id) {
      this.seleccionado = null!;
    } else {
      this.seleccionado = { ...producto };
    }
  }

  agregarProducto(producto: Producto): void {
    // Give it a proper sequential id
    const maxId = this.productList.reduce((max, p) => Math.max(max, p.id), 0);
    producto.id = maxId + 1;
    this.productList = [...this.productList, producto];
  }

  editarProducto(producto: Producto): void {
    this.productoEditar = { ...producto };
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  actualizarProducto(producto: Producto): void {
    const index = this.productList.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      // Immutable update so Angular detects the change
      const updated = [...this.productList];
      updated[index] = { ...producto };
      this.productList = updated;
    }
    this.productoEditar = null;
    // Clear detail if the updated product is currently shown
    if (this.seleccionado?.id === producto.id) {
      this.seleccionado = { ...producto };
    }
  }

  eliminarProducto(producto: Producto): void {
    this.productList = this.productList.filter(p => p.id !== producto.id);
    // Clear detail if deleted product was selected
    if (this.seleccionado?.id === producto.id) {
      this.seleccionado = null!;
    }
  }
}