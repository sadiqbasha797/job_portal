import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password-request',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password-request.component.html',
  styleUrl: './reset-password-request.component.css'
})
export class ResetPasswordRequestComponent {
  email: string = '';

  constructor(private http: HttpClient) {}

  requestPasswordReset() {
    if (!this.email) {
      alert('Email is required');
      return;
    }

    this.http.post('http://localhost:3000/api/auth/request-reset-password', { email: this.email }).subscribe(
      (response: any) => {
        alert('Password reset link sent to your email');
      },
      (error) => {
        console.error('Error requesting password reset:', error);
        alert('Error requesting password reset');
      }
    );
  }
}
