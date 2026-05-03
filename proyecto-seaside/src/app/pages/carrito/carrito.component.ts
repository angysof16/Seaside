// src/app/pages/carrito/carrito.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService, ItemCarrito } from '../../service/carrito.service';
import { AuthService } from '../../service/auth.service';

/**
 * Página del carrito de compras.
 * Muestra los ítems seleccionados y permite modificar cantidades,
 * eliminar productos o vaciar el carrito antes de ir a confirmar el pedido.
 */
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  items: ItemCarrito[] = [];

  constructor(
    public carritoService: CarritoService,
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carritoService.estado$.subscribe((estado) => {
      this.items = estado.items;
    });
  }

  get total(): number {
    return this.carritoService.totalPrecio;
  }

  get paso(): number {
    return this.carritoService.estado.paso;
  }

  incrementar(item: ItemCarrito): void {
    item.cantidad++;
    this.carritoService.guardarEstado(this.carritoService.estado);
  }

  decrementar(item: ItemCarrito): void {
    if (item.cantidad > 1) {
      item.cantidad--;
      this.carritoService.guardarEstado(this.carritoService.estado);
    }
  }

  quitar(productoId: number): void {
    const estado = this.carritoService.estado;
    estado.items = estado.items.filter((i) => i.productoId !== productoId);
    if (estado.platoPrincipalId === productoId) {
      estado.platoPrincipalId = null;
      estado.paso = 1;
    }
    this.carritoService.guardarEstado(estado);
  }

  vaciar(): void {
    this.carritoService.vaciarCarrito();
  }

  continuarPedido(): void {
    this.router.navigate(['/pedido/nuevo']);
  }

  irAHacerPedido(): void {
    this.router.navigate(['/pedido/nuevo']);
  }
}
