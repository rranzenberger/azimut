# 🔄 Migration: Adicionar Campo HeroSlogan ao Page

## 📋 Mudanças no Schema

### **Adicionado ao modelo `Page`:**

```prisma
model Page {
  // ... campos existentes
  heroSloganPt  String?     // Slogan do hero (editable via CMS)
  heroSloganEn  String?
  heroSloganEs  String?
  heroSloganFr  String?
  // ... resto dos campos
}
```

---

## 🚀 Como Aplicar a Migration

### **1. Gerar Migration:**

```bash
cd azimut-cms
npx prisma migrate dev --name add_hero_slogan_to_page
```

### **2. Ou criar migration manual:**

```bash
npx prisma migrate dev --create-only --name add_hero_slogan_to_page
```

Isso criará um arquivo em `prisma/migrations/` que você pode revisar.

### **3. Aplicar:**

```bash
npx prisma migrate deploy
```

---

## 📝 Seed Atualizado

O `seed.ts` já foi atualizado com os valores iniciais:

```typescript
heroSloganPt: 'Experiências que Conectam Mundos',
heroSloganEn: 'Experiences that Connect Worlds',
heroSloganEs: 'Experiencias que Conectan Mundos',
heroSloganFr: 'Expériences qui Connectent les Mondes',
```

---

## 🔧 API Atualizada

A API `/api/public/content` agora retorna:

```json
{
  "page": {
    "heroSlogan": "Experiences that Connect Worlds",
    // ... outros campos
  }
}
```

---

## 🎨 Frontend Integrado

O `Home.tsx` agora:
1. Busca `heroSlogan` do CMS
2. Usa fallback local se CMS não responder
3. Exibe o slogan dinamicamente

---

## ✅ Próximos Passos

1. **Aplicar migration no banco:**
   ```bash
   cd azimut-cms
   npx prisma migrate dev
   ```

2. **Rodar seed (atualiza página home):**
   ```bash
   npm run prisma:seed
   ```

3. **Testar:**
   - Verificar se API retorna `heroSlogan`
   - Verificar se frontend exibe corretamente
   - Testar fallback (desligar CMS)

---

**Status:** Schema e código atualizados. Pronto para migration.

