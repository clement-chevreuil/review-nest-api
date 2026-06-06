# 🎨 Frontend Documentation - Trip Ratings

## Design System

### Palette de Couleurs
- **Primary**: `#3b82f6` (Bleu)
- **Primary Dark**: `#1e40af`
- **Primary Light**: `#60a5fa`
- **Success**: `#10b981` (Vert)
- **Danger**: `#ef4444` (Rouge)
- **Gray Scale**: 50-900

### Typographie
- **Font Family**: Système system fonts (-apple-system, BlinkMacSystemFont, etc.)
- **Headings**: Font-weight 700-800
- **Body**: Font-weight 400-600
- **Line Height**: 1.6

### Spacing
- Utilise un système de grille 4px
- Padding: 16px (mobile), 32px (desktop)
- Gap: 16px (mobile), 20px (desktop)

---

## Pages

### 1. Dashboard (`/`)

**Features:**
- 📊 Stats Grid: Affiche 4 cartes avec statistiques
  - Total de notations
  - Moyenne (avec étoiles visuelles)
  - Note minimum
  - Note maximum
- 📋 Tableau des notations:
  - Vue desktop: Tableau classique
  - Vue mobile: Cartes avec `data-label`
- 🎯 Bouton "Nouveau trajet" en header
- ⌨️ Raccourci clavier: `Ctrl+N` pour nouveau trajet

**Responsive:**
- Mobile: Stats en grille 1 colonne, tableau en cartes
- Tablet: Stats en grille 2 colonnes
- Desktop: Stats en grille 4 colonnes, tableau normal

---

### 2. Create Rating (`/create`)

**Features:**
- 📅 Input date/time (prérempli avec maintenant)
- ⭐ Rating Selector: 5 options avec labels
  - 1 = Mauvais
  - 2 = Moyen
  - 3 = OK
  - 4 = Bien
  - 5 = Excellent
- ✅ Submit button avec feedback visuel
- ⌨️ Raccourcis clavier:
  - `Ctrl+Enter` pour enregistrer
  - `Esc` pour retour

**Responsive:**
- Formulaire centré, max-width 500px
- Labels et inputs 100% sur mobile
- Rating selector en grid 5 colonnes (mobile) ou auto-fit (desktop)

---

## Composants

### Buttons (`.btn`)

**Variantes:**
- `.btn-primary` - Action principale (bleu gradient)
- `.btn-secondary` - Action secondaire (gris)
- `.btn-danger` - Suppression (rouge)

**Tailles:**
- `.btn` - Défaut (40px height)
- `.btn-sm` - Petit (30px height)
- `.btn-large` - Plein écran (100% width)

**Comportement:**
- Hover: Élévation + ombre
- Active: Scale 0.98
- Disabled: Opacity 50%

---

### Stat Cards (`.stat-card`)

- Affichent une métrique clé
- Animation `slideInUp` au chargement
- Hover: Montée + ombre agrandie
- Réactifs: Auto-fit pour la grille

---

### Rating Selector (`.rating-selector`)

- 5 options radio avec labels personnalisés
- Grid responsive
- États:
  - Default: Bordure grise
  - Hover: Fond clair + bordure primaire
  - Checked: Gradient + ombre + scale 1.05
- Accessibilité: Labels clairs avec `aria-label`

---

### Table (Desktop & Mobile)

**Desktop:**
- Tableau classique avec thead/tbody
- Hover row pour montrer les actions
- Sticky header (optionnel futur)

**Mobile:**
- Chaque ligne = card
- `data-label` affichée en tant que label
- Actions alignées à droite

---

## Interactions

### Animations
- `slideInUp`: Cartes au chargement
- Transitions: 0.3s cubic-bezier smooth
- Réduit automatiquement avec `prefers-reduced-motion`

### Feedback
- **Loading**: Bouton affiche un spinner + texte "⏳"
- **Success**: Redirection avec texte "✅"
- **Error**: Alert avec message d'erreur

### Keyboard Shortcuts
- `Ctrl+N`: Nouveau trajet (dashboard)
- `Ctrl+Enter`: Enregistrer (create)
- `Esc`: Retour (create)

---

## Accessibilité

✅ **Implémenté:**
- Semantic HTML (form, label, button, etc.)
- ARIA labels et descriptions
- Contraste suffisant (WCAG AA)
- Focus visible sur inputs
- Keyboard navigation
- Support dark mode
- Reduced motion support

---

## Mobile-First Approach

```
Mobile (< 600px)
  ├─ 1 colonne layout
  ├─ Full-width buttons
  ├─ Card-based tables
  └─ Compact spacing (16px)

Tablet (600px - 1024px)
  ├─ 2-3 colonnes
  ├─ Boutons côte à côte
  └─ Spacing 24px

Desktop (> 1024px)
  ├─ 4 colonnes
  ├─ Tableaux complets
  └─ Spacing 32px
```

---

## Dark Mode

Automatiquement activé avec `prefers-color-scheme: dark`:
- Couleurs inversées
- Fond sombre (#1f2937)
- Texte clair
- Contrastes maintenus

---

## Performance

✅ **Optimisations:**
- CSS minified (production)
- Vanilla JS (zéro dépendances front)
- Images: Emojis (zéro requêtes)
- Pas de polices externes
- Pas de frameworks JS

---

## Future Enhancements

- [ ] Filtrage/tri du tableau
- [ ] Édition de notations
- [ ] Export PDF/CSV
- [ ] Mode hors ligne (Service Workers)
- [ ] Graphiques (Chart.js)
- [ ] Animations avancées (Framer Motion)

---

## Tests Manuels

### Checklist
- [ ] Dashboard charge correctement
- [ ] Stats s'animent au chargement
- [ ] Table responsive sur mobile
- [ ] Boutons fonctionnent
- [ ] Formulaire valide et enregistre
- [ ] Dark mode s'applique
- [ ] Keyboard shortcuts marchent
- [ ] Pas de console errors

---

## Fichiers

```
public/
└─ style.css          # Styles (600+ lignes)

views/
├─ dashboard.ejs      # Dashboard page
├─ create.ejs         # Create rating page
└─ (partials futur)
```

---

**Dernière mise à jour**: 2026-05-20  
**Auteur**: Claude Code
