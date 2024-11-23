# Gestion_des_terminaux
Ce projet est une solution numérique conçue pour rationaliser la gestion des terminaux de paiement électronique (TPE). Il vise à remplacer le système traditionnel sur papier par une plateforme numérique efficace. Le projet s'adresse à Telnet qui gère plusieurs appareils TPE et a besoin d'un moyen centralisé pour attribuer, suivre et mettre à jour les informations sur ces terminaux.

#Installation
Suivez les étapes ci-dessous pour installer et configurer l'environnement nécessaire au projet.

1. Télécharger et installer Node.js
Téléchargez Node.js depuis son site officiel nodejs.org.
Une fois installé, accédez au répertoire du projet et installez les dépendances nécessaires en exécutant la commande suivante :
npm install

2. Installer Express.js et CORS
Installez Express.js et CORS, deux dépendances nécessaires pour le backend.
Commandes :
npm install express cors

3. Installer Bootstrap
Ajoutez Bootstrap à votre projet en installant son module.
Commande :
npm i bootstrap



4. Télécharger et installer PostgreSQL
Téléchargez PostgreSQL depuis son site officiel postgresql.org.
Installez-le en suivant les instructions fournies sur le site. Une fois l’installation terminée, assurez-vous que le service de base de données est activé et prêt à être utilisé sur votre machine.

5. Installer Angular et Angular Material
Pour configurer le framework frontend, commencez par installer Angular CLI globalement. Une fois Angular CLI installé, ajoutez Angular Material au projet.

Installation d’Angular CLI : npm install -g @angular/cli
Ajout d’Angular Material : ng add @angular/material

#installation du schema 
aller vers C:\Program Files\PostgreSQL\16\bin
 puis effectuer cette commande dans ce chemin
psql -U votre_utilisateur_postgres -d gestion_des_terminaux -f chemin/vers/schema.sql

 
