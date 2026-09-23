import { useEffect, useRef, useState } from "react";
import "./App.css";

const sessions = [
  {
    tag: "InvestHack <b>#06</b>",
    date: "Tuesday, 6 October 2026",
    traits: "Founder · Investor · Two Exits",
    speaker: "Janneke Niessen",
    company: "Founding Partner, CapitalT",
    title: "How to Get a Yes Before You Have Revenue",
    photo: "https://belegends.club/api/files/pbc_2443081517/nkx8sv2d9mrxvkq/janneke_niessen_l_1n3fn26cd9.png",
    about: "Founding Partner at CapitalT, serial entrepreneur and investor. Janneke co-founded DQ&amp;A and Improve Digital, scaled both internationally, and exited them before moving to the other side of the table.",
    bio: "Now backs pre-seed founders in Climate Tech and the Future of Work — typically committing €500K–€1.2M, and up to €2.5M for the right team, before there's a product or revenue to point to.",
    hear: "Her line on this: <i>\"Before revenue, the team is the evidence.\"</i> What she actually checks when there's no P&amp;L — and why two exits taught her to bet on people first.",
    time: "5:00 PM Dubai · 2:00 PM London · 9:00 AM New York",
    online: true
  },
  {
    tag: "InvestHack <b>#07</b>",
    date: "Tuesday, 13 October 2026",
    traits: "Entrepreneur · Investor · Ex-PwC",
    speaker: "Varun Malik",
    company: "Founder, Konsälidön",
    title: "The Term Sheet Question Most Founders Get Wrong",
    photo: "https://belegends.club/api/files/pbc_2443081517/m0nw01p7ifx5xus/varun_baner_8miqz1fy27.webp",
    about: "Founder of Konsälidön. Varun built and led consulting practices at PwC, Protiviti and Encreate, before stepping back from day-to-day operating roles to focus on what comes next.",
    bio: "His thesis now guides a run of micro-investments designed to help founders understand an exponential future, move past fear, and negotiate from a position that actually holds up.",
    hear: "Not valuation — leverage. Why the clause founders skim past is usually the one that decides who really controls the company.",
    time: "5:00 PM Dubai · 2:00 PM London · 9:00 AM New York",
    online: true
  },
  {
    tag: "InvestHack <b>#08</b>",
    date: "Tuesday, 20 October 2026",
    traits: "Serial Founder · VC · Since 1996",
    speaker: "Walied Albasheer",
    company: "Managing Partner, Intuitio Ventures",
    title: "What Actually Kills a Deal in the First Five Minutes",
    photo: "https://belegends.club/api/files/pbc_2443081517/limyhdr7l2k2qzo/walied_baner_4uq2nlyted.webp",
    about: "Founder &amp; Managing Partner at Intuitio Ventures, and Founder &amp; CEO of Inbound LLC. Walied has been building and backing technology companies since 1996, across the UAE, Estonia and the US.",
    bio: "Author of <i>The Slop Stack</i>, a four-layer taxonomy of AI-generated mediocrity in startups. Has founded 7 companies (4 folded) and reviewed 265+ ventures through his own fund.",
    hear: "His line: <i>\"If you're a founder, you have to own your own numbers.\"</i> The tells that end a conversation before the deck is even open.",
    time: "5:00 PM Dubai · 2:00 PM London · 9:00 AM New York",
    online: true
  },
  {
    tag: "InvestHack <b>#09</b>",
    date: "Tuesday, 27 October 2026",
    traits: "Family Office · Direct Investor",
    speaker: "Alex Felman",
    company: "General Partner, Felman Family Office",
    title: "Why Some $2M Checks Take Longer Than $20M Ones",
    photo: "https://belegends.club/api/files/pbc_2443081517/kfzgg99w8mivqcf/alex_f_lend_tk1a658sfq.png",
    about: "General Partner at Felman Family Office and Founder of Exponential U. Trained in molecular toxicology and bio-entrepreneurship before moving into venture building and investing.",
    bio: "Leads technology investments across biotech, healthcare, agriculture and energy — roughly 90% direct, 10% via funds — with an 8–10 year minimum horizon and 1–2 years spent building the relationship before he commits.",
    hear: "His line: <i>\"Buy till exit.\"</i> Why check size and diligence speed don't move together the way founders assume.",
    time: "5:00 PM Dubai · 2:00 PM London · 9:00 AM New York",
    online: true
  }
];

// TODO: replace with the real Legends WhatsApp Business number (digits only, country code, no "+").
const WHATSAPP_NUMBER = "971500000000";

