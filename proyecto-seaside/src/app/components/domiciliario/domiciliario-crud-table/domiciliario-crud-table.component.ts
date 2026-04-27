import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomiciliarioService, Domiciliario } from '../../../service/domiciliario.service';

@Component({
    selector: 'app-domiciliario-crud-table',
    templateUrl: './domiciliario-crud-table.component.html',
    styleUrls: ['./domiciliario-crud-table.component.css'],
})
export class DomiciliarioCrudTableComponent implements OnInit {
    domiciliarioList: Domiciliario[] = [];

    constructor(
        private domiciliarioService: DomiciliarioService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.cargar();
    }

    cargar(): void {
        this.domiciliarioService.findAll().subscribe(list => (this.domiciliarioList = list));
    }

    editar(d: Domiciliario): void {
        this.router.navigate(['/admin/domiciliarios/editar', d.id]);
    }

    eliminar(d: Domiciliario): void {
        if (!confirm(`¿Eliminar a ${d.nombre} ${d.apellido}?`)) return;
        this.domiciliarioService.delete(d.id).subscribe(() => this.cargar());
    }

    toggleActivo(d: Domiciliario): void {
        this.domiciliarioService.setActivo(d.id, !d.activo).subscribe(() => this.cargar());
    }

    toggleDisponible(d: Domiciliario): void {
        this.domiciliarioService.setDisponibilidad(d.id, !d.disponible).subscribe(() => this.cargar());
    }
}