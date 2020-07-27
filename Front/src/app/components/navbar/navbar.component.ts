
import swal from "sweetalert2";
import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { LayoutService } from './../../services/layout.service';
import { AuthService } from './../../services/auth.service';
import { environment } from 'src/environments/environment';

var misc: any = {
  sidebar_mini_active: true
};
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  private listTitles: any[];
  public barOption: any;
  public isCollapsed = true;

  user: any;
  userImage: any;
  file: any = {};
  imagePreviewUrl: any = {};
  profilePathURL = `${environment.uploadsUrl}/Profiles/`;
  location: Location;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private toastr: ToastrService,
    private _LayoutService: LayoutService,
    private _AuthService: AuthService
  ) {
    this.location = location;
  }

  
  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;

    this._LayoutService.GetUserInstance()
    .subscribe((data:any) => {

      this.user = data.data;
      this.userImage = this.user.Image;
      this.file = null;
      
      if(!!this.userImage){
        this.imagePreviewUrl = `${this.profilePathURL}${this.userImage}`; 
      } else {
        this.imagePreviewUrl = "assets/img/image_placeholder.jpg";
      }

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

  }

  ngOnDestroy() {
    
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  logout(){
    localStorage.removeItem("lemon-cookie");
    localStorage.clear();
    this._LayoutService.Logout()
      .subscribe((data:any) => {
        swal.fire({
          html: "<span style='color:grey'> Closing... <span>",
          timer: 1500,
          showConfirmButton: false
        }).then( () => {
          this.router.navigate([`/login`]);
        }, (error) => {
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
      }, (error: any) => {
        if(error.status === 401){
          swal.fire({
            html: `<span style='color:grey'>Closing...<span>`,
            buttonsStyling: false,
            showConfirmButton: false,
            timer: 1500,
            background: '#ffffff'
          });
        }
        this.router.navigate([`/login`]);
      });
  }
}
