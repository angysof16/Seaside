import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from './service/admin-auth.service';
import { AuthService } from './service/auth.service';
import { OperadorAuthService } from './service/operador-auth.service';

/**
 * Componente raíz de la aplicación Angular.
 * Sirve como punto de entrada y contenedor del router-outlet principal.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'proyecto-seaside';

  constructor(
    private router: Router,
    private authService: AuthService,
    private adminAuthService: AdminAuthService,
    private operadorAuthService: OperadorAuthService,
  ) {}

  ngOnInit(): void {
    const currentPath = this.router.url;
    const basePath = currentPath.split('?')[0].replace(/\/+$/, '') || '/';
    const isLoginRoute =
      basePath === '/login' ||
      basePath === '/admin/login' ||
      basePath === '/operador/login';

    if (
      this.adminAuthService.isLoggedIn &&
      (basePath === '/' || isLoginRoute)
    ) {
      this.router.navigate(['/admin/dashboard']);
      return;
    }

    if (
      this.operadorAuthService.isLoggedIn &&
      (basePath === '/' || isLoginRoute)
    ) {
      this.router.navigate(['/pedidos']);
      return;
    }

    if (this.authService.isLoggedIn && (basePath === '/' || isLoginRoute)) {
      this.router.navigate(['/menu']);
    }
  }
}
