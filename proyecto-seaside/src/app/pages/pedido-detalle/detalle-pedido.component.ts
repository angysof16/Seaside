// src/app/pages/pedido-detalle/detalle-pedido.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService, Pedido } from 'src/app/service/pedido.service';
import { DomiciliarioService, Domiciliario } from 'src/app/service/domiciliario.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface AdicionalEnItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
}

export interface ItemPedido {
  id: number;
  cantidad: number;
  subtotal: number;
  producto: {
    id: number;
    nombre: string;
    precio: number;
    imageUrl?: string;
  };
  adicionales: AdicionalEnItem[];
}

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css'],
})
export class PedidoDetalleComponent implements OnInit {
  pedido: Pedido | null = null;
  items: ItemPedido[] = [];
  domiciliario: Domiciliario | null = null;

  cargando = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService,
    private domiciliarioService: DomiciliarioService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    const queryId = this.route.snapshot.queryParamMap.get('id');
    const raw = paramId ?? queryId;

    if (!raw) {
      this.error = 'No se especificó un ID de pedido.';
      this.cargando = false;
      return;
    }

    this.cargarDatos(Number(raw));
  }

  private cargarDatos(id: number): void {
    this.pedidoService.findById(id).subscribe({
      next: (pedido) => {
        this.pedido = pedido;

        if (pedido.domiciliarioId) {
          this.domiciliarioService.findById(pedido.domiciliarioId).subscribe({
            next: (d) => (this.domiciliario = d),
            error: () => (this.domiciliario = null),
          });
        }

        this.http
          .get<ItemPedido[]>(`${environment.apiUrl}/api/pedidos/${id}/items`)
          .subscribe({
            next: (items) => {
              this.items = items;
              this.cargando = false;
            },
            error: () => {
              this.items = [];
              this.cargando = false;
            },
          });
      },
      error: () => {
        this.error = 'No se encontró el pedido con ese ID.';
        this.cargando = false;
      },
    });
  }

  volver(): void {
    this.router.navigate(['/pedidos']);
  }

  getEstadoClass(estado: string): string {
    const map: Record<string, string> = {
      PENDIENTE:      'badge-pendiente',
      Pendiente:      'badge-pendiente',
      EN_PREPARACION: 'badge-preparacion',
      'En preparación': 'badge-preparacion',
      EN_CAMINO:      'badge-camino',
      'En camino':    'badge-camino',
      ENTREGADO:      'badge-entregado',
      Entregado:      'badge-entregado',
      CANCELADO:      'badge-cancelado',
      Cancelado:      'badge-cancelado',
    };
    return map[estado] ?? '';
  }
}