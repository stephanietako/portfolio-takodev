"use client";

import { ReactNode, forwardRef, ButtonHTMLAttributes } from "react";
// Styles
import styles from "./styles.module.scss";

interface NeumorphicButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode; // Contenu du bouton (texte ou icône)
  size?: "xs" | "small" | "medium" | "large"; // Taille visuelle
  active?: boolean; // État actif (pour le style)
  className?: string; // Classe CSS additionnelle
  ariaLabel?: string; // Accessibilité : label pour les boutons icône
}

// Composant avec forwarding de ref et accessibilité
const NeumorphicButton = forwardRef<HTMLButtonElement, NeumorphicButtonProps>(
  (
    {
      children,
      size = "medium",
      active = false,
      className = "",
      ariaLabel,
      type = "button",
      ...rest
    },
    ref
  ) => {
    // Construction dynamique de la classe CSS du bouton
    const buttonClasses = [
      styles.button,
      size !== "medium" && styles[size],
      active && styles.active,
      className,
    ]
      .filter(Boolean) // Garde seulement les vraies classes CSS (enlève false, null, etc.)
      .join(" "); // Transforme le tableau en une seule chaîne de classes séparées par des espaces

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        aria-label={ariaLabel}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

NeumorphicButton.displayName = "NeumorphicButton";

export default NeumorphicButton;
