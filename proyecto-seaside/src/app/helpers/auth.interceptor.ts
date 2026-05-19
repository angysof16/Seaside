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
    next: HttpHandler
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

  private getToken(): string | null {
    const clienteRaw = sessionStorage.getItem('seaside_client');
    if (clienteRaw) {
      const cliente = JSON.parse(clienteRaw);
      if (cliente?.token) return cliente.token;
    }

    const adminRaw = sessionStorage.getItem('seaside_admin');
    if (adminRaw) {
      const admin = JSON.parse(adminRaw);
      if (admin?.token) return admin.token;
    }

    const operadorRaw = sessionStorage.getItem('seaside_operador');
    if (operadorRaw) {
      const operador = JSON.parse(operadorRaw);
      if (operador?.token) return operador.token;
    }

    return null;
  }
}