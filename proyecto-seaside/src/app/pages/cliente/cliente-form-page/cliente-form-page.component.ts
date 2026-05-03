// cliente-form-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../model/cliente-cl';
import { ClienteService } from 'src/app/service/cliente.service';

/**
 * Página contenedora del formulario de cliente.
 * Detecta si está en modo creación o edición según la ruta.
 */
@Component({
  selector: 'app-cliente-form-page',
  templateUrl: './cliente-form-page.component.html',
  styleUrls: ['./cliente-form-page.component.css'],
})
export class ClienteFormPageComponent implements OnInit {
  clienteEditar: Cliente | null = null;
  modoEdicion = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clienteService.findById(Number(id)).subscribe({
        next: (c) => {
          this.clienteEditar = { ...c };
          this.modoEdicion = true;
        },
        error: () => this.router.navigate(['/clientes']),
      });
    }
  }

  onGuardar(cliente: Cliente): void {
    this.clienteService.add(cliente).subscribe(() => {
      this.router.navigate(['/clientes']);
    });
  }

  onActualizar(cliente: Cliente): void {
    this.clienteService.update(cliente).subscribe(() => {
      this.router.navigate(['/clientes']);
    });
  }

  onCancelar(): void {
    this.router.navigate(['/clientes']);
  }
}
