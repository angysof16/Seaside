export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagenUrl?: string;
  tiempoPreparacion: number;
  tieneAlergenos: boolean;
  descripcionAlergenos: string;
}
