import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operador } from '../operador/operador';
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

  add(operador: Operador): Observable<Operador> {
    return this.http.post<Operador>(this.apiUrl, operador);
  }

  update(operador: Operador): Observable<Operador> {
    return this.http.put<Operador>(`${this.apiUrl}/${operador.id}`, operador);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}