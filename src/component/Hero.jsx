

import React, { useEffect, useState } from "react";


import "./Hero.css";


import candleImage from "../images/candleTwo.png";

const Hero = () => {

  /* =======================================================
     MOUSE GLOW EFFECT
  ======================================================= */
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {

    const moveGlow = (e) => {

      setPosition({
        x: e.clientX,
        y: e.clientY,
      });

    };

    window.addEventListener("mousemove", moveGlow);

    return () => {
      window.removeEventListener("mousemove", moveGlow);
    };

  }, []);

  return (
    <>

      {/* ===================================================
          HERO SECTION
      =================================================== */}
      <section className="hero-section">

        {/* ===================================================
            MOUSE GLOW
        =================================================== */}
        <div
          className="mouse-glow"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        ></div>

        {/* ===================================================
            BACKGROUND PARTICLES
        =================================================== */}
        <div className="particles">

          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>

        </div>

        {/* ===================================================
            HERO CONTENT
        =================================================== */}
        <div className="hero-content">

          {/* TOP TEXT */}
          <p className="hero-subtitle">
            EMBER & WAX
          </p>

          {/* =================================================
              CANDLE WRAPPER
          ================================================= */}
          <div className="candle-wrapper">

            {/* SMOKE */}
            <div className="smoke smoke-1"></div>

            <div className="smoke smoke-2"></div>

            <div className="smoke smoke-3"></div>

            {/* FLAME */}
            <div className="flame"></div>

            {/* CANDLE IMAGE */}
            <img
              src={candleImage}
              alt="Luxury Candle"
              className="candle-image"
            />

          </div>

          {/* HERO TITLE */}
          <h1 className="hero-title glow-text">
            Light the dark.
          </h1>

          {/* SCROLL TEXT */}
          <p className="scroll-text">
            SCROLL TO DISCOVER
          </p>

        </div>

      </section>

    </>
  );
};

export default Hero;