// src/app/service/carrito.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Producto } from '../components/producto/producto';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private apiUrl = `${environment.apiUrl}/api/carrito`;
  private static STORAGE_KEY = 'seaside_carrito';

  private itemsSubject = new BehaviorSubject<ItemCarrito[]>(this.cargarLocal());
  items$ = this.itemsSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    // Cuando el usuario hace login, se sincorniza con la BD
    this.authService.cliente$.subscribe((cliente) => {
      if (cliente?.carrito?.id) {
        this.sincronizarDesdeBD(cliente.carrito.id);
      } else if (!cliente) {
        // Logout: limpiamos el estado local
        this.itemsSubject.next([]);
        localStorage.removeItem(CarritoService.STORAGE_KEY);
      }
    });
  }


  get items(): ItemCarrito[] {
    return this.itemsSubject.value;
  }

  get totalItems(): number {
    return this.items.reduce((sum, i) => sum + i.cantidad, 0);
  }

  get totalPrecio(): number {
    return this.items.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0);
  }


  agregarProducto(producto: Producto, cantidad: number = 1): void {
    const items = [...this.items];
    const idx = items.findIndex((i) => i.producto.id === producto.id);

    if (idx >= 0) {
      items[idx] = { ...items[idx], cantidad: items[idx].cantidad + cantidad };
    } else {
      items.push({ producto, cantidad });
    }

    this.actualizarEstado(items);

    // Persistir en BD si hay usuario logueado
    const carritoId = this.getCarritoId();
    if (carritoId) {
      this.http
        .post(`${this.apiUrl}/${carritoId}/items`, {
          productoId: producto.id,
          cantidad,
        })
        .subscribe();
    }
  }

  actualizarCantidad(productoId: number, cantidad: number): void {
    if (cantidad < 1) {
      this.quitarProducto(productoId);
      return;
    }

    const items = this.items.map((i) =>
      i.producto.id === productoId ? { ...i, cantidad } : i
    );
    this.actualizarEstado(items);

    const carritoId = this.getCarritoId();
    if (carritoId) {
      this.http
        .patch(`${this.apiUrl}/${carritoId}/items/${productoId}`, { cantidad })
        .subscribe();
    }
  }

  quitarProducto(productoId: number): void {
    const items = this.items.filter((i) => i.producto.id !== productoId);
    this.actualizarEstado(items);

    const carritoId = this.getCarritoId();
    if (carritoId) {
      this.http
        .delete(`${this.apiUrl}/${carritoId}/items/${productoId}`)
        .subscribe();
    }
  }

  vaciarCarrito(): void {
    this.actualizarEstado([]);

    const carritoId = this.getCarritoId();
    if (carritoId) {
      this.http.delete(`${this.apiUrl}/${carritoId}`).subscribe();
    }
  }

  // Obtener items desde BD y actualizar estado local
  sincronizarDesdeBD(carritoId: number): void {
    this.http
      .get<any[]>(`${this.apiUrl}/${carritoId}`)
      .subscribe({
        next: (items) => {
          const mapeados: ItemCarrito[] = items.map((item) => ({
            producto: item.producto,
            cantidad: item.cantidad,
          }));
          this.actualizarEstado(mapeados);
        },
        error: () => {
          // Si falla la BD, usamos el caché local sin interrumpir al usuario
          console.warn('CarritoService: no se pudo sincronizar con la BD');
        },
      });
  }

  // ── Helpers privados ──────────────────────────────────────────────────────

  private actualizarEstado(items: ItemCarrito[]): void {
    this.itemsSubject.next(items);
    localStorage.setItem(CarritoService.STORAGE_KEY, JSON.stringify(items));
  }

  private cargarLocal(): ItemCarrito[] {
    try {
      const raw = localStorage.getItem(CarritoService.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private getCarritoId(): number | null {
    return this.authService.currentCliente?.carrito?.id ?? null;
  }
}