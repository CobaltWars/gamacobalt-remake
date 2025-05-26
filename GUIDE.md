# Guide d'utilisation - Site Gamacobalt Épuré

Ce document explique comment utiliser et déployer le site Gamacobalt dans sa version épurée, inspirée des sites de développement et GitHub.

## Structure du projet

Le projet est construit avec React et Tailwind CSS, offrant une interface moderne, épurée et responsive.

### Contenu de la livraison

- `/assets/` - Fichiers statiques compilés (CSS, JavaScript)
- `/src/` - Code source du projet
  - `/components/` - Composants réutilisables
  - `/pages/` - Pages principales du site
- `index.html` - Point d'entrée du site
- `package.json` - Dépendances et scripts
- `README.md` - Documentation générale
- `todo.md` - Suivi des tâches réalisées
- `conception-maquette.md` - Documentation de conception
- `fonctionnalites-essentielles.md` - Fonctionnalités conservées

## Installation et développement

Pour travailler sur le code source :

1. Cloner le dépôt
2. Installer les dépendances : `npm install` ou `pnpm install`
3. Lancer le serveur de développement : `npm run dev` ou `pnpm run dev`
4. Accéder au site sur `http://localhost:5173`

## Déploiement

Le dossier contient déjà une version compilée prête à être déployée. Vous pouvez :

1. Héberger directement les fichiers sur n'importe quel serveur web statique
2. Utiliser un service comme Vercel, Netlify ou GitHub Pages

## Personnalisation

- Les couleurs et le style peuvent être modifiés dans les fichiers CSS et les composants
- Les contenus textuels sont directement modifiables dans les fichiers des pages
- Les images peuvent être remplacées dans le dossier public/assets

## Fonctionnalités

Le site conserve toutes les fonctionnalités essentielles de la version originale :
- Navigation entre les sections
- Présentation des jeux et logiciels
- Pages d'information (GLDF, maintenance)
- Design responsive pour tous les appareils

## Améliorations possibles

- Ajouter un CMS pour gérer le contenu
- Implémenter un système de recherche
- Ajouter des animations plus élaborées
- Intégrer des statistiques de visite
