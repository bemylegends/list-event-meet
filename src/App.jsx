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
    photo: "https://belegends.club/api/files/pbc_2443081517/nkx8sv2d9mrxvkq/janneke_niessen_l_q_mn6b93nrqu.png",
    about: "Founding Partner at CapitalT, serial entrepreneur and investor. Janneke co-founded DQ&amp;A and Improve Digital, scaled both internationally, and exited them before moving to the other side of the table.",
    bio: "Now backs pre-seed founders in Climate Tech and the Future of Work — typically committing €500K–€1.2M, and up to €2.5M for the right team, before there's a product or revenue to point to.",
    hear: "Her line on this: <i>\"Before revenue, the team is the evidence.\"</i> What she actually checks when there's no P&amp;L — and why two exits taught her to bet on people first."
  },
  {
    tag: "InvestHack <b>#07</b>",
    date: "Tuesday, 13 October 2026",
    traits: "Entrepreneur · Investor · Ex-PwC",
    speaker: "Varun Malik",
    company: "Founder, Konsälidön",
    title: "The Term Sheet Question Most Founders Get Wrong",
    photo: "https://belegends.club/api/files/pbc_2443081517/m0nw01p7ifx5xus/varun_quote_doz79zzg7u.webp",
    about: "Founder of Konsälidön. Varun built and led consulting practices at PwC, Protiviti and Encreate, before stepping back from day-to-day operating roles to focus on what comes next.",
    bio: "His thesis now guides a run of micro-investments designed to help founders understand an exponential future, move past fear, and negotiate from a position that actually holds up.",
    hear: "Not valuation — leverage. Why the clause founders skim past is usually the one that decides who really controls the company."
  },
  {
    tag: "InvestHack <b>#08</b>",
    date: "Tuesday, 20 October 2026",
    traits: "Serial Founder · VC · Since 1996",
    speaker: "Walied Albasheer",
    company: "Managing Partner, Intuitio Ventures",
    title: "What Actually Kills a Deal in the First Five Minutes",
    photo: "https://belegends.club/api/files/pbc_2443081517/limyhdr7l2k2qzo/walied_quote_6m7wfe64io.webp",
    about: "Founder &amp; Managing Partner at Intuitio Ventures, and Founder &amp; CEO of Inbound LLC. Walied has been building and backing technology companies since 1996, across the UAE, Estonia and the US.",
    bio: "Author of <i>The Slop Stack</i>, a four-layer taxonomy of AI-generated mediocrity in startups. Has founded 7 companies (4 folded) and reviewed 265+ ventures through his own fund.",
    hear: "His line: <i>\"If you're a founder, you have to own your own numbers.\"</i> The tells that end a conversation before the deck is even open."
  },
  {
    tag: "InvestHack <b>#09</b>",
    date: "Tuesday, 27 October 2026",
    traits: "Family Office · Direct Investor",
    speaker: "Alex Felman",
    company: "General Partner, Felman Family Office",
    title: "Why Some $2M Checks Take Longer Than $20M Ones",
    photo: "https://belegends.club/api/files/pbc_2443081517/kfzgg99w8mivqcf/alex_f_l_q_rd9qlb3hjv.png",
    about: "General Partner at Felman Family Office and Founder of Exponential U. Trained in molecular toxicology and bio-entrepreneurship before moving into venture building and investing.",
    bio: "Leads technology investments across biotech, healthcare, agriculture and energy — roughly 90% direct, 10% via funds — with an 8–10 year minimum horizon and 1–2 years spent building the relationship before he commits.",
    hear: "His line: <i>\"Buy till exit.\"</i> Why check size and diligence speed don't move together the way founders assume."
  }
];

