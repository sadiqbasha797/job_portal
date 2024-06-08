import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement.model';
import { AuthService } from './auth.service'; // Import the AuthService

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private baseUrl = 'http://localhost:3000/api/announcement'; // Hardcoded URL

  constructor(private http: HttpClient, private authService: AuthService) {}
  getAnnouncements(college: string): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.baseUrl}/college/${college}`);
    
  }
  

  createAnnouncement(announcement: Announcement): Observable<Announcement> {
    const token = this.authService.getToken(); // Get the authentication token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the authorization header

    return this.http.post<Announcement>(`${this.baseUrl}/create`, announcement, { headers });
  }

  deleteAnnouncement(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }
}
