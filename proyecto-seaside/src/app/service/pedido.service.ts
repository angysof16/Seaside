// proyecto-seaside/src/app/service/pedido.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  CrearPedidoRequest,
  PedidoDetalleResponse,
} from '../model/crear-pedido-request';

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
  private apiUrl = `${environment.apiUrl}/api/pedidos`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  findActivos(): Observable<Pedido[]> {
    const params = new HttpParams().set('activos', 'true');
    return this.http.get<Pedido[]>(this.apiUrl, { params });
  }

  findById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  actualizarEstado(id: number, estado: string): Observable<unknown> {
    return this.http.patch(`${this.apiUrl}/${id}/estado`, { estado });
  }

  asignarDomiciliario(
    pedidoId: number,
    domiciliarioId: number,
  ): Observable<unknown> {
    return this.http.patch(`${this.apiUrl}/${pedidoId}/domiciliario`, {
      domiciliarioId,
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  crear(request: CrearPedidoRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.apiUrl, request);
  }

  getDetalle(id: number): Observable<PedidoDetalleResponse> {
    return this.http.get<PedidoDetalleResponse>(`${this.apiUrl}/${id}/detalle`);
  }
}
