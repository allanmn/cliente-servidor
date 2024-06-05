import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardGuard } from 'src/app/guards/auth-guard.guard';
import { IndexPage } from './index/index.page';
import { CreatePage } from './create/create.page';

const routes: Routes = [
  {
    path: '',
    data: {
      auth: ['empresa'],
    },
    canActivate: [AuthGuardGuard],
    component: IndexPage,
  },
  {
    path: 'create',
    data: {
      auth: ['empresa'],
    },
    canActivate: [AuthGuardGuard],
    component: CreatePage,
  },
  {
    path: ':id',
    data: {
      auth: ['empresa'],
    },
    canActivate: [AuthGuardGuard],
    component: CreatePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobAnnouncementPageRoutingModule {}
