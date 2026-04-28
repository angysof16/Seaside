// src/app/pages/pedido-crear/pedido-crear.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../service/producto.service';
import { PedidoService } from '../../service/pedido.service';
import { AuthService } from '../../service/auth.service';
import {
  CarritoService,
  ItemCarrito,
  EstadoCarrito,
} from '../../service/carrito.service';
import { Producto } from '../../components/producto/producto';
import { AdicionalesCl } from '../../model/adicionales-cl';
import { CrearPedidoRequest } from '../../model/crear-pedido-request';
import { Subscription } from 'rxjs';

/**
 * Página de creación de pedidos.
 * Guia al cliente en 3 pasos: selección del plato principal,
 * elección de acompañamientos/adicionales y confirmación del pedido.
 * Persiste el estado del carrito en localStorage para retomar después.
 */
@Component({
  selector: 'app-pedido-crear',
  templateUrl: './pedido-crear.component.html',
  styleUrls: ['./pedido-crear.component.css'],
})
export class PedidoCrearComponent implements OnInit, OnDestroy {
  paso = 1;
  platoPrincipal: Producto | null = null;
  items: ItemCarrito[] = [];
  productos: Producto[] = [];
  enviando = false;
  error = '';
  exito = false;
  pedidoConfirmado = false;
  pedidoId: number | null = null;

  private sub: Subscription | null = null;

  constructor(
    private productoService: ProductoService,
    private pedidoService: PedidoService,
    public authService: AuthService,
    public carritoService: CarritoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.productoService.findAll().subscribe({
      next: (p) => {
        this.productos = p;
        this.restaurarEstado();
      },
      error: () => (this.error = 'No se pudieron cargar los productos.'),
    });

    this.sub = this.carritoService.estado$.subscribe();
  }

  ngOnDestroy(): void {
    if (!this.pedidoConfirmado) {
      this.persistirEstado();
    }
    this.sub?.unsubscribe();
  }

  private restaurarEstado(): void {
    const estado = this.carritoService.estado;
    if (estado.items.length === 0) return;
    this.paso = estado.paso;
    this.items = estado.items;
    if (estado.platoPrincipalId) {
      this.platoPrincipal =
        this.productos.find((p) => p.id === estado.platoPrincipalId) ?? null;
    }
  }

  private persistirEstado(): void {
    const estado: EstadoCarrito = {
      paso: this.paso,
      platoPrincipalId: this.platoPrincipal?.id ?? null,
      items: this.items,
    };
    this.carritoService.guardarEstado(estado);
  }

  seleccionarPlatoPrincipal(producto: Producto): void {
    this.platoPrincipal = producto;
    this.persistirEstado();
  }

  esPlatoPrincipal(producto: Producto): boolean {
    return this.platoPrincipal?.id === producto.id;
  }

  irPaso2(): void {
    if (!this.platoPrincipal) return;
    if (!this.items.some((i) => i.productoId === this.platoPrincipal!.id)) {
      this.agregarItem(this.platoPrincipal);
    }
    this.paso = 2;
    this.persistirEstado();
  }

  agregarItem(producto: Producto): void {
    if (this.items.some((i) => i.productoId === producto.id)) return;
    this.items.push({
      productoId: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imageUrl,
      cantidad: 1,
      adicionales: [],
      adicionalesDisponibles: [],
      adicionalesCargados: false,
      mostrarAdicionales: false,
      cargandoAdicionales: false,
    });
    this.persistirEstado();
  }

  estaEnPedido(producto: Producto): boolean {
    return this.items.some((i) => i.productoId === producto.id);
  }

  eliminarItem(index: number): void {
    const item = this.items[index];
    if (this.platoPrincipal?.id === item.productoId && this.items.length === 1)
      return;
    this.items.splice(index, 1);
    this.persistirEstado();
  }

  incrementarCantidad(item: ItemCarrito): void {
    item.cantidad++;
    this.persistirEstado();
  }

  decrementarCantidad(item: ItemCarrito): void {
    if (item.cantidad > 1) item.cantidad--;
    this.persistirEstado();
  }

  toggleAdicionales(index: number): void {
    const item = this.items[index];
    item.mostrarAdicionales = !item.mostrarAdicionales;
    if (item.mostrarAdicionales && !item.adicionalesCargados) {
      item.cargandoAdicionales = true;
      this.productoService.getAdicionales(item.productoId).subscribe({
        next: (adicionales) => {
          item.adicionalesDisponibles = adicionales;
          item.adicionalesCargados = true;
          item.cargandoAdicionales = false;
        },
        error: () => {
          item.adicionalesDisponibles = [];
          item.adicionalesCargados = true;
          item.cargandoAdicionales = false;
        },
      });
    }
  }

  isAdicionalSeleccionado(
    item: ItemCarrito,
    adicional: AdicionalesCl,
  ): boolean {
    return item.adicionales.some((a) => a.adicionalId === adicional.id);
  }

  toggleAdicional(item: ItemCarrito, adicional: AdicionalesCl): void {
    const idx = item.adicionales.findIndex(
      (a) => a.adicionalId === adicional.id,
    );
    if (idx >= 0) {
      item.adicionales.splice(idx, 1);
    } else {
      item.adicionales.push({
        adicionalId: adicional.id,
        nombre: adicional.nombre,
        precio: adicional.precio,
        cantidad: 1,
      });
    }
    this.persistirEstado();
  }

  getAdicionalCantidad(item: ItemCarrito, adicionalId: number): number {
    return (
      item.adicionales.find((a) => a.adicionalId === adicionalId)?.cantidad ?? 1
    );
  }

  setAdicionalCantidad(
    item: ItemCarrito,
    adicionalId: number,
    delta: number,
  ): void {
    const a = item.adicionales.find((ad) => ad.adicionalId === adicionalId);
    if (a) {
      a.cantidad = Math.max(1, a.cantidad + delta);
      this.persistirEstado();
    }
  }

  irPaso3(): void {
    if (this.items.length === 0) return;
    this.paso = 3;
    this.persistirEstado();
  }

  irPaso(n: number): void {
    if (n < this.paso) {
      this.paso = n;
      this.persistirEstado();
    }
  }

  calcularSubtotalItem(item: ItemCarrito): number {
    return this.carritoService.calcularSubtotalItem(item);
  }

  calcularTotal(): number {
    return this.carritoService.totalPrecio;
  }

  confirmarPedido(): void {
    if (!this.platoPrincipal) return;
    const cliente = this.authService.currentCliente;
    if (!cliente) return;

    this.enviando = true;
    this.error = '';

    const request: CrearPedidoRequest = {
      clienteId: cliente.id,
      items: this.items.map((item) => ({
        productoId: item.productoId,
        cantidad: item.cantidad,
        adicionales: item.adicionales.map((a) => ({
          adicionalId: a.adicionalId,
          cantidad: a.cantidad,
        })),
      })),
    };

    this.pedidoService.crear(request).subscribe({
      next: (response) => {
        this.enviando = false;
        this.exito = true;
        this.pedidoId = response?.id ?? null;
        this.pedidoConfirmado = true;
        this.carritoService.vaciarCarrito();
      },
      error: (err) => {
        this.enviando = false;
        this.error =
          err?.error?.error ||
          'Error al crear el pedido. Por favor intenta de nuevo.';
      },
    });
  }
}
