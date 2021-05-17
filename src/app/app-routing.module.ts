import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'farmer',
    pathMatch: 'full'
  },
  {
    path: 'farmer',
    children: [
      {
        path: '',
        loadChildren: () => import('./farmer/farmer.module').then( m => m.FarmerPageModule)
      },
      {
        path: ':farmerId',
        children: [
          {
            path:'',
            loadChildren: () => import('./farmer/farmer-details/farmer-details.module').then( m => m.FarmerDetailsPageModule)
          },
          {
            path: 'thankYou',
            loadChildren: () => import('./farmer/thank-you/thank-you-routing.module').then( m => m.ThankYouPageRoutingModule)
          }
        ]
      },
    ],
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
