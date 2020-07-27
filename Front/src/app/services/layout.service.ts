import { User } from './../models/user.model';
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
    private router: Router,
  ) { }

  //Tengo que DIVIDIR este servicio YA mismo.

  GetPageOptions():Observable<any> {
    return this.http.get(environment.url);
  }

  GetPanelOptions():Observable<any> {
    return this.http.get(`${environment.url}/panel`);
  }

  //Jobs

  GetJobs(page, limit): Observable<any> {
    return this.http.get(`${environment.url}/jobs?page=${page}&limit=${limit}`);
  }

  GetJobsByUserId(page, limit): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(`${environment.url}/my-jobs?page=${page}&limit=${limit}`,{
      withCredentials: true,
      headers: headers
    });
  }

  GetNewJobOptions():Observable<any> {
    return this.http.get(`${environment.url}/job/new`);
  }

  GetOneJob(url):Observable<any> { 
    return this.http.get(`${environment.url}/job/${url}`);
  }

  PostNewJob(job:Job):Observable<any>{
    let params = JSON.stringify(job);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this.http.post(`${environment.url}/job/new`, params, {
      withCredentials: true,
      headers: headers
    });
  }

  UpdateJob(job:Job):Observable<any>{
    let params = JSON.stringify(job);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this.http.put(`${environment.url}/job/${job.Url}`, params, {
      withCredentials: true,
      headers: headers
    });
  }

  DeleteJob(id):Observable<any> {
    
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.delete(`${environment.url}/job/${id}`, {
      withCredentials: true,
      headers: headers
    });

  }

  //User

  GetUserInstance():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(`${environment.url}/me`,{
      withCredentials: true,
      headers: headers
    });
  }

  UpdateProfile(user: any):Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this.http.put(`${environment.url}/me`, params, {
      withCredentials: true,
      headers: headers
    });
  }

  Register(user: User){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this.http.post(`${environment.url}/register`, params, {headers: headers});
  }

  Login(user: any){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this.http.post(`${environment.url}/login`, params, {
      withCredentials: true,
      headers: headers
    });
  }

  Logout(){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(`${environment.url}/logout`,{
      withCredentials: true,
      headers: headers
    });
  }

  UploadAvatar(file: any) {
    // let headers = new HttpHeaders().set('Content-Type','application/json');
    let headers = new HttpHeaders();
    return this.http.put(`${environment.url}/me/avatar`, file, {
      withCredentials: true,
      headers: headers
    });
  }

}
