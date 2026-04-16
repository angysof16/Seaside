import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../model/cliente-cl';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  client: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: '',
  };

  error = '';

  constructor(
    private authService: AuthService,
    private clienteService: ClienteService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const c = this.authService.currentCliente;
    if (!c) {
      this.router.navigate(['/login']);
      return;
    }
    this.clienteService.findById(c.id).subscribe({
      next: (cliente) => (this.client = { ...cliente }),
      error: () => this.router.navigate(['/login']),
    });
  }

  onSubmit(): void {
    this.error = '';
    this.clienteService.update(this.client).subscribe({
      next: () => {
        this.authService.setCliente(this.client);
        this.router.navigate(['/perfil']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al actualizar el perfil';
        console.error('Error updating profile:', err);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/perfil']);
  }
}
