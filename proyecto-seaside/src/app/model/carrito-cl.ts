export class CarritoCl {
  id: number;
  ultimaActualizacion: string;
  clienteId?: number;

  constructor(id: number, ultimaActualizacion: string, clienteId?: number) {
    this.id = id;
    this.ultimaActualizacion = ultimaActualizacion;
    this.clienteId = clienteId;
  }
}
