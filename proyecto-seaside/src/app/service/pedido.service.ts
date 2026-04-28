// src/app/service/pedido.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CrearPedidoRequest } from '../model/crear-pedido-request';

export interface Pedido {
  id: number;
  fechaCreacion: string;
  fechaEntrega: string;
  estado: string;
  total: number;
  cliente: { id: number; nombre: string; apellido: string };
  domiciliarioId?: number;
}

/**
 * Servicio para la gestión de pedidos desde el frontend.
 * Consume la API REST de pedidos del backend:
 * obtención, filtrado, actualización de estado, asignación de domiciliario y creación.
 */
@Injectable({ providedIn: 'root' })
export class PedidoService {
  private apiUrl = `${environment.apiUrl}/api/pedidos`;

  constructor(private http: HttpClient) {}

  /** Devuelve todos los pedidos registrados. */
  findAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  /** Devuelve solo los pedidos activos (no Entregado ni Cancelado). */
  findActivos(): Observable<Pedido[]> {
    const params = new HttpParams().set('activos', 'true');
    return this.http.get<Pedido[]>(this.apiUrl, { params });
  }

  /** Busca un pedido por su id. */
  findById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  /** Actualiza el estado de un pedido. */
  actualizarEstado(id: number, estado: string): Observable<unknown> {
    return this.http.patch(`${this.apiUrl}/${id}/estado`, { estado });
  }

  /** Asigna un domiciliario disponible a un pedido. */
  asignarDomiciliario(
    pedidoId: number,
    domiciliarioId: number,
  ): Observable<unknown> {
    return this.http.patch(`${this.apiUrl}/${pedidoId}/domiciliario`, {
      domiciliarioId,
    });
  }

  /** Elimina un pedido por su id. */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** Devuelve los pedidos de un cliente específico por su id. */
  findByClienteId(clienteId: number): Observable<Pedido[]> {
    const params = new HttpParams().set('clienteId', clienteId.toString());
    return this.http.get<Pedido[]>(this.apiUrl, { params });
  }

  /**
   * POST /api/pedidos
   * Body must match backend PedidoRequest: { clienteId, items: [{productoId, cantidad, adicionales:[{adicionalId, cantidad}]}] }
   */
  crear(request: CrearPedidoRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.apiUrl, request);
  }
}
