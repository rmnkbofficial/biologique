import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { OffersComponent } from './components/offers/offers.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'offres', component: OffersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
