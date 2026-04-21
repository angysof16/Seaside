// src/app/model/crear-pedido-request.ts
// Matches exactly the backend PedidoRequest DTO

export interface ItemAdicionalRequest {
  adicionalId: number;
  cantidad: number;
}

export interface ItemPedidoRequest {
  productoId: number;
  cantidad: number;
  adicionales: ItemAdicionalRequest[];
}

export interface CrearPedidoRequest {
  clienteId: number;
  items: ItemPedidoRequest[];
}