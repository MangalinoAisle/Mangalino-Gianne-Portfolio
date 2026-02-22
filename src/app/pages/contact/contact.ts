import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit, AfterViewInit {

  constructor(
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Contact | Gianne Aisle Mangalino');
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initScrollReveal();
  }

  // ===================== CONTACT INFO =====================
  email     = 'gaislemangalino@gmail.com';
  phone     = '0999-489-9536';
  
  // This link directs directly to Gmail's web compose screen for your email
  emailLink = 'https://mail.google.com/mail/?view=cm&fs=1&to=gaislemangalino@gmail.com';
  
  phoneLink = 'tel:09994899536';
  location  = 'Mabalacat City, Philippines';

  githubLink   = 'https://github.com/MangalinoAisle';
  linkedinLink = 'https://www.linkedin.com/in/gianne-aisle';

  // ===================== FORM STATE =====================
  formData = {
    name: '',
    senderEmail: '',
    subject: '',
    message: ''
  };

  isSent    = false;
  isLoading = false;
  charCount = 0;

  updateCharCount(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.charCount = textarea.value.length;
  }

  sendMessage() {
    const { name, senderEmail, message } = this.formData;
    if (!name || !senderEmail || !message) return;

    this.isLoading = true;

    // Simulate async send (replace with real EmailJS / HTTP call)
    setTimeout(() => {
      this.isLoading = false;
      this.isSent    = true;
      this.showToast();

      setTimeout(() => {
        this.isSent   = false;
        this.formData = { name: '', senderEmail: '', subject: '', message: '' };
        this.charCount = 0;
      }, 4000);
    }, 1800);
  }

  // ===================== TOAST =====================
  showToast() {
    if (!isPlatformBrowser(this.platformId)) return;
    const toast = document.getElementById('successToast');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  // ===================== SCROLL REVEAL =====================
  initScrollReveal() {
    const panels = document.querySelectorAll<HTMLElement>('.glass-panel');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    panels.forEach(p => observer.observe(p));
  }
}