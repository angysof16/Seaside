// src/app/service/domiciliario.service.ts
import { Injectable } from '@angular/core';
import { DomiciliarioCl } from '../model/domiciliario-cl';

export interface Domiciliario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  telefono: string;
  direccion: string;
  activo: boolean;
  cedula: string;
  disponible: boolean;
  pedidoId?: number;
}

@Injectable({ providedIn: 'root' })
export class DomiciliarioService {
  domiciliarioList: Domiciliario[] = [
    new DomiciliarioCl(
      1,
      'Pedro',
      'Sánchez',
      '',
      '',
      '3101234567',
      '',
      true,
      '123456',
      true,
    ),
    new DomiciliarioCl(
      2,
      'María',
      'López',
      '',
      '',
      '3207654321',
      '',
      true,
      '654321',
      true,
    ),
    new DomiciliarioCl(
      3,
      'Jorge',
      'Martínez',
      '',
      '',
      '3159876543',
      '',
      true,
      '789012',
      false,
    ),
  ];

  findAll(): Domiciliario[] {
    return this.domiciliarioList;
  }

  findDisponibles(): Domiciliario[] {
    return this.domiciliarioList.filter((d) => d.disponible);
  }

  setDisponibilidad(id: number, disponible: boolean): void {
    const index = this.domiciliarioList.findIndex((d) => d.id === id);
    if (index !== -1) {
      this.domiciliarioList[index] = {
        ...this.domiciliarioList[index],
        disponible,
      };
    }
  }
}
