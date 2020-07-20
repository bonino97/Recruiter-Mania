
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PagesModule } from './../../pages/pages.module';

//Modulo de Componentes Visuales como Navbar, Header, Etc..
import { ComponentsModule } from '../../components/components.module';

//Rutas
import { LayoutRoutes } from './layout.routing';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      RouterModule.forChild(LayoutRoutes),
      CommonModule,
      ComponentsModule,
      PagesModule
    ],
    declarations: [
        
    ],
    exports: [
        
    ]
  })
  export class LayoutModule {}
