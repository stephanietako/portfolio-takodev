"use client";

import { useEffect, useRef, useState } from "react";
// Styles
import styles from "./styles.module.scss";
import Image from "next/image";
import NeumorphicButton from "../NeumorphicButton/NeumorphicButton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(80);

  // Références pour accessibilité et mesures
  const firstItemRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navElementRef = useRef<HTMLElement>(null);

  // Mesure dynamique de la hauteur navbar avec ResizeObserver
  useEffect(() => {
    const measureNavbarHeight = () => {
      if (navElementRef.current) {
        const height = navElementRef.current.offsetHeight;
        setNavbarHeight(height);

        // Synchronisation avec CSS custom properties pour scroll global
        document.documentElement.style.setProperty(
          "--navbar-offset",
          `${height}px`
        );
        document.documentElement.style.setProperty(
          "--scroll-padding-top",
          `${height + 20}px`
        );
      }
    };

    const resizeObserver = new ResizeObserver(measureNavbarHeight);

    if (navElementRef.current) {
      resizeObserver.observe(navElementRef.current);
      measureNavbarHeight();
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Gestion du scroll et détection de sections actives avec IntersectionObserver
  useEffect(() => {
    const handleScrollStyle = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScrollStyle, { passive: true });

    const sections = ["hero", "projects", "contact"];
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: `-${navbarHeight + 12}px 0px -20% 0px`,
      threshold: [0, 0.1, 0.5, 0.9],
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScrollStyle);
      observer.disconnect();
    };
  }, [navbarHeight]);

  // Verrouillage du scroll quand le menu mobile est ouvert
  useEffect(() => {
    const html = document.documentElement;
    let scrollY = 0;

    if (isMobileMenuOpen) {
      // Verrouillage du scroll
      scrollY = window.scrollY;
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Restauration du scroll à la position précédente
      const top = document.body.style.top;
      const scrollPosition = parseInt(top || "0", 10);

      html.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      if (top) {
        window.scrollTo(0, Math.abs(scrollPosition));
      }
    }

    return () => {
      // Cleanup si le composant est démonté
      html.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isMobileMenuOpen]);

  // Navigation smooth avec offset navbar dynamique
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLButtonElement> | null,
    targetId: string
  ) => {
    e?.preventDefault();
    if (targetId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.getElementById(targetId);
    if (target) {
      const offsetTop = target.offsetTop - (navbarHeight + 12);
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  const scrollToSection = (targetId: string) => {
    closeMobileMenu();
    // Délai pour permettre la fermeture du menu avant scroll
    setTimeout(() => {
      handleSmoothScroll(null, targetId);
    }, 100);
  };

  // Focus automatique sur le menu mobile
  useEffect(() => {
    if (isMobileMenuOpen) {
      mobileMenuRef.current?.focus();
    }
  }, [isMobileMenuOpen]);

  // Trap de focus dans le menu mobile pour l'accessibilité
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const panel = mobileMenuRef.current;
    if (!panel) return;

    const focusableSelectors = [
      "button:not([disabled])",
      "[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ];
    const focusableEls = panel.querySelectorAll(focusableSelectors.join(","));
    const firstEl = focusableEls[0] as HTMLElement | undefined;
    const lastEl = focusableEls[focusableEls.length - 1] as
      | HTMLElement
      | undefined;

    function handleTrap(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      if (focusableEls.length === 0) return;

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    }

    panel.addEventListener("keydown", handleTrap);
    return () => {
      panel.removeEventListener("keydown", handleTrap);
    };
  }, [isMobileMenuOpen]);

  // Fermeture du menu avec Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Escape" || e.key === "Esc") && isMobileMenuOpen)
        closeMobileMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Focus sur le premier élément du menu mobile après ouverture
  useEffect(() => {
    if (isMobileMenuOpen) {
      setTimeout(() => {
        firstItemRef.current?.focus();
      }, 300);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        ref={navElementRef}
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      >
        {/* Logo responsive avec Next.js Image optimisée */}
        <button
          className={styles.logoButton}
          onClick={() => scrollToSection("hero")}
          aria-label="Retour à l'accueil"
        >
          <div className={styles.logoContainer}>
            <Image
              src="/assets/logo/takodev-logo-white.png"
              alt="Takodev logo"
              fill
              style={{
                objectFit: "contain",
                objectPosition: "center",
                backgroundColor: "transparent",
                background: "transparent",
              }}
              sizes="(max-width: 376px) 120px, (max-width: 481px) 130px, (max-width: 641px) 140px, (max-width: 769px) 150px, 160px"
              priority
            />
          </div>
        </button>

        {/* Bouton hamburger pour mobile */}
        <button
          className={
            styles.burgerButton + (isMobileMenuOpen ? " " + styles.open : "")
          }
          onClick={() =>
            isMobileMenuOpen ? closeMobileMenu() : openMobileMenu()
          }
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>

        {/* Menu desktop */}
        <ul className={`${styles.menu} ${styles.desktopMenu}`}>
          <li>
            <NeumorphicButton
              onClick={() => scrollToSection("hero")}
              size="small"
              active={activeSection === "hero"}
            >
              À propos
            </NeumorphicButton>
          </li>
          <li>
            <NeumorphicButton
              onClick={() => scrollToSection("projects")}
              size="small"
              active={activeSection === "projects"}
            >
              Projets
            </NeumorphicButton>
          </li>
          <li>
            <NeumorphicButton
              onClick={() => scrollToSection("contact")}
              size="small"
              active={activeSection === "contact"}
            >
              Contact
            </NeumorphicButton>
          </li>
        </ul>
      </nav>

      {/* Menu mobile en "bottom sheet" c'est le menu qui apparaît en bas de l'écran */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay + " " + styles.visible}>
          <div className={styles.mobileMenu} tabIndex={-1} ref={mobileMenuRef}>
            <div className={styles.closeButtonContainer}>
              <NeumorphicButton
                onClick={closeMobileMenu}
                aria-label="Fermer le menu"
                size="small"
                className={styles.closeButtonNeumorphic}
              >
                ✕
              </NeumorphicButton>
            </div>

            <ul className={styles.mobileMenuList}>
              {["hero", "projects", "contact"].map((id, i) => (
                <li key={id} className={styles.menuItem}>
                  <NeumorphicButton
                    ref={i === 0 ? firstItemRef : undefined}
                    onClick={() => scrollToSection(id)}
                    size="medium"
                    active={activeSection === id}
                  >
                    {id === "hero"
                      ? "À propos"
                      : id === "projects"
                      ? "Projets"
                      : "Contact"}
                  </NeumorphicButton>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
