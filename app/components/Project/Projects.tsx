"use client";

import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import NeumorphicButton from "../NeumorphicButton/NeumorphicButton";
// Styles
import styles from "./styles.module.scss";

// Fonction sécurisée pour ouvrir des liens externes
const openSecureLink = (url: string) => {
  // Vérification de l'URL pour éviter les injections
  if (url.startsWith("https://") || url.startsWith("http://")) {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null; // Protection contre tabnapping
    }
  }
};

interface Project {
  title: string;
  description: string;
  stack: string;
  link: string;
  longDescription: string;
  imageUrl: string;
  features: string[];
  category: "professional" | "personal";
  client?: string;
  year: string;
  technicalDetails: string[];
  githubLink?: string;
  motivation?: string;
  status?: string;
}

const Modal = lazy(() => import("../Modal/Modal"));

const projects: Project[] = [
  {
    title: "Yachting Day",
    description: "Plateforme complète de réservation de services nautiques",
    stack: "Next.js 15, TypeScript, React, Prisma, Stripe, Supabase, SCSS",
    link: "https://yachting-day.com",
    longDescription:
      "Yachting Day est une application complète de réservation développée pour une entreprise de services nautiques. Elle intègre un système de réservation sophistiqué avec gestion des utilisateurs, tarification dynamique selon les saisons, paiements sécurisés et tableau de bord administrateur complet.",
    imageUrl: "/assets/logo/takodev-logo-black.png",
    features: [
      "Authentification multi-niveaux (admin, client)",
      "Système de réservation avec gestion des options et prestations",
      "Paiements sécurisés via Stripe",
      "Upload de fichiers via Supabase",
      "Dashboard administrateur complet",
      "Tarification dynamique selon les saisons",
    ],
    category: "professional",
    client: "Entreprise de services nautiques",
    year: "2025",
    technicalDetails: [
      "Architecture frontend/backend avec API Routes Next.js 15",
      "Développement en TypeScript pour la robustesse du code",
      "Modélisation de données avec Prisma ORM",
      "Styles avancés avec SCSS/SASS modulaire",
      "Gestion RGPD et chargement conditionnel des services tiers",
    ],
  },
  {
    title: "Maison Essenza",
    description:
      "Site vitrine professionnel pour le mobilier design et la décoration",
    stack: "Next.js 14, React, Framer Motion, SCSS, Google Maps API",
    link: "https://www.maison-essenza.com",
    longDescription:
      "Maison Essenza est un site vitrine professionnel destiné à promouvoir le secteur du mobilier design et la personnalisation de l'espace de vie. Il propose une interface moderne et réactive avec une expérience enrichie par les animations et l'intégration de Google Maps.",
    imageUrl: "/assets/logo/takodev-logo-black.png",
    features: [
      "Interface responsive et performante sur tous appareils",
      "Google Maps intégré avec géolocalisation utilisateur",
      "Animations modernes avec Framer Motion",
      "Pages détaillées sur l'histoire et les services",
      "Gestion RGPD complète",
      "Optimisation SEO et performance",
    ],
    category: "professional",
    client: "Maison Essenza - Secteur mobilier et décoration",
    year: "2024",
    technicalDetails: [
      "Développement avec Next.js 14 pour les performances",
      "Animations fluides et interactives avec Framer Motion",
      "Intégration Google Maps API pour la cartographie",
      "Styles modulaires et organisés avec SCSS",
      "Architecture responsive mobile-first",
    ],
  },
  {
    title: "Palm Trees Affair",
    description: "Boutique en ligne moderne avec animations 3D immersives",
    stack: "Next.js 14, Three.js, Sanity.io, Stripe, SCSS, Zustand",
    link: "https://e-commerce-project-green.vercel.app",
    longDescription:
      "Palm Trees Affair est une boutique en ligne fictive, pensée pour offrir une expérience utilisateur moderne et fluide. Ce projet explore les dernières avancées des technologies web pour proposer une solution e-commerce immersive.",
    imageUrl: "/assets/logo/takodev-logo-black.png",
    features: [
      "Interface responsive et performante avec Next.js 14",
      "Gestion dynamique du contenu via Sanity.io",
      "Navigation intuitive avec recherche intégrée",
      "Pages produits détaillées avec galeries d'images",
      "Gestion locale du panier d'achat",
      "Paiements sécurisés via Stripe",
      "Animations et effets 3D immersifs",
    ],
    category: "personal",
    motivation:
      "Défi personnel pour explorer les dernières avancées des technologies web",
    year: "2024",
    status: "85% terminé - optimisations en cours",
    technicalDetails: [
      "Architecture frontend/backend avec API Routes Next.js 14",
      "CMS headless avec Sanity.io",
      "Intégration Three.js pour les éléments 3D",
      "Gestion d'état moderne avec Zustand",
      "Styles personnalisés avec SCSS modulaire",
    ],
  },
  {
    title: "jmsite - Portfolio avec animations 3D",
    description:
      "Portfolio personnel avec animations web immersives et effets 3D",
    stack: "React.js, Three.js, @react-three/fiber, @react-three/drei, SCSS",
    link: "https://jmsite.vercel.app",
    longDescription:
      "jmsite est un portfolio personnel mettant en avant les compétences en développement web et animations 3D. Le projet démontre la maîtrise des technologies web modernes pour créer des expériences utilisateur immersives.",
    imageUrl: "/assets/logo/takodev-logo-black.png",
    features: [
      "Animation graphique interactive 3D à l'accueil",
      "Navigation responsive et fluide",
      "Galerie dynamique avec système de modales animées",
      "Scrolling interactif avec navigation verticale",
      "Effets lumineux et textures 3D",
      "Animations adaptatives selon la taille d'écran",
    ],
    category: "personal",
    motivation: "Démontrer la maîtrise des animations 3D sur le web",
    year: "2024",
    technicalDetails: [
      "Architecture React.js modulaire avec hooks personnalisés",
      "Animations 3D avancées avec Three.js et React Three Fiber",
      "Effets visuels complexes via React Three Drei",
      "Optimisation performance pour le rendu 3D temps réel",
      "Design responsive avec animations adaptatives",
    ],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<
    "all" | "professional" | "personal"
  >("all");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "all" || project.category === activeCategory
  );

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className={styles.projects}>
      <h2>Mes projets</h2>

      <div className={styles.categoryTabs}>
        <NeumorphicButton
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        >
          Tous
        </NeumorphicButton>
        <NeumorphicButton
          active={activeCategory === "professional"}
          onClick={() => setActiveCategory("professional")}
        >
          Professionnels
        </NeumorphicButton>
        <NeumorphicButton
          active={activeCategory === "personal"}
          onClick={() => setActiveCategory("personal")}
        >
          Personnels
        </NeumorphicButton>
      </div>

      <div className={styles.bloc}>
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            className={styles.cardWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.cardBody}>
                  <div className={styles.categoryBadge}>
                    {project.category === "professional" ? "Pro" : "Perso"}
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className={styles.stackContainer}>
                    {project.stack.split(",").map((tech, idx) => (
                      <span key={idx} className={styles.stackTag}>
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.actions}>
                  <NeumorphicButton
                    onClick={() => openModal(project)}
                    size="small"
                  >
                    Détails
                  </NeumorphicButton>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedProject && (
        <Suspense fallback={<div>Chargement...</div>}>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={selectedProject.title}
          >
            <div className={styles.projectDetails}>
              <h4>À propos du projet</h4>
              <p>{selectedProject.longDescription}</p>

              {selectedProject.client && (
                <div className={styles.clientInfo}>
                  <h4>Client</h4>
                  <p>{selectedProject.client}</p>
                </div>
              )}

              {selectedProject.motivation && (
                <div className={styles.motivationInfo}>
                  <h4>Motivation</h4>
                  <p>{selectedProject.motivation}</p>
                </div>
              )}

              <div className={styles.projectYear}>
                <h4>Année</h4>
                <p>{selectedProject.year}</p>
              </div>

              {selectedProject.status && (
                <div className={styles.projectStatus}>
                  <h4>Statut</h4>
                  <p>{selectedProject.status}</p>
                </div>
              )}

              <h4>Technologies utilisées</h4>
              <div className={styles.stackTags}>
                {selectedProject.stack.split(",").map((tech, idx) => (
                  <span key={idx} className={styles.stackTag}>
                    {tech.trim()}
                  </span>
                ))}
              </div>

              <h4>Fonctionnalités clés</h4>
              <ul>
                {selectedProject.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <h4>Détails techniques</h4>
              <ul>
                {selectedProject.technicalDetails.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>

              <div className={styles.projectLinks}>
                <NeumorphicButton
                  onClick={() => openSecureLink(selectedProject.link)}
                  size="small"
                >
                  Voir le site
                </NeumorphicButton>
              </div>
            </div>
          </Modal>
        </Suspense>
      )}
    </section>
  );
}
