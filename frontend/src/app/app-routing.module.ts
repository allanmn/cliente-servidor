import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'attempt', redirectTo: 'auth/attempt', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./pages/sign-up/sign-up.module').then((m) => m.SignUpPageModule),
  },
  {
    path: 'attempt',
    loadChildren: () =>
      import('./pages/attempt/attempt.module').then((m) => m.AttemptPageModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.module').then((m) => m.UserPageModule),
  },
  {
    path: 'job-announcements',
    loadChildren: () =>
      import('./pages/job-announcements/index/index.module').then(
        (m) => m.IndexPageModule
      ),
  },
  {
    path: 'job-announcements/create',
    loadChildren: () =>
      import('./pages/job-announcements/create/create.module').then(
        (m) => m.CreatePageModule
      ),
  },
  {
    path: 'job-announcements/:id',
    loadChildren: () =>
      import('./pages/job-announcements/create/create.module').then(
        (m) => m.CreatePageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
