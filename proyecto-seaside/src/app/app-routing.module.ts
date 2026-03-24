import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { VisitanosComponent } from './pages/visitanos/visitanos.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductoTableComponent } from './producto/producto-table/producto-table.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'productos', component: ProductoTableComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'visitanos', component: VisitanosComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
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
