export class DomiciliarioCl {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  telefono: string;
  direccion: string;
  activo: boolean;
  cedula: string;
  disponible: boolean;
  pedidoId?: number;

  constructor(
    id: number,
    nombre: string,
    apellido: string,
    correo: string,
    contrasena: string,
    telefono: string,
    direccion: string,
    activo: boolean,
    cedula: string,
    disponible: boolean,
    pedidoId?: number,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.contrasena = contrasena;
    this.telefono = telefono;
    this.direccion = direccion;
    this.activo = activo;
    this.cedula = cedula;
    this.disponible = disponible;
    this.pedidoId = pedidoId;
  }
}
