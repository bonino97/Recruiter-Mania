import { Job } from './../models/job.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  GetPageOptions():Observable<any>{
    return this.http.get(environment.url);
  }

  GetJobs(page, limit): Observable<any>{
    return this.http.get(`${environment.url}/jobs?page=${page}&limit=${limit}`);
  }

  GetNewJobOptions():Observable<any>{
    return this.http.get(`${environment.url}/job/new`);
  }

  PostNewJob(job:Job):Observable<any>{
    let params = JSON.stringify(job);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this.http.post(`${environment.url}/job/new`, params, {headers: headers});
  }
}
