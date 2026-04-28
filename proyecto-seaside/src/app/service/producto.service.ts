import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../components/producto/producto';
import { AdicionalesCl } from '../model/adicionales-cl';
import { environment } from '../../environments/environment';

/**
 * Servicio para la gestión de productos del menú desde el frontend.
 * Consume la API REST de productos del backend (/api/products).
 */
@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = `${environment.apiUrl}/api/products`;

  constructor(private http: HttpClient) {}

  /** Devuelve todos los productos del menú. */
  findAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  /** Devuelve un producto por id junto con sus adicionales disponibles. */
  findById(
    id: number,
  ): Observable<{ product: Producto; adicionales: AdicionalesCl[] }> {
    return this.http.get<{ product: Producto; adicionales: AdicionalesCl[] }>(
      `${this.apiUrl}/${id}`,
    );
  }

  /** Crea un nuevo producto (excluye el id del body). */
  add(producto: Producto): Observable<any> {
    const { id, ...body } = producto;
    return this.http.post(this.apiUrl, body, { responseType: 'text' });
  }

  /** Actualiza los datos de un producto existente. */
  update(producto: Producto): Observable<any> {
    return this.http.put(this.apiUrl + '/' + producto.id, producto, {
      responseType: 'text',
    });
  }

  /** Elimina un producto por su id. */
  delete(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id, { responseType: 'text' });
  }

  /** Get all products in the Acompañamientos category (id: 2) */
  findAcompanamientos(): Observable<Producto[]> {
    return this.http
      .get<Producto[]>(this.apiUrl)
      .pipe(map((list) => list.filter((p) => p.categoria.id === 2)));
  }

  /** Get adicionales assigned to a product */
  getAdicionales(productId: number): Observable<AdicionalesCl[]> {
    return this.http
      .get<{
        product: Producto;
        adicionales: AdicionalesCl[];
      }>(`${this.apiUrl}/${productId}`)
      .pipe(map((resp) => resp.adicionales));
  }

  /** Set adicionales for a product */
  updateAdicionales(
    productId: number,
    adicionalIds: number[],
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${productId}/adicionales`,
      adicionalIds,
      { responseType: 'text' },
    );
  }
}
