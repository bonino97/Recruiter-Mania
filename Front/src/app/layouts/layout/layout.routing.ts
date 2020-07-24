import { AuthGuard } from './../../guards/auth.guard';
import { AdminPanelComponent } from './../../pages/admin-panel/admin-panel.component';
import { JobsListComponent } from './../../pages/jobs-list/jobs-list.component';
import { NotFoundComponent } from '../../pages/not-found/not-found.component';
import { JobComponent } from '../../pages/job/job.component';
import { NewJobComponent } from '../../pages/new-job/new-job.component';


import { Routes } from '@angular/router';
import { EditJobComponent } from 'src/app/pages/edit-job/edit-job.component';


export const LayoutRoutes: Routes = [
    { path: "", component: JobsListComponent },
    { path: "new-job", component: NewJobComponent },
    { path: "job/:url", component: JobComponent },
    { path: "job/:url/edit", component: EditJobComponent, canActivate : [AuthGuard]},
    { path: "panel", component: AdminPanelComponent , canActivate : [AuthGuard]},


    
    { path: "not-found", component: NotFoundComponent }
  ];
  