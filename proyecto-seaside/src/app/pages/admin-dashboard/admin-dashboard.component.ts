import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AdminAuthService,
  AdminSession,
} from '../../service/admin-auth.service';

/**
 * Dashboard del administrador.
 * Redirige a /admin/login si no hay sesión activa de admin.
 * Proporciona la opción de cerrar sesión.
 */
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  admin: AdminSession | null = null;

  constructor(
    private adminAuthService: AdminAuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.admin = this.adminAuthService.currentAdmin;
    if (!this.admin) {
      this.router.navigate(['/admin/login']);
    }
  }

  logout(): void {
    this.adminAuthService.logout();
    this.router.navigate(['/admin/login']);
  }
}
