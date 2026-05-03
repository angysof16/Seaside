export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: { id: number; nombre: string };
  imageUrl?: string;
  tiempoMinutos: number;
  tieneAlergenos: boolean;
  descripcionAlergenos: string;
}
