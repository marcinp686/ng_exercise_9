import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { University } from 'src/app/models/university.model';
import { HipolabsService } from 'src/app/services/hipolabs.service';

@Component({
  selector: 'app-universities-search',
  templateUrl: './universities-search.component.html',
  styleUrls: ['./universities-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversitiesSearchComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({country: new FormControl<string>('')});

  universities!: Observable<University[]>; 

  constructor(private hipolabs: HipolabsService) { }

  ngOnInit(): void {
    // WIP
    // this.universities = this.searchForm.valueChanges.pipe(
    //   switchMap( (form) => ))
    // )
  }

}
