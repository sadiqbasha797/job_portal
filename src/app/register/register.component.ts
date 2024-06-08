import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm! : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      college: ['', Validators.required],
      role: ['student'],
      verified:['false']  // Fixed role to 'student'
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:3000/api/auth/register', this.registerForm.value)
        .subscribe(
          response => {
            alert('User registered successfully');
            this.router.navigate(['/login']); // Navigate to login or another page upon success
          },
          error => {
            console.error('Error registering user', error);
          }
        );
    }
  }
}
