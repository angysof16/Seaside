import { Component, OnInit } from '@angular/core';
import { MenuService, Categoria } from '../../service/menu.service';
import { ProductoService } from '../../service/producto.service';
import { Producto } from '../../components/producto/producto';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  categorias: Categoria[] = [];
  productosPorCategoria: { [key: number]: Producto[] } = {};

  constructor(
    private menuService: MenuService,
    private productoService: ProductoService,
  ) {}

  ngOnInit(): void {
    this.menuService.getCategorias().subscribe((cats) => {
      this.categorias = cats.filter((c) => c.id !== 2);
    });
    this.productoService.findAll().subscribe((productos) => {
      productos.forEach((p) => {
        const catId = p.categoria.id;
        if (!this.productosPorCategoria[catId]) {
          this.productosPorCategoria[catId] = [];
        }
        this.productosPorCategoria[catId].push(p);
      });
    });
  }
}
