import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../model/cliente-cl';

/**
 * Página de perfil del cliente autenticado.
 * Carga los datos frescos del cliente desde el backend al inicializar.
 * Permite eliminar la cuenta y cerrar sesión.
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  client: Cliente | null = null;

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
    // Fetch fresh data from backend
    this.clienteService.findById(c.id).subscribe({
      next: (cliente) => {
        this.client = cliente;
        this.authService.setCliente(cliente);
      },
      error: () => this.router.navigate(['/login']),
    });
  }

  onDelete(): void {
    if (!this.client) return;
    if (
      !confirm(
        '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
      )
    )
      return;

    this.clienteService.delete(this.client.id).subscribe({
      next: () => {
        this.authService.logout();
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Error deleting account:', err),
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
