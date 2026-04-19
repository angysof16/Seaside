import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Layout components
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

// Landing section components
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { MenuDestacadoComponent } from './components/menu-destacado/menu-destacado.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';

// Pages
import { LandingComponent } from './pages/landing/landing.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { VisitanosComponent } from './pages/visitanos/visitanos.component';
import { LoginComponent } from './pages/login/login.component';

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

// CRUD Clientes ──────────────────────────────────────────────────────────────
import { ClienteCrudTableComponent } from './components/cliente/cliente-crud-table/cliente-crud-table.component';
import { ClienteDetalleComponent } from './components/cliente/cliente-detalle/cliente-detalle.component';
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import { ClienteFormPageComponent } from './components/cliente/cliente-form-page/cliente-form-page.component';
import { ClienteDetallePageComponent } from './components/cliente/cliente-detalle-page/cliente-detalle-page.component';

// Profile
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';

// Errors
import { ErrorPageComponent } from './errors/error-page/error-page.component';
import { OperadorLoginComponent } from './pages/operador-login/operador-login.component';

@NgModule({
  declarations: [
    AppComponent,
    // Layout
    NavbarComponent,
    FooterComponent,
    // Landing sections
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
    // CRUD Productos
    ProductoTableComponent,
    ProductoDetalleComponent,
    ProductoFormComponent,
    ProductoFormPageComponent,
    ProductoDetallePageComponent,
    ProductoCrearComponent,
    // CRUD Operadores
    OperadorTableComponent,
    OperadorFormComponent,
    OperadorDetalleComponent,
    OperadorFormPageComponent,
    OperadorDetallePageComponent,
    OperadorCrudTableComponent,
    OperadorLoginComponent,
    // CRUD Clientes
    ClienteCrudTableComponent,
    ClienteDetalleComponent,
    ClienteFormComponent,
    ClienteFormPageComponent,
    ClienteDetallePageComponent,
    // Profile
    ProfileComponent,
    ProfileEditComponent,
    // Errors
    ErrorPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
