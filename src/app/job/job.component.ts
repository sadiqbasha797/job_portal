import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { Job } from '../models/job.model';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  standalone: true,
  imports: [CommonModule,FooterComponent]
})
export class JobComponent implements OnInit {
  activeJobs: Job[] = [];
  inactiveJobs: Job[] = [];
  expandedDescriptions: { [key: string]: boolean } = {};

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.fetchJobsByCollege();
  }

  fetchJobsByCollege(): void {
    this.jobService.getJobsByCollege().subscribe(
      (jobs: Job[]) => {
        const currentDate = new Date();
        const tomorrow = new Date(currentDate.setDate(currentDate.getDate() + 1));
        const yes = new Date(currentDate.setDate(currentDate.getDate() - 2));
        this.activeJobs = jobs.filter(job => new Date(job.deadline) >= yes);
        this.inactiveJobs = jobs.filter(job => new Date(job.deadline) < yes);
        
        this.activeJobs.forEach(job => {
          this.expandedDescriptions[job.college] = false;
        });

      },
      (error) => {
        console.error('Error fetching jobs: ', error);
      }
    );
  }
  truncateDescription(description: string): string {
    return description.length > 40? `${description.substring(0, 37)}... Read More` : description;
  }

  toggleDescriptionExpanded(collegeId: string): void {
    this.expandedDescriptions[collegeId] = !this.expandedDescriptions[collegeId];
}

}
