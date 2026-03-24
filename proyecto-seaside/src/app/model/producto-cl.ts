export class ProductoCl {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagenUrl?: string;
  tiempoPreparacion: number;
  tieneAlergenos: boolean;
  descripcionAlergenos: string;

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    precio: number,
    categoria: string,
    tiempoPreparacion: number,
    tieneAlergenos: boolean,
    descripcionAlergenos: string,
    imagenUrl?: string,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.categoria = categoria;
    this.tiempoPreparacion = tiempoPreparacion;
    this.tieneAlergenos = tieneAlergenos;
    this.descripcionAlergenos = descripcionAlergenos;
    this.imagenUrl = imagenUrl;
  }
}
