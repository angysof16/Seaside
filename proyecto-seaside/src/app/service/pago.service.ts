import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PagoResponse {
  /** URL de pago real (producción) */
  initPoint: string;
  /** URL de pago en modo sandbox/prueba */
  sandboxInitPoint: string;
  /** ID de la preferencia en MercadoPago */
  preferenceId: string;
}

export interface EstadoPago {
  pedidoId: number;
  estado: string;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class PagoService {
  private apiUrl = `${environment.apiUrl}/api/pagos`;

  constructor(private http: HttpClient) {}

  /** Genera la preferencia de pago y retorna las URLs de checkout */
  crearPreferencia(pedidoId: number): Observable<PagoResponse> {
    return this.http.post<PagoResponse>(
      `${this.apiUrl}/crear-preferencia/${pedidoId}`,
      {}
    );
  }

  /** Consulta el estado actual del pedido (se llama al volver de MP) */
  consultarEstado(pedidoId: number): Observable<EstadoPago> {
    return this.http.get<EstadoPago>(`${this.apiUrl}/estado/${pedidoId}`);
  }
}