import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/services/layout.service';
import swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public editProfileForm: FormGroup;

  user:any;

  constructor(
    public formBuilder: FormBuilder, 
    private _LayoutService: LayoutService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this._LayoutService.GetUserInstance()
      .subscribe((data:any) => {
        this.user = data.data;
        this.editProfileForm.patchValue({
          FirstName: this.user.FirstName,
          LastName: this.user.LastName,
          Email: this.user.Email,
          ProfileUrl: this.user.ProfileUrl,
          Enterprise: this.user.Enterprise,
          EnterpriseRole: this.user.EnterpriseRole,
          Country: this.user.Country,
          FacebookUrl: this.user.FacebookUrl,
          TwitterUrl: this.user.TwitterUrl,
          Website: this.user.Website,
          LinkedinUrl: this.user.LinkedinUrl,
          AboutMe: this.user.AboutMe 
        });
      }, (error: any) => {
        if(error.status === 401){
          swal.fire({
            html: `<span style='color:grey'> ${error.error.msg} <span>`,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-danger btn-simple",
            background: '#ffffff'
          });
          this.router.navigate([`/login`]);
        }
      });

    this.editProfileForm = this.formBuilder.group(
      {
        FirstName: ["", [Validators.required]],
        LastName: ["", [Validators.required]],
        Email: [{value:"", disabled: true}, [Validators.required, Validators.email]],
        ProfileUrl: ["", [Validators.required]],
        Enterprise: [""],
        EnterpriseRole: [""],
        Country: [""],
        FacebookUrl: [""],
        TwitterUrl: [""],
        Website: [""],
        LinkedinUrl: [""],
        AboutMe: [""]
      })
  }

  get f() {
    return this.editProfileForm.controls;
  }


  onSubmit(){
    
    this._LayoutService.UpdateProfile(this.editProfileForm.value)
      .subscribe((data:any) => {

        if(data.success){
          swal.fire({
            html: `<span style='color:grey'> ${data.msg} <span>`,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-danger btn-simple",
            background: '#ffffff'
          });
          
          this.user = data.data;

          this.editProfileForm.patchValue({
            FirstName: this.user.FirstName,
            LastName: this.user.LastName,
            Email: this.user.Email,
            ProfileUrl: this.user.ProfileUrl,
            Enterprise: this.user.Enterprise,
            EnterpriseRole: this.user.EnterpriseRole,
            Country: this.user.Country,
            FacebookUrl: this.user.FacebookUrl,
            TwitterUrl: this.user.TwitterUrl,
            Website: this.user.Website,
            LinkedinUrl: this.user.LinkedinUrl,
            AboutMe: this.user.AboutMe 
          });

          //this.router.navigate([`/`]); //Redireccionar al perfil del usuario.

        }

      }, (error: any) => {
        console.log(error);
        if(!!error.error.msg){
          swal.fire({
            html: `<span style='color:grey'> ${error.error.msg} <span>`,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-danger btn-simple",
            background: '#ffffff'
          });
        }

        swal.fire({
          html: `<span style='color:grey'> Something wrong, please try again later :(  <span>`,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger btn-simple",
          background: '#ffffff'
        });

      });
  }

  linkedinRedirect(){
    window.open(this.user.LinkedinUrl, '_blank');
  }

  facebookRedirect(){
    window.open(this.user.FacebookUrl, '_blank');
  }

  twitterRedirect(){
    window.open(this.user.TwitterUrl, '_blank');
  }


}
