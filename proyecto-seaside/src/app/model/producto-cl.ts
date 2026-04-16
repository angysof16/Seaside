export class ProductoCl {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: { id: number; nombre: string };
  imageUrl?: string;
  tiempoMinutos: number;
  tieneAlergenos: boolean;
  descripcionAlergenos: string;

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    precio: number,
    categoria: { id: number; nombre: string },
    tiempoMinutos: number,
    tieneAlergenos: boolean,
    descripcionAlergenos: string,
    imageUrl?: string,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.categoria = categoria;
    this.tiempoMinutos = tiempoMinutos;
    this.tieneAlergenos = tieneAlergenos;
    this.descripcionAlergenos = descripcionAlergenos;
    this.imageUrl = imageUrl;
  }
}
