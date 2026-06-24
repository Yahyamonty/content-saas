# ContentFlow SaaS - Guide de Déploiement

Voici comment transformer ce code en une app live que tu peux vendre.

## 📋 Structure du projet

```
content-saas/
├── pages/
│   ├── index.js          (Page React - le front)
│   └── api/
│       └── generate.js   (API route - le back)
├── package.json          (Dépendances)
├── next.config.js        (Config Next.js)
└── .env.local            (Variables secrètes)
```

---

## 🚀 ÉTAPE 1: Préparer les fichiers (5 min)

### Renommer les fichiers:
```bash
# Sur ton ordinateur, crée un dossier "content-saas"
mkdir content-saas
cd content-saas

# Copie les fichiers:
# pages-index.js → pages/index.js
# api-generate.js → pages/api/generate.js
```

### Structure finale:
```
content-saas/
├── pages/
│   ├── index.js
│   └── api/
│       └── generate.js
├── package.json
└── next.config.js
```

---

## 🔑 ÉTAPE 2: Clé API Anthropic (2 min)

1. Va sur: https://console.anthropic.com/keys
2. Crée une clé API (copie-la)
3. Crée un fichier `.env.local` à la racine:

```bash
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **NE partage JAMAIS cette clé. Garde-la secrète.**

---

## 📦 ÉTAPE 3: Installer localement (3 min)

```bash
# Dans le dossier content-saas:
npm install

# Lance en dev:
npm run dev

# Visite: http://localhost:3000
# Teste l'app - elle doit marcher!
```

---

## 🌐 ÉTAPE 4: Déployer sur Vercel (5 min)

### Option A: Via GitHub (Recommandé)

1. **Crée un repo GitHub:**
   - Va sur github.com
   - Clique "New repository"
   - Appelle-le "content-saas"
   - Copie le code dedans via Git

2. **Déploie sur Vercel:**
   - Va sur vercel.com
   - Click "New Project"
   - Import ton repo GitHub
   - Click "Deploy"

3. **Ajoute la clé API:**
   - Dans Vercel, va sur Settings → Environment Variables
   - Ajoute: `ANTHROPIC_API_KEY` = ta clé
   - Redéploie

4. **C'est live!** 🎉
   - Vercel te donne une URL: `https://content-saas-xxxxx.vercel.app`

---

### Option B: Via Vercel CLI (Plus rapide)

```bash
# Install Vercel CLI:
npm install -g vercel

# Dans ton dossier content-saas:
vercel

# Suis les instructions
# À la fin, il te demande la clé API → entre-la
# Boom, c'est live.
```

---

## ✅ ÉTAPE 5: Vérifie que ça marche

1. Va sur ton URL Vercel
2. Rentre: "Marketing Digital" + 3 faits
3. Click "Générer"
4. Attends 30 secondes
5. Tu dois voir 30 jours de contenu

**Si ça ne marche pas:**
- Vérifie la clé API est bonne
- Check la console (F12) pour les erreurs
- Relance: `vercel --prod`

---

## 💰 ÉTAPE 6: Maintenant tu peux vendre

### Ajoute un formulaire de paiement:

Tu as besoin de:
1. **Stripe** ou **Lemonsqueezy** (pour paiements)
2. **Une landing page** (Carrd.co)
3. **Un plan tarifaire:**
   - Gratuit: 1 génération/mois
   - Pro: 99 MAD = 10 générations/mois
   - Agency: 999 MAD = illimité

### Revenu potentiel:
- 50 users @ 99 MAD = 5K MAD/mois
- 100 users @ 99 MAD = 10K MAD/mois
- 30 users @ 999 MAD = 30K MAD/mois

---

## 🎯 Prochaines étapes:

1. **Deploy l'app** (suivre les étapes ci-dessus)
2. **Lance TikTok** - poste "J'ai créé une IA qui génère du contenu"
3. **Crée une landing page** - Carrd.co (2 minutes)
4. **Ajoute Stripe** - pour les paiements (optionnel, mais nécessaire pour vendre)
5. **Vends** - 199 MAD/mois ou one-time 500 MAD

---

## 🆘 Aide:

- Questions sur Next.js? → nextjs.org/docs
- Questions sur Vercel? → vercel.com/docs
- Questions sur l'API Anthropic? → console.anthropic.com/docs

**Prêt?** Déploie et envoie-moi l'URL pour tester! ⚡
