import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../services/job.service';
import { AuthService } from '../services/auth.service';
import { Job } from '../models/job.model';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-jobs',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.css']
})
export class AdminJobsComponent implements OnInit {
  jobs: Job[] = [];
  isAdmin: boolean = false;
  showModal: boolean = false;
  updateJobForm: FormGroup;
  currentJobId: string | null = null;

  constructor(
    private jobService: JobService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router

  ) {
    this.updateJobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      deadline: ['', Validators.required],
      applyLink: [''],
      docLink: ['']
        });
  }

  ngOnInit(): void {
    this.checkAdmin();
    if (this.isAdmin) {
      this.fetchJobsByUsername();
    }
  }

  checkAdmin(): void {
    const role = this.authService.getRole();
    this.isAdmin = role === 'admin';
    console.log('Admin status:', this.isAdmin); // Debug: Log admin status
    if(!this.isAdmin){
      alert("you have no permissions to view this page");
      this.router.navigate(['/dashboard']);
    }
  }

  fetchJobsByUsername(): void {
    const user = this.authService.getUser();
    const username = user?.username;
    console.log('Fetching jobs for username:', username); // Debug: Log username
    if (username) {
      this.jobService.getJobsByUsername(username).subscribe(
        (jobs: Job[]) => {
          console.log('Jobs fetched:', jobs); // Debug: Log fetched jobs
          this.jobs = jobs;
        },
        (error) => {
          console.error('Error fetching jobs: ', error);
        }
      );
    } else {
      console.log('Username not found'); // Debug: Log if username is not found
    }
  }

  openUpdateModal(job: Job): void {
    this.currentJobId = job._id;
    this.updateJobForm.patchValue({
      title: job.title,
      description: job.description,
      location: job.location,
      deadline: job.deadline,
      applyLink : job.applyLink,
      docLink : job.docLink,
    });
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.updateJobForm.reset();
  }

  onUpdateSubmit(): void {
    if (this.updateJobForm.valid && this.currentJobId) {
      console.log('Form Submitted', this.updateJobForm.value); // Debug: Log form submission
      this.jobService.updateJob(this.currentJobId, this.updateJobForm.value).subscribe(
        response => {
          alert('Job updated successfully');
          this.fetchJobsByUsername(); // Refresh the job list
          this.closeModal();
        },
        error => {
          console.error('Error updating job:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  deleteJob(jobId: string): void {
    alert('Are you sure you want to delete the job posted'); // Debug: Log job ID to be deleted
    this.jobService.deleteJob(jobId).subscribe(
      () => {
        console.log('Job deleted:', jobId); // Debug: Log successful deletion
        this.jobs = this.jobs.filter(job => job._id !== jobId);
      },
      (error) => {
        console.error('Error deleting job: ', error);
      }
    );
  }
}
