import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from 'src/app/service/producto.service';

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
    this.productoService.add(producto).subscribe(() => {
      this.router.navigate(['/productos']);
    });
  }

  onCancelar(): void {
    this.router.navigate(['/productos']);
  }
}
