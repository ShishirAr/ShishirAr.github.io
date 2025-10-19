// ===== index.js =====

// Year in footer
document.getElementById('y').textContent = new Date().getFullYear();

const tiles = document.querySelectorAll('.profile-tile');

// Staggered reveal; set float variables BEFORE starting animation so there is no initial shift
tiles.forEach((tile, i) => {
  const inner = tile.querySelector('.tile-inner');

  // Random parameters
  const amp = 5 + Math.floor(Math.random() * 7);  // 5–11px amplitude
  const dir = Math.random() < 0.5 ? 1 : -1;
  const dur = 8 + Math.random() * 3;              // 8–11s duration
  const dly = Math.random() * 1.2;                // 0–1.2s delay

  // Set all positions first; first frame matches → no snap
  inner.style.setProperty('--fxStart', `${-dir * amp}px`);
  inner.style.setProperty('--fxMid', `${dir * amp}px`);
  inner.style.setProperty('--fxEnd', `${-dir * amp}px`);
  inner.style.setProperty('--floatDur', `${dur}s`);
  inner.style.setProperty('--floatDelay', `${dly}s`);

  // Reveal tile, then start float (without jump)
  setTimeout(() => {
    tile.classList.add('reveal');
    setTimeout(() => { tile.classList.add('float'); }, 200);
  }, 120 + i * 120);
});

// Click → save profile & go
tiles.forEach(btn => {
  btn.addEventListener('click', () => {
    const p = btn.dataset.profile;
    localStorage.setItem('selectedProfile', p);
    const url = new URL('portfolio.html', location.href);
    url.searchParams.set('profile', p);
    location.href = url.toString();
  });
});

// Manage Profiles placeholder
document.querySelector('.manage-profiles').addEventListener('click', () => {
  alert('Profile management coming soon.');
});
