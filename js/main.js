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
  // Behavior (auto-detects state — no code change needed when launched):
  //
  //   1. If action="#" (current pre-launch state)
  //        → prevent submission, show friendly note
  //
  //   2. If action="https://formspree.io/f/XXX" (Path A — Formspree)
  //        → submit via fetch, show success/error inline (no page jump)
  //
  //   3. If the form has the `netlify` attribute (Path B — Netlify Forms)
  //        → let Netlify's default POST handle it; show "Sending…" while
  //          it's in flight
  //
  // The honeypot field (`bot-field`) is ignored client-side; for Formspree
  // it just becomes a harmless extra field, for Netlify it's required by
  // their spam filter.

  const form = document.querySelector('.contact-form');
  if (!form) return;

  const note = form.querySelector('.form-note');
  const submitBtn = form.querySelector('button[type="submit"]');
  const setNote = (text, color) => {
    if (!note) return;
    note.textContent = text;
    if (color) note.style.color = color;
  };

  const isPlaceholder = form.getAttribute('action') === '#'
    && !form.hasAttribute('netlify');
  const isFormspree = /formspree\.io/.test(form.getAttribute('action') || '');
  const isNetlify = form.hasAttribute('netlify');

  if (isPlaceholder) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      setNote(
        'Form not connected yet — provide a destination email to enable submissions.',
        '#1F4D3A'
      );
    });
    return;
  }

  if (isFormspree) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot — silently drop if bot filled it
      if (form.querySelector('input[name="bot-field"]')?.value) return;

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
      setNote('Sending your message…', '#1F4D3A');

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          form.reset();
          setNote('Thanks — we received your message and will be in touch within 2 business days.', '#1F4D3A');
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send message'; }
        } else {
          throw new Error('Bad response');
        }
      } catch (err) {
        setNote('Something went wrong. Please email us directly at sales@csmexican.com.', '#A03A3A');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send message'; }
      }
    });
    return;
  }

  if (isNetlify) {
    // Let Netlify's native POST happen — we only enhance UX
    form.addEventListener('submit', () => {
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
      setNote('Sending your message…', '#1F4D3A');
    });
  }
})();
