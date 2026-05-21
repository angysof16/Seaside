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
    // Usar /api/auth/me en lugar de /api/clients/:id (que requiere ADMINISTRADOR)
    this.clienteService.getCurrentClient().subscribe({
      next: (cliente) => {
        // Preservar el token: el backend no lo devuelve en /api/auth/me
        const token = this.authService.currentCliente?.token;
        if (token) cliente.token = token;
        this.client = cliente;
        this.authService.setCliente(cliente);
      },
      error: (err) => {
        // Si el token es inválido, limpiar sesión para evitar loop login→menu
        if (err.status === 401) this.authService.logout();
        this.router.navigate(['/login']);
      },
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

    this.clienteService.deleteCurrentClient().subscribe({
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
