import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import candleImage from "../images/candleSelect.png";

// Register GSAP plugins
gsap.registerPlugin(SplitText);

const Hero = () => {

  /* =======================================================
     MOUSE GLOW — smooth lerp position
  ======================================================= */
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const glowPos  = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const glowRef  = useRef(null);
  const rafRef   = useRef(null);

  /* =======================================================
     ELEMENT REFS
  ======================================================= */
  const heroRef       = useRef(null);
  const titleRef      = useRef(null);
  const eyebrowRef    = useRef(null);
  const candleRef     = useRef(null);
  const taglineRef    = useRef(null);
  const dividerRef    = useRef(null);
  const ctaRef        = useRef(null);
  const scrollIndRef  = useRef(null);
  const cornersRef    = useRef([]);
  const particlesRef  = useRef([]);
  const bgGradRef     = useRef(null);

  /* =======================================================
     SMOOTH MOUSE GLOW — lerp loop
  ======================================================= */
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;

    const lerpLoop = () => {
      glowPos.current.x = lerp(glowPos.current.x, mousePos.current.x, 0.07);
      glowPos.current.y = lerp(glowPos.current.y, mousePos.current.y, 0.07);

      if (glowRef.current) {
        glowRef.current.style.left = `${glowPos.current.x}px`;
        glowRef.current.style.top  = `${glowPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(lerpLoop);
    };

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Parallax on candle + title
      const xOffset = (window.innerWidth  / 2 - e.clientX) / 38;
      const yOffset = (window.innerHeight / 2 - e.clientY) / 38;

      gsap.to(candleRef.current, {
        x: -xOffset,
        y: -yOffset,
        rotateY:  xOffset * 1.2,
        rotateX: -yOffset * 0.8,
        duration: 1.4,
        ease: "power3.out",
      });

      gsap.to(titleRef.current, {
        x: xOffset * 0.4,
        y: yOffset * 0.4,
        duration: 1.6,
        ease: "power3.out",
      });

      // Subtle bg shift
      gsap.to(bgGradRef.current, {
        x: xOffset * 0.15,
        y: yOffset * 0.15,
        duration: 2.5,
        ease: "power2.out",
      });
    };

    rafRef.current = requestAnimationFrame(lerpLoop);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* =======================================================
     GSAP MASTER TIMELINE
  ======================================================= */
  useEffect(() => {

    // ── Split title into characters ──────────────────────
    let split;
    try {
      split = new SplitText(titleRef.current, { type: "chars,words" });
    } catch (e) {
      // SplitText not available (free GSAP) — fallback
    }

    const chars = split?.chars || [];

    const master = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. HERO FADE IN
    master.from(heroRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // 2. CORNER ACCENTS — draw in
    master.to(cornersRef.current, {
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=0.4");

    // 3. EYEBROW
    master.to(eyebrowRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power4.out",
    }, "-=0.3").from(eyebrowRef.current, {
      y: 24,
      duration: 0.9,
      ease: "power4.out",
    }, "<");

    // 4. CANDLE — dramatic reveal
    master.to(candleRef.current, {
      opacity: 1,
      duration: 0.1,
    }, "-=0.2")
    .from(candleRef.current, {
      y: 100,
      scale: 0.55,
      rotate: -8,
      duration: 2.0,
      ease: "expo.out",
    }, "<");

    // 5. TITLE — character stagger
    if (chars.length > 0) {
      master.to(titleRef.current, { opacity: 1, duration: 0.01 }, "-=1.4");
      master.from(chars, {
        opacity: 0,
        y: 80,
        rotateX: -90,
        stagger: 0.032,
        duration: 1.0,
        ease: "back.out(1.4)",
        transformOrigin: "50% 50% -30px",
      }, "-=1.4");
    } else {
      // Fallback without SplitText
      master.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "expo.out",
      }, "-=1.2").from(titleRef.current, { y: 80, duration: 1.2, ease: "expo.out" }, "<");
    }

    // 6. DIVIDER
    master.to(dividerRef.current, {
      opacity: 1,
      scaleX: 1,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.5").from(dividerRef.current, {
      scaleX: 0,
      transformOrigin: "center",
      duration: 0.8,
    }, "<");

    // 7. TAGLINE
    master.to(taglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.4").from(taglineRef.current, {
      y: 20,
      duration: 0.8,
    }, "<");

    // 8. CTA
    master.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.3").from(ctaRef.current, {
      y: 22,
      duration: 0.8,
    }, "<");

    // 9. SCROLL INDICATOR
    master.to(scrollIndRef.current, {
      opacity: 1,
      duration: 1.0,
      ease: "power2.out",
    }, "-=0.5");

    // ── AMBIENT LOOPS ────────────────────────────────────

    // Candle float
    gsap.to(candleRef.current, {
      y: "-=14",
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Title glow pulse
    gsap.to(titleRef.current, {
      textShadow:
        "0 0 30px rgba(255,180,90,0.45), 0 0 90px rgba(255,100,0,0.25)",
      repeat: -1,
      yoyo: true,
      duration: 2.8,
      ease: "sine.inOut",
    });

    // Corner pulse
    gsap.to(cornersRef.current, {
      opacity: 0.6,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { each: 0.4, from: "random" },
    });

    // Particle drift
    gsap.to(particlesRef.current, {
      y: -40,
      stagger: { each: 0.08, repeat: -1, yoyo: true },
      duration: 3,
      ease: "sine.inOut",
    });

    return () => {
      master.kill();
      if (split) split.revert();
    };
  }, []);

  /* =======================================================
     CTA HOVER MAGNETIC EFFECT
  ======================================================= */
  const handleCtaMouseMove = (e) => {
    const btn  = ctaRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    gsap.to(btn, { x: x * 0.22, y: y * 0.22, duration: 0.4, ease: "power2.out" });
  };

  const handleCtaMouseLeave = () => {
    gsap.to(ctaRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  };

  /* =======================================================
     RENDER
  ======================================================= */
  return (
    <>
      <section className="hero-section" ref={heroRef}>

        {/* BACKGROUND GRADIENT */}
        <div className="hero-bg-gradient" ref={bgGradRef}></div>

        {/* SCAN LINE */}
        <div className="hero-scanline"></div>

        {/* VIGNETTE */}
        <div className="hero-vignette"></div>

        {/* MOUSE GLOW */}
        <div className="mouse-glow" ref={glowRef}></div>

        {/* CORNER ACCENTS */}
        <div className="hero-corner hero-corner--tl" ref={el => cornersRef.current[0] = el}></div>
        <div className="hero-corner hero-corner--tr" ref={el => cornersRef.current[1] = el}></div>
        <div className="hero-corner hero-corner--bl" ref={el => cornersRef.current[2] = el}></div>
        <div className="hero-corner hero-corner--br" ref={el => cornersRef.current[3] = el}></div>

        {/* PARTICLES */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className={`p${i + 1}`}
              ref={el => (particlesRef.current[i] = el)}
            />
          ))}
        </div>

        {/* HERO CONTENT */}
        <div className="hero-content">

          {/* EYEBROW */}
          <div className="hero-eyebrow" ref={eyebrowRef}>
            <span className="hero-eyebrow-line"></span>
            <p className="hero-subtitle">EMBER &amp; WAX</p>
            <span className="hero-eyebrow-line right"></span>
          </div>

          {/* CANDLE */}
          <div className="candle-wrapper" ref={candleRef}>
            <div className="candle-halo"></div>
            <div className="candle-halo-inner"></div>
            <div className="smoke smoke-1"></div>
            <div className="smoke smoke-2"></div>
            <div className="smoke smoke-3"></div>
            <img
              src={candleImage}
              alt="Luxury Candle"
              className="candle-image"
            />
          </div>

          {/* TITLE */}
          <h1 className="hero-title" ref={titleRef}>
            Light the dark.
          </h1>

          {/* DIVIDER */}
          <div className="hero-divider" ref={dividerRef}>
            <span className="hero-divider-line"></span>
            <span className="hero-divider-dot"></span>
            <span className="hero-divider-line"></span>
          </div>

          {/* TAGLINE */}
          <p className="hero-tagline" ref={taglineRef}>
            Handcrafted luxury candles
          </p>

          {/* CTA */}
          <a
            href="#collection"
            className="hero-cta"
            ref={ctaRef}
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
          >
            Explore Collection
            <span className="hero-cta-arrow">→</span>
          </a>

        </div>

        {/* SCROLL INDICATOR */}
        <div className="scroll-indicator" ref={scrollIndRef}>
          <span className="scroll-indicator-text">Scroll</span>
          <div className="scroll-indicator-track">
            <div className="scroll-indicator-thumb"></div>
          </div>
        </div>

      </section>
    </>
  );
};

export default Hero;