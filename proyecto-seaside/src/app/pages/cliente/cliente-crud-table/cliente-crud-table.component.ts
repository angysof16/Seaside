// cliente-crud-table.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente-cl';
import { ClienteService } from 'src/app/service/cliente.service';

/**
 * Tabla CRUD para la gestión de clientes desde el panel de administración.
 * Permite ver detalle, editar y eliminar clientes.
 */
@Component({
  selector: 'app-cliente-crud-table',
  templateUrl: './cliente-crud-table.component.html',
  styleUrls: ['./cliente-crud-table.component.css'],
})
export class ClienteCrudTableComponent implements OnInit {
  clienteList: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService
      .findAll()
      .subscribe((list) => (this.clienteList = list));
  }

  verDetalle(cliente: Cliente): void {
    this.router.navigate(['/clientes', cliente.id]);
  }

  editarCliente(cliente: Cliente): void {
    this.router.navigate(['/clientes/editar', cliente.id]);
  }

  eliminarCliente(cliente: Cliente): void {
    if (!confirm(`¿Eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`))
      return;
    this.clienteService.delete(cliente.id).subscribe(() => {
      this.cargarClientes();
    });
  }
}
