"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.scss";

type ModalSize = "small" | "medium" | "large";
type ModalPosition = "center" | "top" | "bottom" | "sidebar";
type ModalAnimation = "fade" | "slide-up" | "slide-right";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: ModalSize;
  position?: ModalPosition;
  animation?: ModalAnimation;
  onOpen?: () => void;
  onClosed?: () => void;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  size = "medium",
  position = "center",
  animation = "fade",
  onOpen,
  onClosed,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // SCROLL LOCK pour empêcher le scroll du body quand la modale est ouverte
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    onOpen?.();

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, onOpen]);

  // Accessibilité :
  // focus trap pour garder le focus à l'intérieur de la modale quand elle est ouverte
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableSelectors = [
      "button:not([disabled])",
      "[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ];

    const focusableEls = Array.from(
      modal.querySelectorAll<HTMLElement>(focusableSelectors.join(","))
    );

    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    requestAnimationFrame(() => firstEl?.focus());

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (!firstEl || !lastEl) return;

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    modal.addEventListener("keydown", handleFocusTrap);
    return () => modal.removeEventListener("keydown", handleFocusTrap);
  }, [isOpen]);

  // Escape key pour fermer la modale
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose, closeOnEscape]);

  // Clic sur l'overlay pour fermer la modale
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      e.preventDefault();
      onClose();
    }
  };

  // Définit les animations de la modale selon la position et le type d'animation
  // Cette fonction permet à Framer Motion de connaître la position de base pour chaque type de modale
  function getBaseTransforms() {
    switch (position) {
      case "center":
        return { x: "-50%", y: "-50%" };
      case "top":
        return { x: "-50%", y: 0 };
      case "bottom":
        return { x: "-50%", y: "calc(-100% + 100vh)" };
      case "sidebar":
        return { x: 0, y: 0 };
      default:
        return { x: "-50%", y: "-50%" };
    }
  }
  // Animation configurations
  const baseTransforms = getBaseTransforms();
  const animations: Record<ModalAnimation, any> = {
    fade: {
      initial: {
        opacity: 0,
        scale: 0.95,
        ...baseTransforms,
      },
      animate: {
        opacity: 1,
        scale: 1,
        ...baseTransforms,
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        ...baseTransforms,
      },
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 400,
        duration: 0.3,
      },
    },
    "slide-up": {
      initial: {
        opacity: 0,
        scale: 0.98,
        ...baseTransforms,
        y: position === "center" ? "calc(-50% + 50px)" : "50px",
      },
      animate: {
        opacity: 1,
        scale: 1,
        ...baseTransforms,
      },
      exit: {
        opacity: 0,
        scale: 0.98,
        ...baseTransforms,
        y: position === "center" ? "calc(-50% + 30px)" : "30px",
      },
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4,
      },
    },
    "slide-right": {
      initial: {
        opacity: 0,
        scale: 0.98,
        ...baseTransforms,
        x:
          position === "sidebar"
            ? "100%"
            : position === "center"
            ? "calc(-50% + 50px)"
            : "calc(-50% + 50px)",
      },
      animate: {
        opacity: 1,
        scale: 1,
        ...baseTransforms,
      },
      exit: {
        opacity: 0,
        scale: 0.98,
        ...baseTransforms,
        x:
          position === "sidebar"
            ? "100%"
            : position === "center"
            ? "calc(-50% + 30px)"
            : "calc(-50% + 30px)",
      },
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4,
      },
    },
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={() => onClosed?.()}>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={handleOverlayClick}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className={`${styles.modal} ${styles[size]} ${styles[position]}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            aria-describedby={title ? undefined : "modal-content"}
            tabIndex={-1}
            initial={animations[animation].initial}
            animate={animations[animation].animate}
            exit={animations[animation].exit}
            transition={animations[animation].transition}
            style={{
              transformOrigin:
                position === "sidebar" ? "right center" : "center center",
            }}
          >
            {/* Header */}
            <div className={styles.header}>
              {title && (
                <h2 id="modal-title" className={styles.modalTitle}>
                  {title}
                </h2>
              )}
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Fermer la modale"
                type="button"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            {/* Content */}
            <div
              id="modal-content"
              className={styles.content}
              role="region"
              aria-live="polite"
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
