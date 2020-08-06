
import { EditProfileComponent } from './../../pages/edit-profile/edit-profile.component';
import { AuthGuard } from './../../guards/auth.guard';
import { AdminPanelComponent } from './../../pages/admin-panel/admin-panel.component';
import { JobsListComponent } from './../../pages/jobs-list/jobs-list.component';
import { NotFoundComponent } from '../../pages/not-found/not-found.component';
import { JobComponent } from '../../pages/job/job.component';
import { NewJobComponent } from '../../pages/new-job/new-job.component';


import { Routes } from '@angular/router';
import { EditJobComponent } from 'src/app/pages/edit-job/edit-job.component';
import { CandidatesListComponent } from 'src/app/pages/candidates-list/candidates-list.component';


export const LayoutRoutes: Routes = [
    /* JOBS ROUTES */
    { path: "jobs", component: JobsListComponent},
    { path: "jobs/new-job", component: NewJobComponent, canActivate : [AuthGuard]},
    { path: "jobs/job/:url", component: JobComponent},
    { path: "jobs/job/:url/edit", component: EditJobComponent, canActivate : [AuthGuard]},
    { path: "jobs/job/:url/candidates", component: CandidatesListComponent, canActivate : [AuthGuard]},
    { path: "jobs/panel", component: AdminPanelComponent , canActivate : [AuthGuard]},

    /* USER ROUTES */
    { path: "profile/edit-profile", component: EditProfileComponent , canActivate : [AuthGuard]}
  ];
  