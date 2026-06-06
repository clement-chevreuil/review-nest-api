# 🚀 Quick Start - Trip Ratings App

## Installation (une seule fois)

```bash
npm install
```

## Lancer l'app

### Mode développement (watch + hot reload)
```bash
npm run start:dev
```

Puis ouvrir: **http://localhost:3000**

### Mode production
```bash
npm run build
npm run start:prod
```

---

## 📱 Utilisation

### Dashboard
- URL: `http://localhost:3000/`
- Affiche: Liste des notations + stats (moyenne, min, max, total)
- Actions: Ajouter, supprimer des notations

### Ajouter une notation
- Cliquer sur **"+ Ajouter une notation"**
- Remplir la date/heure (préremplie avec maintenant)
- Sélectionner une note (1-5 étoiles)
- Cliquer sur **"Enregistrer"**

### Supprimer une notation
- Sur le dashboard, cliquer sur le bouton 🗑️ sur la ligne

---

## 🛠️ Commandes

```bash
# Développement
npm run start:dev      # Mode watch (recommandé)

# Build
npm run build          # Compiler TypeScript → JS
npm run start:prod     # Lancer le build

# Linting
npm run lint          # Fix linting issues
npm run format        # Format code

# Testing
npm test              # Jest
npm run test:watch    # Jest watch mode
npm run test:cov      # Coverage
```

---

## 📁 Fichiers importants

- `CLAUDE.md` - Documentation technique complète
- `src/modules/ratings/` - Logique de l'app
- `views/` - Templates HTML (EJS)
- `public/style.css` - Styles
- `data/app.db` - Base de données SQLite (créée auto)

---

## 🔍 Tester l'API

### Récupérer toutes les notations
```bash
curl http://localhost:3000/api/ratings
```

### Créer une notation
```bash
curl -X POST http://localhost:3000/api/ratings \
  -H "Content-Type: application/json" \
  -d '{"rating": 5}'
```

### Stats
```bash
curl http://localhost:3000/api/stats
```

### Supprimer une notation
```bash
curl -X DELETE http://localhost:3000/api/ratings/1
```

---

## 📚 Stack

- **Framework**: NestJS
- **Database**: SQLite (better-sqlite3)
- **Templating**: EJS
- **Styling**: Vanilla CSS
- **Validation**: class-validator

**Zéro dépendances inutiles** ✨

---

## ❓ Besoin d'aide?

Consulte `CLAUDE.md` pour la doc complète.

**Commande rapide pour démarrer:**
```bash
npm install && npm run start:dev
```

Puis va sur **http://localhost:3000** 🎉
