import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdicionalesCl } from 'src/app/model/adicionales-cl';
import { AdicionalService } from 'src/app/service/adicional.service';

@Component({
    selector: 'app-adicional-form-page',
    templateUrl: './adicional-form-page.component.html',
    styleUrls: ['./adicional-form-page.component.css'],
})
export class AdicionalFormPageComponent implements OnInit {
    /** Adicional cargado para edición; null cuando se está creando uno nuevo */
    adicionalEditar: AdicionalesCl | null = null;

    /** Indica si la página está en modo edición */
    modoEdicion = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private adicionalService: AdicionalService
    ) { }

    /**
     * Al inicializar, verifica si hay un ':id' en la ruta.
     * Si existe, carga el adicional correspondiente para editar.
     */
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.adicionalService.findById(Number(id)).subscribe({
                next: (a) => {
                    this.adicionalEditar = { ...a };
                    this.modoEdicion = true;
                },
                error: () => this.router.navigate(['/adicionales']),
            });
        }
    }

    /** Maneja el evento de guardar un nuevo adicional */
    onGuardar(adicional: AdicionalesCl): void {
        this.adicionalService.add(adicional).subscribe({
            next: () => this.router.navigate(['/adicionales']),
            error: (err) => console.error('Error al crear adicional:', err),
        });
    }

    /** Maneja el evento de actualizar un adicional existente */
    onActualizar(adicional: AdicionalesCl): void {
        this.adicionalService.update(adicional).subscribe({
            next: () => this.router.navigate(['/adicionales']),
            error: (err) => console.error('Error al actualizar adicional:', err),
        });
    }

    /** Maneja el evento de cancelar y vuelve a la lista */
    onCancelar(): void {
        this.router.navigate(['/adicionales']);
    }
}