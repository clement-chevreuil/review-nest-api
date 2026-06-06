# Trip Ratings App - Documentation Technique

## 🎯 Vue d'ensemble

Application NestJS ultra-légère pour noter des trajets avec un système d'étoiles (1-5). Stack minimal, sans dépendances inutiles.

**Tech Stack:**
- NestJS (framework)
- better-sqlite3 (DB synchrone)
- dayjs (dates)
- class-validator (validation)
- EJS (templates)
- Bootstrap 5 (CDN)
- Vanilla CSS (design system)

---

## 🎨 Design System - Palette de Couleurs

Le projet utilise un système de couleurs cohérent avec support **Light Mode** et **Dark Mode**.

### Variables CSS (dans `public/style.css`)

#### Light Mode
```css
--input-bg-light: #ffffff          /* Fond input */
--input-border-light: #dde2e9      /* Bordure input */
--input-text-light: #0a0e27        /* Texte input */
--input-placeholder-light: #8a95a6 /* Placeholder */
--text-light-primary: #0a0e27      /* Texte principal */
--text-light-secondary: #5a6b7d    /* Texte secondaire */
--bg-light: #ffffff                /* Fond page */
--border-light: #dde2e9            /* Bordure générale */
```

#### Dark Mode
```css
--input-bg-dark: #1e293b           /* Fond input sombre */
--input-border-dark: #475569       /* Bordure input sombre */
--input-text-dark: #f8fafc         /* Texte input clair */
--input-placeholder-dark: #94a3b8  /* Placeholder clair */
--text-dark-primary: #f8fafc       /* Texte principal */
--text-dark-secondary: #cbd5e1     /* Texte secondaire */
--bg-dark: #0f1419                 /* Fond page sombre */
--border-dark: #334155             /* Bordure sombre */
```

#### Couleurs Primaires
```css
--primary: #0052cc                 /* Bleu principal */
--primary-hover: #0043a3           /* Bleu hover */
--primary-light: #f0f5ff           /* Bleu très clair (fond) */
--danger: #d32f2f                  /* Rouge danger */
--danger-dark: #b71c1c             /* Rouge hover */
```

### Utilisation
- **Inputs:** Utilisent automatiquement `--input-bg`, `--input-border`, `--input-text` selon le mode
- **Boutons:** Utilisent `--primary`, `--danger`
- **Texte:** Utilisent `--text-*-primary`, `--text-*-secondary`
- **Bordures:** Utilisent `--border-*`

Le mode **Dark Mode** s'active automatiquement via `prefers-color-scheme: dark`.

---

## 📝 Typographie & Texte

### Hiérarchie des couleurs de texte

#### Light Mode
```css
Texte Principal:    #0a0e27  (noir pur - headings, body text)
Texte Secondaire:   #5a6b7d  (gris moyen - labels, descriptions)
Texte Light:        #8a95a6  (gris clair - placeholders, hints)
```

#### Dark Mode
```css
Texte Principal:    #f8fafc  (blanc cassé - headings, body text)
Texte Secondaire:   #cbd5e1  (gris clair - labels, descriptions)
Texte Light:        #94a3b8  (gris moyen - placeholders, hints)
```

**Règle:** Toujours utiliser `--text-*-primary` pour le texte principal, `--text-*-secondary` pour les labels et descriptions secondaires.

---

## 📊 Tableau & Listes

### Design du Tableau

#### Light Mode
```css
Table Background:   #ffffff      (fond blanc)
Table Border:       #dde2e9      (bordure grise)
Header Background:  #f8f9fa      (fond gris très clair)
Header Text:        #5a6b7d      (texte gris moyen)
Row Text:           #0a0e27      (texte noir)
Row Hover:          #f8f9fa      (fond gris au hover)
```

#### Dark Mode
```css
Table Background:   #1a202c      (fond gris foncé)
Table Border:       #334155      (bordure gris moyen)
Header Background:  #0f1419      (fond très foncé)
Header Text:        #cbd5e1      (texte gris clair)
Row Text:           #f8fafc      (texte blanc cassé)
Row Hover:          #2d3748      (fond gris au hover)
```

### Structure HTML
```html
<table class="table table-hover align-middle">
  <thead>
    <tr class="border-bottom">
      <th class="fw-bold text-uppercase small">Column</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-bottom-light">
      <td>Content</td>
    </tr>
  </tbody>
</table>
```

**Important:** Le tableau utilise automatiquement les couleurs correctes via les variables CSS. Bootstrap applique les styles, et notre CSS custom surcharge pour Dark Mode.

---

## 📁 Structure du projet

```
src/
├─ main.ts                          # Point d'entrée, config EJS
├─ app.module.ts                    # Module racine
└─ modules/
   └─ ratings/
      ├─ ratings.controller.ts      # Routes HTTP + pages
      ├─ ratings.service.ts         # Logique métier
      ├─ ratings.repository.ts      # Accès à la BD
      ├─ ratings.module.ts          # Déclaration du module
      ├─ dto/
      │  ├─ create-rating.dto.ts    # Validation création
      │  └─ update-rating.dto.ts    # Validation mise à jour
      └─ entities/
         └─ rating.entity.ts        # Interface Rating

views/
├─ dashboard.ejs                   # Page d'accueil (liste notations)
└─ create.ejs                      # Formulaire d'ajout

public/
└─ style.css                       # Styles globaux

data/
└─ app.db                          # Base de données SQLite (créée au démarrage)
```

