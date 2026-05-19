import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AdminAuthService } from '../../service/admin-auth.service';
import { OperadorAuthService } from '../../service/operador-auth.service';
import { Cliente } from '../../model/cliente-cl';

/**
 * Página de autenticación de clientes.
 * Permite iniciar sesión con correo y contraseña, o registrar una cuenta nueva.
 * Alterna entre los formularios de login y registro mediante toggleRegistro().
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Login
  correo = '';
  contrasena = '';

  // Signup
  mostrarRegistro = false;
  nombre = '';
  apellido = '';
  signupCorreo = '';
  signupContrasena = '';
  telefono = '';
  direccion = '';

  error = '';
  mensaje = '';

  constructor(
    private authService: AuthService,
    private adminAuthService: AdminAuthService,
    private operadorAuthService: OperadorAuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.adminAuthService.isLoggedIn) {
      this.router.navigate(['/admin/dashboard']);
      return;
    }

    if (this.operadorAuthService.isLoggedIn) {
      this.router.navigate(['/pedidos']);
      return;
    }

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/menu']);
    }
  }

  onLogin(): void {
    this.error = '';
    this.authService
      .login({ correo: this.correo, contrasena: this.contrasena })
      .subscribe({
        next: (response: any) => {
          // Si el backend provee rol, valida que sea cliente.
          if (response?.rol && response.rol !== 'CLIENTE') {
            this.authService.logout();
            this.error =
              'Esta cuenta no es de cliente. Usa el acceso correspondiente.';
            return;
          }
          this.router.navigate(['/menu']);
        },
        error: () => {
          this.error = 'Correo o contraseña incorrectos';
        },
      });
  }

  onSignup(): void {
    this.error = '';
    this.authService
      .signup({
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.signupCorreo,
        contrasena: this.signupContrasena,
        telefono: this.telefono,
        direccion: this.direccion,
      })
      .subscribe({
        next: (cliente: Cliente) => {
          this.mensaje = `Cuenta creada exitosamente. Bienvenido, ${cliente.nombre}`;
          this.mostrarRegistro = false;
          this.error = '';
        },
        error: (err) => {
          this.error = err.error?.error || 'Error al registrarse';
          this.mensaje = '';
        },
      });
  }

  toggleRegistro(): void {
    this.mostrarRegistro = !this.mostrarRegistro;
    this.error = '';
    this.mensaje = '';
  }
}
