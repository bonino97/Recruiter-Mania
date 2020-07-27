import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LayoutService } from 'src/app/services/layout.service';
import { User } from 'src/app/models/user.model';
import swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  focus;
  focus1;

  public loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private _LayoutService: LayoutService,
    private _AuthService: AuthService,
    public router: Router
  ) {}

  get f() {
    return this.loginForm.controls;
  }


  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("login-page");

    this.loginForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]]
      });

  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("login-page");
  }

  onSubmit(){
    
    if(this.loginForm.invalid) return;
    const user = new User(this.loginForm.value.email, this.loginForm.value.password);
    this._LayoutService.Login(user).subscribe(
      (data:any) => {
        if(data.success) {
          this._AuthService.SetUserInfo(data.lemonCookie);
          swal.fire({
            html: `<span style='color:grey'> ${data.msg} <span>`,
            buttonsStyling: false,
            showConfirmButton: false,
            background: '#ffffff',
            timer: 1250
          });
          this.router.navigate([`/jobs/panel`]);
        }

      }, (error: any) => {
        console.error(error);
        
        if(error.error.message.msg){
          return swal.fire({
            html: `<span style='color:grey'>${error.error.message.msg}<span>`,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-danger btn-simple",
            background: '#ffffff'
          });
        }

        return swal.fire({
          type: 'error',
          html: `<span style='color:grey'> Something wrong, please try again...<span>`,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger btn-simple",
          background: '#ffffff'
        });
      });
  
  }

}
