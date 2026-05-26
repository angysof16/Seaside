// src/app/pages/pago-resultado/pago-resultado.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagoService } from '../../service/pago.service';

/**
 * Página que muestra el resultado del pago al volver de MercadoPago.
 * Lee los query params: estado (exitoso|fallido|pendiente) y pedidoId.
 * Consulta el backend para confirmar el estado real del pedido.
 */
@Component({
  selector: 'app-pago-resultado',
  templateUrl: './pago-resultado.component.html',
  styleUrls: ['./pago-resultado.component.css'],
})
export class PagoResultadoComponent implements OnInit {
  estado: 'exitoso' | 'fallido' | 'pendiente' | 'cargando' = 'cargando';
  pedidoId: number | null = null;
  total: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pagoService: PagoService,
  ) {}

  ngOnInit(): void {
    const estadoParam = this.route.snapshot.queryParamMap.get('estado');
    const pedidoIdParam = this.route.snapshot.queryParamMap.get('pedidoId');

    if (pedidoIdParam) {
      this.pedidoId = Number(pedidoIdParam);
    }

    // Consultar el estado real desde el backend (no confiar solo en el query param)
    if (this.pedidoId) {
      this.pagoService.consultarEstado(this.pedidoId).subscribe({
        next: (data) => {
          this.total = data.total;
          const est = data.estado?.toUpperCase();

          if (est === 'EN_PREPARACION' || estadoParam === 'exitoso') {
            this.estado = 'exitoso';
          } else if (est === 'CANCELADO' || estadoParam === 'fallido') {
            this.estado = 'fallido';
          } else {
            this.estado = 'pendiente';
          }
        },
        error: () => {
          // Si falla la consulta usamos el param de la URL
          this.estado = (estadoParam as any) ?? 'pendiente';
        },
      });
    } else {
      this.estado = (estadoParam as any) ?? 'pendiente';
    }
  }

  verPedido(): void {
    if (this.pedidoId) {
      this.router.navigate(['/pedidos', this.pedidoId]);
    }
  }

  irAMenu(): void {
    this.router.navigate(['/menu']);
  }

  irAPerfil(): void {
    this.router.navigate(['/perfil/pedidos']);
  }

  reintentar(): void {
    if (this.pedidoId) {
      // Volver al paso 3 del pedido existente no es posible (ya fue creado),
      // solo podemos llevarlos al detalle del pedido
      this.router.navigate(['/pedidos', this.pedidoId]);
    } else {
      this.router.navigate(['/pedido/nuevo']);
    }
  }
}