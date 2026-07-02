import { Component } from '@angular/core';
import { AdmissionsRoutingModule } from "./modules/admissions/admissions-routing-module";
import { CommonModule } from '@angular/common';
import { Sidebar } from './layout/sidebar/sidebar';
import { DashboardModule } from './modules/dashboard/dashboard-module';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AdmissionsRoutingModule,CommonModule, DashboardModule, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  constructor(public router: Router) { }

  }

