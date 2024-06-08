import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:3000/api/auth/login', this.loginForm.value)
        .subscribe(
          (response: any) => {
            console.log('Login successful', response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('email', this.loginForm.value.email);
            // Assuming response contains college info; if not, fetch it separately.
            localStorage.setItem('username', response.username);
            console.log("name",response.username);
            localStorage.setItem('college', response.college || ''); 
            this.router.navigate(['/dashboard']);
          },
          error => {
            console.error('Error logging in', error);
          }
        );
    }
  }
}
