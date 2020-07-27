import { PagesModule } from './../pages/pages.module';

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { CollapseModule } from "ngx-bootstrap/collapse";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { DxVectorMapModule } from "devextreme-angular";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";


import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";

// import { AuthNavbarComponent } from './auth-navbar/auth-navbar.component';
// import { HeaderComponent } from './header/header.component';

//Movemos el Modulo Header para poder parametrizarlo, quizas no sea la mejor practica, pero es una buena solucion a la UI

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      HttpClientModule,
      FormsModule,
      JwBootstrapSwitchNg2Module,
      DxVectorMapModule,
      CollapseModule.forRoot(),
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      PagesModule
    ],
    declarations: [
      FooterComponent,
      NavbarComponent,
      // FileUploadComponent,
      // AuthNavbarComponent,
      // HeaderComponent
    ],
    exports: [
      FooterComponent,
      NavbarComponent,
      // HeaderComponent
    ]
  })
  export class ComponentsModule {}
