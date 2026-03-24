export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoriaId: number;
  imageUrl?: string;
  tiempoMinutos: number;
  tieneAlergenos: boolean;
  descripcionAlergenos: string;
}
