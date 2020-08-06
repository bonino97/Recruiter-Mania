import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/services/layout.service';
import { Router } from '@angular/router';
import swal from "sweetalert2";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  focus;
  focus1;

  public passwordForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private _LayoutService: LayoutService,
    public router: Router
  ) { }

  ngOnInit(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("login-page");

    this.passwordForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]]
      });
  }

  onSubmit(){
    this._LayoutService.ForgotPassword(this.passwordForm.value)
    .subscribe((data:any) => {
      swal.fire({
        html: `<span style='color:grey'> ${data.msg} <span>`,
        buttonsStyling: false,
        showConfirmButton: false,
        background: '#ffffff',
        timer: 4750
      });
      if(data.success) {
        this.router.navigate([`/login`]);
      }
    });
  }

  get f() {
    return this.passwordForm.controls;
  }

}
