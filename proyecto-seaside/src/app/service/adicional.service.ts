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
}
