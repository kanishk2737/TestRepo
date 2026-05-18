import React, { useEffect, useRef, useState } from "react";

import "./FeaturedCollection.css";

import gsap from "gsap";

/* =========================================================
   IMAGES
========================================================= */
import candleOne from "../images/candle-1.png";
import candleTwo from "../images/candle-2.png";
import candleThree from "../images/candle-3.png";

const FeaturedCollection = () => {

  const [activeCard, setActiveCard] = useState(2);

  const cardsRef = useRef([]);

  /* =======================================================
     PRODUCTS
  ======================================================= */
  const products = [

    {
      id: 1,
      number: "01",
      title: "Midnight Ember",
      subtitle: "Warm vanilla smoke with deep amber notes and luxury atmosphere.",
      image: candleOne,
      tags: ["Luxury", "Warm Glow"],
    },

    {
      id: 2,
      number: "02",
      title: "Golden Aura",
      subtitle: "Premium scented candle crafted for cozy modern interiors.",
      image: candleTwo,
      tags: ["Best Seller", "Premium"],
    },

    {
      id: 3,
      number: "03",
      title: "Velvet Night",
      subtitle: "Dark oud fragrance designed for elegant relaxing evenings.",
      image: candleThree,
      tags: ["Dark Oud", "Luxury Mood"],
    },

  ];

  /* =======================================================
     ENTRY ANIMATION
  ======================================================= */
  useEffect(() => {

    gsap.from(cardsRef.current, {

      opacity: 0,

      y: 100,

      duration: 1.4,

      stagger: 0.15,

      ease: "expo.out",

    });

  }, []);

  /* =======================================================
     MOUSE MOVE PARALLAX
  ======================================================= */
  const handleMouseMove = (e, index) => {

    const card = cardsRef.current[index];

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;

    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;

    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {

      rotateX,

      rotateY,

      transformPerspective: 1000,

      duration: 0.5,

      ease: "power3.out",

    });

  };

  /* =======================================================
     RESET
  ======================================================= */
  const handleMouseLeave = (index) => {

    const card = cardsRef.current[index];

    gsap.to(card, {

      rotateX: 0,

      rotateY: 0,

      y: 0,

      scale: 1,

      duration: 0.7,

      ease: "expo.out",

    });

  };

  /* =======================================================
     ACTIVE CARD
  ======================================================= */
  const handleMouseEnter = (id, index) => {

    setActiveCard(id);

    gsap.to(cardsRef.current[index], {

      y: -10,

      scale: 1.02,

      duration: 0.5,

      ease: "power3.out",

    });

  };

  return (

    <section className="featured-section">

      {/* OVERLAY */}
      <div className="featured-overlay"></div>

      {/* TOP */}
      <div className="featured-top">

        <p className="featured-subtitle">
          FEATURED COLLECTION
        </p>

        <h2 className="featured-title">
          Crafted for atmosphere.
        </h2>

      </div>

      {/* GRID */}
      <div className="featured-grid">

        {
          products.map((item, index) => (

            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`featured-card ${
                activeCard === item.id ? "active" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(item.id, index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >

              {/* IMAGE */}
              <div className="featured-image-wrapper">

                <img
                  src={item.image}
                  alt={item.title}
                  className="featured-image"
                />

              </div>

              {/* DARK LAYER */}
              <div className="featured-dark-layer"></div>

              {/* CONTENT */}
              <div className="featured-content">

                <span className="featured-number">
                  Ritual {item.number}
                </span>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.subtitle}
                </p>

                <div className="featured-tags">

                  {
                    item.tags.map((tag, index) => (

                      <span key={index}>
                        {tag}
                      </span>

                    ))
                  }

                </div>

              </div>

            </div>

          ))
        }

      </div>

    </section>

  );
};

export default FeaturedCollection;