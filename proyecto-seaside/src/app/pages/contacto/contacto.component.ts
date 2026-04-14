import { Component, OnInit } from '@angular/core';
import { ContactoService, ContactoInfo } from '../../service/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent implements OnInit {
  mensajeEnviado = false;
  contacto: ContactoInfo | null = null;

  constructor(private contactoService: ContactoService) {}

  ngOnInit(): void {
    this.contactoService
      .getContacto()
      .subscribe((data) => (this.contacto = data));
  }

  enviarMensaje(): void {
    this.mensajeEnviado = true;
    setTimeout(() => (this.mensajeEnviado = false), 3000);
  }
}
