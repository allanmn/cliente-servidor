import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { AuthGuardGuard } from 'src/app/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      auth: ['empresa', 'candidato'],
    },
    canActivate: [AuthGuardGuard],
    component: DashboardPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
