import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Operador } from '../operador';
import { OperadorService } from 'src/app/service/operador.service';

/**
 * Página contenedora del formulario de operador.
 * Detecta si está en modo creación o edición según la ruta.
 */
@Component({
  selector: 'app-operador-form-page',
  templateUrl: './operador-form-page.component.html',
  styleUrls: ['./operador-form-page.component.css'],
})
export class OperadorFormPageComponent implements OnInit {
  operadorEditar: Operador | null = null;
  modoEdicion = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private operadorService: OperadorService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.operadorService.findById(Number(id)).subscribe({
        next: (op) => {
          this.operadorEditar = { ...op };
          this.modoEdicion = true;
        },
        error: () => this.router.navigate(['/operadores']),
      });
    }
  }

  onGuardar(operador: Operador): void {
    this.operadorService.add(operador).subscribe(() => {
      this.router.navigate(['/operadores']);
    });
  }

  onActualizar(operador: Operador): void {
    this.operadorService.update(operador).subscribe(() => {
      this.router.navigate(['/operadores']);
    });
  }

  onCancelar(): void {
    this.router.navigate(['/operadores']);
  }
}
