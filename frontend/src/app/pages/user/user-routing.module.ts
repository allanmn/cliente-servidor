import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardGuard } from 'src/app/guards/auth-guard.guard';
import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    data: {
      auth: ['empresa', 'candidato'],
    },
    canActivate: [AuthGuardGuard],
    component: UserPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
