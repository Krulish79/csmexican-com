/* CSM — main.js
 * Vanilla. No framework. Handles:
 *  · mobile menu toggle
 *  · scroll-triggered fade-in
 *  · footer copyright year
 *  · contact form UX (works pre-launch; auto-detects Formspree vs Netlify
 *    once Adriana picks one — see comments at the form block in index.html)
 */

(() => {
  'use strict';

  // ---------- Footer year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Mobile nav toggle ----------
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('primary-nav');
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      navList.classList.toggle('is-open', !open);
    });
    // Close on link click (mobile UX)
    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        navList.classList.remove('is-open');
      });
    });
  }

  // ---------- Slideshows (cross-fade between images) ----------
  // Markup: <div class="slideshow" data-slideshow data-interval="6000">
  //           <img class="slide is-active" ...>
  //           <img class="slide" ...> ...
  //         </div>
  // - Each slideshow auto-advances on its own data-interval (ms)
  // - Slideshows pause when scrolled off-screen (saves CPU + battery)
  // - prefers-reduced-motion: the CSS strips the fade transition so slides
  //   swap instantly instead of cross-fading — content still rotates,
  //   it just doesn't animate. (Killing rotation entirely felt too strict;
  //   plain content updates are accessible-friendly.)
  document.querySelectorAll('[data-slideshow]').forEach((show) => {
    const slides = show.querySelectorAll('.slide');
    if (slides.length < 2) return;

    const interval = parseInt(show.dataset.interval, 10) || 6000;
    let idx = 0;
    let timer = null;

    const advance = () => {
      slides[idx].classList.remove('is-active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('is-active');
    };
    const start = () => {
      if (timer) return;
      timer = setInterval(advance, interval);
    };
    const stop = () => {
      clearInterval(timer);
      timer = null;
    };

    // Only run while the slideshow is on-screen
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) start();
            else stop();
          });
        },
        { threshold: 0.15 }
      );
      io.observe(show);
    } else {
      start();
    }

    // Pause when the tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else if (show.getBoundingClientRect().top < window.innerHeight) start();
    });
  });

  // ---------- Scroll-triggered fade-in for sections ----------
  const targets = document.querySelectorAll('.section, .hero-inner');
  targets.forEach((el) => el.classList.add('fade-in'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    targets.forEach((el) => io.observe(el));
  } else {
    // No IO support — show everything
    targets.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------- Contact form ----------
  // Submissions go to FormSubmit.co's AJAX endpoint (action attribute).
  // FormSubmit emails the form to sales@csmexican.com — free, no signup
  // required, no monthly limits. First-time submission triggers an
  // activation email Adriana clicks once; after that, all messages flow.

  const form = document.querySelector('.contact-form');
  if (!form) return;

  const note = form.querySelector('.form-note');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.textContent : '';
  const isSpanish = document.documentElement.lang === 'es';

  const COPY = isSpanish ? {
    sending: 'Enviando tu mensaje…',
    success: 'Gracias — recibimos tu mensaje y te responderemos en un máximo de 2 días hábiles.',
    error:   'Algo salió mal. Por favor escríbenos directamente a sales@csmexican.com.',
  } : {
    sending: 'Sending your message…',
    success: 'Thanks — we received your message and will be in touch within 2 business days.',
    error:   'Something went wrong. Please email us directly at sales@csmexican.com.',
  };

  const setNote = (text, color) => {
    if (!note) return;
    note.textContent = text;
    if (color) note.style.color = color;
  };

  const isFormSubmit = /formsubmit\.co/.test(form.getAttribute('action') || '');
  const isPlaceholder = form.getAttribute('action') === '#';

  if (isPlaceholder) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      setNote('Form not connected yet.', '#1F4D3A');
    });
    return;
  }

  if (isFormSubmit) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot — silently drop if bot filled it
      if (form.querySelector('input[name="_honey"]')?.value) return;

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = '…'; }
      setNote(COPY.sending, '#1F4D3A');

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          form.reset();
          setNote(COPY.success, '#1F4D3A');
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalBtnText; }
        } else {
          throw new Error('Bad response');
        }
      } catch (err) {
        setNote(COPY.error, '#A03A3A');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalBtnText; }
      }
    });
  }
})();
