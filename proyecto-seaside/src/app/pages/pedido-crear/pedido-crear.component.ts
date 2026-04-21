import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../service/producto.service';
import { PedidoService } from '../../service/pedido.service';
import { AuthService } from '../../service/auth.service';
import { Producto } from '../../components/producto/producto';
import { AdicionalesCl } from '../../model/adicionales-cl';
import { CrearPedidoRequest } from '../../model/crear-pedido-request';

interface AdicionalSeleccionado {
  adicionalId: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface ItemEnPedido {
  productoId: number;
  nombre: string;
  precio: number;
  imagen?: string;
  cantidad: number;
  adicionales: AdicionalSeleccionado[];
  adicionalesDisponibles: AdicionalesCl[];
  adicionalesCargados: boolean;
  mostrarAdicionales: boolean;
  cargandoAdicionales: boolean;
}

@Component({
  selector: 'app-pedido-crear',
  templateUrl: './pedido-crear.component.html',
  styleUrls: ['./pedido-crear.component.css'],
})
export class PedidoCrearComponent implements OnInit {
  paso = 1;
  productos: Producto[] = [];
  platoPrincipal: Producto | null = null;
  items: ItemEnPedido[] = [];
  fechaEntrega = '';
  fechaMinima = '';
  enviando = false;
  error = '';
  exito = false;
  pedidoId: number | null = null;

  constructor(
    private productoService: ProductoService,
    private pedidoService: PedidoService,
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.fechaMinima = tomorrow.toISOString().split('T')[0];
    this.fechaEntrega = this.fechaMinima;

    this.productoService.findAll().subscribe({
      next: (p) => (this.productos = p),
      error: () => (this.error = 'No se pudieron cargar los productos.'),
    });
  }

  // ── Paso 1 ──────────────────────────────────────────────────────────────

  seleccionarPlatoPrincipal(producto: Producto): void {
    this.platoPrincipal = producto;
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
  }

  // ── Paso 2 ──────────────────────────────────────────────────────────────

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
  }

  estaEnPedido(producto: Producto): boolean {
    return this.items.some((i) => i.productoId === producto.id);
  }

  eliminarItem(index: number): void {
    const item = this.items[index];
    if (this.platoPrincipal?.id === item.productoId && this.items.length === 1)
      return;
    this.items.splice(index, 1);
  }

  incrementarCantidad(item: ItemEnPedido): void {
    item.cantidad++;
  }

  decrementarCantidad(item: ItemEnPedido): void {
    if (item.cantidad > 1) item.cantidad--;
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
    item: ItemEnPedido,
    adicional: AdicionalesCl,
  ): boolean {
    return item.adicionales.some((a) => a.adicionalId === adicional.id);
  }

  toggleAdicional(item: ItemEnPedido, adicional: AdicionalesCl): void {
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
  }

  getAdicionalCantidad(item: ItemEnPedido, adicionalId: number): number {
    return (
      item.adicionales.find((a) => a.adicionalId === adicionalId)?.cantidad ?? 1
    );
  }

  setAdicionalCantidad(
    item: ItemEnPedido,
    adicionalId: number,
    delta: number,
  ): void {
    const a = item.adicionales.find((ad) => ad.adicionalId === adicionalId);
    if (a) a.cantidad = Math.max(1, a.cantidad + delta);
  }

  irPaso3(): void {
    if (this.items.length === 0) return;
    this.paso = 3;
  }

  // ── Cálculos ────────────────────────────────────────────────────────────

  calcularSubtotalItem(item: ItemEnPedido): number {
    const adicionalesTotales = item.adicionales.reduce(
      (sum, a) => sum + a.precio * a.cantidad,
      0,
    );
    return (item.precio + adicionalesTotales) * item.cantidad;
  }

  calcularTotal(): number {
    return this.items.reduce(
      (sum, item) => sum + this.calcularSubtotalItem(item),
      0,
    );
  }

  // ── Paso 3 ──────────────────────────────────────────────────────────────

  confirmarPedido(): void {
    if (!this.fechaEntrega || !this.platoPrincipal) return;
    const cliente = this.authService.currentCliente;
    if (!cliente) return;

    this.enviando = true;
    this.error = '';

    const request: CrearPedidoRequest = {
      clienteId: cliente.id,
      platoPrincipalId: this.platoPrincipal.id,
      fechaEntrega: this.fechaEntrega,
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
      },
      error: () => {
        this.enviando = false;
        this.error = 'Error al crear el pedido. Por favor intenta de nuevo.';
      },
    });
  }

  irPaso(n: number): void {
    if (n < this.paso) this.paso = n;
  }
}
