import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente-cl';
import { environment } from '../../environments/environment';

/**
 * Servicio para la gestión de clientes desde el panel de administración.
 * Consume la API REST de clientes del backend (/api/clients).
 */
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = `${environment.apiUrl}/api/clients`;

  constructor(private http: HttpClient) {}

  /** Devuelve todos los clientes registrados. */
  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  /** Devuelve un cliente por su id. */
  findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  /** Devuelve los datos del cliente autenticado actualmente. */
  getCurrentClient(): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.apiUrl}/api/auth/me`);
  }

  /** Actualiza nombre, apellido, teléfono y dirección del cliente autenticado. */
  updateCurrentClient(cliente: Partial<Cliente>): Observable<Cliente> {
    return this.http.put<Cliente>(`${environment.apiUrl}/api/auth/me`, {
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
    });
  }

  /** Elimina la cuenta del cliente autenticado (usa JWT, no id). */
  deleteCurrentClient(): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/auth/me`);
  }

  /** Crea un nuevo cliente (excluye el id del body). */
  add(cliente: Cliente): Observable<any> {
    const { id, ...body } = cliente;
    return this.http.post(this.apiUrl, body, { responseType: 'text' });
  }

  /** Actualiza los datos de un cliente existente. */
  update(cliente: Cliente): Observable<any> {
    return this.http.put(this.apiUrl + '/' + cliente.id, cliente, {
      responseType: 'text',
    });
  }

  /** Elimina un cliente por su id. */
  delete(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id, { responseType: 'text' });
  }
}
