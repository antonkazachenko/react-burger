# Projet React Burger

[English](README.md) | Français | [Русский](README.ru.md)

[![Déploiement GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-green.svg)](https://antonkazachenko.github.io/react-burger)
[![Statut de la Build](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://antonkazachenko.github.io/react-burger)
[![Licence](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version React](https://img.shields.io/badge/react-18.2.0-blue.svg)](https://reactjs.org/)
[![Version TypeScript](https://img.shields.io/badge/typescript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Version Redux](https://img.shields.io/badge/redux-4.2.1-blue.svg)](https://redux.js.org/)

Découvrez la version en ligne ici : [React Burger](https://antonkazachenko.github.io/react-burger).

## Introduction

React Burger est une application web dynamique et interactive qui permet aux utilisateurs de créer leur propre burger en
glissant et déposant des ingrédients. Le projet est conçu en utilisant une pile technologique moderne, mettant l'accent
sur React, TypeScript et Redux, offrant ainsi une base de code robuste et maintenable.

## Fonctionnalités Clés

- **Interface de Glisser-Déposer** : Utilisez React DnD pour offrir une interface intuitive de construction de burgers.
- **Routage** : Utilisez React Router pour une navigation fluide entre les différents composants et pages.
- **Gestion de l'État** : Redux et @reduxjs/toolkit sont au cœur du projet, garantissant une gestion de l'état
  prédictible.
- **Tests Fonctionnels** : Cypress est intégré pour réaliser des tests fonctionnels de bout en bout, garantissant la
  fiabilité de l'application.
- **Tests Unitaires** : Jest est utilisé pour les tests unitaires, favorisant la qualité du code et des versions sans
  bogues.
- **Traduction des Langues** : Exploitez l'API Context pour implémenter la traduction des langues, améliorant
  l'accessibilité et l'expérience utilisateur.
- **Authentification** : Implémentez des jetons JWT pour l'autorisation, avec des jetons stockés de manière sécurisée
  dans le localStorage.
- **WebSockets** : Deux types d'implémentations WebSocket pour les flux de commandes en temps réel, l'une publique et l'
  autre privée, démontrant une gestion efficace des données en temps réel.
- **Déploiement Continu** : Le projet est déployé sur GitHub Pages, permettant une intégration et une livraison
  continues.

## Technologies Utilisées

- React 18.2.0
- TypeScript 4.9.5
- Redux 4.2.1 & React Redux 8.1.3
- React Router DOM 6.17.0
- React DnD 16.0.1
- Cypress 13.6.1
- Jest 27.5.1
- API Context pour la gestion de l'état
- JWT pour l'autorisation

## Démarrage

Clonez le dépôt et installez les dépendances :

```bash
git clone https://github.com/creamlaflare/react-burger.git
cd react-burger
npm install
```

Pour démarrer le serveur de développement :
    
```bash
npm start
```

Pour construire le projet :
      
```bash
npm run build
```

Pour exécuter les tests unitaires :

```bash
npm test
```

Pour ouvrir Cypress pour les tests fonctionnels :
    
```bash 
npm run cypress
```

## Contribuer
Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une pull request.

## Licence
Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
