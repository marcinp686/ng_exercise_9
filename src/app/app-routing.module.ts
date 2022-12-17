import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { UniversitiesSearchComponent } from './components/universities-search/universities-search.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'product-search', component: ProductSearchComponent},
    {path: 'universities-search', component: UniversitiesSearchComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
