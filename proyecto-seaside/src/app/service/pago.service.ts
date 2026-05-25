import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface PagoResponse {
    initPoint: string;
    sandBoxURL: string;
    preferenceId: string;
}

@Injectable({ providedIn: 'root' })
export class PagoService {
    private apiUrl = 'http://localhost:8080/api/pagos';

    constructor(private http: HttpClient) {}

    crearPreferencia(pedidoId: number): Observable<PagoResponse> {
    return this.http.post<PagoResponse>(
      `${this.apiUrl}/crear-preferencia/${pedidoId}`,
      {}
    );
  }
}