export default function App() {
  const [sessionIndex, setSessionIndex] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [subscribeStep, setSubscribeStep] = useState("form");
  const [subscribeForm, setSubscribeForm] = useState({ name: "", email: "", phone: "", linkedin: "", consent: false });
  const heroTrackRef = useRef(null);
  const netCanvasRef = useRef(null);
  const pinPhotosRef = useRef(null);
  const pinFeatureRef = useRef(null);
  const burgerRef = useRef(null);
  const navLinksRef = useRef(null);

  function handleSubscribe() {
    setSubscribeStep("form");
    setSubscribeOpen(true);
  }

  function closeSubscribe() {
    setSubscribeOpen(false);
    // reset for next time, after the close transition would have finished
    setTimeout(() => {
      setSubscribeStep("form");
      setSubscribeForm({ name: "", email: "", phone: "", linkedin: "", consent: false });
    }, 200);
  }

  function updateSubscribeField(field, value) {
    setSubscribeForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubscribeSubmit(e) {
    e.preventDefault();
    // No backend wired up yet — this just advances to the confirmation step.
    // Swap this for a real submit (fetch/Formspree/etc.) when there's an endpoint to send it to.
    setSubscribeStep("success");
  }

  const whatsappMessage = 'Hi, Legends Team\n\nI want to confirm my attendance at InvestHack — October 2026\n\nThanks!';
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  // lock body scroll while a modal (session detail or subscribe) is open, and close on Escape
  useEffect(() => {
    document.body.style.overflow = (sessionIndex !== null || subscribeOpen) ? "hidden" : "";
    function onKey(e) {
      if (e.key !== "Escape") return;
      if (subscribeOpen) closeSubscribe();
      else setSessionIndex(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sessionIndex, subscribeOpen]);

  // fade-and-rise reveal animation for elements with the "reveal" class
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // mobile burger menu: toggles the nav dropdown, closes on link click / outside click / resize back to desktop
  useEffect(() => {
    const burger = burgerRef.current;
    const navLinksEl = navLinksRef.current;
    if (!burger || !navLinksEl) return;

    function closeMenu() {
      navLinksEl.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
    function toggleMenu() {
      const isOpen = navLinksEl.classList.toggle("open");
      burger.classList.toggle("open", isOpen);
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
    function onBurgerClick(e) { e.stopPropagation(); toggleMenu(); }
    function onNavLinksClick(e) { if (e.target.tagName === "A") closeMenu(); }
    function onOutsideClick(e) { if (!navLinksEl.contains(e.target) && e.target !== burger) closeMenu(); }
    function onResize() { if (window.innerWidth >= 860) closeMenu(); }

    burger.addEventListener("click", onBurgerClick);
    navLinksEl.addEventListener("click", onNavLinksClick);
    document.addEventListener("click", onOutsideClick);
    window.addEventListener("resize", onResize);

    return () => {
      burger.removeEventListener("click", onBurgerClick);
      navLinksEl.removeEventListener("click", onNavLinksClick);
      document.removeEventListener("click", onOutsideClick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // pinned parallax feature: sticky card with atmosphere shots + facts sweeping past on scroll
  useEffect(() => {
    const pinPhotos = pinPhotosRef.current;
    const pinSection = pinFeatureRef.current;
    if (!pinPhotos || !pinSection) return;

    const atmosphere = [
      { caption: "Where it starts", g: ["#E0A83D", "#BE8C2B"], img: "/atmo/atmo-venue.jpg" },
      { caption: "The network, together", g: ["#D4AD5A", "#9C6E22"], img: "/atmo/atmo-group.jpg" },
      { caption: "Where deals happen", g: ["#E7C066", "#B87F1E"], img: "/atmo/atmo-mingle.jpg" },
      { caption: "Set for the room", g: ["#DDA83F", "#8F6420"], img: "/atmo/atmo-space.jpg" }
    ];
    const facts = [
      { text: "Live, unscripted", bg: "#241A07", cls: "on-dark" },
      { text: "One investor every Tuesday", bg: "linear-gradient(135deg,#E0A83D,#BE8C2B)", cls: "" },
      { text: "4 Tuesdays this month", bg: "var(--surface-2)", cls: "bordered" },
      { text: "Closed room after", bg: "var(--surface)", cls: "bordered" }
    ];
    const pinLayout = [
      { top: "0%", left: "7%", w: 220, h: 230, from: 30, to: -25, type: "atmosphere", a: 0 },
      { top: "3%", left: "40%", w: 220, h: 160, from: -32, to: 34, type: "fact", f: 0, mobileHide: true },
      { top: "6%", left: "80%", w: 210, h: 190, from: -26, to: 30, type: "atmosphere", a: 1 },
      { top: "46%", left: "11%", w: 210, h: 160, from: 32, to: -30, type: "fact", f: 3, mobileHide: true },
      { top: "48%", left: "68%", w: 210, h: 160, from: -28, to: 32, type: "fact", f: 1, mobileHide: true },
      { top: "80%", left: "5%", w: 220, h: 180, from: 26, to: -30, type: "atmosphere", a: 2 },
      { top: "82%", left: "43%", w: 220, h: 150, from: 28, to: -34, type: "fact", f: 2, mobileHide: true },
      { top: "76%", left: "77%", w: 210, h: 210, from: -30, to: 28, type: "atmosphere", a: 3 }
    ];

    const chips = pinLayout.map((spot) => {
      const chip = document.createElement("div");
      chip.className = "pin-chip";
      chip.style.top = spot.top;
      chip.style.left = spot.left;
      chip.style.width = spot.w + "px";
      chip.style.height = spot.h + "px";

      if (spot.type === "atmosphere") {
        const a = atmosphere[spot.a % atmosphere.length];
        const fill = document.createElement("div");
        fill.className = "photo-fill";
        fill.style.background = `linear-gradient(135deg,${a.g[0]},${a.g[1]})`;
        const img = document.createElement("img");
        img.src = a.img;
        img.alt = a.caption;
        img.loading = "lazy";
        img.onerror = () => img.remove();
        fill.appendChild(img);
        chip.appendChild(fill);
        const cap = document.createElement("div");
        cap.className = "cap";
        cap.textContent = a.caption;
        chip.appendChild(cap);
      } else {
        const fa = facts[spot.f % facts.length];
        chip.classList.add("fact");
        if (fa.cls) chip.classList.add(fa.cls);
        chip.style.background = fa.bg;
        const txt = document.createElement("span");
        txt.className = "txt";
        txt.textContent = fa.text;
        chip.appendChild(txt);
      }
      pinPhotos.appendChild(chip);
      return { el: chip, from: spot.from, to: spot.to };
    });

    let ticking = false;
    let raf = null;
    function updatePin() {
      ticking = false;
      const rect = pinSection.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      chips.forEach((c) => {
        const vh = c.from + (c.to - c.from) * progress;
        c.el.style.transform = `translate3d(0,${vh}vh,0)`;
      });
    }
    function onScroll() {
      if (!ticking) { raf = requestAnimationFrame(updatePin); ticking = true; }
    }

    // the desktop/reduced-motion gate isn't a one-time snapshot: re-evaluated whenever the
    // matching media queries change (window resized across the 980px breakpoint, OS-level
    // reduced-motion toggled) so the scroll listener attaches/detaches live instead of being
    // frozen at whatever it happened to be at first mount.
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(max-width:980px)");
    let listenerAttached = false;

    function syncParallax() {
      const shouldRun = !reduceQuery.matches && !widthQuery.matches;
      if (shouldRun && !listenerAttached) {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", updatePin);
        listenerAttached = true;
        updatePin();
      } else if (!shouldRun && listenerAttached) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", updatePin);
        listenerAttached = false;
      }
    }

    syncParallax();
    // double rAF: let the browser settle layout (fonts/images can shift section height right
    // after mount) before trusting the first getBoundingClientRect() read
    requestAnimationFrame(() => requestAnimationFrame(() => { if (listenerAttached) updatePin(); }));

    reduceQuery.addEventListener("change", syncParallax);
    widthQuery.addEventListener("change", syncParallax);

    return () => {
      if (listenerAttached) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", updatePin);
      }
      reduceQuery.removeEventListener("change", syncParallax);
      widthQuery.removeEventListener("change", syncParallax);
      if (raf) cancelAnimationFrame(raf);
      chips.forEach((c) => c.el.remove());
    };
  }, []);

  // hero "coverflow" carousel — active card full size/opacity, neighbors scaled and dimmed
  useEffect(() => {
    const track = heroTrackRef.current;
    const carousel = track ? track.parentElement : null;
    if (!track || !carousel) return;

    const cards = Array.from(track.children);
    const n = cards.length;
    let idx = 0;
    let timer = null;
    let active = true;

    function render() {
      cards.forEach((card, i) => {
        let diff = (i - idx + n) % n;
        if (diff > n / 2) diff -= n;
        let x = 0, scale = 1, opacity = 1, z = 3;
        if (diff === 0) { x = 0; scale = 1; opacity = 1; z = 3; }
        else if (diff === 1) { x = 78; scale = 0.82; opacity = 0.55; z = 2; }
        else if (diff === -1) { x = -78; scale = 0.82; opacity = 0.55; z = 2; }
        else { x = diff > 0 ? 150 : -150; scale = 0.7; opacity = 0; z = 1; }
        card.style.transform = `translateX(${x}%) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.zIndex = z;
      });
    }

    function tick() { idx = (idx + 1) % n; render(); }
    function start() { if (!timer) timer = setInterval(() => { if (active) tick(); }, 3200); }
    function stop() { clearInterval(timer); timer = null; }

    render();
    start();
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);

    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { active = e.isIntersecting; }); },
      { threshold: 0.2 }
    );
    io.observe(carousel);

    return () => {
      stop();
      carousel.removeEventListener("mouseenter", stop);
      carousel.removeEventListener("mouseleave", start);
      io.disconnect();
    };
  }, []);

  // animated gold constellation behind the hero
  useEffect(() => {
    const canvas = netCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w, h, nodes = [], raf;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const GOLD = "190, 140, 43";
    const LINK = 140;

    function build() {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(40, Math.max(16, Math.round((w * h) / 32000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.13,
        vy: (Math.random() - 0.5) * 0.13,
        r: Math.random() * 1.3 + 0.5
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const nnode of nodes) {
        nnode.x += nnode.vx;
        nnode.y += nnode.vy;
        if (nnode.x < 0 || nnode.x > w) nnode.vx *= -1;
        if (nnode.y < 0 || nnode.y > h) nnode.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            ctx.strokeStyle = `rgba(${GOLD},${(1 - dist / LINK) * 0.16})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const nnode of nodes) {
        ctx.beginPath();
        ctx.arc(nnode.x, nnode.y, nnode.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD},0.45)`;
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(frame);
    }

    try {
      build();
      frame();
      const onResize = () => { cancelAnimationFrame(raf); build(); frame(); };
      window.addEventListener("resize", onResize);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
      };
    } catch (e) {
      /* canvas not supported — the page still works without the animation */
    }
  }, []);

  return (
    <>
    <header className="nav">
      <div className="nav-inner">
        <div className="logo"><img src="/brand/legends-logo.png" alt="Legends" /></div>
        <nav className="nav-links mobile-menu" id="navLinks" ref={navLinksRef}>
          <a href="#sessions">October Sessions</a>
          <a href="#how">How It Works</a>
          <a href="#pricing">Pricing</a>
          <button className="btn btn-primary gold-fill btn-sm" onClick={handleSubscribe}>Subscribe</button>
        </nav>
        <button className="btn btn-primary gold-fill btn-sm nav-subscribe-desktop" onClick={handleSubscribe}>Subscribe</button>
        <button id="burgerBtn" className="burger" aria-label="Menu" aria-expanded="false" ref={burgerRef}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <main>
      {/* HERO */}
      <section className="hero" id="top">
        <canvas className="net-canvas" ref={netCanvasRef}></canvas>
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="eyebrow reveal">InvestHack · October 2026</p>
            <h1 className="title reveal">Four Tuesdays<br />Four investors<br /><span className="gold-text">One subscription</span></h1>
            <p className="hero-sub reveal">A new investor every Tuesday — live, unscripted, then a closed room for members. No stage, no soundbite cut for LinkedIn, no deck between you and the decision. Just one hour, one investor, the real reasoning behind their last yes.</p>

            <div className="hero-meta reveal">
              <span className="item item-live"><span className="live-dot"></span>Live online</span>
              <span className="sep"></span>
              <span className="item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>4 sessions</span>
            </div>
            <p className="hero-tz reveal"><span className="tz-label">Session time, every Tuesday</span><span className="tz-value"><b>5:00 PM</b> Dubai<span className="tz-div">/</span><b>2:00 PM</b> London<span className="tz-div">/</span><b>9:00 AM</b> New York</span></p>

            <div className="hero-cta reveal">
              <button className="btn btn-primary gold-fill" onClick={handleSubscribe}>Subscribe for October →</button>
              <a href="#sessions" className="btn btn-outline">See this month's speakers</a>
            </div>
          </div>

          <div className="hero-carousel reveal">
            <div className="hero-track" ref={heroTrackRef}>
              {sessions.map((s, i) => (
                <div className="mini-card" key={i}>
                  <img src={s.photo} alt={s.speaker} loading="lazy" />
                  <span className="mini-badge">LEGENDS</span>
                  <div className="mini-info"><div className="mini-name">{s.speaker}</div><div className="mini-role">{s.company}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PIN FEATURE — atmosphere parallax */}
      <section className="pin-feature" id="pinFeature" ref={pinFeatureRef}>
        <div className="pin-sticky">
          <div className="pin-photos" id="pinPhotos" ref={pinPhotosRef}></div>
          <div className="pin-card reveal">
            <p className="eyebrow">Why InvestHack</p>
            <h2>A real conversation, not a pitch deck.</h2>
            <p>No stage, no script, no slides to hide behind. One investor, one hour, in a closed room — every Tuesday this October a different playbook, unscripted from the first question.</p>
          </div>
        </div>
      </section>

      {/* SPEAKERS GRID */}
      <section id="speakers" style={{padding: '145px 0'}}>
        <div className="wrap">
          <p className="eyebrow reveal">Who's been in the room</p>
          <h2 className="reveal" style={{marginTop: '16px', fontSize: 'clamp(1.6rem,3vw,2.2rem)'}}>Every speaker runs their own deal, not a slide</h2>
          <p className="reveal" style={{marginTop: '14px', maxWidth: '600px', color: 'var(--muted-foreground)', fontSize: '1.14rem', lineHeight: '1.6'}}>Founders, investors, operators — different roles, one thing in common: they've actually done it.</p>

          <div className="speaker-grid-cards">
            {sessions.map((s, i) => (
              <div className="speaker-gc reveal" key={i}>
                <div className="speaker-gc-photo"><img src={s.photo} alt={s.speaker} loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
                <div className="speaker-gc-text">
                  <div className="speaker-gc-role">{s.traits}</div>
                  <div className="speaker-gc-company">{s.company}</div>
                  <div className="speaker-gc-name">{s.speaker}</div>
                  <p className="speaker-gc-quote">"{s.title}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="wrap">
          <p className="eyebrow reveal">How it works</p>
          <h2 className="reveal" style={{marginTop: '16px', fontSize: 'clamp(1.6rem,3vw,2.2rem)'}}>One subscription, every Tuesday covered</h2>

          <div className="steps-grid">
            <div className="step-box reveal">
              <div className="step-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/><path d="M8 15.5h2M14 15.5h2"/></svg></div>
              <div className="step-num">01</div>
              <div className="step-title">Subscribe once</div>
              <p className="step-desc">One payment covers all four InvestHack sessions in October — no separate ticket for each Tuesday.</p>
            </div>
            <div className="step-box gold reveal">
              <div className="step-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 8-16 8 4-8-4-8z"/></svg></div>
              <div className="step-num">02</div>
              <div className="step-title">Get the link every week</div>
              <p className="step-desc">An hour before each session, we email the link to the address you subscribed with and confirm your attendance.</p>
            </div>
            <div className="step-box dark reveal">
              <div className="step-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="15" height="12" rx="2"/><path d="M17 10l5-3v10l-5-3"/></svg></div>
              <div className="step-num">03</div>
              <div className="step-title">Join, then stay on if you're a member</div>
              <p className="step-desc">The open session streams live for everyone subscribed. Legends members can stay on for the closed room after.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM */}
      <section id="sessions">
        <div className="wrap">
          <p className="eyebrow reveal">This month</p>
          <h2 className="reveal" style={{marginTop: '16px', fontSize: 'clamp(1.6rem,3vw,2.2rem)'}}>The Lineup</h2>
          <p className="reveal" style={{marginTop: '14px', maxWidth: '600px', color: 'var(--muted-foreground)', fontSize: '1.14rem', lineHeight: '1.6'}}>Four Tuesdays, four different investors. Click a row for the full session.</p>

          {sessions.map((s, i) => (
            <div className="prog-row reveal" onClick={() => setSessionIndex(i)} key={i}>
              <div className="prog-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="prog-main">
                <div className="prog-date">{s.date.replace('Tuesday, ', 'Tuesday, ').replace(' 2026', '')}</div>
                <div className="prog-time"><span className="prog-time-online">{s.online ? 'Live online' : 'In person'}</span><span className="prog-time-value">{s.time}</span></div>
                <div className="prog-title">{s.title}</div>
              </div>
              <div className="prog-right">

                <div className="prog-who">
                <div className="prog-avatar"><img src={s.photo} alt={s.speaker} loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '999px'}} /></div>
                <div className="prog-who-text"><div className="prog-name">{s.speaker}</div><div className="prog-role">{s.traits}</div></div>
              </div>

                <div className="prog-expand">Details<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 4l8 8-8 8"/></svg></div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SESSION MODAL */}
      <div className={`overlay${sessionIndex !== null ? ' open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setSessionIndex(null); }}>
        <div className="modal">
          <button className="modal-close" onClick={() => setSessionIndex(null)}>✕</button>

          {sessionIndex !== null && (
            <>
              <img className="modal-photo modal-photo-hidden" src={sessions[sessionIndex].photo} alt={sessions[sessionIndex].speaker} loading="lazy" />
              <div className="modal-name">{sessions[sessionIndex].speaker}</div>
              <div className="modal-date">{sessions[sessionIndex].date}</div>
              <div className="modal-traits">{sessions[sessionIndex].traits}</div>

              <div className="modal-tag" dangerouslySetInnerHTML={{ __html: sessions[sessionIndex].tag }} />
              <div className="modal-title">{sessions[sessionIndex].title}</div>

              <div className="modal-section">
                <div className="k">The Journey</div>
                <p>{sessions[sessionIndex].bio}</p>
              </div>
              <div className="modal-section">
                <div className="k">About the speaker</div>
                <p>{sessions[sessionIndex].about}</p>
              </div>
              <div className="modal-section">
                <div className="k">What you'll hear</div>
                <p dangerouslySetInnerHTML={{ __html: sessions[sessionIndex].hear }} />
              </div>
              <div className="modal-actions">
                <button className="btn btn-primary gold-fill btn-sm" onClick={handleSubscribe}>Apply to Join</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* SUBSCRIBE MODAL */}
      <div className={`overlay${subscribeOpen ? ' open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeSubscribe(); }}>
        <div className="modal subscribe-modal">
          <button className="modal-close" onClick={closeSubscribe}>✕</button>

          {subscribeStep === "form" && (
            <>
              <p className="eyebrow">InvestHack · October 2026</p>
              <div className="modal-title" style={{marginTop: '10px'}}>Subscribe for October</div>
              <p className="modal-traits" style={{marginTop: '10px'}}>Four Tuesdays, four investors, one closed room. Tell us a bit about you and we'll review your application.</p>

              <form className="subscribe-form" onSubmit={handleSubscribeSubmit}>
                <label className="form-field">
                  <span>Full name *</span>
                  <input type="text" required value={subscribeForm.name} onChange={(e) => updateSubscribeField("name", e.target.value)} placeholder="Jane Doe" />
                </label>
                <label className="form-field">
                  <span>Email *</span>
                  <input type="email" required value={subscribeForm.email} onChange={(e) => updateSubscribeField("email", e.target.value)} placeholder="jane@company.com" />
                </label>
                <label className="form-field">
                  <span>Phone (with country code) *</span>
                  <input type="tel" required value={subscribeForm.phone} onChange={(e) => updateSubscribeField("phone", e.target.value)} placeholder="+971 50 000 0000" />
                </label>
                <label className="form-field">
                  <span>LinkedIn URL</span>
                  <input type="url" value={subscribeForm.linkedin} onChange={(e) => updateSubscribeField("linkedin", e.target.value)} placeholder="linkedin.com/in/janedoe" />
                </label>
                <label className="form-consent">
                  <input type="checkbox" required checked={subscribeForm.consent} onChange={(e) => updateSubscribeField("consent", e.target.checked)} />
                  <span>I agree to be contacted about this application and future Legends events by phone, SMS and messaging apps (including WhatsApp).</span>
                </label>
                <button type="submit" className="btn btn-primary gold-fill" style={{width: '100%', justifyContent: 'center', marginTop: '6px'}}>Submit · We'll review &amp; be in touch →</button>
              </form>
            </>
          )}

          {subscribeStep === "success" && (
            <div className="subscribe-success">
              <div className="subscribe-success-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <div className="modal-title" style={{marginTop: '18px'}}>Thank you!</div>
              <p className="modal-traits" style={{marginTop: '10px', fontSize: '1rem'}}>Application received and pre-approved. For the final confirmation, message our team on WhatsApp.</p>
              <a href={whatsappHref} target="_blank" rel="noopener" className="btn btn-primary gold-fill whatsapp-btn" style={{width: '100%', justifyContent: 'center', marginTop: '22px'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.13-2.9-7C17.17 3.03 14.69 2 12.04 2zm5.8 14.05c-.24.68-1.19 1.25-1.96 1.41-.52.11-1.2.2-3.5-.75-2.94-1.22-4.83-4.2-4.98-4.4-.15-.19-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.83 2.02.9 2.16.07.15.12.32.02.51-.1.19-.15.31-.3.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.76.83 2.06.98.3.15.5.23.58.35.08.13.08.75-.15 1.43z"/></svg>
                Confirm on WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>

      {/* WHY INVESTHACK */}
      <section id="why" style={{position: 'relative', overflow: 'hidden'}}>
        <div className="why-sketch">
          <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="var(--primary)" strokeLinecap="round" strokeLinejoin="round">
            <path d="M40 460c120-40 180 20 260-40s160-120 260-90 180 70 260 20" strokeWidth="1.4" opacity="0.55"/>
            <path d="M60 500l90-70 80 40 110-120 90 30 100-90 90 50" strokeWidth="1.6" opacity="0.65"/>
            <circle cx="150" cy="430" r="4" opacity="0.7"/>
            <circle cx="230" cy="470" r="4" opacity="0.7"/>
            <circle cx="340" cy="350" r="4" opacity="0.7"/>
            <circle cx="430" cy="380" r="4" opacity="0.7"/>
            <circle cx="530" cy="290" r="4" opacity="0.7"/>
            <circle cx="620" cy="340" r="4" opacity="0.7"/>
            <circle cx="710" cy="390" r="4" opacity="0.7"/>
            <path d="M700 200a60 60 0 1 1 0 120 60 60 0 0 1 0-120z" strokeWidth="1.2" opacity="0.4"/>
            <path d="M700 230v60M670 260h60" strokeWidth="1.1" opacity="0.4"/>
          </svg>
        </div>
        <div className="wrap" style={{position: 'relative', zIndex: '1'}}>
          <p className="eyebrow reveal">Why InvestHack</p>
          <h2 className="reveal why-title-oneline" style={{marginTop: '16px', maxWidth: '680px'}}>Four investors, four different answers</h2>
          <p className="reveal" style={{marginTop: '16px', maxWidth: '600px', fontSize: '1.14rem', color: 'var(--muted-foreground)', lineHeight: '1.6'}}>A new one every Tuesday this October, none of them reading from the same playbook — that's the entire premise.</p>

          <div className="why-grid-big">
            <div className="why-big-item reveal">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5.5h13v8H10l-4.5 4v-4H4z"/></svg>
              <div className="why-big-title">A Real Conversation, Not a Clip</div>
              <p className="why-big-desc">No stage, no soundbite cut for LinkedIn. One investor, one hour, hosted as an actual conversation about how they say yes.</p>
            </div>
            <div className="why-big-item reveal">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/><path d="M8 15.5h2M14 15.5h2"/></svg>
              <div className="why-big-title">Never the Same Playbook Twice</div>
              <p className="why-big-desc">A different investor every Tuesday. What kills a deal for one is a non-issue for the next.</p>
            </div>
            <div className="why-big-item reveal">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 18l5-6 4 3 6-8"/><path d="M15 7h4v4"/></svg>
              <div className="why-big-title">The Value Compounds</div>
              <p className="why-big-desc">Miss a week, miss one investor's logic. Follow the month and the real pattern starts showing up.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{background: 'var(--muted)'}}>
        <div className="wrap" style={{textAlign: 'center'}}>
          <p className="eyebrow reveal">Subscription</p>
          <h2 className="reveal" style={{marginTop: '16px', fontSize: 'clamp(1.6rem,3vw,2.2rem)'}}>One price, every Tuesday in October</h2>
          <p className="reveal" style={{marginTop: '14px', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto', color: 'var(--muted-foreground)', fontSize: '1.02rem', lineHeight: '1.6'}}>Subscribe once and you're set for the whole month — no separate sign-up for each session, no re-applying every Tuesday.</p>

          <div className="price-block reveal">
            <span className="price-badge">4 Tuesdays included</span>
            <div className="price-amount"><span className="price-currency">€</span><span id="priceAmount">149</span></div>
            <div className="price-period">Per month · October 2026</div>
            <ul className="price-list">
              <li><span className="price-check"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>All four InvestHack sessions this month</li>
              <li><span className="price-check"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>The link emailed an hour before each session</li>
              <li><span className="price-check"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>Live Q&amp;A with each week's investor</li>
              <li><span className="price-check"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>Closed room access if you're a Legends member</li>
            </ul>
            <button className="btn btn-primary gold-fill" style={{width: '100%', justifyContent: 'center', marginTop: '30px'}} onClick={handleSubscribe}>Subscribe for October →</button>
            <p className="price-note">Renews monthly. Cancel anytime before the next cycle starts.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="wrap" style={{maxWidth: '720px'}}>
          <p className="eyebrow reveal">Good to know</p>
          <h2 className="reveal" style={{marginTop: '16px', fontSize: 'clamp(1.6rem,3vw,2.2rem)'}}>Questions about the subscription</h2>

          <div style={{marginTop: '36px'}}>
            <div className={`faq-item${faqOpen === 0 ? ' open' : ''}`}>
              <button className="faq-q" onClick={() => setFaqOpen(faqOpen === 0 ? null : 0)}>Does one subscription cover all four sessions?<span className="plus">+</span></button>
              <div className="faq-a" style={{ maxHeight: faqOpen === 0 ? '200px' : '0px' }}><div className="faq-a-inner">Yes — subscribing once gives you access to every InvestHack session in October. You don't need to register separately for each Tuesday.</div></div>
            </div>
            <div className={`faq-item${faqOpen === 1 ? ' open' : ''}`}>
              <button className="faq-q" onClick={() => setFaqOpen(faqOpen === 1 ? null : 1)}>What happens if I subscribe partway through the month?<span className="plus">+</span></button>
              <div className="faq-a" style={{ maxHeight: faqOpen === 1 ? '200px' : '0px' }}><div className="faq-a-inner">You get access to any remaining sessions that month. The subscription then renews for the following month unless you cancel.</div></div>
            </div>
            <div className={`faq-item${faqOpen === 2 ? ' open' : ''}`}>
              <button className="faq-q" onClick={() => setFaqOpen(faqOpen === 2 ? null : 2)}>Is the closed room included?<span className="plus">+</span></button>
              <div className="faq-a" style={{ maxHeight: faqOpen === 2 ? '200px' : '0px' }}><div className="faq-a-inner">The open session is included for every subscriber. The closed room afterward is reserved for Legends members.</div></div>
            </div>
            <div className={`faq-item${faqOpen === 3 ? ' open' : ''}`}>
              <button className="faq-q" onClick={() => setFaqOpen(faqOpen === 3 ? null : 3)}>Can I cancel anytime?<span className="plus">+</span></button>
              <div className="faq-a" style={{ maxHeight: faqOpen === 3 ? '200px' : '0px' }}><div className="faq-a-inner">Yes. Cancel before the next billing cycle starts and you won't be charged again — you keep access through the end of the current month.</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section>
        <div className="wrap">
          <div className="final-cta reveal">
            <div className="final-cta-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5.5h13v8H10l-4.5 4v-4H4z"/></svg></div>
            <p className="eyebrow">Subscribe</p>
            <h2>Don't miss this Tuesday</h2>
            <p>One subscription, every InvestHack session in October included.</p>
            <button className="btn btn-primary gold-fill" onClick={handleSubscribe}>Subscribe for October →</button>
          </div>
        </div>
      </section>

      {/* ABOUT LEGENDS */}
      <section id="about-legends">
        <div className="wrap">
          <p className="eyebrow reveal">About Legends</p>
          <h2 className="reveal" style={{marginTop: '16px', fontSize: 'clamp(1.8rem,3.6vw,2.5rem)', maxWidth: '600px'}}>The AI-powered private network behind what's next.</h2>
          <p className="reveal" style={{marginTop: '18px', maxWidth: '640px', fontSize: '1.05rem', lineHeight: '1.65', color: 'var(--muted-foreground)'}}>Legends puts the most active cross-border founders, CEOs and investors in one room — to swap what works and back each other when things get rough. Sessions like this InvestHack are the way in. Membership opens by invitation, to those who take part.</p>

          <div className="pillars-row">
            <span className="pillar reveal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-6 9 6"/><path d="M5 10v9M10 10v9M14 10v9M19 10v9"/><path d="M3 19h18"/></svg>Capital</span>
            <span className="pillar reveal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="7" r="2.5"/><circle cx="18" cy="7" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 8.3L10.3 16M16 8.3L13.7 16"/></svg>Connections</span>
            <span className="pillar reveal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.6 4.8L18 9l-4.4 1.2L12 15l-1.6-4.8L6 9l4.4-1.2z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></svg>Experiences</span>
            <span className="pillar reveal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="2.5"/><circle cx="16" cy="16" r="2.5"/></svg>Culture</span>
            <span className="pillar reveal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.8"/></svg>Impact</span>
          </div>

          <div className="more-grid">
            <div className="more-card reveal">
              <span className="mc-label">Reach</span>
              <span className="mc-num">1,300+</span>
              <p>Matchmakings made across the GCC network.</p>
            </div>
            <div className="more-card dark reveal">
              <span className="mc-label">In person</span>
              <span className="mc-num">80+</span>
              <p>Private gatherings hosted for the network.</p>
            </div>
            <div className="more-card gold reveal">
              <span className="mc-label">Global</span>
              <span className="mc-num">30+</span>
              <p>Countries represented among members.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="fornot">
        <div className="wrap">
          <p className="eyebrow reveal">Who it's for</p>
          <h2 className="reveal" style={{marginTop: '16px', fontSize: 'clamp(1.6rem,3vw,2.2rem)'}}>Come for the right reason</h2>

          <div className="fornot-grid">
            <div className="fornot-col yes reveal">
              <span className="fornot-badge yes"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>
              <h3>Come if you are</h3>
              <ul>
                <li><span className="fornot-icon yes"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>An active investor, founder or operator who wants direct access to one great investor conversation a month</li>
                <li><span className="fornot-icon yes"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>Someone who values a small, closed room over a big conference stage</li>
                <li><span className="fornot-icon yes"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>Looking to build real relationships, not just collect contacts</li>
                <li><span className="fornot-icon yes"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>Curious how different investors actually think, week to week</li>
                <li><span className="fornot-icon yes"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>Ready to show up live — this isn't a replay you catch later</li>
              </ul>
            </div>
            <div className="fornot-col no reveal">
              <span className="fornot-badge no"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></span>
              <h3>Not for you if</h3>
              <ul>
                <li><span className="fornot-icon no"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></span>You're looking for a sales pitch or a lead-gen event</li>
                <li><span className="fornot-icon no"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></span>You want a large public conference with hundreds of attendees</li>
                <li><span className="fornot-icon no"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></span>You can't commit to the confidentiality of a closed room</li>
                <li><span className="fornot-icon no"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></span>You're after a highlight reel, not the actual conversation</li>
                <li><span className="fornot-icon no"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></span>You'd rather watch a recap later than join the Tuesday session</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div className="wrap foot-inner">
        <div>
          <div className="logo"><img src="/brand/legends-logo.png" alt="Legends" /></div>
          <div className="foot-tagline">InvestHack — one investor, every Tuesday this October.</div>
        </div>
        <nav className="foot-links">
          <a href="#sessions">Sessions</a>
          <a href="#how">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>
      <div className="wrap">
        <div className="foot-note">© 2026 Legends. InvestHack runs weekly, online, by subscription.</div>
      </div>
    </footer>
    </>
  );
}
