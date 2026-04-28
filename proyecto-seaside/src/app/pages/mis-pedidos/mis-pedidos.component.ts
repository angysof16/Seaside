import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { PedidoService, Pedido } from '../../service/pedido.service';

/**
 * Página que muestra el historial de pedidos del cliente autenticado.
 * Redirige a /login si no hay sesión activa.
 * Ordena los pedidos del más reciente al más antiguo.
 */
@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css'],
})
export class MisPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  cargando = true;
  error = '';

  constructor(
    private authService: AuthService,
    private pedidoService: PedidoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const cliente = this.authService.currentCliente;
    if (!cliente) {
      this.router.navigate(['/login']);
      return;
    }
    this.pedidoService.findByClienteId(cliente.id).subscribe({
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

  verDetalle(id: number): void {
    this.router.navigate(['/pedidos', id]);
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
