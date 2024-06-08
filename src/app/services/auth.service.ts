import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string, password: string }): void {
    this.http.post<{ token: string, college: string, username: string, user: any }>(`${this.authUrl}/login`, credentials)
      .subscribe(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('college', response.college);
        localStorage.setItem('username', response.username); // Ensure correct property
        this.router.navigate(['/home']);
      }, error => {
        console.error('Login error:', error); // Handle errors
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('college');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  }
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.authUrl}/request-reset-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.authUrl}/reset-password`, { token, newPassword });
  }
  getUser(): { username: string, college: string } | null {
    const username = localStorage.getItem('username');
    const college = localStorage.getItem('college');
  
   // console.log('Retrieved username from localStorage:', username); // Debug: Log retrieved username
   // console.log('Retrieved college from localStorage:', college); // Debug: Log retrieved college
    
    if (username && college) {
      return { username, college };
    }
    return null;
  }
  
}  
