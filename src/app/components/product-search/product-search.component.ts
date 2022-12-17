import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay, Subject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { FakestoreService } from 'src/app/services/fakestore.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  searchFormGroup: FormGroup = new FormGroup({
    startsWith : new FormControl<string>('', Validators.required)
  })
  
  prodSearch : Subject<string> = new Subject<string>();

  productsFiltered! : Observable<Product[]>;

  constructor(private fakestore: FakestoreService) { }

  ngOnInit(): void {
    this.productsFiltered = combineLatest([
      this.fakestore.getProducts(),
      this.prodSearch,
    ]).pipe(
      map(([products, searchstr] : [Product[], string]) =>
        products.filter((product) => product.title.startsWith(searchstr))
      ),
      shareReplay()
    );
  }

  onProductSearch() : void {
    this.prodSearch.next(this.searchFormGroup.get('startsWith')?.value)
  }

}
