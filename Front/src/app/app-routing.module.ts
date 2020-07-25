
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { LayoutComponent } from './layouts/layout/layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/jobs",
    pathMatch: "full"
  },
  {
    path: "",
    component: LayoutComponent,
    data: { animation: 'isRight' },
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/layout/layout.module#LayoutModule"
      }
    ]
  },
  {
    path: "",
    component: RegisterComponent,
    data: { animation: 'isRight' },
    children: [
      {
        path: "register",
        loadChildren:
          "./layouts/layout/layout.module#LayoutModule"
      }
    ]
  },
  {
    path: "",
    component: LoginComponent,
    data: { animation: 'isRight' },
    children: [
      {
        path: "login",
        loadChildren:
          "./layouts/layout/layout.module#LayoutModule"
      }
    ]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      scrollOffset: [0, 64]
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
