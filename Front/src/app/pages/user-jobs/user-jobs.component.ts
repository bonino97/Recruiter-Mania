import { Job } from './../../models/job.model';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-jobs',
  templateUrl: './user-jobs.component.html',
  styleUrls: ['./user-jobs.component.scss']
})
export class UserJobsComponent implements OnInit {

  constructor(
    public _LayoutService: LayoutService,
    public router: Router,
    ) {}

  jobs: Job[];
  actualPage;
  previousPage;
  nextPage;
  totalPages: Number[] = [];
  limit = 5;

  disablePreviousButton: boolean = false;
  disableNextButton: boolean = false;

  ngOnInit() {
    this._LayoutService.GetJobsByUserId(1,this.limit)
      .subscribe((data:any) => {
        this.jobs = data.jobs.results;
        this.actualPage = data.jobs.actualPage;

        for (let index = 1; index <= data.jobs.totalPages; index++) {
          this.totalPages.push(index);
        }

        if(!!data.jobs.previousPage){
          this.previousPage = data.jobs.previousPage.page;
          this.disablePreviousButton = false;
        } else {
          this.disablePreviousButton = true;
        };
        
        if(!!data.jobs.nextPage){
          this.nextPage = data.jobs.nextPage.page
          this.disableNextButton = false;
        } else {
          this.disableNextButton = true;
        };
      })
  }


  next(){ //Pagina Siguiente
    
    this._LayoutService.GetJobsByUserId(this.nextPage,this.limit)
    .subscribe((data:any) => {
      this.jobs = [];
      this.jobs = data.jobs.results;
      this.actualPage = data.jobs.actualPage;

      if(!!data.jobs.previousPage){
        this.previousPage = data.jobs.previousPage.page;
        this.disablePreviousButton = false;
      } else {
        this.disablePreviousButton = true;
      };
      
      if(!!data.jobs.nextPage){
        this.nextPage = data.jobs.nextPage.page;
        this.disableNextButton = false;
      } else {
        this.disableNextButton = true;
      };
    });
  }

  previous(){ //Pagina Previa
    
    this._LayoutService.GetJobsByUserId(this.previousPage,this.limit)
    .subscribe((data:any) => {
    
      this.jobs = [];
      this.jobs = data.jobs.results;
      this.actualPage = data.jobs.actualPage;

      if(!!data.jobs.previousPage){
        this.previousPage = data.jobs.previousPage.page;
        this.disablePreviousButton = false;
      } else {
        this.disablePreviousButton = true;
      };
      
      if(!!data.jobs.nextPage){
        this.nextPage = data.jobs.nextPage.page;
        this.disableNextButton = false;
      } else {
        this.disableNextButton = true;
      };
    });
  }

  actual(i){ //Pagina Actual
    this._LayoutService.GetJobsByUserId(i,this.limit)
    .subscribe((data:any) => {
    
      this.jobs = [];
      this.jobs = data.jobs.results;
      this.actualPage = data.jobs.actualPage;

      if(!!data.jobs.previousPage){
        this.previousPage = data.jobs.previousPage.page;
        this.disablePreviousButton = false;
      } else {
        this.disablePreviousButton = true;
      };
      
      if(!!data.jobs.nextPage){
        this.nextPage = data.jobs.nextPage.page;
        this.disableNextButton = false;
      } else {
        this.disableNextButton = true;
      };
    });
  }

  openJob(job: Job){
    const jobUrl = `/jobs/job/${job.Url}`;
    this.router.navigate([jobUrl]);
  }
}
