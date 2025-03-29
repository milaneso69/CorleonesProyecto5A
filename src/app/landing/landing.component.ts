import { Component, OnInit, HostListener, AfterViewInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  
  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.initializeAnimation();
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.animateOnScroll();
      }, 100);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) {
      this.animateOnScroll();
      this.updateActiveNavLink();
    }
  }

  private initializeAnimation(): void {
    const elements = this.el.nativeElement.querySelectorAll('.title, .servicio-card, .title2, .products h2, .product-card');
    elements.forEach((element: Element) => {
      if (element instanceof HTMLElement) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      }
    });
  }

  private animateOnScroll(): void {
    const elements = this.el.nativeElement.querySelectorAll('.title, .servicio-card, .title2, .products h2, .product-card');
    const windowHeight = window.innerHeight;
    
    elements.forEach((element: Element) => {
      if (element instanceof HTMLElement) {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = windowHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      }
    });
  }

  private updateActiveNavLink(): void {
    const sections = this.el.nativeElement.querySelectorAll('section');
    const navLinks = this.el.nativeElement.querySelectorAll('.nav-links a');
    let currentSection = '';
    
    sections.forEach((section: Element) => {
      if (section instanceof HTMLElement) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
          currentSection = section.getAttribute('id') || '';
        }
      }
    });
    
    navLinks.forEach((link: Element) => {
      if (link instanceof HTMLElement) {
        link.classList.remove('active');
        if (link.getAttribute('href')?.substring(1) === currentSection) {
          link.classList.add('active');
        }
      }
    });
  }
}
