import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit {

  actualPage;
  previousPage;
  nextPage;
  totalPages: Number[] = [];
  candidates; 

  disablePreviousButton: boolean = false;
  disableNextButton: boolean = false;

  constructor(
    public _LayoutService: LayoutService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => { //Toma el valor job.url desde la URL
      this._LayoutService.GetJobCandidates(params['url'])
      .subscribe((data:any) => {
        this.candidates = data.data;
      }, (error: any) => {
        console.error(error);
      });
    });


  }


  openCv(resume){
    window.open(`${environment.uploadsUrl}/Resumes/${resume}`, "_blank");
  }

}
