"use client";

import { motion } from "framer-motion";
import GlitchImg from "../GlitchImg/GlitchImg";
import NeumorphicButton from "../NeumorphicButton/NeumorphicButton";
// Styles
import styles from "./styles.module.scss";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <motion.div
        className={styles.textContainer}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Portfolio Tech & Art
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Développeuse web & passionnée d&apos;art
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Passionnée par le web et l’art, je conçois des projets sur-mesure en
          React/Next.js, alliant innovation, performance et sensibilité
          artistique.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <NeumorphicButton
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Voir mes projets
          </NeumorphicButton>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.illustration}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <GlitchImg
          imageUrl="/assets/images/black-modif.webp"
          altText="Illustration abstraite et glitchée représentant la technologie et l'art"
        />
      </motion.div>
    </section>
  );
}
