import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AdminSession {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
}

/**
 * Servicio de autenticación para administradores.
 * Mantiene la sesión del admin activo en sessionStorage
 * y expone un observable para reaccionar a cambios de estado.
 */
@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private static STORAGE_KEY = 'seaside_admin';
  private apiUrl = `${environment.apiUrl}/api/admin/auth`;

  /** Emite el admin autenticado o null si no hay sesión activa. */
  private adminSubject = new BehaviorSubject<AdminSession | null>(
    this.loadFromStorage(),
  );
  admin$ = this.adminSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Devuelve el administrador autenticado actualmente o null. */
  get currentAdmin(): AdminSession | null {
    return this.adminSubject.value;
  }

  /** true si hay un administrador autenticado. */
  get isLoggedIn(): boolean {
    return this.adminSubject.value !== null;
  }

  /** Envía las credenciales al backend y persiste la sesión en sessionStorage. */
  login(correo: string, contrasena: string): Observable<any> {
  return this.http
    .post<any>(`${this.apiUrl}/login`, { correo, contrasena })
    .pipe(
      tap((response) => {
        localStorage.setItem(AdminAuthService.STORAGE_KEY, JSON.stringify(response));
        this.adminSubject.next(response);
      })
    );
}

  /** Cierra la sesión del administrador. */
  logout(): void {
    localStorage.removeItem(AdminAuthService.STORAGE_KEY);
    this.adminSubject.next(null);
  }

  /** Persiste el admin en localStorage y actualiza el BehaviorSubject. */
  setAdmin(admin: AdminSession): void {
    localStorage.setItem(AdminAuthService.STORAGE_KEY, JSON.stringify(admin));
    this.adminSubject.next(admin);
  }

  /** Carga la sesión del admin desde localStorage al iniciar la app. */
  private loadFromStorage(): AdminSession | null {
    const raw = localStorage.getItem(AdminAuthService.STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
