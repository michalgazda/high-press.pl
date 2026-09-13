/* HIGH PRES & MACH — main site scripts: mobile nav, galleries, lightbox, contact form */
(function () {
  'use strict';

  // Mobile menu toggle
  var toggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') navLinks.classList.remove('open');
    });
  }

  // Highlight active nav link
  var path = location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href').replace(/\/$/, '');
    if (href === path || (path !== '' && href !== '' && path.indexOf(href) === 0)) {
      a.classList.add('active');
    }
  });

  // Gallery Lightbox — works with multiple gallery groups
  function initGalleries() {
    var galleries = document.querySelectorAll('[data-gallery]');
    if (!galleries.length) return;

    // Create shared lightbox once
    var lb = document.getElementById('lightbox');
    var lbImg = document.getElementById('lb-img');
    if (!lb || !lbImg) return;

    // Collect all images across all galleries
    var allLinks = [];
    galleries.forEach(function (g) {
      var links = g.querySelectorAll('a');
      links.forEach(function (a) {
        allLinks.push({
          el: a,
          href: a.getAttribute('href')
        });
      });
    });

    if (!allLinks.length) return;

    var current = 0;

    function show(i) {
      current = (i + allLinks.length) % allLinks.length;
      lbImg.src = allLinks[current].href;
    }

    allLinks.forEach(function (item, i) {
      item.el.addEventListener('click', function (e) {
        e.preventDefault();
        current = i;
        show(current);
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lb-close')) {
        lb.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    var prev = document.getElementById('lb-prev');
    var next = document.getElementById('lb-next');
    if (prev) prev.addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
    if (next) next.addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') { lb.classList.remove('open'); document.body.style.overflow = ''; }
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  initGalleries();

  // Contact form (Web3Forms)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      var btn = form.querySelector('[type="submit"]');
      status.textContent = '';
      status.className = 'form-status';
      btn.disabled = true;
      var original = btn.textContent;
      btn.textContent = 'Wysyłanie…';

      var data = new FormData(form);
      fetch(form.action, { method: 'POST', body: data })
        .then(function (r) { return r.text(); })
        .then(function (text) {
          var res;
          try { res = JSON.parse(text); } catch (e) { res = { success: false, message: text }; }
          if (res.success) {
            status.textContent = 'Dziękujemy! Wiadomość wysłana — odpowiemy w ciągu 48 godzin.';
            status.className = 'form-status is-success';
            form.reset();
          } else {
            status.textContent = 'Błąd: ' + (res.message || 'nieznany błąd. Spróbuj ponownie lub napisz bezpośrednio na biuro@high-pres.pl');
            status.className = 'form-status is-error';
          }
          btn.disabled = false;
          btn.textContent = original;
        })
        .catch(function () {
          status.textContent = 'Wystąpił błąd połączenia. Napisz proszę bezpośrednio na biuro@high-pres.pl';
          status.className = 'form-status is-error';
          btn.disabled = false;
          btn.textContent = original;
        });
    });
  }
})();