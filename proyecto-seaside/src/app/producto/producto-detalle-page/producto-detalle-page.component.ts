import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
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
    private location: Location,
    private productoService: ProductoService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productoService.findById(Number(id)).subscribe({
        next: (resp) => {
          this.producto = resp.product;
          // La API ya devuelve los adicionales filtrados por la relación ManyToMany
          // del producto, pero el DataLoader asigna adicionales por categoría
          // mediante la relación en Adicionales.categoria. Aquí usamos los que
          // vienen del endpoint para mantener consistencia.
          this.adicionales = resp.adicionales ?? [];
        },
        error: () => this.router.navigate(['/menu']),
      });
    } else {
      this.router.navigate(['/menu']);
    }
  }

  goBack(): void {
    this.location.back();
  }
}