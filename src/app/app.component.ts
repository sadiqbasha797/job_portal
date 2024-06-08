import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobComponent } from './job/job.component';
import { JobPostingComponent } from './job-posting/job-posting.component';
import { AdminJobsComponent } from './admin-jobs/admin-jobs.component';
import { VerifyUsersComponent } from './verify-users/verify-users.component';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './reset-password-request/reset-password-request.component';
import { AnnouncementCreateComponent} from './announcement-create/announcement-create.component';
import { FooterComponent } from './footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FooterComponent,
    AnnouncementCreateComponent,
    CommonModule,
    DashboardComponent,
    RouterOutlet,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JobComponent,
    JobPostingComponent,
    AdminJobsComponent,
  VerifyUsersComponent,
  ResetPasswordComponent,
  ResetPasswordRequestComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'frontend';
}
