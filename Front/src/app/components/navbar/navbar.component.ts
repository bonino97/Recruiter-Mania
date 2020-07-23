import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { LayoutService } from './../../services/layout.service';

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

  location: Location;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private toastr: ToastrService,
    private _LayoutService: LayoutService
  ) {
    this.location = location;
  }

  
  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;

    this._LayoutService.GetPageOptions()
      .subscribe((data:any) => {
        this.barOption = data.bar; //Habilita/Deshabilita Buscador
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
}
