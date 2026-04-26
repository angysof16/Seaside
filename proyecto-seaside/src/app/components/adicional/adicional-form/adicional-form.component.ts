import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdicionalesCl } from 'src/app/model/adicionales-cl';

@Component({
    selector: 'app-adicional-form',
    templateUrl: './adicional-form.component.html',
    styleUrls: ['./adicional-form.component.css'],
})
export class AdicionalFormComponent implements OnChanges {
    /** Adicional a editar; si es null el formulario está en modo creación */
    @Input() adicionalEditar: AdicionalesCl | null = null;

    /** Emitido cuando se guarda un nuevo adicional */
    @Output() addAdicionalEvent = new EventEmitter<AdicionalesCl>();
    /** Emitido cuando se actualiza un adicional existente */
    @Output() updateAdicionalEvent = new EventEmitter<AdicionalesCl>();
    /** Emitido cuando el usuario cancela la edición */
    @Output() cancelarEvent = new EventEmitter<void>();

    /** Indica si el formulario está en modo edición */
    editando = false;

    /** Categorías disponibles para seleccionar en el formulario */
    readonly categorias = [
        { id: 1, nombre: 'Platos Fuertes' },
        { id: 2, nombre: 'Acompañamientos' },
        { id: 3, nombre: 'Bebidas' },
        { id: 4, nombre: 'Postres' },
        { id: 5, nombre: 'Entradas' },
    ];

    /** Datos del formulario en progreso */
    formAdicional: AdicionalesCl = this.emptyForm();

    /** Detecta cambios en el input adicionalEditar para cargar los datos */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['adicionalEditar'] && this.adicionalEditar) {
            this.formAdicional = { ...this.adicionalEditar };
            this.editando = true;
        }
    }

    /** Valida y emite el evento correspondiente (crear o actualizar) */
    guardar(form: NgForm): void {
        if (form.invalid) return;

        const adicional: AdicionalesCl = { ...this.formAdicional };

        if (this.editando) {
            this.updateAdicionalEvent.emit(adicional);
            this.editando = false;
        } else {
            adicional.id = 0; // El backend asigna el ID real
            this.addAdicionalEvent.emit(adicional);
        }

        this.resetForm(form);
    }

    /** Cancela la edición y limpia el formulario */
    cancelarEdicion(): void {
        this.editando = false;
        this.formAdicional = this.emptyForm();
        this.cancelarEvent.emit();
    }

    /** Limpia el formulario volviendo al estado inicial */
    private resetForm(form: NgForm): void {
        this.formAdicional = this.emptyForm();
        form.resetForm(this.formAdicional);
    }

    /** Retorna un objeto AdicionalesCl vacío con valores por defecto */
    private emptyForm(): AdicionalesCl {
        return {
            id: 0,
            nombre: '',
            descripcion: '',
            precio: 0,
            imagenURL: '',
            tiempoPreparacion: 5,
            tieneAlergenos: false,
            categoria: { id: 1, nombre: 'Platos Fuertes' },
        };
    }
}