

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { QuillModule } from 'ngx-quill';
import { TagInputModule } from "ngx-chips";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TooltipModule } from "ngx-bootstrap/tooltip";

import { NotFoundComponent } from './not-found/not-found.component';
import { NewJobComponent } from './new-job/new-job.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobComponent } from './job/job.component';

import { HeaderComponent } from './../components/header/header.component';
import { AuthNavbarComponent } from './../components/auth-navbar/auth-navbar.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UserJobsComponent } from './user-jobs/user-jobs.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    HttpClientModule,
    ProgressbarModule.forRoot(),
    QuillModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    TagInputModule
],
  declarations: [
    NotFoundComponent,
    NewJobComponent,
    JobsListComponent,
    JobComponent,
    HeaderComponent,
    EditJobComponent,
    RegisterComponent,
    LoginComponent,
    AuthNavbarComponent,
    AdminPanelComponent,
    UserJobsComponent,
    EditProfileComponent,
    FileUploadComponent
],
  exports: [
    NotFoundComponent,
    NewJobComponent,
    JobsListComponent,
    JobComponent,
    HeaderComponent,
    AuthNavbarComponent,
    FileUploadComponent
]
})

export class PagesModule {}
