export class AdministradorCl {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  telefono: string;
  direccion: string;

  constructor(
    id: number,
    nombre: string,
    apellido: string,
    correo: string,
    contrasena: string,
    telefono: string,
    direccion: string,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.contrasena = contrasena;
    this.telefono = telefono;
    this.direccion = direccion;
  }
}
