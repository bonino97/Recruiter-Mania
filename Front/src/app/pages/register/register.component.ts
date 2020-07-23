import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from "./password-validator.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  focus;
  focus1;
  focus2;
  focus3;
  
  public focusTouched;
  public focusTouched1;
  public focusTouched2;
  public focusTouched3;

  public registerForm: FormGroup;
  public register = false;

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");
    
    this.registerForm = this.formBuilder.group(
      {
        fullName: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        repeatPassword: ["", [Validators.required, Validators.minLength(6)]]
      },
      {
        validator: MustMatch("password", "repeatPassword")
      }
    );
  }
  
  get f() {
    return this.registerForm.controls;
  }

  
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }

  onSubmit(){
    console.log(this.registerForm.valid);
    if(this.registerForm.invalid) return;
  }
}
