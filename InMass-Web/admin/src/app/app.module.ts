import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { CompanyComponent } from './component/company/company.component';
import { JobsComponent } from './component/jobs/jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompanyComponent,
    JobsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
