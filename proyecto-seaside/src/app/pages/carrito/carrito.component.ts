// src/app/pages/carrito/carrito.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService, ItemCarrito } from '../../service/carrito.service';
import { AuthService } from '../../service/auth.service';
import { PedidoService } from '../../service/pedido.service';
import { CrearPedidoRequest } from '../../model/crear-pedido-request';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  items: ItemCarrito[] = [];
  enviando = false;
  error = '';
  exito = false;
  pedidoId: number | null = null;

  constructor(
    public carritoService: CarritoService,
    public authService: AuthService,
    private pedidoService: PedidoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carritoService.items$.subscribe((items) => (this.items = items));
  }

  incrementar(item: ItemCarrito): void {
    this.carritoService.actualizarCantidad(item.producto.id, item.cantidad + 1);
  }

  decrementar(item: ItemCarrito): void {
    this.carritoService.actualizarCantidad(item.producto.id, item.cantidad - 1);
  }

  quitar(productoId: number): void {
    this.carritoService.quitarProducto(productoId);
  }

  vaciar(): void {
    this.carritoService.vaciarCarrito();
  }

  get total(): number {
    return this.carritoService.totalPrecio;
  }

  confirmarPedido(): void {
    const cliente = this.authService.currentCliente;
    if (!cliente) {
      this.router.navigate(['/login']);
      return;
    }

    this.enviando = true;
    this.error = '';

    const request: CrearPedidoRequest = {
      clienteId: cliente.id,
      items: this.items.map((i) => ({
        productoId: i.producto.id,
        cantidad: i.cantidad,
        adicionales: [],
      })),
    };

    this.pedidoService.crear(request).subscribe({
      next: (res) => {
        this.enviando = false;
        this.exito = true;
        this.pedidoId = res?.id ?? null;
        this.carritoService.vaciarCarrito();
      },
      error: (err) => {
        this.enviando = false;
        this.error =
          err?.error?.error || 'Error al crear el pedido. Intenta de nuevo.';
      },
    });
  }

  irAHacerPedido(): void {
    this.router.navigate(['/pedido/nuevo']);
  }

  irAlPedido(): void {
    if (this.pedidoId) {
      this.router.navigate(['/pedidos', this.pedidoId]);
    }
  }
}