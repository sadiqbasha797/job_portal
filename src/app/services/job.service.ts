import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseUrl = 'http://localhost:3000/api/job';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'x-auth-token': token || '' });
  }

  createJob(jobData: Job): Observable<Job> {
    console.log('Sending job data to server:', jobData); // Debug: Log job data being sent
    return this.http.post<Job>(`${this.baseUrl}/create`, jobData, {
      headers: this.getAuthHeaders()
    });
  }

  getJobsByCollege(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/college`, {
      headers: this.getAuthHeaders()
    });
  }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/all`, {
      headers: this.getAuthHeaders()
    });
  }

  updateJob(jobId: string, jobData: Job): Observable<Job> {
    return this.http.put<Job>(`${this.baseUrl}/job/update/${jobId}`, jobData, {
      headers: this.getAuthHeaders()
    });
  }

  getJobsByUsername(username: string): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/jobs/username/${username}`, {
      headers: this.getAuthHeaders()
    });
  }

  deleteJob(jobId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/job/delete/${jobId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
