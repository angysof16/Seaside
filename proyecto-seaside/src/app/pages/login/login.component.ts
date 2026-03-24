import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  correo    = '';
  contrasena = '';

  onLogin(): void {
    alert('Inicio de sesión en construcción.');
  }
}