import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Domiciliario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  direccion: string;
  activo: boolean;
  cedula: string;
  disponible: boolean;
  pedido?: { id: number };
}

@Injectable({ providedIn: 'root' })
export class DomiciliarioService {
  private apiUrl = `${environment.apiUrl}/api/domiciliarios`;

  constructor(private http: HttpClient) {}

  /** Devuelve todos los domiciliarios */
  findAll(): Observable<Domiciliario[]> {
    return this.http.get<Domiciliario[]>(this.apiUrl);
  }

  /** Devuelve solo los domiciliarios con disponible=true */
  findDisponibles(): Observable<Domiciliario[]> {
    const params = new HttpParams().set('disponibles', 'true');
    return this.http.get<Domiciliario[]>(this.apiUrl, { params });
  }

  findById(id: number): Observable<Domiciliario> {
    return this.http.get<Domiciliario>(`${this.apiUrl}/${id}`);
  }

  /** Actualiza la disponibilidad de un domiciliario */
  setDisponibilidad(id: number, disponible: boolean): Observable<unknown> {
    return this.http.patch(`${this.apiUrl}/${id}/disponibilidad`, { disponible });
  }
}