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
          this._AuthService.SetUserInfo({'user' : data['user']});
          swal.fire({
            html: `<span style='color:grey'> ${data.msg} <span>`,
            buttonsStyling: false,
            showConfirmButton: false,
            background: '#ffffff',
            timer: 1500
          });
          this.router.navigate([`/jobs/panel`]);
        }

      }, (error: any) => {
        console.error(error);
        if(error.status === 401){
          swal.fire({
            html: `<span style='color:grey'> Incorrect Email or Password...<span>`,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-danger btn-simple",
            background: '#ffffff'
          });
        }
      });
  
  }

}
