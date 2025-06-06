# POPEP - Documentation du Projet
## Présentation du Projet
POPEP est une application web proposant des jeux de société et des produits axés sur différentes relations interpersonnelles (couple, amis, distance, postpartum).
## Architecture et Fonctionnalités
### 1. Navigation et Routage
- **Technologie**: React Router DOM (v6.22.3)
- **Implémentation**:
    - Structure de routage dans `App.tsx` avec plusieurs routes définies
    - Pages principales: Home, About, Strengths, Concept, Legal, CGV
    - Pages produits: CoupleGame, DistanceGame, PostpartumGame, FriendsGame
    - Composants de navigation: Header et Footer présents sur toutes les pages
    - Utilisation des hooks `useNavigate` et composant `Link` pour la navigation entre les pages

### 2. Internationalisation (i18n)
- **Technologies**: i18next, react-i18next, i18next-browser-languagedetector
- **Fonctionnalités**:
    - Support multilingue (français, anglais, espagnol, swahili)
    - Détection automatique de la langue du navigateur
    - Fichiers de traduction structurés (fr.json, en.json, etc.)
    - Composant `MobileLanguageSwitcher` pour changer de langue sur mobile
    - Configuration des langues alternatives via balises `hrefLang` dans le `Helmet`

### 3. SEO et Métadonnées
- **Technologie**: react-helmet-async
- **Implémentation**:
    - Balises meta pour le référencement (robots, author, revisit-after)
    - Configuration des langues alternatives pour les moteurs de recherche
    - Optimisation pour les moteurs de recherche (index, follow)
    - Thème de couleur défini (#D46559)
    - Support pour les microdonnées et métadonnées spécifiques aux pages

### 4. E-commerce et Paiement
- **Technologie**: Stripe (intégration via API)
- **Fonctionnalités**:
    - Système de checkout pour l'achat des produits
    - Intégration avec les fonctions Supabase pour le traitement des paiements
    - Affichage des prix en euros incluant la TVA
    - Gestion des frais de livraison lors du checkout

### 5. Backend et Base de Données
- **Technologie**: Supabase
- **Fonctionnalités**:
    - Authentification et gestion des utilisateurs
    - Stockage des données produits
    - Fonctions serveur pour l'intégration avec Stripe
    - API RESTful pour l'interaction frontend/backend

### 6. UI/UX et Animations
- **Technologies**:
    - TailwindCSS pour le styling
    - Framer Motion pour les animations
    - Lucide React pour les icônes
    - React Hot Toast pour les notifications

- **Caractéristiques**:
    - Design responsive adapté mobile et desktop
    - Animations fluides pour améliorer l'expérience utilisateur
    - Système de notifications non-intrusif
    - Thème cohérent avec identité visuelle de la marque

### 7. Structure du Projet
- **Organisation**:
    - `/pages`: Composants de pages principales et produits
    - `/components`: Éléments réutilisables (Header, Footer, etc.)
    - `/i18n`: Configuration et fichiers de traduction
    - `/services`: Intégrations API (Stripe, Supabase)
    - `/utils`: Fonctions utilitaires

## Produits
- Jeu pour couples
- Jeu pour relations à distance
- Jeu postpartum
- Jeu entre amis

## Technologies Utilisées
- **Frontend**: React 18.3.1, TypeScript 5.5.3
- **Styling**: TailwindCSS 3.4.1, PostCSS 8.4.35
- **Routing**: React Router DOM 6.22.3
- **Internationalisation**: i18next 23.10.1
- **Animations**: Framer Motion 11.0.8
- **Backend**: Supabase
- **Paiement**: Stripe
- **Build**: Vite 5.4.19

## Installation et Démarrage
``` bash
# Installation des dépendances
npm install

# Démarrage en mode développement
npm run dev

# Build pour la production
npm run build
```
