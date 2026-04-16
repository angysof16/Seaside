export class ClienteCl {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  telefono: string;
  direccion: string;
  carritoId?: number;

  constructor(
    id: number,
    nombre: string,
    apellido: string,
    correo: string,
    contrasena: string,
    telefono: string,
    direccion: string,
    carritoId?: number,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.contrasena = contrasena;
    this.telefono = telefono;
    this.direccion = direccion;
    this.carritoId = carritoId;
  }
}
