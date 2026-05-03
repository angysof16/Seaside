import { Component, OnInit } from '@angular/core';
import { VisitanosService, Sede } from '../../service/visitanos.service';

/**
 * Página "Vísítanos" que muestra las sedes del restaurante.
 * Los datos de las sedes se obtienen desde VisitanosService.
 */
@Component({
  selector: 'app-visitanos',
  templateUrl: './visitanos.component.html',
  styleUrls: ['./visitanos.component.css'],
})
export class VisitanosComponent implements OnInit {
  sedes: Sede[] = [];

  constructor(private visitanosService: VisitanosService) {}

  ngOnInit(): void {
    this.visitanosService.getSedes().subscribe((data) => (this.sedes = data));
  }
}
