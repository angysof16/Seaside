import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactoInfo {
  email: string;
  telefono: string;
  direccion: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  private apiUrl = `${environment.apiUrl}/api/contacto`;

  constructor(private http: HttpClient) {}

  getContacto(): Observable<ContactoInfo> {
    return this.http.get<ContactoInfo>(this.apiUrl);
  }
}
