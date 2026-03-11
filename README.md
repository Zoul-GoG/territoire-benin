# Territoire-Benin

API REST pour gérer des **territoires** au Bénin.

## 🚀 Fonctionnalités principales

- CRUD des territoires via une API Express
- Connexion à une base de données (configuration dans `constants/bdd.js`)
- Validation et gestion d’erreurs via un middleware global
- Routes encapsulées dans `routes/territoire.routes.js`
- Contrôleurs dans `controllers/territoire.controller.js`
- Utilitaires divers dans `utils/tools.js`

## 📁 Structure du projet

```
Dockerfile
package.json
sample.env
server.js
swagger.json
constants/
  bdd.js
controllers/
  territoire.controller.js
middleware/
  errorMiddleware.js
routes/
  territoire.routes.js
utils/
  tools.js
```

## 🔧 Installation

1. Cloner le repo :

```bash
git clone https://github.com/Zoul-GoG/territoire-benin.git
cd territoire-benin
```

2. Installer les dépendances :

```bash
npm install
```

3. Copier et ajuster l’exemple d’environnement :

```bash
cp sample.env .env
# puis modifier .env avec les variables nécessaires (BD, ports, etc.)
```

4. Démarrer l’application :

```bash
npm start
```

ou en mode développement :

```bash
npm run dev
```

5. (Optionnel) Utiliser Docker :

```bash
docker build -t territoire-benin .
docker run -p 3000:3000 . 
```

## 📦 Endpoints

Les routes principales sont définies dans `routes/territoire.routes.js`.
Consulter la documentation Swagger disponible dans `swagger.json` (via un visualiseur Swagger si souhaité).

Exemples :

- `GET /territoires` – lister
- `GET /territoires/:id` – récupérer un territoire
- `POST /territoires` – créer
- `PUT /territoires/:id` – mettre à jour
- `DELETE /territoires/:id` – supprimer

## 🛠️ Utilitaires

Des fonctions génériques se trouvent dans `utils/tools.js` (formatage, etc.).
Le middleware `errorMiddleware.js` gère les erreurs et renvoie des réponses JSON structurées.

## 📜 Contribuer

1. Fork du dépôt
2. Créer une branche (`feature-nom-feature`)
3. Commit & push
4. Ouvrir une pull request

## 📄 Licence

Licence MIT – voir le fichier `LICENSE` si présent.
