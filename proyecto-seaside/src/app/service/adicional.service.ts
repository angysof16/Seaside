import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdicionalesCl } from '../model/adicionales-cl';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdicionalService {
  private apiUrl = `${environment.apiUrl}/api/adicionales`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<AdicionalesCl[]> {
    return this.http.get<AdicionalesCl[]>(this.apiUrl);
  }

  findById(id: number): Observable<AdicionalesCl> {
    return this.http.get<AdicionalesCl>(`${this.apiUrl}/${id}`);
  }

  add(adicional: AdicionalesCl): Observable<AdicionalesCl> {
    const { id, ...body } = adicional;
    return this.http.post<AdicionalesCl>(this.apiUrl, body);
  }

  update(adicional: AdicionalesCl): Observable<AdicionalesCl> {
    return this.http.put<AdicionalesCl>(
      `${this.apiUrl}/${adicional.id}`,
      adicional
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}