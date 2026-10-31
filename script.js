(() => {
  const root = document.documentElement;
  const media = matchMedia('(prefers-color-scheme: dark)');
  const button = document.querySelector('.theme');
  const metas = document.querySelectorAll('meta[name="theme-color"]');
  const isDark = () => (root.dataset.theme || (media.matches ? 'dark' : 'light')) === 'dark';

  const sync = () => {
    const dark = isDark();
    button.setAttribute('aria-pressed', String(dark));
    if (root.dataset.theme) metas.forEach(m => m.setAttribute('content', dark ? '#141413' : '#f6f4ef'));
  };

  button.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    sync();
  });
  media.addEventListener('change', sync);
  sync();

  const top = document.querySelector('.top');
  const onScroll = () => top.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.getElementById('y').textContent = new Date().getFullYear();
})();
