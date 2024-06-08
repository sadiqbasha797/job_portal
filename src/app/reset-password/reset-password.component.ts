import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule]
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const newPassword = this.resetPasswordForm.get('newPassword').value;

    this.http.post(`http://localhost:3000/api/auth/reset-password/${this.token}`, { newPassword })
      .subscribe({
        next: (response) => {
          alert('Password has been reset successfully');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = error.error.error;
        }
      });
  }
}
