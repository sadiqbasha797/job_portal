import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobComponent } from './job/job.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { JobPostingComponent } from './job-posting/job-posting.component';
import { AdminJobsComponent } from './admin-jobs/admin-jobs.component';
import { VerifyUsersComponent } from './verify-users/verify-users.component';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './reset-password-request/reset-password-request.component';
import { AnnouncementCreateComponent } from './announcement-create/announcement-create.component';
export const routes: Routes = [
    {
        path : '',
        component : HomeComponent
    },
    {
        path : 'register',
        component:RegisterComponent
    },
    {
        path : 'navbar',
        component:NavbarComponent
    },
     {
        path : 'login',
        component:LoginComponent
    },
    {
        path : 'dashboard',
        component:DashboardComponent
    },
    {
        path:'job',
        component:JobComponent
    },
    {
        path:'job-posting',
        component:JobPostingComponent
    },
    {
        path:'admin-jobs',
        component:AdminJobsComponent
    },
    {
        path:'verify-students',
        component:VerifyUsersComponent
    },
    {
        path: 'reset-password/:token',
        component: ResetPasswordComponent
    },
    {
        path:'reset-password-request',
        component:ResetPasswordRequestComponent
    }
    ,
    {
        path:'create_announce',
        component:AnnouncementCreateComponent
    }
   
 
];    
@NgModule({
    imports: [RouterModule.forRoot(routes),HttpClientModule, BrowserModule,CommonModule
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }