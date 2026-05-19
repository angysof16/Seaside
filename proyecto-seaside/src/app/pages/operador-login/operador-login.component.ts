import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperadorAuthService } from '../../service/operador-auth.service';

/**
 * Página de login para operadores.
 * Redirige al portal de operador (tabla de pedidos) tras autenticarse correctamente.
 */
@Component({
  selector: 'app-operador-login',
  templateUrl: './operador-login.component.html',
  styleUrls: ['./operador-login.component.css'],
})
export class OperadorLoginComponent implements OnInit {
  usuario = '';
  contrasena = '';
  error = '';
  loading = false;

  constructor(
    private operadorAuthService: OperadorAuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.operadorAuthService.isLoggedIn) {
      this.router.navigate(['/pedidos']);
    }
  }

  onLogin(): void {
    this.error = '';
    this.loading = true;

    this.operadorAuthService.login(this.usuario, this.contrasena).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/pedidos']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Usuario o contraseña incorrectos';
      },
    });
  }

  logout(): void {
    this.operadorAuthService.logout();
    this.router.navigate(['/']);
  }
}
