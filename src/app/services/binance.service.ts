import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoModel } from '../models/crypto.model';

@Injectable({
  providedIn: 'root'
})
export class BinanceService {

  constructor(private httpClient: HttpClient) { }

  getCryptos() : Observable<CryptoModel[]> {
    return this.httpClient.get<CryptoModel[]>('https://api2.binance.com/api/v3/ticker/24hr');
  }

}