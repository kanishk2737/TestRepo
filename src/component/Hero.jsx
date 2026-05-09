import React, {
  useEffect,
  useState,
} from "react";

import "./Hero.css";

import candleImage from "../images/candleTwo.png";

const Hero = () => {

  /* =======================================================
     MOUSE GLOW
  ======================================================= */
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {

    let animationFrame;

    const moveGlow = (e) => {

      cancelAnimationFrame(animationFrame);

      animationFrame =
        requestAnimationFrame(() => {

          setPosition({
            x: e.clientX,
            y: e.clientY,
          });

        });

    };

    window.addEventListener(
      "mousemove",
      moveGlow
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        moveGlow
      );

      cancelAnimationFrame(animationFrame);

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
            PARTICLES
        =================================================== */}
        <div className="particles">

          <span className="p1"></span>
          <span className="p2"></span>
          <span className="p3"></span>
          <span className="p4"></span>
          <span className="p5"></span>
          <span className="p6"></span>
          <span className="p7"></span>
          <span className="p8"></span>
          <span className="p9"></span>
          <span className="p10"></span>
          <span className="p11"></span>
          <span className="p12"></span>
          <span className="p13"></span>
          <span className="p14"></span>
          <span className="p15"></span>
          <span className="p16"></span>
          <span className="p17"></span>
          <span className="p18"></span>
          <span className="p19"></span>
          <span className="p20"></span>

        </div>

        {/* ===================================================
            HERO CONTENT
        =================================================== */}
        <div className="hero-content">

          <p className="hero-subtitle">
            EMBER & WAX
          </p>

          {/* =================================================
              CANDLE
          ================================================= */}
          <div className="candle-wrapper">

            {/* SMOKE */}
            <div className="smoke smoke-1"></div>

            <div className="smoke smoke-2"></div>

            <div className="smoke smoke-3"></div>

            {/* CANDLE IMAGE */}
            <img
              src={candleImage}
              alt="Luxury Candle"
              className="candle-image"
            />

          </div>

          {/* TITLE */}
          <h1 className="hero-title glow-text">
            Light the dark.
          </h1>

          {/* SCROLL */}
          <p className="scroll-text">
            SCROLL TO DISCOVER
          </p>

        </div>

      </section>

    </>
  );
};

export default Hero;