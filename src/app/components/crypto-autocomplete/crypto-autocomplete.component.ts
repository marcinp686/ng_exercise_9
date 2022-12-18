import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { combineLatest, map, Observable, of, startWith } from 'rxjs';
import { CryptoModel } from 'src/app/models/crypto.model';
import { BinanceService } from 'src/app/services/binance.service';

@Component({
  selector: 'app-crypto-autocomplete',
  templateUrl: './crypto-autocomplete.component.html',
  styleUrls: ['./crypto-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CryptoAutocompleteComponent implements OnInit {

  searchFormGroup   : FormGroup = new FormGroup({cryptoName: new FormControl<string>('')});
  cryptos$!         : Observable<CryptoModel[]>;
  selectedCryptos   : string[] = [];
  selectedCryptos$  : Observable<string[]> = of(this.selectedCryptos);
  filter$?          : Observable<string>;
  filteredCryptos$! : Observable<CryptoModel[]>;

  constructor(private binance: BinanceService) { }

  ngOnInit(): void {
    this.cryptos$ = this.binance.getCryptos();
    this.filter$ = this.searchFormGroup.get('cryptoName')?.valueChanges.pipe(startWith(''), map( (x : string)  => x.toLowerCase() ));
    this.filteredCryptos$ = combineLatest([this.cryptos$, this.filter$!]).pipe(
      map(([cryptos, filter]: [CryptoModel[], string]) => { return cryptos.filter((crypto) => crypto.symbol.toLowerCase().includes(filter))})
    )

  }

  onCryptoSelect(event: MatAutocompleteSelectedEvent) : void {
    this.selectedCryptos.push(event.option.value);
    this.searchFormGroup.get('cryptoName')?.setValue('');
  }

}
