import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AdminAuthService } from '../../service/admin-auth.service';
import { environment } from '../../../environments/environment';

export interface ProductoRanking {
  productoId: number;
  nombre: string;
  totalPedidos: number;
  totalUnidades: number;
}

@Component({
  selector: 'app-admin-metricas',
  templateUrl: './admin-metricas.component.html',
  styleUrls: ['./admin-metricas.component.css'],
})
export class AdminMetricasComponent implements OnInit {
  ranking: ProductoRanking[] = [];
  cargando = true;
  error = '';
  totalPedidos = 0;

  constructor(
    private adminAuthService: AdminAuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (!this.adminAuthService.currentAdmin) {
      this.router.navigate(['/admin/login']);
      return;
    }
    this.cargarMetricas();
  }

  cargarMetricas(): void {
    this.cargando = true;
    this.error = '';

    this.http.get<any[]>(`${environment.apiUrl}/api/pedidos`).pipe(
      switchMap(pedidos => {
        this.totalPedidos = pedidos.length;
        if (!pedidos.length) return of([]);
        const itemRequests = pedidos.map(p =>
          this.http.get<any[]>(`${environment.apiUrl}/api/pedidos/${p.id}/items`)
            .pipe(catchError(() => of([])))
        );
        return forkJoin(itemRequests);
      }),
      map((todosLosItems: any[][]) => {
        const conteo: Record<number, ProductoRanking> = {};
        todosLosItems.forEach(items => {
          items.forEach(item => {
            const id = item.producto?.id;
            const nombre = item.producto?.nombre ?? 'Desconocido';
            if (!id) return;
            if (!conteo[id]) {
              conteo[id] = { productoId: id, nombre, totalPedidos: 0, totalUnidades: 0 };
            }
            conteo[id].totalPedidos++;
            conteo[id].totalUnidades += item.cantidad ?? 1;
          });
        });
        return Object.values(conteo).sort((a, b) => b.totalUnidades - a.totalUnidades);
      })
    ).subscribe({
      next: ranking => {
        this.ranking = ranking;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las métricas.';
        this.cargando = false;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}