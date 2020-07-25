import { EditProfileComponent } from './../../pages/edit-profile/edit-profile.component';
import { AuthGuard } from './../../guards/auth.guard';
import { AdminPanelComponent } from './../../pages/admin-panel/admin-panel.component';
import { JobsListComponent } from './../../pages/jobs-list/jobs-list.component';
import { NotFoundComponent } from '../../pages/not-found/not-found.component';
import { JobComponent } from '../../pages/job/job.component';
import { NewJobComponent } from '../../pages/new-job/new-job.component';


import { Routes } from '@angular/router';
import { EditJobComponent } from 'src/app/pages/edit-job/edit-job.component';


export const LayoutRoutes: Routes = [
    /* JOBS ROUTES */
    { path: "jobs", component: JobsListComponent, data: { animation: 'isRight' }},
    { path: "jobs/new-job", component: NewJobComponent, canActivate : [AuthGuard], data: { animation: 'isRight' }},
    { path: "jobs/job/:url", component: JobComponent, data: { animation: 'isRight' }},
    { path: "jobs/job/:url/edit", component: EditJobComponent, canActivate : [AuthGuard], data: { animation: 'isRight' }},
    { path: "jobs/panel", component: AdminPanelComponent , canActivate : [AuthGuard], data: { animation: 'isRight' }},

    /* USER ROUTES */
    { path: "profile/edit-profile", component: EditProfileComponent , canActivate : [AuthGuard], data: { animation: 'isRight' }},


    
    { path: "not-found", component: NotFoundComponent }
  ];
  