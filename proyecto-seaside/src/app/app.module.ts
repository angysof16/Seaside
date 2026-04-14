import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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

// CRUD
import { ProductoTableComponent } from './producto/producto-table/producto-table.component';
import { ProductoDetalleComponent } from './producto/producto-detalle/producto-detalle.component';
import { ProductoFormComponent } from './producto/producto-form/producto-form.component';
import { ProductoFormPageComponent } from './producto/producto-form-page/producto-form-page.component';
import { ProductoDetallePageComponent } from './producto/producto-detalle-page/producto-detalle-page.component';

//CRUD Operadores
import { OperadorTableComponent } from './operador/operador-table/operador-table.component';
import { OperadorFormComponent } from './operador/operador-form/operador-form.component';
import { OperadorDetalleComponent } from './operador/operador-detalle/operador-detalle.component';
import { OperadorFormPageComponent } from './operador/operador-form-page/operador-form-page.component';
import { OperadorDetallePageComponent } from './operador/operador-detalle-page/operador-detalle-page.component';
import { OperadorCrudTableComponent } from './operador/operador-crud-table/operador-crud-table.component';

// Errors
import { ErrorPageComponent } from './errors/error-page/error-page.component';

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
    // CRUD
    ProductoTableComponent,
    ProductoDetalleComponent,
    ProductoFormComponent,
    // Errors
    ErrorPageComponent,

    ProductoFormPageComponent,
    ProductoDetallePageComponent,

    //CRUD Operadores
    OperadorTableComponent,
    OperadorFormComponent,
    OperadorDetalleComponent,
    OperadorFormPageComponent,
    OperadorDetallePageComponent,
    OperadorCrudTableComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
