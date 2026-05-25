import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const token = this.getToken();

    if (token) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(authRequest);
    }

    return next.handle(request);
  }

<<<<<<< Updated upstream
  private getToken(): string | null {
=======
    private getToken(): string | null {
    // Sesión de cliente
>>>>>>> Stashed changes
    const clienteRaw = localStorage.getItem('seaside_client');
    if (clienteRaw) {
      const cliente = JSON.parse(clienteRaw);
      if (cliente?.token) return cliente.token;
    }

<<<<<<< Updated upstream
=======
    // Sesión de admin
>>>>>>> Stashed changes
    const adminRaw = localStorage.getItem('seaside_admin');
    if (adminRaw) {
      const admin = JSON.parse(adminRaw);
      if (admin?.token) return admin.token;
    }

<<<<<<< Updated upstream
=======
    // Sesión de operador
>>>>>>> Stashed changes
    const operadorRaw = localStorage.getItem('seaside_operador');
    if (operadorRaw) {
      const operador = JSON.parse(operadorRaw);
      if (operador?.token) return operador.token;
    }

    return null;
  }
}
