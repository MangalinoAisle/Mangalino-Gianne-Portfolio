import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {

  techStack = [
    'Angular', 'TypeScript', 'JavaScript',
    'HTML5', 'CSS3', 'Figma', 'Git/GitHub', 'Tailwind CSS'
  ];

  processSteps = [
    {
      icon: 'fas fa-search',
      title: 'Discover',
      desc: 'Research users, understand goals, and define the problem worth solving.'
    },
    {
      icon: 'fab fa-figma',
      title: 'Design',
      desc: 'Wireframe, prototype, and refine high-fidelity UI in Figma.'
    },
    {
      icon: 'fas fa-code',
      title: 'Build',
      desc: 'Translate designs into clean, responsive Angular code.'
    },
    {
      icon: 'fas fa-rocket',
      title: 'Launch',
      desc: 'Test, optimise, and ship a polished, performant product.'
    }
  ];

  // UPDATED: Now featuring your 3 actual projects!
// UPDATED: Now featuring live links!
  featuredProjects = [
    {
      title: 'Rhode Skincare Clone',
      tech: 'HTML5 · CSS3 · Vanilla JS',
      description: 'A pixel-perfect, responsive multi-page front-end clone of the Rhode e-commerce platform focusing on minimalist UI/UX.',
      link: 'https://rhodedupelandingpage.netlify.app', // Live URL
      image: 'assets/r1.png'
    },
    {
      title: 'Scoop Ice Cream',
      tech: 'HTML5 · CSS3 · JavaScript',
      description: 'A vibrant, interactive e-commerce website for a handcrafted ice cream shop utilizing a highly engaging scrapbook aesthetic.',
      link: 'https://scoop-ice-cream.vercel.app/', // Live URL
      image: 'assets/scoop1.png'
    },
    {
      title: 'Soda Pop',
      tech: 'Angular · Tailwind CSS',
      description: 'Designed and developed a vibrant promotional e-commerce interface for a healthy, plant-based soda brand.',
      link: 'https://sodapopph.netlify.app', // Live URL
      image: 'assets/sodapop-1.png'
    }
  ];
  testimonials = [
    {
      quote: "Gianne's attention to detail in UI design is exceptional. She consistently delivers interfaces that are both beautiful and functional.",
      author: "Web Development Instructor",
      role: "Holy Angel University"
    },
    {
      quote: "A highly motivated developer who understands the balance between clean code and user-first design principles.",
      author: "Project Lead",
      role: "Digital Transformation Team"
    }
  ];

  private observer!: IntersectionObserver;

  ngAfterViewInit() {
    this.initScrollReveal();
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }

  // ── Scroll Reveal ─────────────────────────────────────────────
  private initScrollReveal() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => {
      this.observer.observe(el);
    });
  }

  // ── 3D Tilt on Project Cards ──────────────────────────────────
  onTilt(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    card.style.transition = 'transform 0.1s ease';
  }

  onTiltReset(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  }
}