import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { University } from '../models/university.model';

@Injectable({
  providedIn: 'root'
})
export class HipolabsService {

  constructor(private httpClient: HttpClient) { }

  getUniversities(country: string) : Observable<University[]> {
    return this.httpClient.get<University[]>('http://universities.hipolabs.com/search?country=${country}');
  }
}
