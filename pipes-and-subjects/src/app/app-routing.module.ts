import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'lazy',
    loadChildren: ()=> import('./lazy/lazy.module').then(m =>m.LazyModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //  preloadingStrategy: PreloadAllModules,
    //  enableTracing: true
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
