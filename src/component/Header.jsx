/* =========================================================
   FILE: src/component/jsx/Header.jsx
   ========================================================= */

import React, { useState } from "react";

/* =========================================================
   CSS
========================================================= */
import "./Header.css";

/* =========================================================
   ICONS
========================================================= */
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Package,
} from "lucide-react";

const Header = () => {

  /* =======================================================
     MOBILE MENU STATE
  ======================================================= */
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      
      {/* ===================================================
          HEADER START
      =================================================== */}
      <header className="header">

        {/* ===================================================
            CONTAINER
        =================================================== */}
        <div className="container">

          {/* ===================================================
              HEADER INNER
          =================================================== */}
          <div className="header-inner">

            {/* ===================================================
                LOGO
            =================================================== */}
            <div className="logo-wrapper">

              {/* LOGO ICON */}
              <div className="logo-circle glow-text">
                C
              </div>

              {/* LOGO TEXT */}
              <h2 className="logo-text glow-text">
                Light
              </h2>

            </div>

            {/* ===================================================
                DESKTOP NAVIGATION
            =================================================== */}
            <nav className="desktop-nav">

              <a href="#">Home</a>

              <a href="#">Shop</a>

              <a href="#">Collections</a>

              <a href="#">About</a>

              <a href="#">Contact</a>

            </nav>

            {/* ===================================================
                HEADER RIGHT
            =================================================== */}
            <div className="header-right">

              {/* SEARCH */}
              <div className="search-box">

                <Search className="search-icon" size={18} />

                <input
                  type="text"
                  placeholder="Search candles..."
                />

              </div>

              {/* WISHLIST */}
              <button className="icon-btn">

                <Heart size={20} />

                <span className="badge">
                  2
                </span>

              </button>

              {/* ORDERS */}
              <button className="icon-btn">

                <Package size={20} />

              </button>

              {/* CART */}
              <button className="icon-btn">

                <ShoppingCart size={20} />

                <span className="badge">
                  4
                </span>

              </button>

              {/* PROFILE */}
              <button className="profile-btn">

                <User size={18} />

              </button>

            </div>

            {/* ===================================================
                MOBILE MENU BUTTON
            =================================================== */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {
                mobileMenu
                  ? <X size={28} />
                  : <Menu size={28} />
              }
            </button>

          </div>

        </div>

        {/* ===================================================
            MOBILE MENU
        =================================================== */}
        <div className={`mobile-menu ${mobileMenu ? "show-menu" : ""}`}>

          {/* MOBILE SEARCH */}
          <div className="mobile-search">

            <Search className="search-icon" size={18} />

            <input
              type="text"
              placeholder="Search candles..."
            />

          </div>

          {/* MOBILE NAVIGATION */}
          <nav className="mobile-nav">

            <a href="#">Home</a>

            <a href="#">Shop</a>

            <a href="#">Collections</a>

            <a href="#">About</a>

            <a href="#">Contact</a>

          </nav>

          {/* MOBILE ICONS */}
          <div className="mobile-icons">

            <Heart />

            <ShoppingCart />

            <Package />

            <User />

          </div>

        </div>

      </header>

    </>
  );
};

export default Header;