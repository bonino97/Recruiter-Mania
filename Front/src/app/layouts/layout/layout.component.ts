import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import PerfectScrollbar from "perfect-scrollbar";
import { ToastrService } from "ngx-toastr";

//Services
import { LayoutService } from './../../services/layout.service';

//Models
import { Job } from './../../models/job.model';

var misc: any = {
  sidebar_mini_active: true
};

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {

  public tagLine: any;
  public subTagLine: any;
  public postJobButton: any;

  
  public openJobsListTable = true; //Por defecto abre la tabla con trabajos.
  public openPostJobForm = false;

  constructor(
      public router: Router, 
      public toastr: ToastrService, 
      public _LayoutService: LayoutService
  ) {}
  
  @HostListener("window:scroll", ["$event"])

  ngOnInit() {

    var mainPanel: any = document.getElementsByClassName("main-panel")[0];
    var sidebar: any = document.getElementsByClassName("sidebar-wrapper")[0];
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      var ps = new PerfectScrollbar(mainPanel);
      ps = new PerfectScrollbar(sidebar);
      var tables: any = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    
    // if(this.openJobsListTable){
    //   this._LayoutService.GetPageOptions()
    //   .subscribe((data:any) => {
    //     this.tagLine = data.tagLine; //Llena el texto del Banner
    //     this.postJobButton = data.postJobButton; //Habilita/Deshabilita Boton de Nuevo Trabajo.
    //   });
    // }
  }

  openPostJob(event){
    this.openPostJobForm = event;
    this.openJobsListTable = false;
    this._LayoutService.GetNewJobOptions()
    .subscribe((data:any) => {
      this.tagLine = data.tagLine; //Habilita/Deshabilita Buscador
      this.subTagLine = data.subTagLine; //Llena el texto del SubBanner
      this.postJobButton = data.postJobButton; //Habilita/Deshabilita Boton de Nuevo Trabajo.
    });
  }
}
