import { Injectable } from '@angular/core';

export interface Pedido {
  id: number;
  fechaCreacion: string;
  fechaEntrega: string;
  estado: string;
  total: number;
  cliente: { id: number; nombre: string; apellido: string };
  domiciliarioId?: number;
}

@Injectable({ providedIn: 'root' })
export class PedidoService {
  pedidoList: Pedido[] = [
    { id: 1, fechaCreacion: '2026-04-06 10:00', fechaEntrega: '2026-04-06 10:45',
      estado: 'PENDIENTE', total: 85000, cliente: { id: 1, nombre: 'Laura', apellido: 'Gomez' } },
    { id: 2, fechaCreacion: '2026-04-06 10:15', fechaEntrega: '2026-04-06 11:00',
      estado: 'PENDIENTE', total: 120000, cliente: { id: 2, nombre: 'Carlos', apellido: 'Ramirez' } },
    { id: 3, fechaCreacion: '2026-04-06 09:30', fechaEntrega: '2026-04-06 10:15',
      estado: 'EN_CAMINO', total: 60000, cliente: { id: 3, nombre: 'Ana', apellido: 'Martinez' } },
    { id: 4, fechaCreacion: '2026-04-06 09:00', fechaEntrega: '2026-04-06 09:45',
      estado: 'ENTREGADO', total: 95000, cliente: { id: 1, nombre: 'Laura', apellido: 'Gomez' } },
  ];

  findAll(): Pedido[] { return this.pedidoList; }

  findActivos(): Pedido[] {
    return this.pedidoList.filter(p => p.estado !== 'ENTREGADO' && p.estado !== 'CANCELADO');
  }

  findById(id: number): Pedido | undefined {
    return this.pedidoList.find(p => p.id === id);
  }

  actualizarEstado(id: number, estado: string): void {
    const i = this.pedidoList.findIndex(p => p.id === id);
    if (i !== -1) this.pedidoList[i] = { ...this.pedidoList[i], estado };
  }

  asignarDomiciliario(pedidoId: number, domiciliarioId: number): void {
    const i = this.pedidoList.findIndex(p => p.id === pedidoId);
    if (i !== -1) this.pedidoList[i] = { ...this.pedidoList[i], domiciliarioId, estado: 'EN_CAMINO' };
  }

  delete(id: number): void {
    this.pedidoList = this.pedidoList.filter(p => p.id !== id);
  }
}