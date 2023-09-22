import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { CompanyComponent } from './component/company/company.component';
import { JobsComponent } from './component/jobs/jobs.component';
import { authGuard } from './auth/auth.guard';
import { ComCreateComponent } from './component/company/com-create/com-create.component';
import { JobsCreateComponent } from './component/jobs/jobs-create/jobs-create.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'company',component:CompanyComponent,canActivate:[authGuard]},
  {path:'company/edit/:id',component:ComCreateComponent,canActivate:[authGuard]},
  {path:'company/create',component:ComCreateComponent,canActivate:[authGuard]},
  {path:'jobs',component:JobsComponent,canActivate:[authGuard]},
  {path:'jobs/create',component:JobsCreateComponent,canActivate:[authGuard]},
  {path:'jobs/edit/:id',component:JobsCreateComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
