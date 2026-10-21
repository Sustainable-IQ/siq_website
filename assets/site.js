(() => {
  const config = window.SIQ_CONFIG || {};
  const year = document.querySelectorAll('[data-year]');
  year.forEach(node => node.textContent = new Date().getFullYear());
  const menu = document.querySelector('[data-menu]');
  const toggle = document.querySelector('[data-menu-toggle]');
  if (menu && toggle) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded','false'); menu.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }));
  }
  document.querySelectorAll('[data-contact]').forEach(el => {
    const email = String(config.contactEmail || '').trim();
    if (email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      el.setAttribute('href', `mailto:${email}?subject=${encodeURIComponent('Sustainable IQ inquiry')}`);
      el.textContent = email;
    } else {
      el.removeAttribute('href');
      el.textContent = 'Contact details being finalized';
      el.setAttribute('aria-disabled', 'true');
      el.classList.add('is-disabled');
    }
  });
  document.querySelectorAll('[data-contact-form]').forEach(form => {
    const endpoint = String(config.formEndpoint || '').trim();
    const status = form.querySelector('[data-form-status]');
    const button = form.querySelector('button[type="submit"]');
    if (!/^https:\/\/formspree\.io\/f\/\w+$/.test(endpoint)) {
      form.querySelectorAll('input, textarea, button').forEach(el => el.disabled = true);
      status.textContent = 'The contact form is being activated. Please check back soon.';
      return;
    }
    form.action = endpoint;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      button.disabled = true;
      status.className = 'form-status';
      status.textContent = 'Sending…';
      try {
        const res = await fetch(endpoint, {method: 'POST', body: new FormData(form), headers: {Accept: 'application/json'}});
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.textContent = "Thank you. Your message has been sent and we'll be in touch soon.";
        status.classList.add('is-success');
      } catch {
        status.textContent = 'Something went wrong. Please try again in a moment.';
        status.classList.add('is-error');
      } finally { button.disabled = false; }
    });
  });
  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  filters.forEach(filter => filter.addEventListener('click', () => {
    const current = filter.dataset.filter;
    filters.forEach(f => { f.classList.toggle('is-active', f === filter); f.setAttribute('aria-pressed', String(f === filter)); });
    cards.forEach(card => { card.hidden = current !== 'all' && card.dataset.category !== current; });
    const note = document.querySelector('[data-filter-status]');
    const count = [...cards].filter(card => !card.hidden).length;
    if (note) note.textContent = `Showing ${count} ${count === 1 ? 'category' : 'categories'}`;
  }));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), {threshold:.08});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else { document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); }
})();
