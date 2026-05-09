import React from "react";

import "./FeaturedCollection.css";

/* =========================================================
   IMAGES
========================================================= */
import candleOne from "../images/candle-1.png";
import candleTwo from "../images/candle-2.png";
import candleThree from "../images/candle-3.png";

const FeaturedCollection = () => {

  /* =======================================================
     PRODUCTS
  ======================================================= */
  const products = [

    {
      id: 1,
      title: "Midnight Ember",
      subtitle: "Warm Vanilla Smoke",
      image: candleOne,
    },

    {
      id: 2,
      title: "Golden Aura",
      subtitle: "Amber Wood Essence",
      image: candleTwo,
    },

    {
      id: 3,
      title: "Velvet Night",
      subtitle: "Dark Oud Luxury",
      image: candleThree,
    },

  ];

  return (
    <>

      {/* ===================================================
          FEATURED COLLECTION
      =================================================== */}
      <section className="featured-section">

        {/* BACKGROUND GLOW */}
        <div className="featured-bg-glow"></div>

        {/* TOP CONTENT */}
        <div className="featured-top">

          <p className="featured-subtitle">
            FEATURED COLLECTION
          </p>

          <h2 className="featured-title glow-text">
            Crafted for atmosphere.
          </h2>

        </div>

        {/* ===================================================
            PRODUCT GRID
        =================================================== */}
        <div className="featured-grid">

          {
            products.map((item) => (

              <div
                className="featured-card"
                key={item.id}
              >

                {/* EMBER EFFECT */}
                <div className="card-glow"></div>

                {/* PRODUCT IMAGE */}
                <div className="featured-image-wrapper">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="featured-image"
                  />

                </div>

                {/* PRODUCT CONTENT */}
                <div className="featured-content">

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.subtitle}
                  </p>

                  <button>
                    Explore Collection
                  </button>

                </div>

              </div>

            ))
          }

        </div>

      </section>

    </>
  );
};

export default FeaturedCollection;