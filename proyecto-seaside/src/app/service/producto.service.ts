import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../components/producto/producto';
import { AdicionalesCl } from '../model/adicionales-cl';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = `${environment.apiUrl}/api/products`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  findById(
    id: number,
  ): Observable<{ product: Producto; adicionales: AdicionalesCl[] }> {
    return this.http.get<{ product: Producto; adicionales: AdicionalesCl[] }>(
      `${this.apiUrl}/${id}`,
    );
  }

  add(producto: Producto): Observable<any> {
    return this.http.post(this.apiUrl, producto, { responseType: 'text' });
  }

  update(producto: Producto): Observable<any> {
    return this.http.put(this.apiUrl + '/' + producto.id, producto, {
      responseType: 'text',
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id, { responseType: 'text' });
  }
}
