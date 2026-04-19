import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OperadorAuthService } from '../../service/operador-auth.service';

@Component({
  selector: 'app-operador-login',
  templateUrl: './operador-login.component.html',
  styleUrls: ['./operador-login.component.css'],
})
export class OperadorLoginComponent {
  usuario   = '';
  contrasena = '';
  error     = '';
  loading   = false;

  constructor(
    private operadorAuthService: OperadorAuthService,
    private router: Router,
  ) {}

  onLogin(): void {
    this.error   = '';
    this.loading = true;

    this.operadorAuthService.login(this.usuario, this.contrasena).subscribe({
      next: () => {
        this.loading = false;
        // Redirige al portal de operador (tabla de pedidos)
        this.router.navigate(['/pedidos']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Usuario o contraseña incorrectos';
      },
    });
  }
}