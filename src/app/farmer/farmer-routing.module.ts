import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmerPage } from './farmer.page';

const routes: Routes = [
  {
    path: '',
    component: FarmerPage
  },
  {
    path: 'farmer-details',
    loadChildren: () => import('./farmer-details/farmer-details.module').then( m => m.FarmerDetailsPageModule)
  },
  {
    path: 'thank-you',
    loadChildren: () => import('./thank-you/thank-you.module').then( m => m.ThankYouPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerPageRoutingModule {}
