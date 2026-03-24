import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { VisitanosComponent } from './pages/visitanos/visitanos.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuDestacadoComponent } from './components/menu-destacado/menu-destacado.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { ProductoTableComponent } from './producto/producto-table/producto-table.component';
import { ProductoDetalleComponent } from './producto/producto-detalle/producto-detalle.component';
import { ProductoFormComponent } from './producto/producto-form/producto-form.component';
import { FormsModule } from '@angular/forms';
import { ErrorPageComponent } from './errors/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    CommentsComponent,
    CommentCardComponent,
    FooterComponent,
    LandingComponent,
    MenuComponent,
    ContactoComponent,
    VisitanosComponent,
    LoginComponent,
    MenuDestacadoComponent,
    MenuCardComponent,
    ProductoTableComponent,
    ProductoDetalleComponent,
    ProductoFormComponent,
    ErrorPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
