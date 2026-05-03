import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdicionalesCl } from '../model/adicionales-cl';
import { environment } from '../../environments/environment';

/**
 * Servicio para la gestión de adicionales del menú.
 * Consume la API REST de adicionales del backend para las vistas de administración.
 */
@Injectable({
  providedIn: 'root',
})
export class AdicionalService {
  private apiUrl = `${environment.apiUrl}/api/adicionales`;

  constructor(private http: HttpClient) {}

  /** Devuelve todos los adicionales disponibles. */
  findAll(): Observable<AdicionalesCl[]> {
    return this.http.get<AdicionalesCl[]>(this.apiUrl);
  }

  /** Devuelve un adicional por su id. */
  findById(id: number): Observable<AdicionalesCl> {
    return this.http.get<AdicionalesCl>(`${this.apiUrl}/${id}`);
  }

  /** Crea un nuevo adicional (excluye el id del body). */
  add(adicional: AdicionalesCl): Observable<AdicionalesCl> {
    const { id, ...body } = adicional;
    return this.http.post<AdicionalesCl>(this.apiUrl, body);
  }

  /** Actualiza un adicional existente por su id. */
  update(adicional: AdicionalesCl): Observable<AdicionalesCl> {
    return this.http.put<AdicionalesCl>(
      `${this.apiUrl}/${adicional.id}`,
      adicional,
    );
  }

  /** Elimina un adicional por su id. */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
