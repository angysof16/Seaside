import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdicionalesCl } from 'src/app/model/adicionales-cl';
import { AdicionalService } from 'src/app/service/adicional.service';

@Component({
    selector: 'app-adicional-crud-table',
    templateUrl: './adicional-crud-table.component.html',
    styleUrls: ['./adicional-crud-table.component.css'],
})
export class AdicionalCrudTableComponent implements OnInit {
    /** Lista de adicionales cargados desde la API */
    adicionalList: AdicionalesCl[] = [];

    constructor(
        private adicionalService: AdicionalService,
        private router: Router
    ) { }

    /** Carga los adicionales al inicializar el componente */
    ngOnInit(): void {
        this.cargarAdicionales();
    }

    /** Llama al servicio para obtener todos los adicionales */
    cargarAdicionales(): void {
        this.adicionalService
            .findAll()
            .subscribe((list) => (this.adicionalList = list));
    }

    /** Navega al formulario de edición del adicional seleccionado */
    editarAdicional(adicional: AdicionalesCl): void {
        this.router.navigate(['/adicionales/editar', adicional.id]);
    }

    /** Elimina un adicional tras pedir confirmación al usuario */
    eliminarAdicional(adicional: AdicionalesCl): void {
        if (!confirm(`¿Eliminar el adicional "${adicional.nombre}"?`)) return;
        this.adicionalService.delete(adicional.id).subscribe(() => {
            this.cargarAdicionales();
        });
    }
}