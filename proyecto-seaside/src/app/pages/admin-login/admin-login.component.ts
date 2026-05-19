import { Component, OnInit } from '@angular/core';
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
export class AdminLoginComponent implements OnInit {
  correo = '';
  contrasena = '';
  error = '';
  loading = false;

  constructor(
    private adminAuthService: AdminAuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.adminAuthService.isLoggedIn) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onLogin(): void {
    this.error = '';
    this.loading = true;

    this.adminAuthService.login(this.correo, this.contrasena).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/dashboard']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Correo o contraseña incorrectos';
      },
    });
  }
}
