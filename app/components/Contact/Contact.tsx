"use client";

import { motion } from "framer-motion";
import styles from "./styles.module.scss";

// Fonction sécurisée pour ouvrir des liens externes
const openSecureLink = (url: string) => {
  if (url.startsWith("https://") || url.startsWith("mailto:")) {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null;
    }
  }
};

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <h2>Contactez-moi</h2>

      <div className={styles.contactOptions}>
        <motion.div
          className={styles.contactCard}
          whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <button
            className={styles.icon}
            type="button"
            onClick={() => openSecureLink("mailto:takodevcreation@gmail.com")}
            aria-label="Envoyer un email"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
            </svg>
          </button>
          <h3>Email</h3>
          <p className={styles.contactInfo}>takodevcreation@gmail.com</p>
        </motion.div>

        <motion.div
          className={styles.contactCard}
          whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <button
            className={styles.icon}
            type="button"
            onClick={() =>
              openSecureLink("https://www.linkedin.com/in/stephanietako/")
            }
            aria-label="Visiter LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </button>
          <h3>LinkedIn</h3>
          <p className={styles.contactInfo}>linkedin.com/in/stephanietako</p>
        </motion.div>

        <motion.div
          className={styles.contactCard}
          whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <button
            className={styles.icon}
            type="button"
            onClick={() => openSecureLink("https://github.com/stephanietako")}
            aria-label="Visiter GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
          </button>
          <h3>GitHub</h3>
          <p className={styles.contactInfo}>github.com/stephanietako</p>
        </motion.div>
      </div>
    </section>
  );
}
