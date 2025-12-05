"use client";

import { useState, useEffect } from "react";
// Styles
import styles from "./styles.module.scss";

const ScrollButtons = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Back to top : visible après 300px de scroll
      if (scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Scroll to bottom : masqué quand on est proche du bas
      if (scrollY + windowHeight >= documentHeight - 200) {
        setShowScrollToBottom(false);
      } else if (scrollY < documentHeight - windowHeight - 100) {
        setShowScrollToBottom(true);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.scrollButtonsContainer}>
      {/* Scroll to Bottom */}
      <button
        className={`${styles.scrollToBottom} ${
          showScrollToBottom ? styles.visible : ""
        }`}
        onClick={scrollToBottom}
        aria-label="Aller en bas de la page"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 10L12 15L17 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Back to Top */}
      <button
        className={`${styles.backToTop} ${showBackToTop ? styles.visible : ""}`}
        onClick={scrollToTop}
        aria-label="Retour en haut de la page"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 14L12 9L17 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollButtons;
