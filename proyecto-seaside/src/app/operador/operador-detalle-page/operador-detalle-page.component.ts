import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Operador } from '../operador';
import { OperadorService } from 'src/app/service/operador.service';

@Component({
  selector: 'app-operador-detalle-page',
  templateUrl: './operador-detalle-page.component.html',
  styleUrls: ['./operador-detalle-page.component.css'],
})
export class OperadorDetallePageComponent implements OnInit {
  operador: Operador | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private operadorService: OperadorService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.operador = this.operadorService.findById(Number(id)) ?? null;
    }
    if (!this.operador) {
      this.router.navigate(['/operadores']);
    }
  }

  editar(): void {
    this.router.navigate(['/operadores/editar', this.operador!.id]);
  }

  eliminar(): void {
    this.operadorService.delete(this.operador!.id);
    this.router.navigate(['/operadores']);
  }
}
