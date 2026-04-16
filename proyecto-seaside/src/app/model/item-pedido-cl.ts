export class ItemPedidoCl {
  id: number;
  cantidad: number;
  subtotal: number;
  pedidoId: number;
  productoId: number;

  constructor(
    id: number,
    cantidad: number,
    subtotal: number,
    pedidoId: number,
    productoId: number,
  ) {
    this.id = id;
    this.cantidad = cantidad;
    this.subtotal = subtotal;
    this.pedidoId = pedidoId;
    this.productoId = productoId;
  }
}
