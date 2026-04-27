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

@Injectable({ providedIn: 'root' })
export class DomiciliarioService {
  private apiUrl = `${environment.apiUrl}/api/domiciliarios`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Domiciliario[]> {
    return this.http.get<Domiciliario[]>(this.apiUrl);
  }

  findDisponibles(): Observable<Domiciliario[]> {
    const params = new HttpParams().set('disponibles', 'true');
    return this.http.get<Domiciliario[]>(this.apiUrl, { params });
  }

  findById(id: number): Observable<Domiciliario> {
    return this.http.get<Domiciliario>(`${this.apiUrl}/${id}`);
  }

  create(domiciliario: Partial<Domiciliario>): Observable<Domiciliario> {
    return this.http.post<Domiciliario>(this.apiUrl, domiciliario);
  }

  update(id: number, domiciliario: Partial<Domiciliario>): Observable<Domiciliario> {
    return this.http.put<Domiciliario>(`${this.apiUrl}/${id}`, domiciliario);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  setDisponibilidad(id: number, disponible: boolean): Observable<unknown> {
    return this.http.patch(`${this.apiUrl}/${id}/disponibilidad`, { disponible });
  }

  setActivo(id: number, activo: boolean): Observable<unknown> {
    return this.http.patch(`${this.apiUrl}/${id}/activo`, { activo });
  }
}