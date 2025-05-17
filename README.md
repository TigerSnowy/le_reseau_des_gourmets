# Le Réseau des Gourmets 🧑‍🍳👩‍🍳

<p text-align="center">
  <em>Une plateforme sociale pour les passionnés de cuisine où partager et découvrir des recettes</em>
</p>

## 📋 Table des matières

- [Description](#-description)

- [Fonctionnalités](#-fonctionnalités)

- [Technologies](#-technologies)

- [Prérequis](#-prérequis)

- [Installation](#-installation)

  - [Docker](#docker)

  - [Accéder aux conteneurs Docker](#accéder-aux-conteneurs-docker)

  - [Charger la base de données](#charger-la-base-de-données)


- [Architecture](#-architecture)

- [Points d'accès de l'API](#-points-daccès-de-lapi)

- [Guide d'utilisation](#-guide-dutilisation)

- [Contributeurs](#-contributeurs)

- [Licence](#-licence)

## 🍽 Description

Le Réseau des Gourmets est une application web qui permet aux passionnés de cuisine de créer et de gérer leurs propres recettes. Notre plateforme offre une interface conviviale pour organiser vos recettes préférées et construire votre propre carnet de recettes personnalisé.

Pour cette première version (V1), l'accent est mis sur la gestion personnelle des recettes, avec la possibilité d'exporter vos créations au format PDF. Le partage et la découverte des recettes d'autres utilisateurs seront intégrés dans les futures versions. Que vous soyez un chef amateur ou simplement quelqu'un qui souhaite conserver ses recettes de manière organisée, Le Réseau des Gourmets est l'outil idéal pour centraliser vos créations culinaires.

## ✨ Fonctionnalités

- **Gestion de compte utilisateur** - Création de compte, connexion sécurisée, personnalisation du profil
- **Création et gestion de recettes** - Interface intuitive pour ajouter, modifier et supprimer vos recettes
- **Recettes détaillées** - Inclut les ingrédients, étapes de préparation, temps de cuisson, niveau de difficulté et images
- **Organisation par tags** - Catégorisez vos recettes pour les retrouver facilement
- **Export PDF** - Téléchargez vos recettes au format PDF pour les conserver hors ligne
- **Thèmes personnalisables** - Adaptez l'interface à vos préférences visuelles
- **Interface responsive** - Expérience utilisateur optimisée sur ordinateur, tablette et mobile
- **Administration sécurisée** - Panneau d'administration pour les gestionnaires du site

## 🛠 Technologies

### Frontend
- **React.js** - Bibliothèque JavaScript pour construire l'interface utilisateur
- **TypeScript** - Typage statique pour un code plus robuste
- **SCSS Modules** - Stylisation modulaire et maintenable
- **React Router** - Navigation entre les différentes pages

### Backend
- **Node.js** - Environnement d'exécution JavaScript côté serveur
- **Express.js** - Framework web pour Node.js
- **TypeScript** - Pour un développement backend plus sûr
- **MySQL** - Base de données relationnelle pour stocker les recettes et les données utilisateurs
- **MongoDB** - Base de données NoSQL pour les formulaires de contact et autres fonctionnalités
- **JWT** - Authentification par JSON Web Tokens

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé:

- **Docker & Docker Compose** (version 20.10.0 ou supérieure)
- **Node.js** (version 16.0.0 ou supérieure)
- **npm** (version 8.0.0 ou supérieure)
- **Git** pour cloner le dépôt

## 🚀 Installation

### Docker

Le moyen le plus simple pour déployer l'application est d'utiliser Docker:

1. Clonez le dépôt:
```bash
git clone https://github.com/votre-username/le-reseau-des-gourmets.git
cd le-reseau-des-gourmets
```

2. Créez un fichier .env à partir du modèle:
```bash
cp .env.example .env
```

3. Configurez les variables d'environnement dans le fichier .env selon vos besoins

4. Lancez les conteneurs Docker:
```bash
docker-compose up -d
```

L'application sera accessible à l'adresse http://localhost:3000

### Accéder aux conteneurs Docker

Pour accéder aux conteneurs et exécuter des commandes spécifiques:

1. Avec Visual Studio Code, installez l'extension Docker
2. Dans l'onglet Docker de VS Code, cliquez-droit sur le conteneur souhaité et sélectionnez "Attach Shell"
3. Vous avez maintenant accès à un terminal dans le conteneur

Alternativement, utilisez la ligne de commande:
```bash
docker exec -it [nom-du-conteneur] bash
```

### Charger la base de données

1. Connectez-vous au conteneur MySQL:
```bash
docker exec -it le-reseau-des-gourmets-mysql bash
```

2. Accédez au client MySQL:
```bash
mysql -u root -p
```
Entrez le mot de passe défini dans votre fichier .env

3. Créez et utilisez la base de données:
```sql
CREATE DATABASE IF NOT EXISTS le_reseau_des_gourmets_dev;
USE le_reseau_des_gourmets_dev;
```

4. Quittez le client MySQL et importez le script de base de données:
```bash
exit
mysql -u root -p le_reseau_des_gourmets_dev < /path/to/script.dev.sql
```

## 🏗 Architecture

Le projet suit une architecture MVC (Modèle-Vue-Contrôleur):

- **Modèles** (model/) - Définitions TypeScript des entités (recettes, ingrédients, utilisateurs, etc.)

- **Vues** (client/) - Interface utilisateur React

- **Contrôleurs** (controller/) - Logique métier et gestion des requêtes

- **Routes** (router/) - Configuration des points d'accès de l'API

- **Repositories** (repository/) - Accès aux données et opérations CRUD

- **Services** (service/) - Services partagés (connexion à la base de 
données, etc.)

- **Middleware** (middleware/) - Fonctions intermédiaires (authentification, validation, etc.)

## 📡 Points d'accès de l'API

### Sécurité et Authentification

| Route       | Méthode HTTP | Description                  | Corps de la requête                            |
|-------------|--------------|------------------------------|-----------------------------------------------|
| /register   | POST         | Enregistrer un utilisateur   | {pseudo, surname, first_name, email, password} |
| /login      | POST         | Connecter un utilisateur     | {email, password}                              |
| /auth       | POST         | Autoriser un utilisateur     | {email, password, key}                         |

### Utilisateurs

| Route                | Méthode HTTP | Description                  | Autorisation requise |
|----------------------|--------------|------------------------------|----------------------|
| /user                | GET          | Lister tous les utilisateurs | Non                  |
| /user/:user_id       | GET          | Récupérer un utilisateur     | Non                  |
| /user                | POST         | Créer un utilisateur         | Admin                |
| /user                | PUT          | Modifier un utilisateur      | Admin                |
| /user                | DELETE       | Supprimer un utilisateur     | Admin                |
| /user/avatar         | PUT          | Modifier l'avatar            | Utilisateur connecté |
| /user/pseudo         | PATCH        | Modifier le pseudo           | Utilisateur connecté |

### Recettes

| Route                   | Méthode HTTP | Description                          | Autorisation requise |
|-------------------------|--------------|--------------------------------------|----------------------|
| /recipe                 | GET          | Lister toutes les recettes           | Non                  |
| /recipe/:recipe_id      | GET          | Récupérer une recette                | Non                  |
| /recipe                 | POST         | Créer une recette                    | Utilisateur connecté |
| /recipe                 | PUT          | Modifier une recette                 | Propriétaire         |
| /recipe                 | DELETE       | Supprimer une recette                | Propriétaire/Admin   |

### Autres ressources

| Route                   | Méthode HTTP | Description                          | Autorisation requise |
|-------------------------|--------------|--------------------------------------|----------------------|
| /ingredient             | GET          | Lister tous les ingrédients          | Non                  |
| /ingredient/:id         | GET          | Récupérer un ingrédient              | Non                  |
| /picture                | GET          | Lister toutes les images             | Non                  |
| /picture/:id            | GET          | Récupérer une image                  | Non                  |
| /role                   | GET          | Lister tous les rôles                | Non                  |
| /role/:id               | GET          | Récupérer un rôle                    | Non                  |
| /contact                | GET          | Lister les messages de contact       | Admin                |

## 📖 Guide d'utilisation

1. **Création de compte**: Accédez à la page de connexion via le bouton dans la navigation, puis cliquez sur le lien d'inscription

2. **Connexion**: Connectez-vous avec vos identifiants via le bouton "Connexion" dans la navigation

3. **Profil**: Personnalisez votre profil en ajoutant une photo et en modifiant vos informations

4. **Accès à vos recettes**: Utilisez le bouton "Mon Carnet" dans la navigation pour voir toutes vos recettes

5. **Création de recette**: Dans le menu déroulant sous "Mon Carnet", cliquez sur "Créer une recette"

6. **Gestion de vos recettes**: Consultez, modifiez ou supprimez vos recettes existantes

7. **Export PDF**: Téléchargez vos recettes au format PDF pour les conserver ou les imprimer

8. **Thèmes**: Modifiez l'apparence en choisissant un thème dans les paramètres de votre profil

## 👥 Contributeurs

- [TigerSnowy](https://github.com/TigerSnowy) - Développeur fullstack

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE.md) - voir le fichier LICENSE.md pour plus de détails.

---

<p align="center">
  Fait avec ❤️ par l'équipe Le Réseau des Gourmets
</p>
