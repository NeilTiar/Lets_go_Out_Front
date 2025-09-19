# ?? Let's Go Out — Front-end

## ?? Description du projet
**Let's Go Out** est une plateforme **mobile-first** permettant de :  
- Créer et consulter des **cartes interactives**  
- Découvrir des lieux et organiser des **sorties à Paris**  
- Partager des recommandations et explorer la ville autrement  

Le projet est développé dans le cadre de la préparation au **titre RNCP Développeur Fullstack JavaScript**.  

---

## ??? Stack technique

- ![Vue3](https://img.shields.io/badge/Vue.js-3-42b883?logo=vue.js&logoColor=white) — framework front-end principal  
- ![TypeScript](https://img.shields.io/badge/TypeScript-partiel-3178c6?logo=typescript&logoColor=white) — typage statique léger  
- ![HTML5](https://img.shields.io/badge/HTML5-ef652a?logo=html5&logoColor=white)  
- ![CSS3](https://img.shields.io/badge/CSS3-264de4?logo=css3&logoColor=white)  
- ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?logo=javascript&logoColor=black)  
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38bdf8?logo=tailwindcss&logoColor=white) — design responsive & mobile-first  
- ![Vite](https://img.shields.io/badge/Vite-646cff?logo=vite&logoColor=white) — build tool / dev server  
- ![Vuex](https://img.shields.io/badge/Vuex-4-35495e?logo=vue.js&logoColor=white) — gestion d’état global  
- ![Vue Router](https://img.shields.io/badge/Vue_Router-4-ff5252?logo=vue.js&logoColor=white) — navigation entre pages  
- ![Axios](https://img.shields.io/badge/Axios-671ddf?logo=axios&logoColor=white) / Fetch API — appels HTTP  
- ![Jest](https://img.shields.io/badge/Jest-25c2a0?logo=jest&logoColor=white) / ![Vitest](https://img.shields.io/badge/Vitest-6e9f18?logo=vitest&logoColor=white) — tests unitaires  
- ![ESLint](https://img.shields.io/badge/ESLint-4b32c3?logo=eslint&logoColor=white) + ![Prettier](https://img.shields.io/badge/Prettier-ff69b4?logo=prettier&logoColor=white) — qualité et formatage du code  
- ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088ff?logo=githubactions&logoColor=white) — intégration continue *(si activée)*  

---

## ?? Fonctionnalités principales
- [ ] **Carte interactive** avec affichage des lieux  
- [ ] **Création d’événements** (sorties, rendez-vous, découvertes)  
- [ ] **Consultation des sorties** organisées par d’autres utilisateurs  
- [ ] **Responsive mobile-first** (optimisé smartphones/tablettes)  
- [ ] **Authentification basique** (connexion/inscription)  
- [ ] **Checklist RNCP** : intégration des bonnes pratiques (tests, CI, sécurité basique)  

---

## ?? Installation & lancement

### Prérequis
- Node.js (>= 18)  
- npm ou pnpm  

### Installation
```bash
git clone https://github.com/NeilTiar/Lets_go_Out_Front.git
cd Lets_go_Out_Front
npm install
Lancer le projet
bash
Copier le code
npm run dev
? Le projet est accessible sur http://localhost:5173

Build production
bash
Copier le code
npm run build
Lancer les tests
bash
Copier le code
npm run test
??? Organisation du projet (front-end)
bash
Copier le code
src/
 ??? assets/        # images, icônes, styles globaux
 ??? components/    # composants Vue réutilisables
 ??? views/         # pages principales
 ??? store/         # état global (Vuex)
 ??? router/        # routes Vue Router
 ??? services/      # API calls, logique métier
 ??? types/         # définitions TypeScript
 ??? App.vue        # composant racine
?? Bonnes pratiques appliquées (RNCP)
Mobile-first (Tailwind CSS)

Organisation en composants Vue 3 + composition API

Typage progressif avec TypeScript

Tests unitaires (Vitest / Jest)

CI/CD (GitHub Actions)

Documentation & template PR/Issues


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
