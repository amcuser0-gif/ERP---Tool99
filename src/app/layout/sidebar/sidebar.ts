import { Component, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {

  // Logged-in user
  user: any = null;

  isVisible = true;
  protected readonly title = signal('AMCERP');

  titles: Record<string, string> = {
    dashboard: 'Dashboard',
    ai: 'AI Insights',
    admissions: 'Admissions',
    attendance: 'Attendance',
    exams: 'Examinations & Results',
    timetable: 'Timetable',
    fees: 'Fees & Accounts',
    faculty: 'Faculty & HR',
    hostel: 'Hostel Management',
    transport: 'Transport Management',
    library: 'Library',
    placement: 'Placement Cell',
    alumni: 'Alumni Network',
    reports: 'Reports',
    settings: 'Settings'
  };

  activeSection = 'dashboard';
  activeBottomNav = 'dashboard';
  activeTab = 'dashboard';

  bnavIds = ['dashboard', 'admissions', 'fees', 'attendance'];

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // Load logged-in user
    this.user = this.auth.getUser();
  }

  go(id: string) {
    this.activeSection = id;
    this.activeBottomNav = id;
    this.router.navigate([id]);

    const titleEl = document.getElementById('page-title');
    if (titleEl) {
      titleEl.textContent = this.titles[id] || id;
    }

    if (window.innerWidth <= 768) {
      this.closeSidebar();
    }
  }

  switchTab(panelId: string): void {
    this.activeTab = panelId;
  }

  closeSidebar() {
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebar-overlay')?.classList.remove('open');
  }

  toggleSidebar() {
    document.getElementById('sidebar')?.classList.toggle('open');
    document.getElementById('sidebar-overlay')?.classList.toggle('open');
  }

}

// import { Component, signal } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth';

// @Component({
//   selector: 'app-sidebar',
//   imports: [],
//   templateUrl: './sidebar.html',
//   styleUrl: './sidebar.css',
// })
// export class Sidebar {

//   isVisible = true;
//   protected readonly title = signal('AMCERP');
//   titles: Record<string, string> = {
//     dashboard: 'Dashboard',
//     ai: 'AI Insights',
//     admissions: 'Admissions',
//     attendance: 'Attendance',
//     exams: 'Examinations & Results',
//     timetable: 'Timetable',
//     fees: 'Fees & Accounts',
//     faculty: 'Faculty & HR',
//     hostel: 'Hostel Management',
//     transport: 'Transport Management',
//     library: 'Library',
//     placement: 'Placement Cell',
//     alumni: 'Alumni Network',
//     reports: 'Reports',
//     settings: 'Settings'
//   };

//   activeSection = 'dashboard';
//   activeBottomNav = 'dashboard';
 

//   constructor(private router: Router) { }
//   bnavIds = ['dashboard', 'admissions', 'fees', 'attendance'];
 

//     go(id: string) {
//       this.activeSection = id;
//       this.activeBottomNav = id;
//       this.router.navigate([id]);

//       const titleEl = document.getElementById('page-title');
//       if (titleEl) {
//         titleEl.textContent = this.titles[id] || id;
//       }

//       if (window.innerWidth <= 768) {
//         this.closeSidebar();
//       }
//     }
//  activeTab = 'dashboard';
//     switchTab(panelId: string): void {
//       this.activeTab = panelId;
//     }
//     closeSidebar() {
//       document.getElementById('sidebar')?.classList.remove('open');
//       document.getElementById('sidebar-overlay')?.classList.remove('open');
//     }
//     toggleSidebar() {
//       document.getElementById('sidebar')?.classList.toggle('open');
//       document.getElementById('sidebar-overlay')?.classList.toggle('open');
//     }

// }
