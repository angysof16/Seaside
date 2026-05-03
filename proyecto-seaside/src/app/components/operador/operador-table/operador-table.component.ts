import { Component, OnInit } from '@angular/core';
import { PedidoService, Pedido } from 'src/app/service/pedido.service';
import {
  DomiciliarioService,
  Domiciliario,
} from 'src/app/service/domiciliario.service';

/**
 * Vista principal del portal de operador.
 * Muestra los pedidos activos (o todos) y permite:
 * - Asignar un domiciliario disponible a un pedido.
 * - Actualizar el estado de un pedido.
 * - Eliminar un pedido.
 * Usa modales para confirmar la asignación y el cambio de estado.
 */
@Component({
  selector: 'app-operador-table',
  templateUrl: './operador-table.component.html',
  styleUrls: ['./operador-table.component.css'],
})
export class OperadorTableComponent implements OnInit {
  pedidos: Pedido[] = [];
  domiciliariosDisponibles: Domiciliario[] = [];
  todosLosDomiciliarios: Domiciliario[] = [];

  soloActivos = true;

  // Control del modal de asignación
  modalAbierto = false;
  pedidoSeleccionado: Pedido | null = null;
  domiciliarioElegido: number | null = null;

  // Control del modal de estado
  modalEstadoAbierto = false;
  pedidoEstado: Pedido | null = null;
  nuevoEstado = '';

  readonly ESTADOS = [
    'PENDIENTE',
    'EN_PREPARACION',
    'EN_CAMINO',
    'ENTREGADO',
    'CANCELADO',
  ];
  private readonly ESTADOS_REQUIEREN_DOMICILIARIO = new Set([
    'EN_CAMINO',
    'ENTREGADO',
  ]);

  constructor(
    private pedidoService: PedidoService,
    private domiciliarioService: DomiciliarioService,
  ) {}

  ngOnInit(): void {
    this.cargarPedidos();
    this.cargarDomiciliarios();
  }

  private cargarDomiciliarios(): void {
    this.domiciliarioService
      .findAll()
      .subscribe((list) => (this.todosLosDomiciliarios = list));

    this.domiciliarioService.findDisponibles().subscribe((list) => {
      // Un domiciliario asignable debe estar disponible y además activo.
      this.domiciliariosDisponibles = list.filter(
        (d) => d.activo && d.disponible,
      );
    });
  }

  cargarPedidos(): void {
    const obs = this.soloActivos
      ? this.pedidoService.findActivos()
      : this.pedidoService.findAll();
    obs.subscribe((list) => (this.pedidos = list));
  }

  toggleFiltro(): void {
    this.soloActivos = !this.soloActivos;
    this.cargarPedidos();
  }

  // ── Asignar domiciliario ──────────────────────────────────
  abrirModalAsignar(pedido: Pedido): void {
    this.pedidoSeleccionado = pedido;
    this.domiciliarioElegido = pedido.domiciliarioId ?? null;
    // Refrescar lista de disponibles antes de abrir el modal
    this.domiciliarioService.findDisponibles().subscribe((list) => {
      this.domiciliariosDisponibles = list.filter(
        (d) => d.activo && d.disponible,
      );
      this.modalAbierto = true;
    });
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.pedidoSeleccionado = null;
    this.domiciliarioElegido = null;
  }

  confirmarAsignacion(): void {
    if (!this.pedidoSeleccionado || !this.domiciliarioElegido) return;
    this.pedidoService
      .asignarDomiciliario(this.pedidoSeleccionado.id, this.domiciliarioElegido)
      .subscribe(() => {
        this.cargarPedidos();
        this.cargarDomiciliarios();
        this.cerrarModal();
      });
  }

  // ── Actualizar estado ─────────────────────────────────────
  abrirModalEstado(pedido: Pedido): void {
    this.pedidoEstado = pedido;
    this.nuevoEstado = pedido.estado;
    this.modalEstadoAbierto = true;
  }

  cerrarModalEstado(): void {
    this.modalEstadoAbierto = false;
    this.pedidoEstado = null;
    this.nuevoEstado = '';
  }

  confirmarEstado(): void {
    if (!this.pedidoEstado || !this.nuevoEstado) return;

    if (
      this.estadoRequiereDomiciliario(this.nuevoEstado) &&
      !this.pedidoEstado.domiciliarioId
    ) {
      alert(
        'No puedes marcar este pedido como EN_CAMINO o ENTREGADO sin asignar un domiciliario.',
      );
      return;
    }

    this.pedidoService
      .actualizarEstado(this.pedidoEstado.id, this.nuevoEstado)
      .subscribe(() => {
        this.cargarPedidos();
        this.cerrarModalEstado();
      });
  }

  // ── Eliminar ──────────────────────────────────────────────
  eliminarPedido(pedido: Pedido): void {
    this.pedidoService.delete(pedido.id).subscribe(() => {
      this.cargarPedidos();
    });
  }

  // ── Helpers ───────────────────────────────────────────────
  estadoRequiereDomiciliario(estado: string): boolean {
    return this.ESTADOS_REQUIEREN_DOMICILIARIO.has(estado);
  }

  estadoPermitidoParaPedido(estado: string): boolean {
    if (!this.estadoRequiereDomiciliario(estado)) return true;
    return !!this.pedidoEstado?.domiciliarioId;
  }

  getNombreDomiciliario(id?: number): string {
    if (!id) return '—';
    const d = this.todosLosDomiciliarios.find((d) => d.id === id);
    return d ? `${d.nombre} ${d.apellido}` : '—';
  }

  getEstadoClass(estado: string): string {
    const map: Record<string, string> = {
      PENDIENTE: 'badge-pendiente',
      EN_PREPARACION: 'badge-preparacion',
      EN_CAMINO: 'badge-camino',
      ENTREGADO: 'badge-entregado',
      CANCELADO: 'badge-cancelado',
    };
    return map[estado] ?? '';
  }
}
