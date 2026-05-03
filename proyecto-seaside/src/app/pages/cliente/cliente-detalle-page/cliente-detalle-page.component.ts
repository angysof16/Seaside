// cliente-detalle-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../model/cliente-cl';
import { ClienteService } from 'src/app/service/cliente.service';

/**
 * Página de detalle de un cliente.
 * Carga el cliente por id desde la ruta y permite editarlo o eliminarlo.
 */
@Component({
  selector: 'app-cliente-detalle-page',
  templateUrl: './cliente-detalle-page.component.html',
  styleUrls: ['./cliente-detalle-page.component.css'],
})
export class ClienteDetallePageComponent implements OnInit {
  cliente: Cliente | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clienteService.findById(Number(id)).subscribe({
        next: (c) => (this.cliente = c),
        error: () => this.router.navigate(['/clientes']),
      });
    } else {
      this.router.navigate(['/clientes']);
    }
  }

  editar(): void {
    this.router.navigate(['/clientes/editar', this.cliente!.id]);
  }

  eliminar(): void {
    if (!confirm(`¿Eliminar al cliente ${this.cliente!.nombre}?`)) return;
    this.clienteService.delete(this.cliente!.id).subscribe(() => {
      this.router.navigate(['/clientes']);
    });
  }
}
