import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http'; // No need to import CommonModule here
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-users.component.html',
  styleUrl: './verify-users.component.css'
})
export class VerifyUsersComponent implements OnInit {
  unverifiedUsers: any[] = [];

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUnverifiedUsers();
  }

  fetchUnverifiedUsers(): void {
    const token = this.authService.getToken();
    this.http.get<any[]>('http://localhost:3000/api/auth/unverified-students', {
      headers: { 'x-auth-token': token }
    }).subscribe(
      users => {
        this.unverifiedUsers = users;
      },
      error => {
        console.error('Error fetching unverified users:', error);
      }
    );
  }

  verifyUser(userId: string): void {
    const token = this.authService.getToken();
    this.http.put(`http://localhost:3000/api/auth/verify-student/${userId}`, {}, {
      headers: { 'x-auth-token': token }
    }).subscribe(
      () => {
        this.unverifiedUsers = this.unverifiedUsers.filter(user => user._id !== userId);
        alert('User verified successfully');
      },
      error => {
        console.error('Error verifying user:', error);
      }
    );
  }
}
