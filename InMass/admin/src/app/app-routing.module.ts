import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { CompaniesComponent } from './components/companies/companies.component';
import { JobsComponent } from './components/jobs/jobs.component';

const routes: Routes = [
  {path:'',redirectTo:"/dashboard",pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[authGuard]},
  {path:'companies/create',component:CompaniesComponent,canActivate:[authGuard]},
  {path:'companies/edit:id',component:CompaniesComponent,canActivate:[authGuard]},
  {path:'jobs',component:JobsComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
