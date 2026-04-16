import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../service/producto.service';

@Component({
  selector: 'app-menu-destacado',
  templateUrl: './menu-destacado.component.html',
  styleUrls: ['./menu-destacado.component.css'],
})
export class MenuDestacadoComponent implements OnInit {
  menuItems: { id: number; image: string; title: string; description: string }[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.findAll().subscribe((productos) => {
      this.menuItems = productos
        .filter((p) => p.categoria.id !== 2)
        .slice(0, 3)
        .map((p) => ({
          id: p.id,
          image: p.imageUrl || 'assets/IMGS/menuHighlight1.jpeg',
          title: p.nombre,
          description: p.descripcion,
        }));
    });
  }
}
