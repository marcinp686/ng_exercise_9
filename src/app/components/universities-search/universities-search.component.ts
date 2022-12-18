import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, debounceTime, map, Observable, shareReplay, Subscription, switchMap, tap } from 'rxjs';
import { University } from 'src/app/models/university.model';
import { HipolabsService } from 'src/app/services/hipolabs.service';

@Component({
  selector: 'app-universities-search',
  templateUrl: './universities-search.component.html',
  styleUrls: ['./universities-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversitiesSearchComponent implements OnInit, OnDestroy {

  state: BehaviorSubject<string> = new BehaviorSubject<string>('searchStringEmpty');
  searchForm: FormGroup = new FormGroup({ country: new FormControl<string>('') });
  universities!: Observable<University[]>;
  subscription!: Subscription;

  constructor(private hipolabs: HipolabsService) { }

  ngOnInit(): void {

    this.universities = this.searchForm.valueChanges.pipe(
      debounceTime(1000),
      tap((form) => { if (form.country.length === 0) this.state.next('searchStringEmpty') }),
      switchMap((form) => {
        if (form.country.length > 0)
          return this.hipolabs.getUniversities(form.country).pipe(
            tap((res) => {
              if (res.length === 0) {
                this.state.next('countryNotFound');
              } else {
                this.state.next('ready');
              }
            })
          );
        else return [];
      }),
      shareReplay()
    );
    
    this.subscription = this.universities.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
