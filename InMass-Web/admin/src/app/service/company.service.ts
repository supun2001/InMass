import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../model/company.model';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  header:HttpHeaders;

  constructor(private client: HttpClient) { 
    this.header = new HttpHeaders({'content-type':'application/json'})
  }

  getCompanies(): Observable<Company[]> {
    return this.client.get<Company[]>(env.secret_url + '/company');
  }

  getCompany(id: string): Observable<Company> {
    return this.client.get<Company>(env.secret_url + '/company/' + id); // Added a slash before id
  }

  addCompany(company:Company):Observable<HttpResponse<any>>{
    return this.client.post(env.secret_url+'/company',JSON.stringify(company),{
      headers:this.header,observe:'response'
    })
  }
  
}