export default function App() {
  const [sessionIndex, setSessionIndex] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);
  const heroTrackRef = useRef(null);
  const netCanvasRef = useRef(null);

  function handleSubscribe() {
    alert("Subscription flow placeholder — wire this button up to your checkout.");
  }

  // lock body scroll while the session modal is open, and close it on Escape
  useEffect(() => {
    document.body.style.overflow = sessionIndex !== null ? "hidden" : "";
    function onKey(e) {
      if (e.key === "Escape") setSessionIndex(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sessionIndex]);

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
        <div className="logo">LEGENDS</div>
        <nav className="nav-links">
          <a href="#sessions">October Sessions</a>
          <a href="#how">How It Works</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <button className="btn btn-primary gold-fill btn-sm" onClick={handleSubscribe}>Subscribe</button>
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
            <p className="hero-sub reveal">A new investor every Tuesday — live, unscripted, then a closed room for members.</p>

            <div className="hero-meta reveal">
              <span className="item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="15" height="12" rx="2"/><path d="M17 10l5-3v10l-5-3"/></svg>Online</span>
              <span className="sep"></span>
              <span className="item">4 sessions</span>
            </div>
            <p className="hero-tz reveal"><b>5:00 PM</b> Dubai · <b>2:00 PM</b> London · <b>9:00 AM</b> New York</p>

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

      {/* FROM STRIP */}
      <section className="from-strip">
        <div className="wrap">
          <span className="lbl">Our speakers come from</span>
          <div className="from-track">
            {[...Array(2)].flatMap(() => [
              "CapitalT", "Intuitio Ventures", "Felman Family Office", "Konsälidön", "Suvan Ventures",
              "Al Siraj Holdings", "RVAI Global", "Bachmann Catalyst", "Exponential U", "Inbound LLC"
            ]).map((name, i) => (
              <span className="from-chip" key={i}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKERS GRID */}
      <section id="speakers" style={{padding: '180px 0'}}>
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
              <div className="step-num">01</div>
              <div className="step-title">Subscribe once</div>
              <p className="step-desc">One payment covers all four InvestHack sessions in October — no separate ticket for each Tuesday.</p>
            </div>
            <div className="step-box reveal">
              <div className="step-num">02</div>
              <div className="step-title">Get the link every week</div>
              <p className="step-desc">An hour before each session, we email the link to the address you subscribed with and confirm your attendance.</p>
            </div>
            <div className="step-box reveal">
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
              <div>
                <div className="prog-date">{s.date.replace('Tuesday, ', 'Tuesday, ').replace(' 2026', '')}</div>
                <div className="prog-title">{s.title}</div>
              </div>
              <div className="prog-right">

                <div className="prog-who">
                <div className="prog-avatar"><img src={s.photo} alt={s.speaker} loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '999px'}} /></div>
                <div><div className="prog-name">{s.speaker}</div><div className="prog-role">{s.traits}</div></div>
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
              <img className="modal-photo" src={sessions[sessionIndex].photo} alt={sessions[sessionIndex].speaker} loading="lazy" />
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
          <h2 className="reveal why-title-oneline" style={{marginTop: '16px', maxWidth: '680px'}}>Twenty investors, twenty different answers</h2>
          <p className="reveal" style={{marginTop: '16px', maxWidth: '600px', fontSize: '1.14rem', color: 'var(--muted-foreground)', lineHeight: '1.6'}}>A new one every Tuesday, none of them reading from the same playbook — that's the entire premise.</p>

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
            <div className="price-amount">€<span id="priceAmount">149</span></div>
            <div className="price-period">Per month · October 2026</div>
            <ul className="price-list">
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>All four InvestHack sessions this month</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>The link emailed an hour before each session</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>Live Q&amp;A with each week's investor</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>Closed room access if you're a Legends member</li>
            </ul>
            <button className="btn btn-primary gold-fill" style={{width: '100%', justifyContent: 'center', marginTop: '26px'}} onClick={handleSubscribe}>Subscribe for October →</button>
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

          <div className="pillars reveal">
            <span className="pillar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-6 9 6"/><path d="M5 10v9M10 10v9M14 10v9M19 10v9"/><path d="M3 19h18"/></svg>Capital</span>
            <span className="pillar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="7" r="2.5"/><circle cx="18" cy="7" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 8.3L10.3 16M16 8.3L13.7 16"/></svg>Connections</span>
            <span className="pillar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.6 4.8L18 9l-4.4 1.2L12 15l-1.6-4.8L6 9l4.4-1.2z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></svg>Experiences</span>
            <span className="pillar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="2.5"/><circle cx="16" cy="16" r="2.5"/></svg>Culture</span>
            <span className="pillar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.8"/></svg>Impact</span>
          </div>

          <div className="legends-stats reveal">
            <div className="legends-stat"><span className="num">1,300+</span><span className="cap">Matchmakings<br />in GCC</span></div>
            <div className="legends-stat"><span className="num">80+</span><span className="cap">Private<br />gatherings</span></div>
            <div className="legends-stat"><span className="num">30+</span><span className="cap">Countries<br />represented</span></div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div className="wrap foot-inner">
        <div className="logo">LEGENDS</div>
        <div className="foot-note">© 2026 Legends. InvestHack runs weekly, online, by subscription.</div>
      </div>
    </footer>
    </>
  );
}
