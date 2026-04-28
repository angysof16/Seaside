import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Operador } from '../operador';
import { OperadorService } from 'src/app/service/operador.service';

/**
 * Tabla CRUD para la gestión de operadores desde el panel de administración.
 * Permite ver detalle, editar y eliminar operadores.
 */
@Component({
  selector: 'app-operador-crud-table',
  templateUrl: './operador-crud-table.component.html',
  styleUrls: ['./operador-crud-table.component.css'],
})
export class OperadorCrudTableComponent implements OnInit {
  operadorList: Operador[] = [];

  constructor(
    private operadorService: OperadorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarOperadores();
  }

  cargarOperadores(): void {
    this.operadorService
      .findAll()
      .subscribe((list) => (this.operadorList = list));
  }

  verDetalle(operador: Operador): void {
    this.router.navigate(['/operadores', operador.id]);
  }

  editarOperador(operador: Operador): void {
    this.router.navigate(['/operadores/editar', operador.id]);
  }

  eliminarOperador(operador: Operador): void {
    this.operadorService.delete(operador.id).subscribe(() => {
      this.cargarOperadores();
    });
  }
}
