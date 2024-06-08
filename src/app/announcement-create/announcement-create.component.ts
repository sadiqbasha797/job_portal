import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../services/announcement.service';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Announcement } from '../models/announcement.model'; // Import the model
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-announcement-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './announcement-create.component.html',
  styleUrl: './announcement-create.component.css'
})
export class AnnouncementCreateComponent implements OnInit {
  title: string = '';
  content: string = '';
  images: File[] = [];
  isAdmin: boolean = false;

  constructor(
    private announcementService: AnnouncementService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAdminRole();
    if (!this.isAdmin) {
      this.router.navigate(['/']);
    }
  }

  checkAdminRole(): void {
    const role = this.authService.getRole();
    this.isAdmin = role === 'admin';
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.images = Array.from(event.target.files);
    }
  }

  createAnnouncement(): void {
    const readerPromises = this.images.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: any) => resolve(e.target.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readerPromises).then(base64Images => {
      const announcement: Announcement = {
        title: this.title,
        content: this.content,
        images: base64Images,
        createdBy: this.authService.getUser()?.username || '',
        college: this.authService.getUser()?.college || ''
      };

      this.announcementService.createAnnouncement(announcement).subscribe(
        () => {
          alert("Announcement Posted Successfully")
        },
        (error) => {
          console.error('Error creating announcement:', error);
          
        }
      );
    });
  }
}