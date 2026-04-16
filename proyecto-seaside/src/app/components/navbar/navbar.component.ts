import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isScrolled = false;

  constructor(public authService: AuthService) {}

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
