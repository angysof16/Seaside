import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface OperadorSession {
  id: number;
  nombre: string;
  usuario: string;
}

@Injectable({ providedIn: 'root' })
export class OperadorAuthService {
  private static STORAGE_KEY = 'seaside_operador';
  private apiUrl = `${environment.apiUrl}/api/operadores/auth`;

  private operadorSubject = new BehaviorSubject<OperadorSession | null>(
    this.loadFromStorage()
  );
  operador$ = this.operadorSubject.asObservable();

  constructor(private http: HttpClient) {}

  get currentOperador(): OperadorSession | null {
    return this.operadorSubject.value;
  }

  get isLoggedIn(): boolean {
    return this.operadorSubject.value !== null;
  }

  login(usuario: string, contrasena: string): Observable<OperadorSession> {
    return this.http
      .post<OperadorSession>(`${this.apiUrl}/login`, { usuario, contrasena })
      .pipe(tap((op) => this.setOperador(op)));
  }

  logout(): void {
    sessionStorage.removeItem(OperadorAuthService.STORAGE_KEY);
    this.operadorSubject.next(null);
  }

  setOperador(op: OperadorSession): void {
    sessionStorage.setItem(OperadorAuthService.STORAGE_KEY, JSON.stringify(op));
    this.operadorSubject.next(op);
  }

  private loadFromStorage(): OperadorSession | null {
    const raw = sessionStorage.getItem(OperadorAuthService.STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}