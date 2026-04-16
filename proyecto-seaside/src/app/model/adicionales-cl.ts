export class AdicionalesCl {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenURL: string;
  tiempoPreparacion: number;
  tieneAlergenos: boolean;
  categoriaId: number;

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    precio: number,
    imagenURL: string,
    tiempoPreparacion: number,
    tieneAlergenos: boolean,
    categoriaId: number,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagenURL = imagenURL;
    this.tiempoPreparacion = tiempoPreparacion;
    this.tieneAlergenos = tieneAlergenos;
    this.categoriaId = categoriaId;
  }
}
