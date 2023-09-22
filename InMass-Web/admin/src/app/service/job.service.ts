import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../model/jobs.model';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  header:HttpHeaders;

  constructor(private client: HttpClient) { 
    this.header = new HttpHeaders({'content-type':'application/json'})
  }

  getJobs(): Observable<Job[]> {
    return this.client.get<Job[]>(env.secret_url + '/job');
  }

  getJob(id: string): Observable<Job> {
    return this.client.get<Job>(env.secret_url + '/job/' + id); // Added a slash before id
  }

  addJob(job: Job, file: File): Observable<HttpResponse<any>> {
    // Create a FormData object to send both user data and the file
    const formData = new FormData();
    formData.append('j_post', file); // 'avatar' should match the field name expected on the server
    formData.append('j_title', job.j_title);
    formData.append('j_des', job.j_des);
    formData.append('j_company', job.j_company);
    formData.append('j_location', job.j_location);
    formData.append('j_requirement', job.j_requirement);
    formData.append('j_keywords', job.j_keywords);

    console.log(job)
    return this.client.post<HttpResponse<any>>(
      env.secret_url + '/job',
      formData, // Send the FormData object
      {
        observe: 'response',
      }
    );
  }

  updateJob(job: Job, selectedFile: File): Observable<HttpResponse<any>> {
    console.log('Job data:', job);
  const formData: FormData = new FormData();
  // Rest of your code to append data to formData

    formData.append('j_post', selectedFile);
    console.log('Selected file:', selectedFile);

    formData.append('job', JSON.stringify(job));
    console.log('Request data:', formData); // Add this line for debugging
    console.log('Request headers:', this.header);


    return this.client.put(
      env.secret_url + '/job/' + job._id,
      formData,
      {
        observe: 'response',
      }
    );
  }

  deleteJob(id:string):Observable<HttpResponse<any>>{
    return this.client.delete<HttpResponse<any>>(env.secret_url+'/job/'+id,{
      observe:'response'
    })
  }

}
