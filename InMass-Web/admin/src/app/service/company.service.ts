import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../model/company.model';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private client: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.client.get<Company[]>(env.secret_url + '/company');
  }

  getCompany(id: string): Observable<Company> {
    return this.client.get<Company>(env.secret_url + '/company/' + id); // Added a slash before id
  }
}
