import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FakestoreService {

  constructor(private httpClient : HttpClient) { }

  getProducts() : Observable<Product[]> {
    return this.httpClient.get<Product[]>('https://fakestoreapi.com/products').pipe(shareReplay());
  }
}
