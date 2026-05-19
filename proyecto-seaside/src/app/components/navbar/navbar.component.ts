import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AdminAuthService } from '../../service/admin-auth.service';
import { OperadorAuthService } from '../../service/operador-auth.service';
import { CarritoService } from '../../service/carrito.service';

/**
 * Barra de navegación principal del sitio.
 * Se adapta visualmente con un efecto de desplazamiento al hacer scroll:
 * aplica fondo degradado, blur y sombra progresivamente.
 * Muestra el número de ítems en el carrito y el estado de sesión del cliente.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isScrolled = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    public adminAuthService: AdminAuthService,
    public operadorAuthService: OperadorAuthService,
    public carritoService: CarritoService,
  ) {}

  get isAnyLoggedIn(): boolean {
    return (
      this.authService.isLoggedIn ||
      this.adminAuthService.isLoggedIn ||
      this.operadorAuthService.isLoggedIn
    );
  }

  get dashboardRoute(): string {
    if (this.adminAuthService.isLoggedIn) return '/admin/dashboard';
    if (this.operadorAuthService.isLoggedIn) return '/pedidos';
    if (this.authService.isLoggedIn) return '/perfil';
    return '/login';
  }

  get dashboardLabel(): string {
    if (this.adminAuthService.isLoggedIn) return 'Panel Admin';
    if (this.operadorAuthService.isLoggedIn) return 'Portal Operador';
    if (this.authService.isLoggedIn) return 'Perfil';
    return 'Log in';
  }

  logout(): void {
    this.authService.logout();
    this.adminAuthService.logout();
    this.operadorAuthService.logout();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.updateScrollState();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.updateScrollState();
  }

  private updateScrollState(): void {
    const scrollY = window.scrollY;
    this.isScrolled = scrollY > 80;

    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const threshold = 300;
    const progress = Math.min(scrollY / threshold, 1);
    const blurAmount = progress * 14;
    const shadowAlpha = progress * 0.12;

    navbar.style.background = `linear-gradient(
      to bottom,
      rgba(225, 110, 45, ${progress * 0.78}),
      rgba(230, 160, 55, ${progress * 0.78})
    )`;
    navbar.style.backdropFilter = `blur(${blurAmount}px)`;
    navbar.style.boxShadow =
      shadowAlpha > 0 ? `0 2px 16px rgba(64, 1, 1, ${shadowAlpha})` : 'none';
  }
}
