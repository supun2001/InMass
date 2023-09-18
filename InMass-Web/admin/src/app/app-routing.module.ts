import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { CompanyComponent } from './component/company/company.component';
import { JobsComponent } from './component/jobs/jobs.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,canActivate:[authGuard]},
  {path:'login',component:LoginComponent},
  {path:'company',component:CompanyComponent,canActivate:[authGuard]},
  {path:'company/edit:id',component:CompanyComponent,canActivate:[authGuard]},
  {path:'jobs',component:JobsComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
