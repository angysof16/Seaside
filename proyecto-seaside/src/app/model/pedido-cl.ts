export class PedidoCl {
  id: number;
  fechaCreacion: string;
  fechaEntrega: string;
  estado: string;
  total: number;
  clienteId: number;

  constructor(
    id: number,
    fechaCreacion: string,
    fechaEntrega: string,
    estado: string,
    total: number,
    clienteId: number,
  ) {
    this.id = id;
    this.fechaCreacion = fechaCreacion;
    this.fechaEntrega = fechaEntrega;
    this.estado = estado;
    this.total = total;
    this.clienteId = clienteId;
  }
}
