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
import { PedidoDetalleComponent } from './pages/pedido-detalle/detalle-pedido.component';
import { ClienteCrudTableComponent } from './pages/cliente/cliente-crud-table/cliente-crud-table.component';
import { ClienteFormPageComponent } from './pages/cliente/cliente-form-page/cliente-form-page.component';
import { ClienteDetallePageComponent } from './pages/cliente/cliente-detalle-page/cliente-detalle-page.component';
import { OperadorLoginComponent } from './pages/operador-login/operador-login.component';
import { PedidoCrearComponent } from './pages/pedido-crear/pedido-crear.component';
import { AdicionalCrudTableComponent } from './components/adicional/adicional-crud-table/adicional-crud-table.component';
import { AdicionalFormPageComponent } from './components/adicional/adicional-form-page/adicional-form-page.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

import { MisPedidosComponent } from './pages/mis-pedidos/mis-pedidos.component';

// Admin
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

// Domiciliarios CRUD
import { DomiciliarioCrudTableComponent } from './components/domiciliario/domiciliario-crud-table/domiciliario-crud-table.component';
import { DomiciliarioFormPageComponent } from './components/domiciliario/domiciliario-form-page/domiciliario-form-page.component';

/** Módulo de enrutamiento principal de la aplicación Angular.
 * Define todas las rutas públicas y protegidas del sitio,
 * incluyendo páginas de cliente, administrador, operador y CRUD de entidades.
 */
const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'visitanos', component: VisitanosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'perfil/editar', component: ProfileEditComponent },
  { path: 'perfil/pedidos', component: MisPedidosComponent },

  // Productos
  { path: 'productos', component: ProductoTableComponent },
  { path: 'productos/crear', component: ProductoCrearComponent },
  { path: 'productos/nuevo', component: ProductoFormPageComponent },
  { path: 'productos/editar/:id', component: ProductoFormPageComponent },
  { path: 'productos/:id', component: ProductoDetallePageComponent },

  // Pedidos (operador)
  { path: 'pedidos', component: OperadorTableComponent },
  { path: 'pedidos/:id', component: PedidoDetalleComponent },
  { path: 'pedido/nuevo', component: PedidoCrearComponent },
  { path: 'detallePedido', component: PedidoDetalleComponent },

  // Carrito de compras
  { path: 'carrito', component: CarritoComponent },

  // Operadores
  { path: 'operadores', component: OperadorCrudTableComponent },
  { path: 'operadores/nuevo', component: OperadorFormPageComponent },
  { path: 'operadores/editar/:id', component: OperadorFormPageComponent },
  { path: 'operadores/:id', component: OperadorDetallePageComponent },

  // Login portal operador
  { path: 'operador/login', component: OperadorLoginComponent },

  // Clientes
  { path: 'clientes', component: ClienteCrudTableComponent },
  { path: 'clientes/nuevo', component: ClienteFormPageComponent },
  { path: 'clientes/editar/:id', component: ClienteFormPageComponent },
  { path: 'clientes/:id', component: ClienteDetallePageComponent },

  // Adicionales
  { path: 'adicionales', component: AdicionalCrudTableComponent },
  { path: 'adicionales/nuevo', component: AdicionalFormPageComponent },
  { path: 'adicionales/editar/:id', component: AdicionalFormPageComponent },

  // Portal Admin
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },

  // CRUD Domiciliarios (admin)
  { path: 'admin/domiciliarios', component: DomiciliarioCrudTableComponent },
  {
    path: 'admin/domiciliarios/nuevo',
    component: DomiciliarioFormPageComponent,
  },
  {
    path: 'admin/domiciliarios/editar/:id',
    component: DomiciliarioFormPageComponent,
  },

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
