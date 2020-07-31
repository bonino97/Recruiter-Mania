import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from "sweetalert2";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;

  job:any;
  skills:any;
  openModal = false;
  openModalAux = false;
  public applyForm: FormGroup;
  file: File;
 
  constructor(
    private _LayoutService: LayoutService,
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
  ){}

  ngOnInit(): void {
    this.applyForm = this.formBuilder.group(
      {
        FirstName: ["", [Validators.required]],
        LastName: ["", [Validators.required]],
        Email: ["", [Validators.required, Validators.email]],
        LinkedinUrl: [""],
        Resume: ["", [Validators.required]]
      });

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

  get f() {
    return this.applyForm.controls;
  }

  fileChange(event){
    this.file = event.target.files[0];
  }

  editJob(job){
    this.router.navigate([`/jobs/job/${job.Url}/edit`]);
  }

  onApply(){

    const formData = new FormData();

    formData.append('FirstName', this.applyForm.value.FirstName);
    formData.append('LastName', this.applyForm.value.LastName);
    formData.append('Email', this.applyForm.value.Email);
    formData.append('LinkedinUrl', this.applyForm.value.LinkedinUrl);
    formData.append('Resume', this.file);

    this._LayoutService.UploadResume(formData, this.job.Url)
    .subscribe((data:any) => {

      if(data.success == true){

        swal.fire({
          html: `<span style='color:grey'> ${data.message} <span>`,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger btn-simple",
          background: '#ffffff'
        });
  
        this.applyForm.reset();

      }

    }, (error: any) => {

      console.log(error);

      if(error.success == false){
        return swal.fire({
          html: `<span style='color:grey'> ${error.message} <span>`,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger btn-simple",
          background: '#ffffff'
        });
      }

      if(error.error.success == false){
        return swal.fire({
          html: `<span style='color:grey'> ${error.error.message} <span>`,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger btn-simple",
          background: '#ffffff'
        });
      }

      if(error.error.error.success == false){
        return swal.fire({
          html: `<span style='color:grey'> ${error.error.error.message} <span>`,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger btn-simple",
          background: '#ffffff'
        });
      }

      return swal.fire({
        html: `<span style='color:grey'> Something wrong... <span>`,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-danger btn-simple",
        background: '#ffffff'
      });


    });
  }

}
