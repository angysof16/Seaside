import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operador } from '../components/operador/operador';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OperadorService {
  private apiUrl = `${environment.apiUrl}/api/operadores`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Operador[]> {
    return this.http.get<Operador[]>(this.apiUrl);
  }

  findById(id: number): Observable<Operador> {
    return this.http.get<Operador>(`${this.apiUrl}/${id}`);
  }

  add(operador: Operador): Observable<any> {
    const { id, ...body } = operador;
    return this.http.post(this.apiUrl, body, { responseType: 'text' });
  }

  update(operador: Operador): Observable<any> {
    return this.http.put(this.apiUrl + '/' + operador.id, operador, {
      responseType: 'text',
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id, { responseType: 'text' });
  }
}
