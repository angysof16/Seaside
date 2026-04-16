import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Sede {
  nombre: string;
  direccion: string;
}

@Injectable({
  providedIn: 'root',
})
export class VisitanosService {
  private apiUrl = `${environment.apiUrl}/api/visitanos`;

  constructor(private http: HttpClient) {}

  getSedes(): Observable<Sede[]> {
    return this.http.get<Sede[]>(this.apiUrl);
  }
}
