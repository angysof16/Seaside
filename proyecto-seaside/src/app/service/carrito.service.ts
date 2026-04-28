// src/app/service/carrito.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { AdicionalesCl } from '../model/adicionales-cl';


export interface AdicionalSeleccionado {
  adicionalId: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export interface ItemCarrito {
  productoId: number;
  nombre: string;
  precio: number;
  imagen?: string;
  cantidad: number;
  adicionales: AdicionalSeleccionado[];
  adicionalesDisponibles: AdicionalesCl[];
  adicionalesCargados: boolean;
  mostrarAdicionales: boolean;
  cargandoAdicionales: boolean;
}

export interface EstadoCarrito {
  paso: number;
  platoPrincipalId: number | null;
  items: ItemCarrito[];
}

// ── Servicio ─────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private apiUrl = `${environment.apiUrl}/api/carrito`;
  private static STORAGE_KEY = 'seaside_carrito_estado';

  private estadoInicial: EstadoCarrito = { paso: 1, platoPrincipalId: null, items: [] };

  private estadoSubject = new BehaviorSubject<EstadoCarrito>(this.cargarLocal());
  estado$ = this.estadoSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  get estado(): EstadoCarrito {
    return this.estadoSubject.value;
  }

  get items(): ItemCarrito[] {
    return this.estado.items;
  }

  get totalItems(): number {
    return this.estado.items.reduce((sum, i) => sum + i.cantidad, 0);
  }

  get totalPrecio(): number {
    return this.estado.items.reduce((sum, i) => sum + this.calcularSubtotalItem(i), 0);
  }

  guardarEstado(estado: EstadoCarrito): void {
    this.estadoSubject.next({ ...estado });
    this.persistirLocal(estado);
  }

  vaciarCarrito(): void {
    const limpio: EstadoCarrito = { paso: 1, platoPrincipalId: null, items: [] };
    this.estadoSubject.next(limpio);
    localStorage.removeItem(CarritoService.STORAGE_KEY);

    // Limpiar en BD si hay usuario logueado
    const carritoId = this.getCarritoId();
    if (carritoId) {
      this.http.delete(`${this.apiUrl}/${carritoId}`).subscribe();
    }
  }


  calcularSubtotalItem(item: ItemCarrito): number {
    const sumAdicionales = item.adicionales.reduce(
      (sum, a) => sum + a.precio * a.cantidad, 0
    );
    return (item.precio + sumAdicionales) * item.cantidad;
  }



  private persistirLocal(estado: EstadoCarrito): void {
    // No guardamos adicionalesDisponibles (son datos de API, no del usuario)
    const aGuardar: EstadoCarrito = {
      ...estado,
      items: estado.items.map(i => ({
        ...i,
        adicionalesDisponibles: [],
        adicionalesCargados: false,
        mostrarAdicionales: false,
        cargandoAdicionales: false,
      }))
    };
    localStorage.setItem(CarritoService.STORAGE_KEY, JSON.stringify(aGuardar));
  }

  private cargarLocal(): EstadoCarrito {
    try {
      const raw = localStorage.getItem(CarritoService.STORAGE_KEY);
      return raw ? JSON.parse(raw) : { ...this.estadoInicial };
    } catch {
      return { ...this.estadoInicial };
    }
  }

  private getCarritoId(): number | null {
    return this.authService.currentCliente?.carrito?.id ?? null;
  }
}