/* =========================================================================
   LANG-LANDS UNIVERSE — application
   1) content rendering & archive interactions
   2) a dependency-free perspective engine for the 3-D cosmos
   ========================================================================= */
(() => {
  'use strict';

  const D = window.LL_DATA;
  if (!D) return;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => window.innerWidth < 760;

  document.body.classList.add('js');

  /* -----------------------------------------------------------------------
     Boot & chrome
     ----------------------------------------------------------------------- */
  const boot = $('#boot');
  window.setTimeout(() => {
    if (boot) boot.classList.add('is-done');
    document.body.classList.add('is-loaded');
  }, reducedMotion ? 200 : 950);

  const topbar = $('.topbar');
  const updateTopbar = () => topbar && topbar.classList.toggle('is-scrolled', window.scrollY > 30);
  window.addEventListener('scroll', updateTopbar, { passive: true });
  updateTopbar();

  /* -----------------------------------------------------------------------
     Data rendering
     ----------------------------------------------------------------------- */
  const personGrid = $('#people-grid');
  if (personGrid) {
    D.people.forEach((p, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'person-card';
      b.dataset.roles = p.roles.join(' ');
      b.dataset.id = p.id;
      b.setAttribute('aria-label', `打开 ${p.name} 的人物档案`);
      b.innerHTML = `
        <span class="portrait">
          <img src="assets/portraits/${p.id}.svg" alt="${p.name} 的生成式数学星徽（非写实肖像）" loading="eager" width="420" height="520">
          <span class="p-field">${p.field}</span>
          <span class="p-num">P-${String(i + 1).padStart(2, '0')}</span>
        </span>
        <span class="p-info">
          <span class="p-name">${p.name}</span>
          <span class="p-en">${p.en}</span>
          <span class="p-role">${p.role}</span>
        </span>`;
      b.addEventListener('click', () => openPerson(p.id));
      personGrid.appendChild(b);
    });
  }

  const tlRoot = $('#timeline');
  if (tlRoot) {
    D.timeline.forEach((item) => {
      const article = document.createElement('article');
      article.className = 'tl-item reveal';
      article.dataset.era = item.era;
      article.dataset.year = item.year;
      article.innerHTML = `
        <div class="tl-year">${item.year}<small>${item.tags[0] || ''}</small></div>
        <div class="tl-card">
          <button class="tl-head" type="button" aria-expanded="false">
            <span>
              <span class="tl-title">${item.title}</span>
              <span class="tl-en">${item.en}</span>
            </span>
            <span class="tl-plus" aria-hidden="true">+</span>
          </button>
          <div class="tl-body">
            <p>${item.body}</p>
            <div class="tl-more">
              <div class="tl-more-inner">
                <p>${item.more}</p>
                <div class="tl-tags">${item.tags.map(t => `<span>${t}</span>`).join('')}</div>
              </div>
            </div>
          </div>
        </div>`;
      const head = $('.tl-head', article);
      head.addEventListener('click', () => {
        const open = article.classList.toggle('is-open');
        head.setAttribute('aria-expanded', String(open));
        $('.tl-plus', article).textContent = open ? '−' : '+';
      });
      tlRoot.appendChild(article);
    });
  }

  const tlCount = $('#tl-count');
  const applyTimelineFilter = (era) => {
    let n = 0;
    $$('.tl-item').forEach(el => {
      const show = era === 'all' || el.dataset.era === era;
      el.classList.toggle('is-hidden', !show);
      if (show) n++;
    });
    if (tlCount) tlCount.textContent = String(n);
    $$('#timeline-filters .chip').forEach(b => {
      const on = b.dataset.filter === era;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  };
  $$('#timeline-filters .chip').forEach(btn => {
    btn.addEventListener('click', () => applyTimelineFilter(btn.dataset.filter));
  });
  applyTimelineFilter('all');

  const conceptNav = $('#concept-nav');
  const conceptGrid = $('#concept-grid');
  if (conceptNav && conceptGrid) {
    D.concepts.forEach((c, i) => {
      const nav = document.createElement('button');
      nav.type = 'button';
      nav.innerHTML = `<span class="cn-no">${String(i + 1).padStart(2, '0')}</span><span class="cn-title">${c.title}</span><span class="cn-tag">${c.tag}</span>`;
      nav.addEventListener('click', () => openConcept(c.id));
      conceptNav.appendChild(nav);

      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'concept-card';
      card.dataset.id = c.id;
      card.innerHTML = `
        <span class="cc-top"><span class="cc-index">§ ${String(i + 1).padStart(2, '0')}</span><span class="cc-status">${c.status}</span></span>
        <h4>${c.title}</h4>
        <p>${c.one}</p>
        <span class="cc-en">${c.en}</span>`;
      card.addEventListener('click', () => openConcept(c.id));
      conceptGrid.appendChild(card);
    });
  }

  const matrix = $('#matrix');
  if (matrix) {
    const heads = ['研究层次 / SCOPE', '状态 / HEADLINE', '互反 / RECIPROCITY', '函子性 / FUNCTORIALITY', 'L-函数 / L-FUNCTIONS'];
    const head = document.createElement('div');
    head.className = 'm-row m-row-head';
    heads.forEach(h => {
      const d = document.createElement('div');
      d.className = 'm-cell m-head';
      d.textContent = h;
      head.appendChild(d);
    });
    matrix.appendChild(head);
    D.layers.forEach(layer => {
      const row = document.createElement('div');
      row.className = 'm-row';
      row.innerHTML = `
        <div class="m-cell m-scope" data-label="研究层次">
          <b>${layer.scope}</b><span>${layer.label}</span>
          <span class="m-state"><span class="chip-state ${layer.tone}"><i class="dot-status ${layer.tone}"></i>${layer.tone === 'proved' ? '已建立' : layer.tone === 'open' ? '开放' : layer.tone === 'geometric' ? '几何突破' : '部分建立'}</span></span>
        </div>
        <div class="m-cell m-headline" data-label="状态">${layer.headline}</div>
        <div class="m-cell" data-label="互反"><p>${layer.reciprocity}</p></div>
        <div class="m-cell" data-label="函子性"><p>${layer.functoriality}</p></div>
        <div class="m-cell" data-label="L-函数"><p>${layer.lfunctions}</p></div>`;
      matrix.appendChild(row);
    });
  }

  const frontierRoot = $('#frontier-grid');
  if (frontierRoot) {
    const labels = { proved: '已建立', partial: '部分', open: '开放', geometric: '几何突破' };
    D.frontier.forEach((f, i) => {
      const card = document.createElement('article');
      card.className = 'frontier-card';
      card.innerHTML = `
        <div class="fc-top"><span class="fc-index">F-${String(i + 1).padStart(2, '0')}</span><span class="chip-state ${f.state}"><i class="dot-status ${f.state}"></i>${labels[f.state]}</span></div>
        <h4>${f.title}</h4>
        <div class="fc-en">${f.en}</div>
        <p>${f.note}</p>`;
      frontierRoot.appendChild(card);
    });
  }

  const mythRoot = $('#myths');
  if (mythRoot) {
    D.myths.forEach((m, i) => {
      const det = document.createElement('details');
      det.className = 'myth';
      det.innerHTML = `
        <summary><span class="q-no">M-${String(i + 1).padStart(2, '0')}</span><span class="q-text">${m.q}</span><span class="q-icon">+</span></summary>
        <div class="q-answer"><p>${m.a}</p></div>`;
      mythRoot.appendChild(det);
    });
  }

  const glossaryRoot = $('#glossary');
  if (glossaryRoot) {
    D.glossary.forEach(([term, def]) => {
      const div = document.createElement('div');
      div.className = 'gloss-item';
      div.innerHTML = `<dt>${term}</dt><dd>${def}</dd>`;
      glossaryRoot.appendChild(div);
    });
  }

  const sourceRoot = $('#source-list');
  if (sourceRoot) {
    D.sources.forEach(s => {
      const div = document.createElement('div');
      div.className = 'source-item';
      div.innerHTML = `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title} <span aria-hidden="true">↗</span></a><span>${s.author} · ${s.year}</span>`;
      sourceRoot.appendChild(div);
    });
  }

  /* -----------------------------------------------------------------------
     Reveal animations & lazy person cards
     ----------------------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revealObserver.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  $$('.reveal').forEach(el => revealObserver.observe(el));

  if (personGrid) {
    const pObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          pObserver.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -4% 0px', threshold: 0.04 });
    $$('.person-card').forEach(card => pObserver.observe(card));
  }

  $$('#people-filters .chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      $$('#people-filters .chip').forEach(b => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      $$('.person-card').forEach(card => {
        const show = f === 'all' || card.dataset.roles.split(' ').includes(f);
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* -----------------------------------------------------------------------
     Modal
     ----------------------------------------------------------------------- */
  const modal = $('#modal');
  const modalPanel = modal ? $('.modal-panel', modal) : null;
  const modalContent = $('#modal-content');
  let lastFocus = null;

  function openModal() {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('is-locked');
    if (modalPanel) modalPanel.scrollTop = 0;
    const close = $('.modal-close', modal);
    if (close) setTimeout(() => close.focus(), 30);
  }

  function closeModal() {
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (!exploreState.active && !(navOverlay && navOverlay.classList.contains('is-open'))) {
      document.documentElement.classList.remove('is-locked');
    }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (modal) {
    $('.modal-close', modal).addEventListener('click', closeModal);
    $('.modal-backdrop', modal).addEventListener('click', closeModal);
  }

  function setModal({ kicker, title, sub, meta = [], body = [], sigil = '', relations = [] }) {
    if (!modalContent) return;
    modalContent.innerHTML = '';
    if (sigil) {
      const img = document.createElement('img');
      img.className = 'modal-sigil';
      img.src = sigil;
      img.alt = '生成式数学星徽，不是写实肖像';
      modalContent.appendChild(img);
    }
    const k = document.createElement('div');
    k.className = 'modal-kicker';
    k.textContent = kicker;
    modalContent.appendChild(k);
    const h = document.createElement('h2');
    h.className = 'modal-title';
    h.id = 'modal-title';
    h.textContent = title;
    modalContent.appendChild(h);
    if (sub) {
      const s = document.createElement('div');
      s.className = 'modal-sub';
      s.textContent = sub;
      modalContent.appendChild(s);
    }
    if (meta.length) {
      const m = document.createElement('div');
      m.className = 'modal-meta';
      meta.forEach(t => {
        const sp = document.createElement('span');
        sp.textContent = t;
        m.appendChild(sp);
      });
      modalContent.appendChild(m);
    }
    const b = document.createElement('div');
    b.className = 'modal-body';
    body.forEach(par => {
      const p = document.createElement('p');
      p.textContent = par;
      b.appendChild(p);
    });
    modalContent.appendChild(b);
    if (relations.length) {
      const r = document.createElement('div');
      r.className = 'modal-relations';
      relations.forEach(rel => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = rel.label;
        btn.addEventListener('click', rel.action);
        r.appendChild(btn);
      });
      modalContent.appendChild(r);
    }
    if (modalPanel) modalPanel.setAttribute('aria-labelledby', 'modal-title');
    openModal();
  }

  function openPerson(id) {
    const p = D.people.find(x => x.id === id);
    if (!p) return;
    setModal({
      kicker: '人物档案 / PEOPLE',
      title: p.name,
      sub: p.en,
      meta: [p.years, p.field, p.role, p.contribution],
      sigil: `assets/portraits/${p.id}.svg`,
      body: p.body,
      relations: [
        { label: '回到人物星图', action: () => { closeModal(); document.getElementById('people').scrollIntoView({ behavior: 'smooth' }); } }
      ]
    });
  }

  function openConcept(id) {
    const c = D.concepts.find(x => x.id === id);
    if (!c) return;
    setModal({
      kicker: `概念档案 / ${c.en}`,
      title: c.title,
      sub: `状态：${c.status}`,
      meta: [c.tag, 'LANG-LANDS / CONCEPT'],
      body: [c.one, c.body],
      relations: c.related.map(rid => {
        const r = D.concepts.find(x => x.id === rid);
        return { label: r ? r.title : rid, action: () => openConcept(rid) };
      })
    });
  }

  function openStatus(title, note, state) {
    const map = { proved: '已建立', partial: '部分建立', open: '开放', geometric: '几何突破' };
    setModal({
      kicker: '研究前沿 / FRONTIER',
      title,
      sub: `状态：${map[state] || state}`,
      meta: ['STATUS BOARD', 'LANG-LANDS'],
      body: [note, '提示：朗兰兹纲领是一组相互关联的猜想，所谓“已证明”总是相对于某个精确表述、某个群与某个域而言。阅读任何进展时，先确认它处理的是局部还是整体、数域还是函数域、算术还是几何。'],
      relations: [{ label: '查看完整现状表', action: () => { closeModal(); document.getElementById('status').scrollIntoView({ behavior: 'smooth' }); } }]
    });
  }

  function openTimeline(year) {
    closeModal();
    applyTimelineFilter('all');
    const item = $$('.tl-item').find(el => el.dataset.year === String(year));
    if (!item) return;
    document.getElementById('history').scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      item.classList.add('is-open');
      const head = $('.tl-head', item);
      if (head) head.setAttribute('aria-expanded', 'true');
      const plus = $('.tl-plus', item);
      if (plus) plus.textContent = '−';
      item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 420);
  }

  /* -----------------------------------------------------------------------
     Navigation overlay
     ----------------------------------------------------------------------- */
  const navOverlay = $('#nav-overlay');
  function openNav() {
    if (!navOverlay) return;
    navOverlay.classList.add('is-open');
    navOverlay.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('is-locked');
  }
  function closeNav() {
    if (!navOverlay) return;
    navOverlay.classList.remove('is-open');
    navOverlay.setAttribute('aria-hidden', 'true');
    if ((!modal || !modal.classList.contains('is-open')) && !document.body.classList.contains('explore-mode')) {
      document.documentElement.classList.remove('is-locked');
    }
  }
  $$('#nav-open, #nav-open-2').forEach(b => b && b.addEventListener('click', openNav));
  $$('#nav-close, #nav-overlay .nav-grid a').forEach(b => b && b.addEventListener('click', closeNav));
  const geoCritique = $('#geo-critique');
  if (geoCritique) geoCritique.addEventListener('click', () => {
    closeModal();
    document.getElementById('critique').scrollIntoView({ behavior: 'smooth' });
  });
  if (navOverlay) {
    navOverlay.addEventListener('click', e => { if (e.target === navOverlay) closeNav(); });
  }

  /* -----------------------------------------------------------------------
     Scroll spy / scene selection
     ----------------------------------------------------------------------- */
  const chapters = $$('.chapter[id]');
  const sectionToScene = {};
  chapters.forEach(s => { if (s.dataset.scene) sectionToScene[s.id] = s.dataset.scene; });
  let activeSection = 'origin';

  function setActiveSection(id) {
    activeSection = id;
    $$('.rail a').forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
    $$('.topnav a').forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
    if (!exploreState.active && sectionToScene[id]) {
      setScene(sectionToScene[id]);
    }
    updateNodeVisibility();
  }

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveSection(visible[0].target.id);
    }, { rootMargin: '-38% 0px -48% 0px', threshold: [0.01, 0.2, 0.5] });
    chapters.forEach(s => spy.observe(s));
  }

  /* -----------------------------------------------------------------------
     3-D engine
     ----------------------------------------------------------------------- */
  const canvas = $('#space');
  const ctx = canvas ? canvas.getContext('2d', { alpha: true }) : null;
  const nodeLayer = $('#node-layer');
  const palette = ['#d7b476', '#75e2da', '#a494ff', '#ef8ab7', '#ece5d6', '#6f8fb4'];
  const paletteRGB = palette.map(hex => {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  });
  const N = isMobile() ? 900 : 1500;

  const SCENES = {
    galaxy: {
      short: '总览', dock: '星系', title: '朗兰兹星系', en: 'THE LANGLANDS GALAXY',
      sub: '一个纲领，九个入口。拖动旋转视角，点击星点打开档案。',
      camera: { yaw: 0.22, pitch: 0.11, dist: 10.6 }
    },
    rosetta: {
      short: '三语言', dock: '三语言', title: '三种语言', en: 'THREE LANGUAGES',
      sub: '算术、表示与几何：同一座山的三条登山路。',
      camera: { yaw: 0.08, pitch: 0.04, dist: 11.2 }
    },
    duality: {
      short: '对偶', dock: '对偶', title: '两面镜子', en: 'DUALITY',
      sub: '群 G 与它的 L-群。Hecke 算子与 Frobenius 在这里交换指纹。',
      camera: { yaw: 0.34, pitch: 0.06, dist: 10.3 }
    },
    history: {
      short: '时间', dock: '时间', title: '时间的螺旋', en: 'A HELIX OF TIME',
      sub: '从类域论到几何朗兰兹：1967 年的一封信如何长成一张网。',
      camera: { yaw: 0.18, pitch: 0.05, dist: 11.6 }
    },
    people: {
      short: '人物', dock: '人物', title: '人物星图', en: 'CONSTELLATION OF PEOPLE',
      sub: '二十二枚星徽。它们不是肖像，而是由姓名与贡献编码的坐标。',
      camera: { yaw: 0.26, pitch: 0.1, dist: 10.9 }
    },
    concepts: {
      short: '概念', dock: '概念', title: '概念之结', en: 'THE KNOT OF CONCEPTS',
      sub: '没有中心的网络。每个概念都通过猜想与其它概念相连。',
      camera: { yaw: 0.5, pitch: 0.16, dist: 10.2 }
    },
    frontier: {
      short: '前沿', dock: '前沿', title: '已点亮的海岸', en: 'THE LIT COAST',
      sub: '哪些命题已经是定理，哪些仍是未知海域。',
      camera: { yaw: 0.2, pitch: 0.04, dist: 11.4 }
    },
    critique: {
      short: '边界', dock: '边界', title: '理论的边界', en: 'THE BOUNDARY',
      sub: '统一是比喻，不是定理。一个纲领也需要被质疑。',
      camera: { yaw: 0.75, pitch: 0.2, dist: 10.8 }
    },
    library: {
      short: '档案', dock: '档案', title: '档案室', en: 'THE ARCHIVE',
      sub: '原始文献、综述、术语表与可以继续深入的入口。',
      camera: { yaw: 0.12, pitch: 0.03, dist: 11.2 }
    }
  };

  const exploreState = { active: false };
  const cam = { yaw: 0.25, pitch: 0.12, dist: 10.6 };
  const camTarget = { yaw: 0.25, pitch: 0.12, dist: 10.6 };
  const pointer = { dragging: false, moved: false, x: 0, y: 0, last: 0 };
  const engine = {
    scene: 'galaxy', nodes: [], wires: [], anchors: [],
    transitionStart: 0, old: null, visible: true, time: 0, last: performance.now(),
    width: 0, height: 0, dpr: 1, focal: 900, frame: 0
  };

  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function resize() {
    if (!canvas) return;
    engine.dpr = Math.min(window.devicePixelRatio || 1, 2);
    engine.width = window.innerWidth;
    engine.height = window.innerHeight;
    canvas.width = Math.floor(engine.width * engine.dpr);
    canvas.height = Math.floor(engine.height * engine.dpr);
    canvas.style.width = engine.width + 'px';
    canvas.style.height = engine.height + 'px';
    ctx.setTransform(engine.dpr, 0, 0, engine.dpr, 0, 0);
    engine.focal = Math.min(engine.width, engine.height) * (isMobile() ? 1.02 : 0.96);
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  function project(x, y, z) {
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw);
    const x1 = x * cy - z * sy;
    const z1 = x * sy + z * cy;
    const cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    const y1 = y * cp - z1 * sp;
    const z2 = y * sp + z1 * cp;
    const depth = z2 + cam.dist;
    if (depth < 0.35) return null;
    const s = engine.focal / depth;
    return {
      x: engine.width / 2 + x1 * s,
      y: engine.height / 2 - y1 * s,
      s, depth
    };
  }

  /* --- particle sprites -------------------------------------------------- */
  const sprites = [];
  function makeSprites() {
    palette.forEach((hex, idx) => {
      const c = document.createElement('canvas');
      c.width = 64; c.height = 64;
      const g = c.getContext('2d');
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 31);
      const [r, gg, b] = paletteRGB[idx];
      grad.addColorStop(0, 'rgba(255,255,255,.95)');
      grad.addColorStop(.12, `rgba(${r},${gg},${b},.9)`);
      grad.addColorStop(.38, `rgba(${r},${gg},${b},.24)`);
      grad.addColorStop(.72, `rgba(${r},${gg},${b},.05)`);
      grad.addColorStop(1, `rgba(${r},${gg},${b},0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      sprites[idx] = c;
    });
  }
  makeSprites();

  const particles = Array.from({ length: N }, () => ({
    x: 0, y: 0, z: 0, sx: 0, sy: 0, sz: 0, tx: 0, ty: 0, tz: 0,
    color: 0, tcolor: 0, size: 1, tsize: 1, phase: Math.random() * 10
  }));

  function addParticle(i, x, y, z, color, size) {
    const p = particles[i];
    p.tx = x; p.ty = y; p.tz = z;
    p.tcolor = color; p.tsize = size;
  }

  function galaxyTargets(rng) {
    for (let i = 0; i < N; i++) {
      const f = i / N;
      const arm = i % 4;
      const t = f * Math.PI * 2 * 2.45 + arm * Math.PI / 2 + (rng() - .5) * .18;
      const r = .28 + Math.pow(f, .82) * 5.25;
      const x = Math.cos(t) * r + (rng() - .5) * .3;
      const z = Math.sin(t) * r + (rng() - .5) * .3;
      const y = (rng() - .5) * (.5 + 1.2 * Math.exp(-r * 1.5)) + Math.sin(t * 1.3) * .17;
      let c = 5, s = .55 + rng() * .9;
      if (rng() < .12) c = 0;
      else if (rng() < .1) c = 1;
      else if (rng() < .06) c = 2;
      else if (rng() < .04) c = 3;
      else if (rng() < .12) c = 4;
      if (f < .07) { c = 0; s = 1.1 + rng() * 1.4; }
      addParticle(i, x, y, z, c, s);
    }
    engine.wires = [];
    const armColor = [0, 1, 2, 0];
    for (let arm = 0; arm < 4; arm++) {
      let prev = null;
      for (let k = 0; k <= 120; k++) {
        const f = k / 120;
        const t = f * Math.PI * 2 * 2.45 + arm * Math.PI / 2;
        const r = .2 + Math.pow(f, .82) * 5.1;
        const pt = [Math.cos(t) * r, Math.sin(t * 1.3) * .1, Math.sin(t) * r];
        if (prev) engine.wires.push({ a: prev, b: pt, c: armColor[arm], alpha: .10 });
        prev = pt;
      }
    }
  }

  function rosettaTargets(rng) {
    for (let i = 0; i < N; i++) {
      const cl = i % 3;
      const ang = -Math.PI / 2 + cl * Math.PI * 2 / 3;
      const cx = Math.cos(ang) * 3.35;
      const cy = Math.sin(ang) * 2.55 - .05;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      const rr = .22 + Math.pow(rng(), .68) * 1.2;
      const x = cx + rr * Math.sin(phi) * Math.cos(theta);
      const y = cy + rr * Math.cos(phi);
      const z = rr * Math.sin(phi) * Math.sin(theta) * .9 + (rng() - .5) * .2;
      addParticle(i, x, y, z, [0, 1, 2][cl], .6 + rng() * 1.15);
    }
    engine.wires = [];
    const centers = [0, 1, 2].map(k => {
      const a = -Math.PI / 2 + k * Math.PI * 2 / 3;
      return [Math.cos(a) * 3.35, Math.sin(a) * 2.55 - .05, 0];
    });
    centers.forEach((c, k) => {
      for (let seg = 0; seg < 64; seg++) {
        const a1 = seg / 64 * Math.PI * 2, a2 = (seg + 1) / 64 * Math.PI * 2;
        const p1 = [c[0] + Math.cos(a1) * 1.48, c[1] + Math.sin(a1) * 1.48, 0];
        const p2 = [c[0] + Math.cos(a2) * 1.48, c[1] + Math.sin(a2) * 1.48, 0];
        engine.wires.push({ a: p1, b: p2, c: k, alpha: .17 });
      }
    });
    for (let k = 0; k < 3; k++) {
      const c = centers[k], d = centers[(k + 1) % 3];
      engine.wires.push({ a: c, b: d, c: 0, alpha: .18 });
    }
  }

  function dualityTargets(rng) {
    for (let i = 0; i < N; i++) {
      const left = i < N * .48;
      if (left) {
        const theta = rng() * Math.PI * 2;
        const rr = .35 + Math.pow(rng(), .6) * 1.55;
        const x = -2.75 + Math.cos(theta) * rr;
        const y = Math.sin(theta) * rr;
        const z = (rng() - .5) * .9;
        addParticle(i, x, y, z, rng() < .16 ? 1 : 0, .55 + rng() * 1.1);
      } else {
        const phi = Math.acos(1 - 2 * (i - N * .48) / (N * .52));
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const rr = 1.75 + (rng() - .5) * .18;
        const x = 2.75 + rr * Math.sin(phi) * Math.cos(theta);
        const y = rr * Math.cos(phi);
        const z = rr * Math.sin(phi) * Math.sin(theta);
        addParticle(i, x, y, z, rng() < .14 ? 0 : 2, .55 + rng() * 1.1);
      }
    }
    engine.wires = [];
    // Left: three rings, like a group seen from inside.
    for (let ring = 0; ring < 3; ring++) {
      const r = .9 + ring * .5;
      for (let k = 0; k < 72; k++) {
        const a1 = k / 72 * Math.PI * 2, a2 = (k + 1) / 72 * Math.PI * 2;
        engine.wires.push({
          a: [-2.75 + Math.cos(a1) * r, Math.sin(a1) * r, 0],
          b: [-2.75 + Math.cos(a2) * r, Math.sin(a2) * r, 0],
          c: 0, alpha: .13
        });
      }
    }
    // Right: dodecahedron wireframe.
    const phi = (1 + Math.sqrt(5)) / 2;
    const verts = [];
    [-1, 1].forEach(a => [-1, 1].forEach(b => [-1, 1].forEach(c => {
      verts.push([a, b, c], [0, a / phi, b * phi], [a / phi, b * phi, 0], [a * phi, 0, b / phi]);
    })));
    const seen = new Set();
    const uniq = [];
    verts.forEach(v => {
      const k = v.map(n => n.toFixed(4)).join(',');
      if (!seen.has(k)) { seen.add(k); uniq.push(v); }
    });
    const target = 2 / phi;
    for (let i = 0; i < uniq.length; i++) {
      for (let j = i + 1; j < uniq.length; j++) {
        const a = uniq[i], b = uniq[j];
        const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
        if (Math.abs(d - target) < 1e-3) {
          engine.wires.push({
            a: [2.75 + a[0] * 1.55, a[1] * 1.55, a[2] * 1.55],
            b: [2.75 + b[0] * 1.55, b[1] * 1.55, b[2] * 1.55],
            c: 2, alpha: .23
          });
        }
      }
    }
  }

  function historyTargets(rng) {
    for (let i = 0; i < N; i++) {
      const f = i / N;
      const t = f * Math.PI * 2 * 5.3;
      const r = 2.35 + .18 * Math.sin(t * 2.4);
      addParticle(i, Math.cos(t) * r, -3.4 + 6.8 * f, Math.sin(t) * r, f < .3 ? 0 : f < .65 ? 1 : 2, .55 + rng() * 1.2);
    }
    engine.wires = [];
    let prev = null;
    for (let k = 0; k <= 260; k++) {
      const f = k / 260;
      const t = f * Math.PI * 2 * 5.3;
      const r = 2.35 + .18 * Math.sin(t * 2.4);
      const pt = [Math.cos(t) * r, -3.4 + 6.8 * f, Math.sin(t) * r];
      if (prev) engine.wires.push({ a: prev, b: pt, c: 0, alpha: .10 });
      prev = pt;
    }
  }

  function goldenAnchors(n, radius, yScale) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const a = i * 2.399963229728653;
      out.push([Math.cos(a) * r * radius, y * yScale, Math.sin(a) * r * radius]);
    }
    return out;
  }

  function peopleTargets(rng) {
    engine.anchors = goldenAnchors(22, 3.85, 2.55);
    for (let i = 0; i < N; i++) {
      const a = engine.anchors[i % 22];
      const x = a[0] + (rng() - .5) * .75;
      const y = a[1] + (rng() - .5) * .75;
      const z = a[2] + (rng() - .5) * .75;
      addParticle(i, x, y, z, [0, 1, 2, 3, 4][i % 5], .5 + rng() * 1.2);
    }
    engine.wires = [];
    for (let i = 0; i < engine.anchors.length; i++) {
      const a = engine.anchors[i];
      const b = engine.anchors[(i * 5 + 3) % engine.anchors.length];
      if (i % 2 === 0) engine.wires.push({ a, b, c: i % 5, alpha: .09 });
    }
  }

  function conceptTargets(rng) {
    for (let i = 0; i < N; i++) {
      const u = i / N * Math.PI * 2;
      const rr = 2.15 + .95 * Math.cos(3 * u);
      const x = rr * Math.cos(2 * u) + (rng() - .5) * .18;
      const z = rr * Math.sin(2 * u) + (rng() - .5) * .18;
      const y = .95 * Math.sin(3 * u) + (rng() - .5) * .18;
      addParticle(i, x, y, z, [0, 1, 2, 4][i % 4], .5 + rng() * 1.1);
    }
    engine.wires = [];
    let prev = null;
    for (let k = 0; k <= 280; k++) {
      const u = k / 280 * Math.PI * 2;
      const rr = 2.15 + .95 * Math.cos(3 * u);
      const pt = [rr * Math.cos(2 * u), .95 * Math.sin(3 * u), rr * Math.sin(2 * u)];
      if (prev) engine.wires.push({ a: prev, b: pt, c: k % 3, alpha: .11 });
      prev = pt;
    }
  }

  function frontierTargets(rng) {
    for (let i = 0; i < N; i++) {
      const layer = i % 3;
      const x = (rng() * 2 - 1) * 4.8;
      const z = (rng() * 2 - 1) * 2.7;
      const y = (layer - 1) * 1.35 + (rng() - .5) * .12;
      addParticle(i, x, y, z, [1, 0, 3][layer], .5 + rng() * 1.0);
    }
    engine.wires = [];
    for (let layer = 0; layer < 3; layer++) {
      const y = (layer - 1) * 1.35;
      for (let k = 0; k <= 12; k++) {
        const x = -4.8 + k / 12 * 9.6;
        engine.wires.push({ a: [x, y, -2.7], b: [x, y, 2.7], c: [1, 0, 3][layer], alpha: .06 });
      }
      for (let k = 0; k <= 7; k++) {
        const z = -2.7 + k / 7 * 5.4;
        engine.wires.push({ a: [-4.8, y, z], b: [4.8, y, z], c: [1, 0, 3][layer], alpha: .06 });
      }
    }
  }

  function critiqueTargets(rng) {
    for (let i = 0; i < N; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const theta = rng() * Math.PI * 2;
      const rr = .35 + Math.pow(rng(), .72) * 2.25;
      const x = side * 2.75 + Math.cos(theta) * rr + (rng() - .5) * .2;
      const y = Math.sin(theta) * rr * 1.3 + (rng() - .5) * .2;
      const z = (rng() - .5) * 1.5;
      addParticle(i, x, y, z, side < 0 ? 3 : 1, .5 + rng() * 1.1);
    }
    engine.wires = [];
    [-1, 1].forEach(side => {
      for (let k = 0; k < 64; k++) {
        const a1 = k / 64 * Math.PI * 2, a2 = (k + 1) / 64 * Math.PI * 2;
        engine.wires.push({
          a: [side * 2.75 + Math.cos(a1) * 2.1, Math.sin(a1) * 2.7, 0],
          b: [side * 2.75 + Math.cos(a2) * 2.1, Math.sin(a2) * 2.7, 0],
          c: side < 0 ? 3 : 1, alpha: .12
        });
      }
    });
    for (let k = 0; k < 9; k++) {
      const y = -2.5 + k * .6;
      engine.wires.push({
        a: [0, y, (k % 2 ? .4 : -.4)],
        b: [0, y + .3, (k % 2 ? -.3 : .3)],
        c: 3, alpha: .22
      });
    }
  }

  function libraryTargets(rng) {
    for (let i = 0; i < N; i++) {
      const band = i % 6;
      addParticle(i,
        (rng() * 2 - 1) * 4.7,
        (band - 2.5) * .68 + (rng() - .5) * .16,
        (rng() * 2 - 1) * 2.4,
        rng() < .2 ? 0 : 5, .45 + rng() * .9
      );
    }
    engine.wires = [];
    for (let band = 0; band < 6; band++) {
      const y = (band - 2.5) * .68;
      for (let k = 0; k <= 10; k++) {
        const x = -4.7 + k / 10 * 9.4;
        engine.wires.push({ a: [x, y, -2.4], b: [x, y, 2.4], c: 0, alpha: .055 });
      }
    }
  }

  /* --- nodes ------------------------------------------------------------- */
  function historyNode(y, frac) {
    const t = frac * Math.PI * 2 * 5.3;
    const r = 2.35 + .18 * Math.sin(t * 2.4);
    return [Math.cos(t) * r, y, Math.sin(t) * r];
  }

  function nodesFor(scene) {
    if (scene === 'galaxy') {
      return [
        { zh: '互反', en: 'RECIPROCITY', p: [2.35, 1.35, .9], type: 'concept', value: 'reciprocity' },
        { zh: '函子性', en: 'FUNCTORIALITY', p: [4.25, 1.95, .4], type: 'concept', value: 'functoriality' },
        { zh: 'L-函数', en: 'L-FUNCTION', p: [4.8, -.55, -.2], type: 'concept', value: 'lfunction' },
        { zh: 'L-群', en: 'L-GROUP', p: [4.15, -2.2, .5], type: 'concept', value: 'lgroup' },
        { zh: '迹公式', en: 'TRACE FORMULA', p: [1.55, -3.0, 1.1], type: 'concept', value: 'trace' },
        { zh: '几何', en: 'GEOMETRIC', p: [5.25, .75, -1.1], type: 'concept', value: 'geometric' },
        { zh: '历史', en: 'HISTORY', p: [1.2, 3.1, .4], type: 'section', value: 'history' },
        { zh: '人物', en: 'PEOPLE', p: [3.55, 3.15, .2], type: 'section', value: 'people' },
        { zh: '现状', en: 'STATUS', p: [-3.6, -3.05, .2], type: 'section', value: 'status' }
      ];
    }
    if (scene === 'rosetta') {
      const centers = [0, 1, 2].map(k => {
        const a = -Math.PI / 2 + k * Math.PI * 2 / 3;
        return [Math.cos(a) * 3.35, Math.sin(a) * 2.55 + .05, 0];
      });
      return [
        { zh: '伽罗瓦表示', en: 'GALOIS', p: [centers[0][0], centers[0][1] + 1.55, .2], type: 'concept', value: 'galois' },
        { zh: '自守表示', en: 'AUTOMORPHIC', p: [centers[1][0], centers[1][1] + 1.55, .2], type: 'concept', value: 'automorphic' },
        { zh: '几何侧', en: 'GEOMETRY', p: [centers[2][0], centers[2][1] + 1.55, .2], type: 'concept', value: 'geometric' },
        { zh: 'L-函数', en: 'THE COMMON LANGUAGE', p: [0, -1.8, 1.4], type: 'concept', value: 'lfunction' },
        { zh: '动机', en: 'MOTIVES', p: [-2.5, -2.5, .8], type: 'concept', value: 'motives' }
      ];
    }
    if (scene === 'duality') {
      return [
        { zh: '群 G', en: 'THE GROUP', p: [-2.75, .3, 1.4], type: 'concept', value: 'automorphic' },
        { zh: '对偶群', en: 'DUAL GROUP', p: [2.75, .3, 1.4], type: 'concept', value: 'lgroup' },
        { zh: 'Satake', en: 'HEcke ↔ FROBENIUS', p: [0, -1.45, 2.2], type: 'concept', value: 'lgroup' },
        { zh: 'L-参数', en: 'L-PARAMETER', p: [0, 1.6, 2.0], type: 'concept', value: 'lgroup' },
        { zh: '互反', en: 'RECIPROCITY', p: [0, .25, 2.5], type: 'concept', value: 'reciprocity' }
      ];
    }
    if (scene === 'history') {
      return [
        { zh: '1967', en: 'LETTER TO WEIL', p: historyNode(-3.2, .015), type: 'timeline', value: '1967' },
        { zh: '1970', en: 'PROBLEMS', p: historyNode(-2.35, .13), type: 'timeline', value: '1970' },
        { zh: '1980', en: 'BASE CHANGE', p: historyNode(-1.6, .22), type: 'timeline', value: '1980' },
        { zh: '1995', en: 'MODULARITY', p: historyNode(-.55, .37), type: 'timeline', value: '1995' },
        { zh: '2002', en: 'GL(n) FUNCTION FIELD', p: historyNode(.3, .47), type: 'timeline', value: '2002' },
        { zh: '2010', en: 'FUNDAMENTAL LEMMA', p: historyNode(1.15, .6), type: 'timeline', value: '2010' },
        { zh: '2021', en: 'GEOMETRIZATION', p: historyNode(1.95, .75), type: 'timeline', value: '2021' },
        { zh: '2024', en: 'GEOMETRIC LANGLANDS', p: historyNode(2.65, .87), type: 'timeline', value: '2024' }
      ];
    }
    if (scene === 'people') {
      const picks = ['langlands', 'weil', 'harish', 'drinfeld', 'lafforgue-l', 'ngo', 'scholze', 'gaitsgory'];
      return picks.map((id, i) => {
        const p = D.people.find(x => x.id === id);
        const a = engine.anchors[i] || [0, 0, 0];
        return { zh: p.name, en: p.en, p: [a[0] * 1.02, a[1] * 1.02 + .35, a[2] * 1.02], type: 'person', value: id };
      });
    }
    if (scene === 'concepts') {
      const picks = [
        ['reciprocity', 0], ['functoriality', 1], ['lgroup', 2], ['lfunction', 3],
        ['trace', 4], ['local', 5], ['geometric', 6], ['motives', 7], ['ramanujan', 8]
      ];
      return picks.map(([id, k], i) => {
        const u = (k / picks.length) * Math.PI * 2 + .25;
        const rr = 2.15 + .95 * Math.cos(3 * u);
        return {
          zh: D.concepts.find(c => c.id === id).title,
          en: D.concepts.find(c => c.id === id).en,
          p: [rr * Math.cos(2 * u) * 1.14, .95 * Math.sin(3 * u) + (i % 2 ? .85 : -.85), rr * Math.sin(2 * u) * 1.14],
          type: 'concept', value: id
        };
      });
    }
    if (scene === 'frontier') {
      return D.frontier.slice(0, 8).map((f, i) => {
        const row = i % 3, col = Math.floor(i / 3);
        return {
          zh: f.title, en: f.en,
          p: [-3.6 + col * 2.5, (row - 1) * 1.45, 1.4 + (i % 2) * .4],
          type: 'status', value: f
        };
      });
    }
    if (scene === 'critique') {
      return [
        { zh: '不是单一命题', en: 'NOT ONE THEOREM', p: [-2.75, 2.35, .8], type: 'section', value: 'critique' },
        { zh: '几何 ≠ 算术', en: 'GEOMETRIC ≠ ARITHMETIC', p: [2.75, 2.35, .8], type: 'section', value: 'critique' },
        { zh: '审阅与验证', en: 'REVIEW', p: [0, -2.7, 1.2], type: 'section', value: 'critique' }
      ];
    }
    return [
      { zh: '原始文献', en: 'PRIMARY SOURCES', p: [-2.9, 1.2, 1.0], type: 'section', value: 'library' },
      { zh: '术语表', en: 'GLOSSARY', p: [2.9, -.5, 1.1], type: 'section', value: 'library' },
      { zh: '继续探索', en: 'KEEP EXPLORING', p: [0, 2.2, .8], type: 'explore', value: 'galaxy' }
    ];
  }

  function buildScene(scene, instant = false) {
    const rng = mulberry32({ galaxy: 12, rosetta: 47, duality: 81, history: 33, people: 64, concepts: 19, frontier: 91, critique: 73, library: 57 }[scene] || 7);
    if (scene === 'galaxy') galaxyTargets(rng);
    else if (scene === 'rosetta') rosettaTargets(rng);
    else if (scene === 'duality') dualityTargets(rng);
    else if (scene === 'history') historyTargets(rng);
    else if (scene === 'people') peopleTargets(rng);
    else if (scene === 'concepts') conceptTargets(rng);
    else if (scene === 'frontier') frontierTargets(rng);
    else if (scene === 'critique') critiqueTargets(rng);
    else libraryTargets(rng);

    if (instant) {
      particles.forEach(p => {
        p.x = p.tx; p.y = p.ty; p.z = p.tz;
        p.color = p.tcolor; p.size = p.tsize;
      });
      engine.transitionStart = 0;
    } else {
      particles.forEach(p => {
        p.sx = p.x; p.sy = p.y; p.sz = p.z;
        p.color = p.tcolor; p.size = p.tsize;
      });
      engine.transitionStart = performance.now();
    }
    engine.scene = scene;
    engine.nodes = nodesFor(scene);
    renderNodeLabels();
    const meta = SCENES[scene];
    if (meta && !exploreState.active) {
      camTarget.yaw = meta.camera.yaw;
      camTarget.pitch = meta.camera.pitch;
      camTarget.dist = meta.camera.dist;
    }
    if (scene === 'history') engine.historyNodes = nodesFor('history').map(n => n.p);
    updateExplorePanel(scene);
    updateHudScene(scene);
  }

  function setScene(scene, force = false) {
    if (!SCENES[scene]) return;
    if (engine.scene === scene && !force) return;
    buildScene(scene, force);
  }

  function renderNodeLabels() {
    if (!nodeLayer) return;
    nodeLayer.innerHTML = '';
    if (!engine.nodes.length) return;
    engine.nodes.forEach((node, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'space-node';
      btn.dataset.i = String(i);
      btn.setAttribute('aria-label', `${node.zh} · ${node.en}`);
      btn.innerHTML = `<span class="dot"></span><span class="zh">${node.zh}</span><span class="en">${node.en}</span>`;
      btn.addEventListener('click', () => handleNode(node));
      nodeLayer.appendChild(btn);
      node.el = btn;
    });
    updateNodeVisibility();
  }

  function updateNodeVisibility() {
    if (!nodeLayer) return;
    const visible = exploreState.active || activeSection === 'origin';
    nodeLayer.classList.toggle('hidden', !visible);
    nodeLayer.setAttribute('aria-hidden', String(!visible));
    nodeLayer.inert = !visible;
    engine.visible = visible;
  }

  function handleNode(node) {
    if (!node) return;
    if (node.type === 'section') {
      const wasExplore = exploreState.active;
      if (wasExplore) exitExplore();
      setTimeout(() => document.getElementById(node.value)?.scrollIntoView({ behavior: 'smooth' }), wasExplore ? 380 : 0);
      return;
    }
    if (node.type === 'person') { openPerson(node.value); return; }
    if (node.type === 'concept') { openConcept(node.value); return; }
    if (node.type === 'timeline') { openTimeline(node.value); return; }
    if (node.type === 'status') {
      const f = node.value;
      openStatus(f.title, f.note, f.state);
      return;
    }
    if (node.type === 'explore') { enterExplore(node.value); }
  }

  /* --- drawing ----------------------------------------------------------- */
  const stars = Array.from({ length: 520 }, () => ({
    x: (Math.random() * 2 - 1) * 14,
    y: (Math.random() * 2 - 1) * 9,
    z: (Math.random() * 2 - 1) * 10 - 2,
    r: Math.random() < .88 ? .5 + Math.random() * .7 : 1.1 + Math.random(),
    a: .15 + Math.random() * .55,
    tw: Math.random() * 10
  }));
  const glows = [
    { x: -3.2, y: 1.8, z: -3.0, c: [55, 105, 135], r: 330, a: .13 },
    { x: 3.6, y: -1.2, z: -2.2, c: [112, 68, 130], r: 280, a: .10 },
    { x: 0, y: 1.2, z: -5.0, c: [125, 96, 56], r: 240, a: .07 }
  ];

  function drawBackground(t) {
    if (!ctx) return;
    ctx.clearRect(0, 0, engine.width, engine.height);
    ctx.globalCompositeOperation = 'lighter';
    glows.forEach((g, i) => {
      const p = project(g.x, g.y, g.z);
      if (!p) return;
      const rad = Math.max(80, g.r * p.s / 100);
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
      grad.addColorStop(0, `rgba(${g.c[0]},${g.c[1]},${g.c[2]},${g.a + Math.sin(t * .12 + i) * .015})`);
      grad.addColorStop(.55, `rgba(${g.c[0]},${g.c[1]},${g.c[2]},${g.a * .35})`);
      grad.addColorStop(1, `rgba(${g.c[0]},${g.c[1]},${g.c[2]},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = '#ece5d6';
    stars.forEach(s => {
      const p = project(s.x, s.y, s.z);
      if (!p || p.depth > 24) return;
      const alpha = s.a * (.65 + .35 * Math.sin(t * .8 + s.tw));
      if (p.x < -20 || p.x > engine.width + 20 || p.y < -20 || p.y > engine.height + 20) return;
      ctx.globalAlpha = alpha;
      if (s.r > 1.05) {
        ctx.fillStyle = '#d7b476';
        ctx.fillRect(p.x, p.y, s.r, s.r);
        ctx.globalAlpha = alpha * .35;
        ctx.fillRect(p.x - 2, p.y - 2, s.r + 4, s.r + 4);
        ctx.fillStyle = '#ece5d6';
      } else {
        ctx.fillRect(p.x, p.y, s.r, s.r);
      }
    });
    ctx.globalAlpha = 1;
  }

  function drawWires(t) {
    if (!ctx) return;
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    engine.wires.forEach(w => {
      const a = project(w.a[0], w.a[1], w.a[2]);
      const b = project(w.b[0], w.b[1], w.b[2]);
      if (!a || !b) return;
      const [r, g, bl] = paletteRGB[w.c] || paletteRGB[0];
      ctx.strokeStyle = `rgba(${r},${g},${bl},${w.alpha})`;
      ctx.lineWidth = clamp((a.s + b.s) * .008, .35, 1.15);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    });
  }

  function drawParticles(t) {
    if (!ctx) return;
    ctx.globalCompositeOperation = 'lighter';
    const ease = engine.transitionStart
      ? Math.min(1, (performance.now() - engine.transitionStart) / 1600)
      : 1;
    const e = 1 - Math.pow(1 - ease, 3);
    for (let i = 0; i < N; i++) {
      const p = particles[i];
      if (ease < 1) {
        p.x = p.sx + (p.tx - p.sx) * e;
        p.y = p.sy + (p.ty - p.sy) * e;
        p.z = p.sz + (p.tz - p.sz) * e;
      } else {
        p.x = p.tx; p.y = p.ty; p.z = p.tz;
      }
      const bob = Math.sin(t * .55 + p.phase) * .018;
      const pr = project(p.x + bob, p.y + bob * .5, p.z);
      if (!pr || pr.depth > 22) continue;
      if (pr.x < -40 || pr.x > engine.width + 40 || pr.y < -40 || pr.y > engine.height + 40) continue;
      const size = clamp(pr.s * .055 * p.tsize, 2.5, 18);
      const sprite = sprites[p.tcolor] || sprites[0];
      ctx.globalAlpha = clamp(.28 + pr.s * .012, .22, .78);
      ctx.drawImage(sprite, pr.x - size / 2, pr.y - size / 2, size, size);
    }
    ctx.globalAlpha = 1;
  }

  function drawNodeCores(t) {
    if (!ctx) return;
    ctx.globalCompositeOperation = 'lighter';
    engine.nodes.forEach((n, i) => {
      const p = project(n.p[0], n.p[1], n.p[2]);
      if (!p) return;
      const phase = t * 1.1 + i * 1.7;
      const rad = 1.7 + Math.sin(phase) * .55;
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad * 7);
      grad.addColorStop(0, 'rgba(255,245,215,.8)');
      grad.addColorStop(.2, 'rgba(215,180,118,.34)');
      grad.addColorStop(.6, 'rgba(215,180,118,.06)');
      grad.addColorStop(1, 'rgba(215,180,118,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, rad * 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(215,180,118,${.26 + Math.sin(phase) * .08})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 7.5 + Math.sin(phase) * 1.2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,248,230,.9)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function draw(t) {
    drawBackground(t);
    drawWires(t);
    drawParticles(t);
    drawNodeCores(t);
  }

  /* --- labels ------------------------------------------------------------ */
  function updateLabels() {
    if (!engine.nodes.length || !engine.visible) return;
    engine.nodes.forEach(n => {
      if (!n.el) return;
      const p = project(n.p[0], n.p[1], n.p[2]);
      if (!p || p.x < -80 || p.x > engine.width + 80 || p.y < -60 || p.y > engine.height + 60) {
        n.el.classList.add('is-hidden');
        n.el.classList.remove('is-visible');
        return;
      }
      n.el.classList.remove('is-hidden');
      n.el.classList.add('is-visible');
      n.el.style.setProperty('--x', p.x.toFixed(1) + 'px');
      n.el.style.setProperty('--y', p.y.toFixed(1) + 'px');
      n.el.style.setProperty('--s', clamp(.72 + p.s / 460, .72, 1.12).toFixed(2));
      n.el.style.zIndex = String(Math.max(1, 2000 - Math.floor(p.depth * 30)));
    });
  }

  /* --- HUD --------------------------------------------------------------- */
  const hudScene = $('#hud-scene');
  const hudCoord = $('#hud-coord');
  const hudZoom = $('#hud-zoom');
  const hudMode = $('#hud-mode');
  function updateHudScene(scene) {
    if (hudScene) hudScene.textContent = SCENES[scene] ? SCENES[scene].short : scene;
  }
  function updateHud() {
    if (hudCoord) {
      const ra = ((cam.yaw * 12 / Math.PI + 24) % 24).toFixed(2).replace('.', 'h ');
      const dec = (cam.pitch * 180 / Math.PI).toFixed(1);
      hudCoord.textContent = `${ra}m / ${dec}°`;
    }
    if (hudZoom) hudZoom.textContent = (10.6 / cam.dist * 100).toFixed(0) + '%';
    if (hudMode) hudMode.textContent = pointer.dragging ? 'MANUAL' : 'AUTO';
  }

  /* --- loop -------------------------------------------------------------- */
  function frame(now) {
    const dt = Math.min(.05, (now - engine.last) / 1000);
    engine.last = now;
    engine.time += dt;
    engine.frame++;
    const t = engine.time;

    if (!reducedMotion) {
      if (!pointer.dragging && now - pointer.last > 5200 && !exploreState.active) {
        camTarget.yaw += dt * .034;
      }
      if (!pointer.dragging && now - pointer.last > 5200 && exploreState.active) {
        camTarget.yaw += dt * .02;
      }
    }
    cam.yaw = lerp(cam.yaw, camTarget.yaw, 1 - Math.pow(.0015, dt));
    cam.pitch = lerp(cam.pitch, camTarget.pitch, 1 - Math.pow(.0015, dt));
    cam.dist = lerp(cam.dist, camTarget.dist, 1 - Math.pow(.0012, dt));

    draw(t);
    updateLabels();
    if (engine.frame % 8 === 0) updateHud();
    requestAnimationFrame(frame);
  }

  /* --- pointer ------------------------------------------------------------ */
  function interactiveTarget(target) {
    return target.closest('a, button, input, textarea, select, summary, details, .modal, .topbar, .rail, .explore-panel, .explore-dock, .nav-overlay');
  }
  function textTarget(target) {
    return target.closest('p, h1, h2, h3, h4, li, figcaption, dd, dt, .formula-main, .body-copy, .plate, .tl-card, .person-card, .concept-card, .matrix, .source-item');
  }
  function canStartDrag(e) {
    if (interactiveTarget(e.target) || textTarget(e.target)) return false;
    if (exploreState.active) return true;
    return e.pointerType === 'mouse';
  }
  function startDrag(e) {
    if (!canStartDrag(e)) return;
    pointer.dragging = true;
    pointer.moved = false;
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.last = performance.now();
    document.body.classList.add('is-dragging');
  }
  function moveDrag(e) {
    if (!pointer.dragging) return;
    const dx = e.clientX - pointer.x;
    const dy = e.clientY - pointer.y;
    if (Math.abs(dx) + Math.abs(dy) < 2) return;
    pointer.moved = true;
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    camTarget.yaw += dx * .006;
    camTarget.pitch = clamp(camTarget.pitch + dy * .0045, -.9, .9);
    pointer.last = performance.now();
  }
  function endDrag() {
    if (!pointer.dragging) return;
    pointer.dragging = false;
    document.body.classList.remove('is-dragging');
    pointer.last = performance.now();
  }
  window.addEventListener('pointerdown', startDrag, { passive: true });
  window.addEventListener('pointermove', moveDrag, { passive: true });
  window.addEventListener('pointerup', endDrag, { passive: true });
  window.addEventListener('pointercancel', endDrag, { passive: true });
  window.addEventListener('wheel', e => {
    if (!exploreState.active) return;
    e.preventDefault();
    camTarget.dist = clamp(camTarget.dist + e.deltaY * .0018, 5.2, 17);
    pointer.last = performance.now();
  }, { passive: false });
  window.addEventListener('dblclick', e => {
    if (interactiveTarget(e.target) || textTarget(e.target)) return;
    const meta = SCENES[engine.scene];
    if (meta) {
      camTarget.yaw = meta.camera.yaw;
      camTarget.pitch = meta.camera.pitch;
      camTarget.dist = meta.camera.dist;
    }
  });

  /* --- explore mode ------------------------------------------------------ */
  const exploreDock = $('#explore-dock');
  const explorePanel = $('#explore-panel');
  function enterExplore(scene = 'galaxy') {
    exploreState.active = true;
    document.body.classList.add('explore-mode');
    document.documentElement.classList.add('is-locked');
    closeNav();
    closeModal();
    setScene(scene, true);
    updateNodeVisibility();
    const meta = SCENES[scene];
    if (meta) {
      camTarget.yaw = meta.camera.yaw;
      camTarget.pitch = meta.camera.pitch;
      camTarget.dist = meta.camera.dist;
    }
    updateExplorePanel(scene);
    if (explorePanel) explorePanel.classList.add('is-open');
  }
  function exitExplore() {
    if (!exploreState.active) return;
    exploreState.active = false;
    document.body.classList.remove('explore-mode');
    document.documentElement.classList.remove('is-locked');
    if (explorePanel) explorePanel.classList.remove('is-open');
    updateNodeVisibility();
    const scene = sectionToScene[activeSection] || 'galaxy';
    setScene(scene, true);
    const meta = SCENES[scene];
    if (meta) {
      camTarget.yaw = meta.camera.yaw;
      camTarget.pitch = meta.camera.pitch;
      camTarget.dist = meta.camera.dist;
    }
  }
  function updateExplorePanel(scene) {
    const meta = SCENES[scene];
    if (!meta || !explorePanel) return;
    const kicker = explorePanel.querySelector('.ep-kicker');
    const h = explorePanel.querySelector('h3');
    const p = explorePanel.querySelector('p');
    if (kicker) kicker.textContent = `自由探索 / ${meta.en}`;
    if (h) h.textContent = meta.title;
    if (p) p.textContent = meta.sub;
    $$('#explore-dock button[data-scene]').forEach(b => b.classList.toggle('is-active', b.dataset.scene === scene));
  }

  if (exploreDock) {
    Object.entries(SCENES).forEach(([key, meta]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.scene = key;
      b.textContent = meta.dock;
      b.addEventListener('click', () => {
        setScene(key, true);
        const m = SCENES[key];
        camTarget.yaw = m.camera.yaw;
        camTarget.pitch = m.camera.pitch;
        camTarget.dist = m.camera.dist;
        updateExplorePanel(key);
      });
      exploreDock.appendChild(b);
    });
    const exit = document.createElement('button');
    exit.type = 'button';
    exit.className = 'exit-btn';
    exit.textContent = '退出';
    exit.addEventListener('click', exitExplore);
    exploreDock.appendChild(exit);
  }
  $$('#explore-enter, #explore-enter-2, #explore-enter-3').forEach(b => b && b.addEventListener('click', () => enterExplore('galaxy')));
  if (explorePanel) {
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'modal-close';
    close.setAttribute('aria-label', '退出自由探索');
    close.textContent = '×';
    close.style.position = 'absolute';
    close.style.top = '10px';
    close.style.right = '10px';
    close.style.float = 'none';
    close.addEventListener('click', exitExplore);
    explorePanel.appendChild(close);
  }

  // Any in-page link should leave the locked explore orbit before scrolling.
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || !exploreState.active) return;
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    exitExplore();
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 420);
  });

  /* --- keyboard ---------------------------------------------------------- */
  window.addEventListener('keydown', e => {
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (e.key === 'Escape') {
      if (modal && modal.classList.contains('is-open')) closeModal();
      else if (navOverlay && navOverlay.classList.contains('is-open')) closeNav();
      else if (exploreState.active) exitExplore();
      return;
    }
    if (e.key === 'g' || e.key === 'G') {
      if (!exploreState.active) { e.preventDefault(); openNav(); }
      return;
    }
    if (!exploreState.active) return;
    if (e.key === 'ArrowLeft') { camTarget.yaw -= .08; pointer.last = performance.now(); }
    if (e.key === 'ArrowRight') { camTarget.yaw += .08; pointer.last = performance.now(); }
    if (e.key === 'ArrowUp') { camTarget.pitch = clamp(camTarget.pitch - .06, -.9, .9); }
    if (e.key === 'ArrowDown') { camTarget.pitch = clamp(camTarget.pitch + .06, -.9, .9); }
    if (e.key === '+' || e.key === '=') camTarget.dist = clamp(camTarget.dist - .7, 5.2, 17);
    if (e.key === '-' || e.key === '_') camTarget.dist = clamp(camTarget.dist + .7, 5.2, 17);
    if (e.key === 'r' || e.key === 'R') {
      const m = SCENES[engine.scene];
      if (m) { camTarget.yaw = m.camera.yaw; camTarget.pitch = m.camera.pitch; camTarget.dist = m.camera.dist; }
    }
  });

  /* --- focus trap-ish ---------------------------------------------------- */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || !modal || !modal.classList.contains('is-open')) return;
    const focusables = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', modal)
      .filter(el => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* -----------------------------------------------------------------------
     Init
     ----------------------------------------------------------------------- */
  buildScene('galaxy', true);
  setActiveSection('origin');
  updateExplorePanel('galaxy');
  requestAnimationFrame(frame);

  // Deep links for screenshots and for sharing a specific chapter.
  const params = new URLSearchParams(window.location.search);
  const deepSection = params.get('section');
  if (deepSection) {
    document.documentElement.style.scrollBehavior = 'auto';
    setTimeout(() => {
      const el = document.getElementById(deepSection);
      if (el) {
        window.scrollTo(0, el.offsetTop);
        setActiveSection(deepSection);
      }
    }, 80);
  }
  if (params.get('explore') === '1') {
    const requestedScene = params.get('scene');
    const startScene = requestedScene && SCENES[requestedScene] ? requestedScene : 'galaxy';
    setTimeout(() => enterExplore(startScene), 120);
  }
  const personParam = params.get('person');
  if (personParam) setTimeout(() => openPerson(personParam), 360);
  const conceptParam = params.get('concept');
  if (conceptParam) setTimeout(() => openConcept(conceptParam), 360);
})();
