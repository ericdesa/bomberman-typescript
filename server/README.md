# OpenFoodFact Server
Serveur d'une future application permettant de scanner le code barre d'un produit et d'en décrypter la composition.

Ce projet est avant tout pédagogique: je cherche à m'initier au développement d'une API NODE.

## Prérequis
- télécharger la BDD sous forme de CSV: http://fr.openfoodfacts.org/data/fr.openfoodfacts.org.products.csv
- l'importer dans une base mysql
- créer le fichier environements/prod.env.ts sur le modèle de environements/example.env.ts

## Premier lancement
```
nvm use
yarn install
yarn setup:env:prod
yarn start
```

## Stack
- NodeJS
- Typescript
- MySQL
- Docker

## Sources
- Données: https://fr.openfoodfacts.org/data 
- Template du projet: https://github.com/vrudikov/typescript-rest-boilerplate
- Connexion à MySQL: https://codeforgeek.com/2015/01/nodejs-mysql-tutorial/