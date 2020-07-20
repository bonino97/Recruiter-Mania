import { JobsListComponent } from './../../pages/jobs-list/jobs-list.component';
import { NotFoundComponent } from '../../pages/not-found/not-found.component';
import { JobComponent } from '../../pages/job/job.component';
import { NewJobComponent } from '../../pages/new-job/new-job.component';


import { Routes } from '@angular/router';


export const LayoutRoutes: Routes = [
    { path: "", component: JobsListComponent },
    { path: "new-job", component: NewJobComponent },
    { path: "job/:id", component: JobComponent },

    
    { path: "not-found", component: NotFoundComponent }
  ];
  