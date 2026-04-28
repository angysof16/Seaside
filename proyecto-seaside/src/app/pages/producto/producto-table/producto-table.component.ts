import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-producto-table',
  templateUrl: './producto-table.component.html',
  styleUrls: ['./producto-table.component.css'],
})
export class ProductoTableComponent implements OnInit {
  productList: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService
      .findAll()
      .subscribe((list) => (this.productList = list));
  }

  verDetalle(producto: Producto): void {
    this.router.navigate(['/productos', producto.id]);
  }

  editarProducto(producto: Producto): void {
    this.router.navigate(['/productos/editar', producto.id]);
  }

  eliminarProducto(producto: Producto): void {
    this.productoService
      .delete(producto.id)
      .subscribe(() => this.cargarProductos());
  }
}
