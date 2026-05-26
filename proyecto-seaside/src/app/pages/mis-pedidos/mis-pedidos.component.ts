import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { PedidoService, Pedido } from '../../service/pedido.service';

/**
 * Página que muestra el historial de pedidos del cliente autenticado.
 * Redirige a /login si no hay sesión activa.
 * Ordena los pedidos del más reciente al más antiguo.
 * Muestra notificación de resultado del pago si viene de MercadoPago.
 */
@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css'],
})
export class MisPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  ocultarEntregados = false;
  cargando = true;
  error = '';

  // Notificación de pago
  notificacionPago: 'exitoso' | 'fallido' | 'pendiente' | null = null;

  constructor(
    private authService: AuthService,
    private pedidoService: PedidoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Leer resultado del pago desde query params (viene de MercadoPago)
    const estadoPago = this.route.snapshot.queryParamMap.get('pago');
    if (estadoPago === 'exitoso' || estadoPago === 'fallido' || estadoPago === 'pendiente') {
      this.notificacionPago = estadoPago;
      // Limpiar el query param de la URL sin recargar la página
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
        replaceUrl: true,
      });
      // Auto-ocultar la notificación después de 6 segundos
      setTimeout(() => (this.notificacionPago = null), 6000);
    }

    const cliente = this.authService.currentCliente;
    if (!cliente) {
      this.router.navigate(['/login']);
      return;
    }
    this.pedidoService.getMisPedidos().subscribe({
      next: (list) => {
        this.pedidos = list.sort(
          (a, b) =>
            new Date(b.fechaCreacion).getTime() -
            new Date(a.fechaCreacion).getTime(),
        );
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los pedidos.';
        this.cargando = false;
      },
    });
  }

  cerrarNotificacion(): void {
    this.notificacionPago = null;
  }

  verDetalle(id: number): void {
    this.router.navigate(['/pedidos', id]);
  }

  toggleFiltroEntregados(): void {
    this.ocultarEntregados = !this.ocultarEntregados;
  }

  get pedidosVisibles(): Pedido[] {
    if (!this.ocultarEntregados) return this.pedidos;
    return this.pedidos.filter((p) => p.estado?.toUpperCase() !== 'ENTREGADO');
  }

  estadoClass(estado: string): string {
    switch (estado?.toUpperCase()) {
      case 'PENDIENTE':
        return 'estado-pendiente';
      case 'EN_PREPARACION':
        return 'estado-preparacion';
      case 'EN_CAMINO':
        return 'estado-camino';
      case 'ENTREGADO':
        return 'estado-entregado';
      case 'CANCELADO':
        return 'estado-cancelado';
      default:
        return '';
    }
  }
}