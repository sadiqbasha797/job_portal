import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  email: string | null = '';
  college: string | null = '';
  name :  string | null = '';
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.college = localStorage.getItem('college');
    this.name  = localStorage.getItem('username');
  }
  
  logout(): void {
    this.authService.logout();
  }
 
}

