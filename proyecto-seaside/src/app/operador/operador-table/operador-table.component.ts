import { Component, OnInit } from '@angular/core';
import { PedidoService, Pedido } from 'src/app/service/pedido.service';
import {
  DomiciliarioService,
  Domiciliario,
} from 'src/app/service/domiciliario.service';

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

  constructor(
    private pedidoService: PedidoService,
    private domiciliarioService: DomiciliarioService,
  ) {}

  ngOnInit(): void {
    this.cargarPedidos();
    this.todosLosDomiciliarios = this.domiciliarioService.findAll();
    this.domiciliariosDisponibles = this.domiciliarioService.findDisponibles();
  }

  cargarPedidos(): void {
    this.pedidos = this.soloActivos
      ? this.pedidoService.findActivos()
      : this.pedidoService.findAll();
  }

  toggleFiltro(): void {
    this.soloActivos = !this.soloActivos;
    this.cargarPedidos();
  }

  // ── Asignar domiciliario ──────────────────────────────────
  abrirModalAsignar(pedido: Pedido): void {
    this.pedidoSeleccionado = pedido;
    this.domiciliarioElegido = pedido.domiciliarioId ?? null;
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.pedidoSeleccionado = null;
    this.domiciliarioElegido = null;
  }

  confirmarAsignacion(): void {
    if (!this.pedidoSeleccionado || !this.domiciliarioElegido) return;
    this.pedidoService.asignarDomiciliario(
      this.pedidoSeleccionado.id,
      this.domiciliarioElegido,
    );
    this.cargarPedidos();
    this.cerrarModal();
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
    this.pedidoService.actualizarEstado(this.pedidoEstado.id, this.nuevoEstado);
    this.cargarPedidos();
    this.cerrarModalEstado();
  }

  // ── Eliminar ──────────────────────────────────────────────
  eliminarPedido(pedido: Pedido): void {
    this.pedidoService.delete(pedido.id);
    this.cargarPedidos();
  }

  // ── Helpers ───────────────────────────────────────────────
  getNombreDomiciliario(id?: number): string {
    if (!id) return '—';
    const d = this.todosLosDomiciliarios.find((d) => d.id === id);
    return d ? d.nombre : '—';
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
