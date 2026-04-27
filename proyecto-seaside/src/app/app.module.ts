import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Layout
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

// Landing
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { MenuDestacadoComponent } from './components/menu-destacado/menu-destacado.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

// Pages
import { LandingComponent } from './pages/landing/landing.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { VisitanosComponent } from './pages/visitanos/visitanos.component';
import { LoginComponent } from './pages/login/login.component';
import { PedidoDetalleComponent } from './pages/pedido-detalle/detalle-pedido.component';

// CRUD Productos
import { ProductoTableComponent } from './components/producto/producto-table/producto-table.component';
import { ProductoDetalleComponent } from './components/producto/producto-detalle/producto-detalle.component';
import { ProductoFormComponent } from './components/producto/producto-form/producto-form.component';
import { ProductoFormPageComponent } from './components/producto/producto-form-page/producto-form-page.component';
import { ProductoDetallePageComponent } from './components/producto/producto-detalle-page/producto-detalle-page.component';
import { ProductoCrearComponent } from './components/producto/producto-crear/producto-crear.component';

// CRUD Operadores
import { OperadorTableComponent } from './components/operador/operador-table/operador-table.component';
import { OperadorFormComponent } from './components/operador/operador-form/operador-form.component';
import { OperadorDetalleComponent } from './components/operador/operador-detalle/operador-detalle.component';
import { OperadorFormPageComponent } from './components/operador/operador-form-page/operador-form-page.component';
import { OperadorDetallePageComponent } from './components/operador/operador-detalle-page/operador-detalle-page.component';
import { OperadorCrudTableComponent } from './components/operador/operador-crud-table/operador-crud-table.component';
import { OperadorLoginComponent } from './pages/operador-login/operador-login.component';

// CRUD Clientes
import { ClienteCrudTableComponent } from './cliente/cliente-crud-table/cliente-crud-table.component';
import { ClienteDetalleComponent } from './cliente/cliente-detalle/cliente-detalle.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ClienteFormPageComponent } from './cliente/cliente-form-page/cliente-form-page.component';
import { ClienteDetallePageComponent } from './cliente/cliente-detalle-page/cliente-detalle-page.component';

// CRUD Adicionales
import { AdicionalCrudTableComponent } from './components/adicional/adicional-crud-table/adicional-crud-table.component';
import { AdicionalFormPageComponent } from './components/adicional/adicional-form-page/adicional-form-page.component';
import { AdicionalFormComponent } from './components/adicional/adicional-form/adicional-form.component';

// Profile
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';

// Pedido crear
import { PedidoCrearComponent } from './pages/pedido-crear/pedido-crear.component';

// Admin
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

// CRUD Domiciliarios
import { DomiciliarioCrudTableComponent } from './components/domiciliario/domiciliario-crud-table/domiciliario-crud-table.component';
import { DomiciliarioFormPageComponent } from './components/domiciliario/domiciliario-form-page/domiciliario-form-page.component';

// Errors
import { ErrorPageComponent } from './errors/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    // Layout
    NavbarComponent,
    FooterComponent,
    // Landing
    HeroComponent,
    AboutComponent,
    MenuDestacadoComponent,
    MenuCardComponent,
    CommentsComponent,
    CommentCardComponent,
    // Pages
    LandingComponent,
    MenuComponent,
    ContactoComponent,
    VisitanosComponent,
    LoginComponent,
    PedidoDetalleComponent,
    // Productos
    ProductoTableComponent,
    ProductoDetalleComponent,
    ProductoFormComponent,
    ProductoFormPageComponent,
    ProductoDetallePageComponent,
    ProductoCrearComponent,
    //carrito
    CarritoComponent,
    // Operadores
    OperadorTableComponent,
    OperadorFormComponent,
    OperadorDetalleComponent,
    OperadorFormPageComponent,
    OperadorDetallePageComponent,
    OperadorCrudTableComponent,
    OperadorLoginComponent,
    // Clientes
    ClienteCrudTableComponent,
    ClienteDetalleComponent,
    ClienteFormComponent,
    ClienteFormPageComponent,
    ClienteDetallePageComponent,
    // Adicionales
    AdicionalCrudTableComponent,
    AdicionalFormPageComponent,
    AdicionalFormComponent,
    // Profile
    ProfileComponent,
    ProfileEditComponent,
    // Pedido
    PedidoCrearComponent,
    // Admin
    AdminLoginComponent,
    AdminDashboardComponent,
    // Domiciliarios
    DomiciliarioCrudTableComponent,
    DomiciliarioFormPageComponent,
    // Errors
    ErrorPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}