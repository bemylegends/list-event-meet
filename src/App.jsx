import { useEffect, useRef, useState } from "react";
import "./App.css";

const sessions = [
  {
    tag: "InvestHack <b>#06</b>",
    date: "Tuesday, 6 October 2026",
    traits: "Founder · Investor · Two Exits",
    speaker: "Speaker Name",
    title: "How to Get a Yes Before You Have Revenue",
    about: "Placeholder background — replace with the confirmed investor's real bio: where they studied, the fund or firm they're with now, and the path that got them there.",
    bio: "Backs pre-seed and seed founders before there's a product to point to. Extended bio placeholder — replace with the confirmed investor's real track record, fund, and check history once they're locked in.",
    hear: "What actually gets checked when there's no P&amp;L to point to — and the two things that matter more than a working product at this stage."
  },
  {
    tag: "InvestHack <b>#07</b>",
    date: "Tuesday, 13 October 2026",
    traits: "Investor · Operator · Growth Stage",
    speaker: "Speaker Name",
    title: "The Term Sheet Question Most Founders Get Wrong",
    about: "Placeholder background — replace with the confirmed investor's real bio: where they studied, the fund or firm they're with now, and the path that got them there.",
    bio: "Runs growth-stage diligence and negotiates the clauses founders skim past. Extended bio placeholder — replace with the confirmed investor's real track record, fund, and check history once they're locked in.",
    hear: "Not valuation — control. The specific clauses that quietly cost founders more than a lower price would have."
  },
  {
    tag: "InvestHack <b>#08</b>",
    date: "Tuesday, 20 October 2026",
    traits: "Ex-Founder · Angel Investor",
    speaker: "Speaker Name",
    title: "What Actually Kills a Deal in the First Five Minutes",
    about: "Placeholder background — replace with the confirmed investor's real bio: where they studied, the fund or firm they're with now, and the path that got them there.",
    bio: "A former founder who now writes angel checks, pattern-matching from having built and sold. Extended bio placeholder — replace with the confirmed investor's real track record once they're locked in.",
    hear: "The tells that end a conversation before the deck is even open — and the ones founders wrongly think matter more than they do."
  },
  {
    tag: "InvestHack <b>#09</b>",
    date: "Tuesday, 27 October 2026",
    traits: "Family Office · Direct Investor",
    speaker: "Speaker Name",
    title: "Why Some $2M Checks Take Longer Than $20M Ones",
    about: "Placeholder background — replace with the confirmed investor's real bio: where they studied, the fund or firm they're with now, and the path that got them there.",
    bio: "Deploys family-office capital slower and smaller than a fund. Extended bio placeholder — replace with the confirmed investor's real track record once they're locked in.",
    hear: "Why check size and diligence speed don't move together the way founders assume, and how to see a slow round coming."
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
        <canvas ref={netCanvasRef}></canvas>
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
              <div className="mini-card"><span className="mini-badge">LEGENDS</span><div className="mini-info"><div className="mini-name">Speaker Name</div><div className="mini-role">Founder &amp; Investor</div></div></div>
              <div className="mini-card"><span className="mini-badge">LEGENDS</span><div className="mini-info"><div className="mini-name">Speaker Name</div><div className="mini-role">Family Office</div></div></div>
              <div className="mini-card"><span className="mini-badge">LEGENDS</span><div className="mini-info"><div className="mini-name">Speaker Name</div><div className="mini-role">Growth Investor</div></div></div>
              <div className="mini-card"><span className="mini-badge">LEGENDS</span><div className="mini-info"><div className="mini-name">Speaker Name</div><div className="mini-role">Ex-Founder, Angel</div></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* FROM STRIP */}
      <section className="from-strip">
        <div className="wrap">
          <span className="lbl">Our speakers come from</span>
          <div className="from-track">
            <span className="from-chip">Fund Name</span>
            <span className="from-chip">Growth Capital</span>
            <span className="from-chip">Angel Syndicate</span>
            <span className="from-chip">Family Office</span>
            <span className="from-chip">Venture Partners</span>
            <span className="from-chip">Seed Collective</span>
            <span className="from-chip">Capital Group</span>
            <span className="from-chip">Founders Fund</span>
            <span className="from-chip">Horizon Ventures</span>
            <span className="from-chip">Northline Capital</span>
            <span className="from-chip">Bridge Partners</span>
            <span className="from-chip">Alpine Investors</span>
            <span className="from-chip">Summit Ventures</span>
            <span className="from-chip">Vantage Capital</span>
            <span className="from-chip">Anchor Fund</span>
            <span className="from-chip">Meridian Partners</span>
            <span className="from-chip">Cascade Ventures</span>
            <span className="from-chip">Lighthouse Capital</span>
            <span className="from-chip">Beacon Fund</span>
            <span className="from-chip">Crestline Partners</span>
            <span className="from-chip">Fund Name</span>
            <span className="from-chip">Growth Capital</span>
            <span className="from-chip">Angel Syndicate</span>
            <span className="from-chip">Family Office</span>
            <span className="from-chip">Venture Partners</span>
            <span className="from-chip">Seed Collective</span>
            <span className="from-chip">Capital Group</span>
            <span className="from-chip">Founders Fund</span>
            <span className="from-chip">Horizon Ventures</span>
            <span className="from-chip">Northline Capital</span>
            <span className="from-chip">Bridge Partners</span>
            <span className="from-chip">Alpine Investors</span>
            <span className="from-chip">Summit Ventures</span>
            <span className="from-chip">Vantage Capital</span>
            <span className="from-chip">Anchor Fund</span>
            <span className="from-chip">Meridian Partners</span>
            <span className="from-chip">Cascade Ventures</span>
            <span className="from-chip">Lighthouse Capital</span>
            <span className="from-chip">Beacon Fund</span>
            <span className="from-chip">Crestline Partners</span>
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
            <div className="speaker-gc reveal">
              <div className="speaker-gc-photo">SP</div>
              <div className="speaker-gc-text">
                <div className="speaker-gc-role">Founder &amp; Investor</div>
                <div className="speaker-gc-company">Fund Name</div>
                <div className="speaker-gc-name">Speaker Name</div>
                <p className="speaker-gc-quote">"How to get a yes before you have revenue"</p>
              </div>
            </div>
            <div className="speaker-gc reveal">
              <div className="speaker-gc-photo">SP</div>
              <div className="speaker-gc-text">
                <div className="speaker-gc-role">Growth Investor</div>
                <div className="speaker-gc-company">Fund Name</div>
                <div className="speaker-gc-name">Speaker Name</div>
                <p className="speaker-gc-quote">"The term sheet question most founders get wrong"</p>
              </div>
            </div>
            <div className="speaker-gc reveal">
              <div className="speaker-gc-photo">SP</div>
              <div className="speaker-gc-text">
                <div className="speaker-gc-role">Ex-Founder, Angel</div>
                <div className="speaker-gc-company">Angel Investor</div>
                <div className="speaker-gc-name">Speaker Name</div>
                <p className="speaker-gc-quote">"What kills a deal in the first five minutes"</p>
              </div>
            </div>
            <div className="speaker-gc reveal">
              <div className="speaker-gc-photo">SP</div>
              <div className="speaker-gc-text">
                <div className="speaker-gc-role">Family Office</div>
                <div className="speaker-gc-company">Office Name</div>
                <div className="speaker-gc-name">Speaker Name</div>
                <p className="speaker-gc-quote">"Why some $2M checks take longer than $20M ones"</p>
              </div>
            </div>
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
          <p className="reveal" style={{marginTop: '14px', maxWidth: '600px', color: 'var(--muted-foreground)', fontSize: '1.14rem', lineHeight: '1.6'}}>Four Tuesdays, four different investors. Click a row for the full session — names and titles below are placeholders, swap them in once confirmed.</p>

          <div className="prog-row reveal" onClick={() => setSessionIndex(0)}>
            <div>
              <div className="prog-date">Tuesday, 6 October</div>
              <div className="prog-title">How to Get a Yes Before You Have Revenue</div>
            </div>
            <div className="prog-right">

              <div className="prog-who">
              <div className="prog-avatar">SP</div>
              <div><div className="prog-name">Speaker Name</div><div className="prog-role">Founder &amp; Investor</div></div>
            </div>

              <div className="prog-expand">Details<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 4l8 8-8 8"/></svg></div>

            </div>
          </div>

          <div className="prog-row reveal" onClick={() => setSessionIndex(1)}>
            <div>
              <div className="prog-date">Tuesday, 13 October</div>
              <div className="prog-title">The Term Sheet Question Most Founders Get Wrong</div>
            </div>
            <div className="prog-right">

              <div className="prog-who">
              <div className="prog-avatar">SP</div>
              <div><div className="prog-name">Speaker Name</div><div className="prog-role">Growth Investor</div></div>
            </div>

              <div className="prog-expand">Details<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 4l8 8-8 8"/></svg></div>

            </div>
          </div>

          <div className="prog-row reveal" onClick={() => setSessionIndex(2)}>
            <div>
              <div className="prog-date">Tuesday, 20 October</div>
              <div className="prog-title">What Actually Kills a Deal in the First Five Minutes</div>
            </div>
            <div className="prog-right">

              <div className="prog-who">
              <div className="prog-avatar">SP</div>
              <div><div className="prog-name">Speaker Name</div><div className="prog-role">Ex-Founder, Angel</div></div>
            </div>

              <div className="prog-expand">Details<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 4l8 8-8 8"/></svg></div>

            </div>
          </div>

          <div className="prog-row reveal" onClick={() => setSessionIndex(3)}>
            <div>
              <div className="prog-date">Tuesday, 27 October</div>
              <div className="prog-title">Why Some $2M Checks Take Longer Than $20M Ones</div>
            </div>
            <div className="prog-right">

              <div className="prog-who">
              <div className="prog-avatar">SP</div>
              <div><div className="prog-name">Speaker Name</div><div className="prog-role">Family Office</div></div>
            </div>

              <div className="prog-expand">Details<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 4l8 8-8 8"/></svg></div>

            </div>
          </div>
        </div>
      </section>

      {/* SESSION MODAL */}
      <div className={`overlay${sessionIndex !== null ? ' open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setSessionIndex(null); }}>
        <div className="modal">
          <button className="modal-close" onClick={() => setSessionIndex(null)}>✕</button>

          {sessionIndex !== null && (
            <>
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
            <div className="price-amount">€<span id="priceAmount">—</span></div>
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
