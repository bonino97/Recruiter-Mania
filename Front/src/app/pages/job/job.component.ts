import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  job:any;
  skills:any;

  constructor(
    private _LayoutService: LayoutService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.job = [];
    this.route.params.subscribe(params => { //Toma el valor job.url desde la URL
      this._LayoutService.GetOneJob(params['url'])
      .subscribe((data:any) => {
        this.job = data;
        this.skills = data.Skills;
      }, (error: any) => {
        console.error(error);
      });
   })
  }

  editJob(job){
    this.router.navigate([`/jobs/job/${job.Url}/edit`]);
  }

}
