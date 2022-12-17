import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductSearchComponent } from './components/product-search/product-search.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'product-search', component: ProductSearchComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
