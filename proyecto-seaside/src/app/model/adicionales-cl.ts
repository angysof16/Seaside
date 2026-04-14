export class AdicionalesCl {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenURL: string;
  tiempoPreparacion: number;
  tieneAlergenos: boolean;
  categoria: { id: number; nombre: string };

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    precio: number,
    imagenURL: string,
    tiempoPreparacion: number,
    tieneAlergenos: boolean,
    categoria: { id: number; nombre: string },
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagenURL = imagenURL;
    this.tiempoPreparacion = tiempoPreparacion;
    this.tieneAlergenos = tieneAlergenos;
    this.categoria = categoria;
  }
}
