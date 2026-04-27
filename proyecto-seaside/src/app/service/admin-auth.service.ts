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

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
    private static STORAGE_KEY = 'seaside_admin';
    private apiUrl = `${environment.apiUrl}/api/admin/auth`;

    private adminSubject = new BehaviorSubject<AdminSession | null>(this.loadFromStorage());
    admin$ = this.adminSubject.asObservable();

    constructor(private http: HttpClient) { }

    get currentAdmin(): AdminSession | null {
        return this.adminSubject.value;
    }

    get isLoggedIn(): boolean {
        return this.adminSubject.value !== null;
    }

    login(correo: string, contrasena: string): Observable<AdminSession> {
        return this.http
            .post<AdminSession>(`${this.apiUrl}/login`, { correo, contrasena })
            .pipe(tap(admin => this.setAdmin(admin)));
    }

    logout(): void {
        sessionStorage.removeItem(AdminAuthService.STORAGE_KEY);
        this.adminSubject.next(null);
    }

    setAdmin(admin: AdminSession): void {
        sessionStorage.setItem(AdminAuthService.STORAGE_KEY, JSON.stringify(admin));
        this.adminSubject.next(admin);
    }

    private loadFromStorage(): AdminSession | null {
        const raw = sessionStorage.getItem(AdminAuthService.STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    }
}