import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Cliente } from '../../model/cliente-cl';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
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
    private router: Router,
  ) {}

  onLogin(): void {
    this.error = '';
    this.authService
      .login({ correo: this.correo, contrasena: this.contrasena })
      .subscribe({
        next: (cliente: Cliente) => {
          this.mensaje = `Bienvenido, ${cliente.nombre} ${cliente.apellido}`;
          this.error = '';
        },
        error: (err) => {
          this.error = err.error?.error || 'Credenciales inválidas';
          this.mensaje = '';
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
