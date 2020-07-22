


import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { QuillModule } from 'ngx-quill';
import { TagInputModule } from "ngx-chips";

import { NotFoundComponent } from './not-found/not-found.component';
import { NewJobComponent } from './new-job/new-job.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobComponent } from './job/job.component';

import { HeaderComponent } from './../components/header/header.component';
import { EditJobComponent } from './edit-job/edit-job.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    HttpClientModule,
    ProgressbarModule.forRoot(),
    QuillModule.forRoot(),
    TagInputModule
],
  declarations: [
    NotFoundComponent,
    NewJobComponent,
    JobsListComponent,
    JobComponent,
    HeaderComponent,
    EditJobComponent
],
  exports: [
    NotFoundComponent,
    NewJobComponent,
    JobsListComponent,
    JobComponent,
    HeaderComponent
]
})

export class PagesModule {}
