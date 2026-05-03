import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from 'src/app/service/producto.service';

/**
 * Componente para crear un nuevo producto.
 * Llama al servicio al guardar y redirige a la lista de productos.
 */
@Component({
  selector: 'app-producto-crear',
  templateUrl: './producto-crear.component.html',
  styleUrls: ['./producto-crear.component.css'],
})
export class ProductoCrearComponent {
  constructor(
    private router: Router,
    private productoService: ProductoService,
  ) {}

  onGuardar(producto: Producto): void {
    console.log('Enviando producto:', producto);
    this.productoService.add(producto).subscribe({
      next: () => {
        console.log('Producto creado correctamente');
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        console.error('Error al crear producto:', err);
      },
    });
  }

  onCancelar(): void {
    this.router.navigate(['/productos']);
  }
}
