# Let's Go Out — Front-end

# DEPLOY.md

## Objectif

Ce document décrit la procédure de déploiement de l’application **Vue3 - Mobile First**.  
Il sera mis à jour au fur et à mesure de l’avancement du projet.

---

## 1. Prérequis

- Node.js >= 18 installé
- npm ou yarn disponible
- Compte sur une plateforme de déploiement (ex: Netlify, Vercel) ou accès à un serveur (VPS, hébergement mutualisé)

---

## 2. Installation des dépendances

```bash
npm install

```

## 3. Build du projet

Copier le code

```bash
npm run build
```

➡️ Génère les fichiers de production dans le dossier dist/.

## 4. Déploiement

Option A - Déploiement automatique (Netlify / Vercel)
Connecter le dépôt GitHub au service de déploiement.

Configurer la commande de build :

```bash
npm run build
```

Définir le dossier de sortie :

nginx copier le code dist chaque push sur main (ou phase_1) déclenche un déploiement automatique.

Option B - Déploiement manuel (serveur VPS)
Générer le build (npm run build).

Copier le contenu du dossier dist/ sur le serveur, ex :

```
scp -r dist/* user@server:/var/www/html/
```

Redémarrer le serveur web (nginx/apache).

## 5. Vérifications post-déploiement

Accéder à l’URL publique et tester les pages principales.

Vérifier que le design mobile-first s’affiche correctement.

Ouvrir la console du navigateur pour détecter d’éventuelles erreurs.

Tester les fonctionnalités critiques (connexion, navigation, formulaires).

## 6. Test End to end ( Cypress)

Lancer l’application en local :

-npm run serve

depuis un nouveau terminal ,ouvrir l’interface de test Cypress :

-npx cypress open


## 7. Notes futures

Ajouter configuration HTTPS (si serveur perso).

Documenter CI/CD si mis en place.

Mettre à jour ce fichier selon la solution retenue.

yaml
Copier le code
