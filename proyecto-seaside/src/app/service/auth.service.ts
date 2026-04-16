import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cliente } from '../model/cliente-cl';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export interface SignupRequest {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  telefono: string;
  direccion: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private static STORAGE_KEY = 'seaside_client';

  private clienteSubject = new BehaviorSubject<Cliente | null>(this.loadFromStorage());
  cliente$ = this.clienteSubject.asObservable();

  constructor(private http: HttpClient) {}

  get currentCliente(): Cliente | null {
    return this.clienteSubject.value;
  }

  get isLoggedIn(): boolean {
    return this.clienteSubject.value !== null;
  }

  login(credentials: LoginRequest): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/login`, credentials).pipe(
      tap((cliente) => this.setCliente(cliente)),
    );
  }

  signup(data: SignupRequest): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/signup`, data);
  }

  logout(): void {
    sessionStorage.removeItem(AuthService.STORAGE_KEY);
    this.clienteSubject.next(null);
  }

  setCliente(cliente: Cliente): void {
    sessionStorage.setItem(AuthService.STORAGE_KEY, JSON.stringify(cliente));
    this.clienteSubject.next(cliente);
  }

  private loadFromStorage(): Cliente | null {
    const raw = sessionStorage.getItem(AuthService.STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
