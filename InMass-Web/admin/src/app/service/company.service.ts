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

  addCompany(user: Company, file: File): Observable<HttpResponse<any>> {
    // Create a FormData object to send both user data and the file
    const formData = new FormData();
    formData.append('c_logo', file); // 'avatar' should match the field name expected on the server
    formData.append('c_name', user.c_name);
    formData.append('c_description', user.c_description);
    formData.append('c_address', user.c_address);
    formData.append('c_facebook', user.c_facebook);
    formData.append('c_linkedin', user.c_linkedin);
    formData.append('hr_name', user.hr_name);
    formData.append('hr_email', user.hr_email);
    formData.append('hr_contact', user.hr_contact);

    console.log(user)
    return this.client.post<HttpResponse<any>>(
      env.secret_url + '/company',
      formData, // Send the FormData object
      {
        observe: 'response',
      }
    );
  }

  updateCompany(company: Company, selectedFile: File): Observable<HttpResponse<any>> {
    console.log('Company data:', company);
  const formData: FormData = new FormData();
  // Rest of your code to append data to formData

    formData.append('c_logo', selectedFile);
    console.log('Selected file:', selectedFile);

    formData.append('company', JSON.stringify(company));
    console.log('Request data:', formData); // Add this line for debugging
    console.log('Request headers:', this.header);


    return this.client.put(
      env.secret_url + '/company/' + company._id,
      formData,
      {
        observe: 'response',
      }
    );
  }

  deleteUser(id:string):Observable<HttpResponse<any>>{
    return this.client.delete<HttpResponse<any>>(env.secret_url+'/company/'+id,{
      observe:'response'
    })
  }

  
}