---

## 🔄 Flux de données

### 1. Ajouter une notation

```
create.ejs (formulaire)
    ↓
POST /api/ratings
    ↓
RatingsController.create()
    ↓
RatingsService.create()
    ↓
RatingsRepository.create()
    ↓
Database (better-sqlite3)
    ↓
Redirect vers dashboard
```

### 2. Afficher le dashboard

```
GET /
    ↓
RatingsController.getDashboard()
    ↓
RatingsService.findAll()
    ↓
RatingsService.getStats()
    ↓
RatingsRepository.findAll() + getStats()
    ↓
Database
    ↓
dashboard.ejs (render)
```

---

## 🛠️ API Endpoints

### Pages (HTML)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Dashboard (liste notations + stats) |
| GET | `/create` | Formulaire d'ajout |

### API (JSON)

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/ratings` | Créer une notation |
| GET | `/api/ratings` | Récupérer toutes les notations |
| GET | `/api/ratings/:id` | Récupérer une notation |
| PATCH | `/api/ratings/:id` | Mettre à jour une notation |
| DELETE | `/api/ratings/:id` | Supprimer une notation |
| GET | `/api/stats` | Stats (moyenne, min, max, total) |

---

## 📊 Modèle de données

### Table: ratings

```sql
CREATE TABLE ratings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  tripDate TEXT NOT NULL,              -- ISO date string
  createdAt TEXT NOT NULL              -- ISO date string
)
```

### Interface Rating

```typescript
interface Rating {
  id: number;
  rating: number;       // 1-5
  tripDate: string;     // ISO date
  createdAt: string;    // ISO date
}
```

---

## ✅ Validation

### CreateRatingDto
- `rating` (required): integer, min=1, max=5
- `tripDate` (optional): ISO date string (défaut: now)

### UpdateRatingDto
- `rating` (optional): integer, min=1, max=5

**Validation globale activée** (`whitelist`, `forbidNonWhitelisted`, `transform`)

---

## 🔐 Sécurité

✅ **Implémenté:**
- Parameterized queries (prévient SQL injection)
- Validation class-validator sur tous inputs
- Whitelist des propriétés (pas de propriétés extra)
- Type checking TypeScript strict

---

## 🚀 Démarrage

```bash
# Installation
npm install

# Développement (watch mode)
npm run start:dev

# Production
npm run build
npm run start:prod
```

L'app écoute sur `http://localhost:3000`

---

## 📝 Notes d'implémentation

### RatingsRepository

- **Database init**: Crée la table automatiquement au premier démarrage
- **Synchrone**: better-sqlite3 est sync (pas d'async/await)
- **Prepared statements**: Toutes les requêtes utilisent `.prepare()` (plus sûr)

### RatingsController

- **Render pages**: `@Render()` utilise le moteur EJS configuré
- **API pure**: Les endpoints `/api/*` retournent du JSON
- **Date format**: ISO 8601 (standard)

### Validation

- `class-validator` + `class-transformer` au démarrage
- Pipe global dans `main.ts`
- DTOs défini avec décorateurs `@Is*`

---

## 🐛 Erreurs connues / Leçons

(À compléter au fil du développement)

---

## 📚 Packages

| Package | Raison |
|---------|--------|
| @nestjs/common, @nestjs/core | Framework |
| @nestjs/platform-express | HTTP server |
| better-sqlite3 | DB sync, zéro dépendances |
| class-validator | Validation des inputs |
| class-transformer | Transform DTOs |
| dayjs | Manipulation dates (léger) |
| ejs | Templating (léger) |

**Aucune dépendance inutile** ✅

---

## 🎨 Frontend (Vanilla)

- **HTML**: EJS templates (partials possibles)
- **CSS**: Un seul fichier `style.css` (responsive, design simple)
- **JS**: Vanilla JS (pas de framework)
- **Interaction**: Fetch API pour les appels API

---

## 🔄 Cycle de vie

1. `main.ts` lance l'app → configure EJS + validation globale
2. `AppModule` charge `RatingsModule`
3. `RatingsModule` déclare controller + service + repository
4. `RatingsRepository` initialise la BD au premier accès
5. Routes disponibles sur `http://localhost:3000`

---

## 💡 Besoin d'ajouter une feature?

1. **Nouvelle route?** → Ajouter une méthode dans `RatingsController`
2. **Nouvelle logique?** → Ajouter dans `RatingsService`
3. **Nouvelle requête BD?** → Ajouter dans `RatingsRepository`
4. **Nouveau formulaire?** → Créer un nouveau template `.ejs`
5. **Nouvelle validation?** → Mettre à jour les DTOs

---

## 🧪 Exemples curl

```bash
# Créer une notation
curl -X POST http://localhost:3000/api/ratings \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "tripDate": "2026-05-20T14:00:00Z"}'

# Récupérer toutes les notations
curl http://localhost:3000/api/ratings

# Stats
curl http://localhost:3000/api/stats

# Supprimer une notation
curl -X DELETE http://localhost:3000/api/ratings/1
```

---

## 📞 Support

Besoin d'aide? Vérifiez:
1. La BD est-elle créée? (vérifier `data/app.db`)
2. Les logs de l'app (`npm run start:dev`)
3. La structure des données correspond-elle au modèle?

---

**Version**: 1.0.0  
**Date**: 2026-05-20  
**Author**: Claude Code
