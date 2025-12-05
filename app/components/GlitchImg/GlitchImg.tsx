"use client";

import { useRef, useEffect, useMemo } from "react";
// Styles
import styles from "./styles.module.scss";

export default function GlitchImg({
  imageUrl = "/assets/images/black-modif.webp",
  altText = "Illustration stylisée avec effet glitch",
}) {
  const glitchRef = useRef(null);

  useEffect(() => {
    const glitch = glitchRef.current;
    if (glitch) {
      // Ajoute la classe pour activer l'animation
      glitch.classList.add(styles["c-glitch--active"]);
    }
    return () => {
      // Nettoyage : retire la classe quand le composant est démonté
      if (glitch) {
        glitch.classList.remove(styles["c-glitch--active"]);
      }
    };
  }, []);

  // 5 calques pour l'effet glitch (plus d'attributs d'accessibilité ici)
  const glitchImages = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className={styles["c-glitch__img"]}
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
    ));
  }, [imageUrl]);

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
