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

/**
 * Servicio de autenticación para clientes.
 * Gestiona el login, registro y el estado de sesión del cliente activo
 * mediante un BehaviorSubject y sessionStorage.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private static STORAGE_KEY = 'seaside_client';

  /** Emite el cliente autenticado o null si no hay sesión activa. */
  private clienteSubject = new BehaviorSubject<Cliente | null>(
    this.loadFromStorage(),
  );
  cliente$ = this.clienteSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Devuelve el cliente autenticado actualmente o null. */
  get currentCliente(): Cliente | null {
    return this.clienteSubject.value;
  }

  /** true si hay un cliente autenticado. */
  get isLoggedIn(): boolean {
    return this.clienteSubject.value !== null;
  }

  /** Envía las credenciales al backend y persiste la sesión en sessionStorage. */
  login(credentials: LoginRequest): Observable<Cliente> {
    return this.http
      .post<Cliente>(`${this.apiUrl}/login`, credentials)
      .pipe(tap((cliente) => this.setCliente(cliente)));
  }

  /** Registra un nuevo cliente. */
  signup(data: SignupRequest): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/signup`, data);
  }

  /** Cierra la sesión limpiando sessionStorage y el BehaviorSubject. */
  logout(): void {
    sessionStorage.removeItem(AuthService.STORAGE_KEY);
    this.clienteSubject.next(null);
  }

  /** Persiste el cliente en sessionStorage y actualiza el BehaviorSubject. */
  setCliente(cliente: Cliente): void {
    sessionStorage.setItem(AuthService.STORAGE_KEY, JSON.stringify(cliente));
    this.clienteSubject.next(cliente);
  }

  /** Carga el cliente almacenado en sessionStorage al iniciar la app. */
  private loadFromStorage(): Cliente | null {
    const raw = sessionStorage.getItem(AuthService.STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
