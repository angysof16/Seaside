import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from 'src/app/service/producto.service';
import { AdicionalService } from 'src/app/service/adicional.service';
import { AdicionalesCl } from 'src/app/model/adicionales-cl';

@Component({
  selector: 'app-producto-table',
  templateUrl: './producto-table.component.html',
  styleUrls: ['./producto-table.component.css'],
})
export class ProductoTableComponent implements OnInit {
  productList: Producto[] = [];

  // Adicionales management
  allAdicionales: AdicionalesCl[] = [];
  editingAdicionalesFor: Producto | null = null;
  currentAdicionalIds: Set<number> = new Set();

  constructor(
    private productoService: ProductoService,
    private adicionalService: AdicionalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.adicionalService.findAll().subscribe({
      next: (list) => (this.allAdicionales = list),
    });
  }

  cargarProductos(): void {
    this.productoService.findAll().subscribe({
      next: (list) => {
        console.log('Productos recibidos:', list);
        this.productList = list;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      },
    });
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

  // ── Adicionales ──────────────────────────────────────────
  openAdicionales(producto: Producto): void {
    this.editingAdicionalesFor = producto;
    this.currentAdicionalIds = new Set();
    this.productoService.getAdicionales(producto.id).subscribe({
      next: (list) => {
        this.currentAdicionalIds = new Set(list.map((a) => a.id));
      },
    });
  }

  toggleAdicional(id: number): void {
    if (this.currentAdicionalIds.has(id)) {
      this.currentAdicionalIds.delete(id);
    } else {
      this.currentAdicionalIds.add(id);
    }
  }

  saveAdicionales(): void {
    if (!this.editingAdicionalesFor) return;
    this.productoService
      .updateAdicionales(
        this.editingAdicionalesFor.id,
        Array.from(this.currentAdicionalIds),
      )
      .subscribe({
        next: () => (this.editingAdicionalesFor = null),
        error: (err) => console.error('Error saving adicionales:', err),
      });
  }

  cancelAdicionales(): void {
    this.editingAdicionalesFor = null;
  }
}
