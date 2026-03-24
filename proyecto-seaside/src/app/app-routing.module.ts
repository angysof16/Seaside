import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoTableComponent } from './producto/producto-table/producto-table.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'productsListing', component: ProductoTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
