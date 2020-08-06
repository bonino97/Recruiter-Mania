import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/services/layout.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import swal from "sweetalert2";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  focus1;

  public passwordForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _LayoutService: LayoutService,
    public router: Router
    ) { }

  ngOnInit(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("login-page");
    this.passwordForm = this.formBuilder.group(
      {
        password: ["", [Validators.required, Validators.minLength(6)]]
      }); 

    this.route.params.subscribe( param => {
      this._LayoutService.VerifyToken(param['url'])
        .subscribe((data: any) => { 
          return;    
      }, error => {
          if(error.error.success === false){
            swal.fire({
              html: `<span style='color:grey'> ${error.error.msg} <span>`,
              buttonsStyling: false,
              showConfirmButton: false,
              background: '#ffffff',
              timer: 4750
            }).then(() => this.router.navigate([`/forgot-password`]));
          }
      });
    });
  }

  onSubmit(){
    console.log();

    this.route.params.subscribe( param => {
      
      let resetObject = { 
        token: param['url'],
        password: this.passwordForm.value.password
      }

      this._LayoutService.ResetPassword(resetObject)
        .subscribe((data: any) => { 
          if(data.success) {
            swal.fire({
              html: `<span style='color:grey'> ${data.msg} <span>`,
              buttonsStyling: false,
              showConfirmButton: false,
              background: '#ffffff',
              timer: 4750
            });
            this.router.navigate([`/login`]);
          }
        }, error => {
          if(error.error.success === false){
            swal.fire({
              html: `<span style='color:grey'> ${error.error.msg} <span>`,
              buttonsStyling: false,
              showConfirmButton: false,
              background: '#ffffff',
              timer: 4750
            }).then(() => this.router.navigate([`/forgot-password`]));
          }
      });
    });
  }

  get f() {
    return this.passwordForm.controls;
  }


}
