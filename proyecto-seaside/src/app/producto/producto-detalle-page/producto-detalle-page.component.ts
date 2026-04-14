import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-producto-detalle-page',
  templateUrl: './producto-detalle-page.component.html',
  styleUrls: ['./producto-detalle-page.component.css'],
})
export class ProductoDetallePageComponent implements OnInit {
  producto: Producto | null = null;
  adicionales: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productoService.findById(Number(id)).subscribe({
        next: (resp) => {
          this.producto = resp.product;
          this.adicionales = resp.adicionales;
        },
        error: () => this.router.navigate(['/productos']),
      });
    } else {
      this.router.navigate(['/productos']);
    }
  }

  editar(): void {
    this.router.navigate(['/productos/editar', this.producto!.id]);
  }

  eliminar(): void {
    this.productoService.delete(this.producto!.id).subscribe(() => {
      this.router.navigate(['/productos']);
    });
  }
}
