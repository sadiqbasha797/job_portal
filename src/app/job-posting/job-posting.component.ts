import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../services/job.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-posting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.css']
})
export class JobPostingComponent implements OnInit {
  jobForm: FormGroup;
  isAdmin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private authService: AuthService,
    private router: Router

  ) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      deadline: ['', Validators.required],
      docLink: [''],
      applyLink: [''],
      createdBy: ['', Validators.required],
      college: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.checkAdmin();
    this.setJobFormInitialValues();
  }

  checkAdmin(): void {
    const role = this.authService.getRole();
    console.log('User role:', role); // Debug: Print the role
    if(this.isAdmin=role !='admin'){
      alert("you have no permissions to view this page")
      this.router.navigate(['/dashboard']);
    }
    this.isAdmin = role === 'admin';
  }

  setJobFormInitialValues(): void {
    const user = this.authService.getUser();
    console.log('Set form initial values:', user); // Debug: Log the user
    if (user) {
      this.jobForm.patchValue({
        createdBy: user.username,
        college: user.college
      });
    } else {
      console.error('User not found');
    }
  }

  onSubmit(): void {
    console.log('Form status:', this.jobForm.status); // Debug: Log form status
    console.log('Form values:', this.jobForm.value); // Debug: Log form values
    
    if (this.jobForm.valid) {
      alert('Form Submitted'); // Debug: Log form submission
      this.jobService.createJob(this.jobForm.value).subscribe(
        response => {
          alert('Job posted successfully:');
          // Optionally, reset the form or navigate to another page
        },
        error => {
          alert('Error posting job:');
        }
      );
    } else {
      alert('Form is invalid');
    }
  }
}
