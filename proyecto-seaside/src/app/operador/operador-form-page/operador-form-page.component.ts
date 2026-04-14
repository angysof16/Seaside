import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Operador } from '../operador';
import { OperadorService } from 'src/app/service/operador.service';

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
      const found = this.operadorService.findById(Number(id));
      if (found) {
        this.operadorEditar = { ...found };
        this.modoEdicion = true;
      }
    }
  }

  onGuardar(operador: Operador): void {
    this.operadorService.add(operador);
    this.router.navigate(['/operadores']);
  }

  onActualizar(operador: Operador): void {
    this.operadorService.update(operador);
    this.router.navigate(['/operadores']);
  }

  onCancelar(): void {
    this.router.navigate(['/operadores']);
  }
}
