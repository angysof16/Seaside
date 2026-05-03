import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Domiciliario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  telefono: string;
  direccion: string;
  activo: boolean;
  cedula: string;
  disponible: boolean;
  pedido?: { id: number };
}

/**
 * Servicio para la gestión de domiciliarios desde el frontend.
 * Consume la API REST de domiciliarios del backend.
 * Incluye operaciones de CRUD y cambio de disponibilidad/estado activo.
 */
@Injectable({ providedIn: 'root' })
export class DomiciliarioService {
  private apiUrl = `${environment.apiUrl}/api/domiciliarios`;

  constructor(private http: HttpClient) {}

  /** Devuelve todos los domiciliarios registrados. */
  findAll(): Observable<Domiciliario[]> {
    return this.http.get<Domiciliario[]>(this.apiUrl);
  }

  /** Devuelve solo los domiciliarios disponibles (sin pedido asignado). */
  findDisponibles(): Observable<Domiciliario[]> {
    const params = new HttpParams().set('disponibles', 'true');
    return this.http.get<Domiciliario[]>(this.apiUrl, { params });
  }

  /** Devuelve un domiciliario por su id. */
  findById(id: number): Observable<Domiciliario> {
    return this.http.get<Domiciliario>(`${this.apiUrl}/${id}`);
  }

  /** Crea un nuevo domiciliario. */
  create(domiciliario: Partial<Domiciliario>): Observable<Domiciliario> {
    return this.http.post<Domiciliario>(this.apiUrl, domiciliario);
  }

  /** Actualiza los datos de un domiciliario existente. */
  update(
    id: number,
    domiciliario: Partial<Domiciliario>,
  ): Observable<Domiciliario> {
    return this.http.put<Domiciliario>(`${this.apiUrl}/${id}`, domiciliario);
  }

  /** Elimina un domiciliario por su id. */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** Cambia la disponibilidad de un domiciliario (libre o asignado a un pedido). */
  setDisponibilidad(id: number, disponible: boolean): Observable<unknown> {
    return this.http.patch(`${this.apiUrl}/${id}/disponibilidad`, {
      disponible,
    });
  }

  /** Activa o desactiva un domiciliario (trabaja ese día o no). */
  setActivo(id: number, activo: boolean): Observable<unknown> {
    return this.http.patch(`${this.apiUrl}/${id}/activo`, { activo });
  }
}
