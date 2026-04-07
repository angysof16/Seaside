import { Injectable } from '@angular/core';
import { Operador } from '../operador/operador';
import { OperadorCl } from '../model/operador-cl';

@Injectable({
  providedIn: 'root',
})
export class OperadorService {
  operadorList: Operador[] = [
    new OperadorCl(1, 'Carlos Méndez', 'cmendez', 'pass123'),
    new OperadorCl(2, 'Laura Gómez', 'lgomez', 'pass456'),
    new OperadorCl(3, 'Andrés Ruiz', 'aruiz', 'pass789'),
  ];

  findAll(): Operador[] {
    return this.operadorList;
  }

  findById(id: number): Operador | undefined {
    return this.operadorList.find((o) => o.id === id);
  }

  add(operador: Operador): void {
    const maxId = this.operadorList.reduce((max, o) => Math.max(max, o.id), 0);
    operador.id = maxId + 1;
    this.operadorList = [...this.operadorList, operador];
  }

  update(operador: Operador): void {
    const index = this.operadorList.findIndex((o) => o.id === operador.id);
    if (index !== -1) {
      const updated = [...this.operadorList];
      updated[index] = { ...operador };
      this.operadorList = updated;
    }
  }

  delete(id: number): void {
    this.operadorList = this.operadorList.filter((o) => o.id !== id);
  }
}
