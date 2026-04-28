import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operador } from '../components/operador/operador';
import { environment } from '../../environments/environment';

/**
 * Servicio para la gestión de operadores desde el panel de administración.
 * Consume la API REST de operadores del backend (/api/operadores).
 */
@Injectable({
  providedIn: 'root',
})
export class OperadorService {
  private apiUrl = `${environment.apiUrl}/api/operadores`;

  constructor(private http: HttpClient) {}

  /** Devuelve todos los operadores registrados. */
  findAll(): Observable<Operador[]> {
    return this.http.get<Operador[]>(this.apiUrl);
  }

  /** Devuelve un operador por su id. */
  findById(id: number): Observable<Operador> {
    return this.http.get<Operador>(`${this.apiUrl}/${id}`);
  }

  /** Crea un nuevo operador (excluye el id del body). */
  add(operador: Operador): Observable<any> {
    const { id, ...body } = operador;
    return this.http.post(this.apiUrl, body, { responseType: 'text' });
  }

  /** Actualiza los datos de un operador existente. */
  update(operador: Operador): Observable<any> {
    return this.http.put(this.apiUrl + '/' + operador.id, operador, {
      responseType: 'text',
    });
  }

  /** Elimina un operador por su id. */
  delete(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id, { responseType: 'text' });
  }
}
