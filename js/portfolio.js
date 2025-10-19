(function () {
  const rows = document.querySelectorAll('.row');
  rows.forEach(row => {
    row.addEventListener('mouseover', e => {
      const card = e.target.closest('.card');
      if (!card) return;
      row.classList.add('row-hovering');
      card.classList.add('is-hovered');
    });
    row.addEventListener('mouseout', e => {
      const card = e.target.closest('.card');
      if (!card) return;
      row.classList.remove('row-hovering');
      card.classList.remove('is-hovered');
    });
  });
})();

/* ---------------- Data ---------------- */
const data = {
  projects: [
    { id: 1, title: "Klopchik-AI", description: "KlopchikAI is a custom AI that understands and answers questions based on user-provided context. It uses advanced language models and runs on Cloudflare Workers to deliver fast, smart, and personalized responses directly in your web app.", image: "klop.png", category: "Web", technologies: ["Python", "JavaScript", "HTML", "CSS", "Cloudfare"], year: "2025", status: "Completed", url: "https://chat.klopchik.cc" },
    { id: 2, title: "Fixie-Pixie", description: "An AI-powered system that detects potholes and automatically alerts authorities for quick road repairs.", image: "fixie.png", category: "Mobile", technologies: ["JS", "Python","React","YOLO"], year: "2025", status: "Completed", url: "https://github.com/ShishirAr/FixiePixie" },
    { id: 3, title: "SkyVision", description: "SkyVision — an AI-powered system that analyzes drone footage to detect and identify objects, people, and landmarks in real time.Coming soon", image: "skyvision.png", category: "Web", technologies: ["JS", "REST APIs", "CSS"], year: "2022", status: "Soon", url: "#" },
    { id: 4, title: "Chatbot+Portofilio", description: "Integration of custom AI in my portfolio website.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", category: "Web", technologies: ["HTML", "CSS", "JavaScript"], year: "2021", status: "Soon", url: "#" },
  ],
  education: [
    { id: 1, title: "Bachelors in Computer Science", description: "In Progess..", image: "dd.png", institution: "University of Texas at Arlington", year: "2025–2027", gpa: "X/4.0" },
    { id: 1, title: "Associates in Computer Science", description: "One step closer to my goal..", image: "degree.png", institution: "McLennan Community College", year: "2023–2025", gpa: "3.X/4.0" },
    { id: 2, title: "Full-Stack Web Development", description: "Udemy 100 days with Angela Yu.", image: "full.png", institution: "Code Academy", year: "2024", duration: "6 months" },
    { id: 3, title: "AWS Cloud Practitioner", description: "In progess..", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80", institution: "Amazon Web Services", year: "2024", credential: "In Progess" }
  ],
  skills: [
    { id: 1, title: "Frontend Development", description: "Responsive, interactive UIs.", image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80", technologies: ["HTML", "CSS", "JavaScript", "React"] },
    { id: 2, title: "Backend Development", description: "APIs & databases.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80", technologies: ["Node.js", "Python", "PHP", "MySQL", "MongoDB"] },
    { id: 3, title: "Machine Learning/Data Science", description: "Data analysis, visualization, and machine learning for predictive insights and intelligent solutions.", image: "aiml.png", technologies: ["Figma", "Adobe XD", "Wireframes", "Prototypes"] },
    { id: 4, title: "Lang-Chain & LLM", description: "In Progess", image: "lang.png", technologies: ["React Native", "Flutter", "iOS", "Android"] }
  ],
  experience: [
    { id: 1, title: "Frontend Freelancer", description: "Built and maintained web apps.", image: "full.png", company: "X", period: "2022–Present", responsibilities: ["React", "JS", "HTML"] },
  ]
};

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const yearEl = $('#year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

// Sticky nav color
window.addEventListener('scroll', () => {
  const nav = $('.navbar');
  if (!nav) return;
  if (scrollY > 96) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
});

// Background video safe autoplay + fallback
(function () {
  const v = $('#bgvid');
  if (!v) return;
  const tryPlay = () => v.play().catch(() => { /* ignore */ });
  document.addEventListener('DOMContentLoaded', tryPlay, { once: true });
  setTimeout(() => { if (v.readyState < 3) v.remove(); }, 3500);
})();

function setHeroTitle(text) {
  const el = document.getElementById('heroTitle');
  if (!el) return;
  el.classList.remove('title-animate');
  void el.offsetWidth; // restart CSS animation
  el.textContent = text;
  el.classList.add('title-animate');
}

// URL / storage profile → customize hero
(function () {
  const params = new URLSearchParams(location.search);
  const fromURL = params.get('profile');
  const fromLS = localStorage.getItem('selectedProfile');
  const profile = (fromURL || fromLS || 'general').toLowerCase();
  if (fromURL) localStorage.setItem('selectedProfile', profile);

  const desc = $('#heroDesc');
  const tweaks = {
    recruiter: {
      t: "Frontend / Full-Stack Developer",
      d: "Thanks for dropping by! Below are selected highlights relevant to hiring: shipped projects, core skills, and recent experience."
    },
    client: {
      t: "Shishir Aryal CSE @ UT ARLINGTON",
      d: "Hi, I’m Shishir Aryal, a junior Computer Science student at the University of Texas at Arlington. I’m passionate about Artificial Intelligence, Machine Learning, and building smart systems that solve real problems.I love exploring how data, algorithms, and creativity come together to create technology that makes life better. Currently, I’m working on projects involving AI models, data analysis, and automation tools — always learning something new along the way."
    },
    friend: {
      t: "Hey! You made it 👋",
      d: "Scroll for projects I’m proud of and what I’ve been tinkering with lately."
    },
    general: {
      t: "Hi, I am Shishir Aryal",
      d: "Welcome to my portfolio. Explore my work, skills, and journey — presented in a slick, Netflix-inspired interface."
    }
  }[profile];

  setHeroTitle(tweaks.t);
  if (desc) desc.textContent = tweaks.d;
})();

// Build a single card
function makeCard(item, type, idx) {
  const el = document.createElement('article');
  el.className = 'card';
  el.style.animationDelay = `${idx * 80}ms`; // stagger entrance
  el.setAttribute('tabindex', '0');
  el.innerHTML = `
    <div class="media">
      <img loading="lazy" src="${item.image}" alt="${item.title}">
    </div>
    <div class="meta">
      <h4 class="title">${item.title}</h4>
      <p class="desc">${(item.description || '').slice(0, 80)}${(item.description && item.description.length > 80) ? '…' : ''}</p>
    </div>
  `;
  el.addEventListener('click', () => openModal(item, type));
  el.addEventListener('keypress', (e) => { if (e.key === 'Enter') el.click(); });
  return el;
}

// Ensure exactly 5 cards per section; fill with "Coming Soon" placeholders if needed
const placeholder = (i) => ({
  id: `ph-${i}`, title: "Coming Soon", description: "New item will appear here.",
  image: "comingsoon.png"
});

function populate() {
  for (const key of ['projects', 'education', 'skills', 'experience']) {
    const row = document.querySelector(`.row[data-row="${key}"]`);
    if (!row) continue;
    row.innerHTML = '';
    const items = data[key].slice(0, 6);
    while (items.length < 2) items.push(placeholder(items.length + 1));
    items.forEach((item, i) => row.appendChild(makeCard(item, key, i)));
  }
}
populate();

// Modal
const modal = $('#modal'), mHeader = $('#mHeader'), mTitle = $('#mTitle'),
      mPoster = $('#mPoster'), mDesc = $('#mDesc'), mFeatures = $('#mFeatures'),
      mClose = $('#mClose'), viewBtn = $('#viewBtn');

function addFeature(label, value) {
  const f = document.createElement('div');
  f.className = 'feature';
  f.innerHTML = `<span class="label">${label}:</span><span>${value}</span>`;
  mFeatures.appendChild(f);
}
function openModal(item, type) {
  if (mHeader) mHeader.style.backgroundImage = `url('${item.image}')`;
  if (mTitle) mTitle.textContent = item.title;
  if (mPoster) { mPoster.src = item.image; mPoster.alt = item.title; }
  if (mDesc) mDesc.textContent = item.description || '';
  if (mFeatures) mFeatures.innerHTML = '';

  if (type === 'projects') {
    addFeature('Category', item.category || '—');
    addFeature('Tech', (item.technologies || []).join(', ') || '—');
    addFeature('Year', item.year || '—');
    addFeature('Status', item.status || '—');
    if (viewBtn) viewBtn.href = item.url || '#';
  } else if (type === 'education') {
    addFeature('Institution', item.institution || '—');
    addFeature('Year', item.year || '—');
    if (item.gpa) addFeature('GPA', item.gpa);
    if (item.duration) addFeature('Duration', item.duration);
    if (item.credential) addFeature('Credential', item.credential);
    if (viewBtn) viewBtn.href = '#';
  } else if (type === 'skills') {
    addFeature('Tech', (item.technologies || []).join(', ') || '—');
    if (viewBtn) viewBtn.href = '#';
  } else if (type === 'experience') {
    addFeature('Company', item.company || '—');
    addFeature('Period', item.period || '—');
    if (item.responsibilities) addFeature('Responsibilities', item.responsibilities.join(', '));
    if (viewBtn) viewBtn.href = '#';
  }

  if (modal) modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}
if (mClose) mClose.addEventListener('click', () => { modal.style.display = 'none'; document.body.style.overflow = ''; });
window.addEventListener('click', (e) => { if (e.target === modal) { mClose.click(); } });


// --- Mobile nav toggle --
(function () {
  const btn = document.getElementById('menuToggle');
  const links = document.getElementById('primaryNav');
  if (!btn || !links) return;

  const close = () => {
    links.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  };
  const toggle = () => {
    const open = !links.classList.contains('is-open');
    links.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
  };

  btn.addEventListener('click', toggle);

  // Close when a link is clicked
  links.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) close();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

// --- Disable "row-hovering" effect on coarse pointers (touch) ---
(function () {
  const isCoarse = matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (!isCoarse) return;
  document.querySelectorAll('.row').forEach(row => {
    row.onmouseover = null;
    row.onmouseout = null;
    row.classList.remove('row-hovering');
    row.querySelectorAll('.card').forEach(c => c.classList.remove('is-hovered'));
  });
})();

