import { LayoutService } from 'src/app/services/layout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Job } from './../../models/job.model';
import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import Stepper from "bs-stepper";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import swal from "sweetalert2";

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {
  
  value = 15

  private stepper: Stepper;
  
  checked = false;
  checked1 = false;
  checked2 = false;

  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;

  focusTouched;
  focus1Touched;
  focus2Touched;
  focus3Touched;
  focus4Touched;
  focus5Touched;

  skills: any = [];
  oldSkills: any = [];
  newSkills: any = [];
  job: any;

  editorStyle = {
    'height': '40%', 
    'background-color':'#080f21',
    'font-color':'white',
    'border': '1px solid #fd5d93',
    'border-radius': '0.4857 rem'
  }

  public formWizard: FormGroup;
  wizard = false;
  step = 1;
  
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public _LayoutService: LayoutService
  ) { }

  ngOnInit() {
    var wizard = document.getElementsByClassName("card-wizard")[0];
    wizard.classList.add("active");
    var stepper = document.getElementById("wizardProfile");

    this.stepper = new Stepper(stepper, {
      linear: false,
      animation: true
    });

    this.formWizard = this.createJobForm();

    this.route.params.subscribe(params => { //Toma el valor job.url desde la URL
      this._LayoutService.GetOneJob(params['url'])
      .subscribe((data:any) => {
        this.job = data;
        this.formWizard.patchValue({
          title: this.job.Title,
          enterprise: this.job.Enterprise,
          place: this.job.Place,
          salary: this.job.Salary,
          contract: this.job.Contract,
          seniority: this.job.Seniority,
          description: this.job.Description,
          skills: this.job.Skills
        });
        this.oldSkills = data.Skills;
        console.log(this.oldSkills);
      }, (error: any) => {
        console.error(error);
      });
   })
  }

  get wizardFormControls() {
    return this.formWizard.controls;
  }

  createJobForm() {
    return new FormGroup({
      title: new FormControl('',  [Validators.required, Validators.minLength(1)]),
      enterprise: new FormControl(''),
      place: new FormControl('', [Validators.required, Validators.minLength(1)]),
      salary: new FormControl(''),
      contract: new FormControl(''),
      seniority: new FormControl(''),
      description: new FormControl(''),
      skills: new FormControl('')
    });
  }

  onSubmit() {
    this.wizard = true;
    this.stepper.next();
    // stop here if form is invalid
    if (this.formWizard.invalid) {
      return;
    }
    
    if(this.formWizard.valid){

      if(this.formWizard.value.skills[0] === undefined) {
        swal.fire({
          html: "<span style='color:grey'> Hey, put at least one Skill/Knowledge required for the job. <span>",
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger btn-simple",
          background: '#ffffff'
        });
      } else {
        if(this.formWizard.value.skills[0].toString().indexOf("Example") != -1){
          this.formWizard.value.skills.shift();
        }
      }

      if(this.formWizard.value.skills.length > 0) {

        if(this.formWizard.value.skills !== []){

          if(this.oldSkills.length !== this.formWizard.value.skills.length){

            this.formWizard.value.skills.forEach(element => {
              if(element instanceof Object === true){
                this.newSkills.push(element.value);
              }
            });

          }

          this.skills = this.oldSkills.concat(this.newSkills);

          this.value = 100;

          let job = new Job ( 
            this.formWizard.value.title, 
            this.formWizard.value.place,
            this.formWizard.value.enterprise,
            this.formWizard.value.salary,
            this.formWizard.value.contract,
            this.formWizard.value.description,
            this.job.Url,
            this.formWizard.value.seniority,
            this.skills,
            this.job.Candidates 
          ); 
          
          this._LayoutService.UpdateJob(job)
            .subscribe((data:Job) => {
              swal.fire({
                html: "<span style='color:grey'> We are redirecting to your post... <span>",
                timer: 2000,
                showConfirmButton: false
              }).then( () => {
                this.router.navigate([`/jobs/job/${job.Url}`]);
              });
          }, (error: any) => {
            swal.fire({
              type: 'error',
              html: "<span style='color:grey'> Sorry, something broke here, please try again later... <span>",
              timer: 2000,
              showConfirmButton: false
            }).then( () => {
              this.router.navigate([`/jobs/`]);
            });
          });


        }
      } else {
        swal.fire({
          html: "<span style='color:grey'> Hey, put at least one Skill/Knowledge required for the job. <span>",
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger btn-simple",
          background: '#ffffff'
        });
      }
    }
    
  }

  next() {
    
    if (this.formWizard.valid) {

      if (this.value < 51) {
        this.step++;
        this.value += 35;
      }
      if (this.step === 1) {
        this.checked = true;
      } else if (this.step === 2) {
        this.checked1 = true;
      } else {
        this.checked2 = true;
      }
      this.stepper.next();
    }
  }

  previous() {
    
    this.stepper.previous();
    if (this.value > 15 && this.value < 100) {
      this.value -= 35;
      this.step--;
    }
    if(this.value === 100){
      this.value = 85;
      this.step--;
    }
  }

  addCheched(event) {
    event.target.classList.add("checked");
  }

  
}
