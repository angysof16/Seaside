export class OperadorCl {
  id: number;
  nombre: string;
  usuario: string;
  contrasena: string;

  constructor(id: number, nombre: string, usuario: string, contrasena: string) {
    this.id = id;
    this.nombre = nombre;
    this.usuario = usuario;
    this.contrasena = contrasena;
  }
}
