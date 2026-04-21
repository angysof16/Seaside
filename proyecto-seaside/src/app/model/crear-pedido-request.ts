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
  platoPrincipalId: number;
  fechaEntrega: string;
  items: ItemPedidoRequest[];
}

export interface PedidoDetalleAdicional {
  adicional: { id: number; nombre: string; precio: number };
  cantidad: number;
  subtotal: number;
}

export interface PedidoDetalleItem {
  id: number;
  producto: { id: number; nombre: string; precio: number };
  cantidad: number;
  subtotal: number;
  adicionales: PedidoDetalleAdicional[];
}

export interface PedidoDetalleResponse {
  id: number;
  fechaCreacion: string;
  fechaEntrega: string;
  estado: string;
  total: number;
  platoPrincipal: { id: number; nombre: string; precio: number };
  cliente: { id: number; nombre: string; apellido: string };
  items: PedidoDetalleItem[];
}
