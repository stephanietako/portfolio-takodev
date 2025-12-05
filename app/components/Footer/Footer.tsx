"use client";

import { motion } from "framer-motion";
// Styles
import styles from "./styles.module.scss";

export default function Footer() {
  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className={styles.content}>
        <motion.div
          className={styles.brandSection}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className={styles.copyright}>
            © {new Date().getFullYear()}
            <span className={styles.brandName}> Tako Dev</span>
          </span>
          <span className={styles.tagline}>Tech & Art Portfolio</span>
        </motion.div>
      </div>
    </motion.footer>
  );
}
