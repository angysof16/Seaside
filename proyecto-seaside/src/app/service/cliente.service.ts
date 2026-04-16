import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente-cl';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = `${environment.apiUrl}/api/clients`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  add(cliente: Cliente): Observable<any> {
    return this.http.post(this.apiUrl, cliente, { responseType: 'text' });
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put(this.apiUrl + '/' + cliente.id, cliente, {
      responseType: 'text',
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id, { responseType: 'text' });
  }
}
