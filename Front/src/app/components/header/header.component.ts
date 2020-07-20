import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  tagLine: any;
  subTagLine: any;
  jobButton: any;
  newJobPath = "/jobs/new-job";

  constructor(
    public _LayoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this._LayoutService.GetPageOptions()
    .subscribe((data:any) => {
      this.tagLine = data.tagLine; //Llena el texto del Banner
      this.jobButton = data.postJobButton; //Habilita/Deshabilita Boton de Nuevo Trabajo.
    });
  }

}
