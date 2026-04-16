import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { VisitanosComponent } from './pages/visitanos/visitanos.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductoTableComponent } from './components/producto/producto-table/producto-table.component';
import { ProductoFormPageComponent } from './components/producto/producto-form-page/producto-form-page.component';
import { ProductoDetallePageComponent } from './components/producto/producto-detalle-page/producto-detalle-page.component';
import { ProductoCrearComponent } from './components/producto/producto-crear/producto-crear.component';
import { ErrorPageComponent } from './errors/error-page/error-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { OperadorTableComponent } from './components/operador/operador-table/operador-table.component';
import { OperadorFormPageComponent } from './components/operador/operador-form-page/operador-form-page.component';
import { OperadorDetallePageComponent } from './components/operador/operador-detalle-page/operador-detalle-page.component';
import { OperadorCrudTableComponent } from './components/operador/operador-crud-table/operador-crud-table.component';

// ─── CLIENTES ────────────────────────────────────────────────────────────────
import { ClienteCrudTableComponent } from './components/cliente/cliente-crud-table/cliente-crud-table.component';
import { ClienteFormPageComponent } from './components/cliente/cliente-form-page/cliente-form-page.component';
import { ClienteDetallePageComponent } from './components/cliente/cliente-detalle-page/cliente-detalle-page.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'visitanos', component: VisitanosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'perfil/editar', component: ProfileEditComponent },
  { path: 'productos', component: ProductoTableComponent },
  { path: 'productos/crear', component: ProductoCrearComponent },
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
