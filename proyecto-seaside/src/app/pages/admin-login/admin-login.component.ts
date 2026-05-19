import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../service/admin-auth.service';

/**
 * Página de login para administradores.
 * Redirige al dashboard de administrador tras autenticarse correctamente.
 */
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  correo = '';
  contrasena = '';
  error = '';
  loading = false;

  constructor(
    private adminAuthService: AdminAuthService,
    private router: Router,
  ) {}

  onLogin(): void {
  this.error = '';
  this.loading = true;

  this.adminAuthService.login(this.correo, this.contrasena).subscribe({
    next: (response: any) => {
      this.loading = false;
      // Si el rol no es ADMINISTRADOR, rechaza el acceso
      if (response.rol !== 'ADMINISTRADOR') {
        this.adminAuthService.logout();
        this.error = 'Esta cuenta no tiene permisos de administrador.';
        return;
      }
      this.router.navigate(['/admin/dashboard']);
    },
    error: () => {
      this.loading = false;
      this.error = 'Correo o contraseña incorrectos';
    },
  });
}
}
