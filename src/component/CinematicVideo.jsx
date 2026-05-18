import React, {
  useRef,
  useState,
} from "react";

import "./CinematicVideo.css";

/* =========================================================
   VIDEO IMPORT
========================================================= */
import showcaseVideo from "../video/check2.mp4";

const CinematicVideo = () => {

  /* =======================================================
     VIDEO REF
  ======================================================= */
  const videoRef = useRef(null);

  /* =======================================================
     MOUSE POSITION
  ======================================================= */
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e) => {

    const rect =
      e.currentTarget.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left) / rect.width - 0.5) * 20;

    const y =
      ((e.clientY - rect.top) / rect.height - 0.5) * 20;

    setPosition({ x, y });

  };

  return (

    <section className="cinematic-section">

      {/* BACKGROUND GLOW */}
      <div className="cinematic-bg-glow"></div>

      <div className="cinematic-top-content">

        <p className="cinematic-subtitle">
          CINEMATIC EXPERIENCE
        </p>

        <h2 className="cinematic-title glow-text">
          Atmosphere in motion.
        </h2>

        <p className="cinematic-description">
          Designed with immersive motion,
          cinematic lighting, luxury ambience,
          and modern premium interaction.
        </p>

      </div>

      <div
        className="video-container"
        onMouseMove={handleMouseMove}
      >

        {/* VIDEO GLOW */}
        <div className="video-glow"></div>

        {/* FLOATING LIGHT */}
        <div
          className="floating-light"
          style={{
            transform:
            `translate(${position.x}px, ${position.y}px)`
          }}
        ></div>

        {/* VIDEO */}
        <video
          ref={videoRef}
          className="showcase-video"
          autoPlay
          muted
          loop
          playsInline
        >

          <source
            src={showcaseVideo}
            type="video/mp4"
          />

        </video>

        {/* OVERLAY */}
        <div className="video-overlay"></div>

      </div>

      <div className="cinematic-bottom-text">

        <span></span>

        Immersive luxury visuals

      </div>

    </section>

  );
};

export default CinematicVideo;