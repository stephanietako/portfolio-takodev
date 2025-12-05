"use client";

import { useRef, useEffect, useMemo } from "react";
import styles from "./styles.module.scss";

type GlitchImgProps = {
  imageUrl?: string;
  altText?: string;
};

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

export default function GlitchImg({
  imageUrl = "/assets/images/black-modif.webp",
  altText = "Illustration stylisée avec effet glitch",
}: GlitchImgProps) {
  const glitchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glitch = glitchRef.current;
    let observer: IntersectionObserver | null = null;

    if (!glitch) return;

    if (isMobileDevice()) {
      // Sur mobile : animation active si visible à 70% ou plus
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio >= 0.7) {
            glitch.classList.add(styles["c-glitch--active"]);
          } else {
            glitch.classList.remove(styles["c-glitch--active"]);
          }
        },
        { threshold: [0, 0.7, 1] }
      );
      observer.observe(glitch);
    } else {
      // Sur desktop : animation au hover
      const handleMouseEnter = () => {
        glitch.classList.add(styles["c-glitch--active"]);
      };
      const handleMouseLeave = () => {
        glitch.classList.remove(styles["c-glitch--active"]);
      };
      glitch.addEventListener("mouseenter", handleMouseEnter);
      glitch.addEventListener("mouseleave", handleMouseLeave);

      // Nettoyage
      return () => {
        glitch.removeEventListener("mouseenter", handleMouseEnter);
        glitch.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    // Nettoyage observer mobile
    return () => {
      if (observer && glitch) observer.unobserve(glitch);
    };
  }, []);

  const glitchImages = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={styles["c-glitch__img"]}
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
      )),
    [imageUrl]
  );

  return (
    <div
      ref={glitchRef}
      className={styles["c-glitch"]}
      role="img"
      aria-label={altText}
    >
      {glitchImages}
    </div>
  );
}
