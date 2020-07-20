import { Job } from './../../models/job.model';
import { LayoutService } from './../../services/layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

  constructor(public _LayoutService: LayoutService) {}

  jobs: Job[];
  actualPage;
  previousPage;
  nextPage;
  totalPages: Number[] = [];
  limit = 5;

  disablePreviousButton: boolean = false;
  disableNextButton: boolean = false; 

  ngOnInit() {
    this._LayoutService.GetJobs(1,this.limit)
      .subscribe((data:any) => {

        this.jobs = data.results;
        this.actualPage = data.actualPage;

        for (let index = 1; index <= data.totalPages; index++) {
          this.totalPages.push(index);
        }

        if(!!data.previousPage){
          this.previousPage = data.previousPage.page;
          this.disablePreviousButton = false;
        } else {
          this.disablePreviousButton = true;
        };
        
        if(!!data.nextPage){
          this.nextPage = data.nextPage.page
          this.disableNextButton = false;
        } else {
          this.disableNextButton = true;
        };
      })
  }


  next(){ //Pagina Siguiente
    
    this._LayoutService.GetJobs(this.nextPage,this.limit)
    .subscribe((data:any) => {
      this.jobs = [];
      this.jobs = data.results;
      this.actualPage = data.actualPage;

      if(!!data.previousPage){
        this.previousPage = data.previousPage.page;
        this.disablePreviousButton = false;
      } else {
        this.disablePreviousButton = true;
      };
      
      if(!!data.nextPage){
        this.nextPage = data.nextPage.page;
        this.disableNextButton = false;
      } else {
        this.disableNextButton = true;
      };
    });
  }

  previous(){ //Pagina Previa
    
    this._LayoutService.GetJobs(this.previousPage,this.limit)
    .subscribe((data:any) => {
    
      this.jobs = [];
      this.jobs = data.results;
      this.actualPage = data.actualPage;

      if(!!data.previousPage){
        this.previousPage = data.previousPage.page;
        this.disablePreviousButton = false;
      } else {
        this.disablePreviousButton = true;
      };
      
      if(!!data.nextPage){
        this.nextPage = data.nextPage.page;
        this.disableNextButton = false;
      } else {
        this.disableNextButton = true;
      };
    });
  }

  actual(i){ //Pagina Actual
    this._LayoutService.GetJobs(i,this.limit)
    .subscribe((data:any) => {
    
      this.jobs = [];
      this.jobs = data.results;
      this.actualPage = data.actualPage;

      if(!!data.previousPage){
        this.previousPage = data.previousPage.page;
        this.disablePreviousButton = false;
      } else {
        this.disablePreviousButton = true;
      };
      
      if(!!data.nextPage){
        this.nextPage = data.nextPage.page;
        this.disableNextButton = false;
      } else {
        this.disableNextButton = true;
      };
    });
  }

  openJob(job){
    console.log(job);
  }

}
