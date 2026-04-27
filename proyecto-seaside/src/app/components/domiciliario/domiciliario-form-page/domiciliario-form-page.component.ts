import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomiciliarioService, Domiciliario } from '../../../service/domiciliario.service';

@Component({
    selector: 'app-domiciliario-form-page',
    templateUrl: './domiciliario-form-page.component.html',
    styleUrls: ['./domiciliario-form-page.component.css'],
})
export class DomiciliarioFormPageComponent implements OnInit {
    modoEdicion = false;
    error = '';

    // Datos del formulario
    form: Partial<Domiciliario> = {
        nombre: '',
        apellido: '',
        correo: '',
        contrasena: '',
        telefono: '',
        direccion: '',
        cedula: '',
        activo: true,
        disponible: true,
    };

    private editId: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private domiciliarioService: DomiciliarioService,
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.modoEdicion = true;
            this.editId = Number(id);
            this.domiciliarioService.findById(this.editId).subscribe({
                next: d => (this.form = { ...d }),
                error: () => this.router.navigate(['/admin/domiciliarios']),
            });
        }
    }

    guardar(): void {
        this.error = '';
        if (this.modoEdicion && this.editId) {
            this.domiciliarioService.update(this.editId, this.form).subscribe({
                next: () => this.router.navigate(['/admin/domiciliarios']),
                error: err => (this.error = err.error?.error || 'Error al actualizar'),
            });
        } else {
            this.domiciliarioService.create(this.form).subscribe({
                next: () => this.router.navigate(['/admin/domiciliarios']),
                error: err => (this.error = err.error?.error || 'Error al crear'),
            });
        }
    }

    cancelar(): void {
        this.router.navigate(['/admin/domiciliarios']);
    }
}