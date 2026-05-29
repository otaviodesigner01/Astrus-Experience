/* ==========================================================================
   ASTRUS EXPERIENCE - INTERACTIVE ENGINE (VANILLA JS)
   - Dynamic Header Scroll States
   - Mobile Nav Toggle Menu
   - Glowing Mouse-Tracking Hover Effects (Ouder Reference Emitter)
   - Smooth Accordion Triggers
   - High-FPS Scroll Reveal (IntersectionObserver)
   - Premium Contact Lead Submission Flow
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* 1. DYNAMIC HEADER SCROLL EFFECT */
  const header = document.getElementById('main-header');
  
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Init on load in case of refresh mid-page


  /* 2. MOBILE NAVEGATION TOGGLE */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden'); // Lock body scroll when menu open
  };

  mobileMenuBtn.addEventListener('click', toggleMenu);

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });


  /* 3. MOUSE TRACKING HOVER EFFECT (Glow Emitter inside Cards) */
  const cards = document.querySelectorAll('.service-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse position inside card
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });


  /* 4. FAQ ACCORDION HANDLER */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');
    const answerContainer = item.querySelector('.faq-answer');
    
    questionButton.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items first
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        answerContainer.style.maxHeight = '0px';
      } else {
        item.classList.add('active');
        // Set dynamic height based on scrollHeight for smooth pure CSS transition
        answerContainer.style.maxHeight = `${answerContainer.scrollHeight}px`;
      }
    });
  });


  /* 5. INTERSECTION OBSERVER FOR HIGH-FPS SCROLL REVEAL */
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = element.getAttribute('data-delay') || '0';
        
        setTimeout(() => {
          element.classList.add('revealed');
        }, parseInt(delay));

        observer.unobserve(element); // Reveal only once
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.1, // Trigger when 10% of element is in viewport
    rootMargin: '0px 0px -40px 0px' // Offset trigger point slightly for premium feel
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  /* 6. PREMIUM CONTACT FORM SUBMISSION FLOW */
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success-message');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Loading state on button
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando Dados...';

      // Capture Form Data
      const formData = {
        name: document.getElementById('name').value,
        whatsapp: document.getElementById('whatsapp').value,
        email: document.getElementById('email').value,
        billing: document.getElementById('billing').value,
        message: document.getElementById('message').value
      };

      // Faux Network Request (Vercel/GitHub Ready integration layer)
      setTimeout(() => {
        console.log('--- Novo Lead Registrado (Astrus Experience) ---', formData);
        
        // Hide form and show success state with smooth fade in
        contactForm.style.display = 'none';
        successMessage.style.display = 'flex';
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(15px)';
        successMessage.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
          successMessage.style.opacity = '1';
          successMessage.style.transform = 'translateY(0)';
        }, 50);

        // Optional: Trigger user notification alert or external Webhook hook
      }, 1500);
    });
  }

});
