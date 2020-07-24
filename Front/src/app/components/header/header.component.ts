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
  editButton: any;
  panel: any;
  newJobPath = "/jobs/new-job";

  @Input() getPath: string;

  constructor(
    public _LayoutService: LayoutService
  ) { }

  ngOnInit(): void {

    switch(this.getPath){
      case 'Home': {
        this._LayoutService.GetPageOptions()
        .subscribe((data:any) => {
          this.tagLine = data.tagLine; //Llena el texto del Banner
          this.jobButton = data.postJobButton; //Habilita/Deshabilita Boton de Nuevo Trabajo.
        });
        break;
      }
      case 'Panel': {
        this._LayoutService.GetPanelOptions()
        .subscribe((data:any) => {
          this.tagLine = data.tagLine; //Llena el texto del Banner
          this.subTagLine = data.subTagLine;
          this.jobButton = data.postJobButton; //Habilita/Deshabilita Boton de Nuevo Trabajo.
          this.editButton = data.editProfileButton; //Habilita/Deshabilita Boton de Nuevo Trabajo.
          this.panel = data.panel;
        });
        break;
      }
    }


  }

}
