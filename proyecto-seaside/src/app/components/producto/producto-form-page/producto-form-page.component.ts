import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-producto-form-page',
  templateUrl: './producto-form-page.component.html',
  styleUrls: ['./producto-form-page.component.css'],
})
export class ProductoFormPageComponent implements OnInit {
  productoEditar: Producto | null = null;
  modoEdicion = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productoService.findById(Number(id)).subscribe((resp) => {
        this.productoEditar = { ...resp.product };
        this.modoEdicion = true;
      });
    }
  }

  onGuardar(producto: Producto): void {
    this.productoService.add(producto).subscribe(() => {
      this.router.navigate(['/productos']);
    });
  }

  onActualizar(producto: Producto): void {
    this.productoService.update(producto).subscribe(() => {
      this.router.navigate(['/productos']);
    });
  }

  onCancelar(): void {
    this.router.navigate(['/productos']);
  }
}
