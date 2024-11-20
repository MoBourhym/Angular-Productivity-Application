import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ApiService } from './api.service';
import { ColorService } from '../../services/color.service';
import { department } from './department.model.ts/departement.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,ToastComponent, RouterOutlet, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  departments: department[] = [];

  constructor(  private router:Router,private apiService: ApiService, private color: ColorService) {}
  ngOnInit(): void {
  this.loadDepartement()
  }

  loadDepartement() {
    this.apiService.getAllDepartment().subscribe({
      next: (data) => {
        this.departments = data;
      },
    });
  }


  getDepartmentColor(department: string): string {
    return this.color.getDepartmentColor(department);
  }

  navigateToDepartment(department: any): void {
    this.router.navigate(['/department', department.id]);
    this.apiService.notifyChange()
  }
  
}
