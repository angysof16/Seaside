import { Injectable } from '@angular/core';
import { PedidoCl } from '../model/pedido-cl';

export interface Pedido {
  id: number;
  fechaCreacion: string;
  fechaEntrega: string;
  estado: string;
  total: number;
  clienteId: number;
  domiciliarioId?: number;
}

@Injectable({ providedIn: 'root' })
export class PedidoService {
  pedidoList: Pedido[] = [
    new PedidoCl(
      1,
      '2026-04-06 10:00',
      '2026-04-06 10:45',
      'PENDIENTE',
      85000,
      1,
    ),
    new PedidoCl(
      2,
      '2026-04-06 10:15',
      '2026-04-06 11:00',
      'PENDIENTE',
      120000,
      2,
    ),
    new PedidoCl(
      3,
      '2026-04-06 09:30',
      '2026-04-06 10:15',
      'EN_CAMINO',
      60000,
      3,
    ),
    new PedidoCl(
      4,
      '2026-04-06 09:00',
      '2026-04-06 09:45',
      'ENTREGADO',
      95000,
      1,
    ),
  ];

  findAll(): Pedido[] {
    return this.pedidoList;
  }

  findActivos(): Pedido[] {
    return this.pedidoList.filter(
      (p) => p.estado !== 'ENTREGADO' && p.estado !== 'CANCELADO',
    );
  }

  findById(id: number): Pedido | undefined {
    return this.pedidoList.find((p) => p.id === id);
  }

  actualizarEstado(id: number, estado: string): void {
    const index = this.pedidoList.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.pedidoList[index] = { ...this.pedidoList[index], estado };
    }
  }

  asignarDomiciliario(pedidoId: number, domiciliarioId: number): void {
    const index = this.pedidoList.findIndex((p) => p.id === pedidoId);
    if (index !== -1) {
      this.pedidoList[index] = {
        ...this.pedidoList[index],
        domiciliarioId,
        estado: 'EN_CAMINO',
      };
    }
  }

  delete(id: number): void {
    this.pedidoList = this.pedidoList.filter((p) => p.id !== id);
  }
}
