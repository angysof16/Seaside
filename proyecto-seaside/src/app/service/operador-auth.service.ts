import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface OperadorSession {
  id: number;
  nombre: string;
  usuario: string;
}

/**
 * Servicio de autenticación para operadores.
 * Mantiene la sesión del operador activo en sessionStorage
 * y expone un observable para reaccionar a cambios de estado.
 */
@Injectable({ providedIn: 'root' })
export class OperadorAuthService {
  private static STORAGE_KEY = 'seaside_operador';
  private apiUrl = `${environment.apiUrl}/api/operadores/auth`;

  /** Emite el operador autenticado o null si no hay sesión activa. */
  private operadorSubject = new BehaviorSubject<OperadorSession | null>(
    this.loadFromStorage(),
  );
  operador$ = this.operadorSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Devuelve el operador autenticado actualmente o null. */
  get currentOperador(): OperadorSession | null {
    return this.operadorSubject.value;
  }

  /** true si hay un operador autenticado. */
  get isLoggedIn(): boolean {
    return this.operadorSubject.value !== null;
  }

  /** Envía las credenciales al backend y persiste la sesión en sessionStorage. */
  login(usuario: string, contrasena: string): Observable<OperadorSession> {
    return this.http
      .post<OperadorSession>(`${this.apiUrl}/login`, { usuario, contrasena })
      .pipe(tap((op) => this.setOperador(op)));
  }

  /** Cierra la sesión del operador. */
  logout(): void {
    sessionStorage.removeItem(OperadorAuthService.STORAGE_KEY);
    this.operadorSubject.next(null);
  }

  /** Persiste el operador en sessionStorage y actualiza el BehaviorSubject. */
  setOperador(op: OperadorSession): void {
    sessionStorage.setItem(OperadorAuthService.STORAGE_KEY, JSON.stringify(op));
    this.operadorSubject.next(op);
  }

  /** Carga la sesión del operador desde sessionStorage al iniciar la app. */
  private loadFromStorage(): OperadorSession | null {
    const raw = sessionStorage.getItem(OperadorAuthService.STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
