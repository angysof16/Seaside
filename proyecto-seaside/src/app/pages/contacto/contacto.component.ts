import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent {

  mensajeEnviado = false;

  enviarMensaje(): void {
    this.mensajeEnviado = true;
    setTimeout(() => (this.mensajeEnviado = false), 3000);
  }
}