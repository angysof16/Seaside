export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  direccion: string;
  carrito?: { id: number; ultimaActualizacion: string };
}

export class ClienteCl implements Cliente {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  direccion: string;
  carrito?: { id: number; ultimaActualizacion: string };

  constructor(
    id: number,
    nombre: string,
    apellido: string,
    correo: string,
    telefono: string,
    direccion: string,
    carrito?: { id: number; ultimaActualizacion: string },
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.telefono = telefono;
    this.direccion = direccion;
    this.carrito = carrito;
  }
}
