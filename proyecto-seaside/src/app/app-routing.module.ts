import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { VisitanosComponent } from './pages/visitanos/visitanos.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductoTableComponent } from './producto/producto-table/producto-table.component';
import { ProductoFormPageComponent } from './producto/producto-form-page/producto-form-page.component';
import { ProductoDetallePageComponent } from './producto/producto-detalle-page/producto-detalle-page.component';
import { ErrorPageComponent } from './errors/error-page/error-page.component';
import { OperadorTableComponent } from './operador/operador-table/operador-table.component';
import { OperadorFormPageComponent } from './operador/operador-form-page/operador-form-page.component';
import { OperadorDetallePageComponent } from './operador/operador-detalle-page/operador-detalle-page.component';
import { OperadorCrudTableComponent } from './operador/operador-crud-table/operador-crud-table.component';

// ─── CLIENTES ────────────────────────────────────────────────────────────────
import { ClienteCrudTableComponent } from './cliente/cliente-crud-table/cliente-crud-table.component';
import { ClienteFormPageComponent } from './cliente/cliente-form-page/cliente-form-page.component';
import { ClienteDetallePageComponent } from './cliente/cliente-detalle-page/cliente-detalle-page.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'visitanos', component: VisitanosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductoTableComponent },
  { path: 'productos/nuevo', component: ProductoFormPageComponent },
  { path: 'productos/editar/:id', component: ProductoFormPageComponent },
  { path: 'productos/:id', component: ProductoDetallePageComponent },
  { path: 'pedidos', component: OperadorTableComponent },
  { path: 'operadores', component: OperadorCrudTableComponent },
  { path: 'operadores/nuevo', component: OperadorFormPageComponent },
  { path: 'operadores/editar/:id', component: OperadorFormPageComponent },
  { path: 'operadores/:id', component: OperadorDetallePageComponent },
  // ─── Clientes ───────────────────────────────────────────────────────────────
  { path: 'clientes', component: ClienteCrudTableComponent },
  { path: 'clientes/nuevo', component: ClienteFormPageComponent },
  { path: 'clientes/editar/:id', component: ClienteFormPageComponent },
  { path: 'clientes/:id', component: ClienteDetallePageComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}