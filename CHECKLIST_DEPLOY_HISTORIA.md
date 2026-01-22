# ✅ CHECKLIST DEPLOY - HISTÓRIA AZIMUT

**Data:** 2026-01-20  
**Tempo estimado:** 15-20 minutos  
**Status:** Pronto para executar

---

## 📋 **PASSO A PASSO (COPY & PASTE)**

### **1️⃣ APLICAR SQL NO BANCO (5 min)**

#### **Opção A: Via Neon SQL Editor (Recomendado)**

1. Acesse: https://console.neon.tech
2. Selecione o projeto Azimut
3. Clique em "SQL Editor"
4. Cole o conteúdo do arquivo: `sql/populate_company_history_complete.sql`
5. Clique em "Run"
6. Verifique: `SELECT COUNT(*) FROM "CompanyHistory";` (deve retornar ~30)

#### **Opção B: Via Prisma**

```bash
cd azimut-cms
npx prisma migrate deploy
```

---

### **2️⃣ TESTAR API (2 min)**

Abra no navegador ou use curl:

```bash
# PT
https://cms.azimut.com.br/api/public/history?lang=pt

# EN
https://cms.azimut.com.br/api/public/history?lang=en

# Featured apenas
https://cms.azimut.com.br/api/public/history?lang=pt&featured=true
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": [...],
  "stats": {
    "total": 30,
    "featured": 15,
    ...
  }
}
```

---

### **3️⃣ INTEGRAR NO FRONTEND (5 min)**

Edite `src/pages/StudioCredentials.tsx`:

```tsx
import React from 'react'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import CompanyTimeline from '../components/CompanyTimeline'

interface StudioCredentialsProps {
  lang: Lang
}

const StudioCredentials: React.FC<StudioCredentialsProps> = ({ lang }) => {
  const content = {
    pt: {
      title: 'Nossa História',
      subtitle: '46 anos de inovação em computação gráfica'
    },
    en: {
      title: 'Our History',
      subtitle: '46 years of innovation in computer graphics'
    },
    es: {
      title: 'Nuestra Historia',
      subtitle: '46 años de innovación en computación gráfica'
    },
    fr: {
      title: 'Notre Histoire',
      subtitle: '46 ans d\'innovation en infographie'
    }
  }

  const t = content[lang]

  return (
    <>
      <SEO
        title={t.title}
        description={t.subtitle}
        lang={lang}
      />

      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="container-padding max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-white/70">
              {t.subtitle}
            </p>
          </div>

          <CompanyTimeline lang={lang} layout="vertical" />
        </div>
      </div>
    </>
  )
}

export default StudioCredentials
```

---

### **4️⃣ TESTAR LOCALMENTE (3 min)**

```bash
# Terminal 1: CMS
cd azimut-cms
npm run dev

# Terminal 2: Frontend
npm run dev
```

Acesse: http://localhost:5173/studio/credentials

**Deve exibir:**
- Timeline animada com GSAP
- 30+ eventos históricos
- Ordenados por ano
- Com ícones e descrições

---

### **5️⃣ COMMIT & DEPLOY (5 min)**

```bash
# Adicionar arquivos
git add .

# Commit
git commit -m "feat: adiciona timeline completa da história da Azimut (30+ eventos)"

# Push
git push origin main
```

**Vercel faz deploy automático em ~2 minutos**

---

### **6️⃣ VERIFICAR EM PRODUÇÃO (2 min)**

1. Acesse: https://azimut.com.br/studio/credentials
2. Verifique timeline carrega
3. Teste scroll (animações GSAP)
4. Teste filtros (se implementados)
5. Teste em mobile

---

## 🔍 **TROUBLESHOOTING**

### **Problema: API retorna 500**
```bash
# Verifique se tabela existe
SELECT * FROM "CompanyHistory" LIMIT 1;

# Verifique logs CMS
cd azimut-cms
npm run dev
# Veja console para erros
```

### **Problema: Componente não carrega**
```bash
# Verifique variável de ambiente
echo $VITE_CMS_API_URL

# Deve ser: https://cms.azimut.com.br
```

### **Problema: Timeline vazia**
```bash
# Verifique se dados foram inseridos
SELECT COUNT(*) FROM "CompanyHistory";

# Se retornar 0, rode o SQL de população novamente
```

---

## 📊 **VALIDAÇÃO FINAL**

Após deploy, confirme:

- [ ] ✅ API `/api/public/history` retorna 200
- [ ] ✅ API retorna ~30 eventos
- [ ] ✅ Página `/studio/credentials` carrega
- [ ] ✅ Timeline exibe eventos ordenados
- [ ] ✅ Animações GSAP funcionam no scroll
- [ ] ✅ Responsivo em mobile
- [ ] ✅ Multilíngue (PT/EN/ES/FR) funciona

---

## 🎯 **COMANDOS RÁPIDOS**

```bash
# Verificar banco
SELECT COUNT(*) FROM "CompanyHistory";

# Testar API PT
curl https://cms.azimut.com.br/api/public/history?lang=pt

# Testar API EN
curl https://cms.azimut.com.br/api/public/history?lang=en

# Ver apenas featured
curl https://cms.azimut.com.br/api/public/history?lang=pt&featured=true

# Ver apenas parcerias
curl https://cms.azimut.com.br/api/public/history?lang=pt&type=partnership

# Deploy
git add . && git commit -m "feat: timeline história" && git push
```

---

## 📁 **ARQUIVOS ENVOLVIDOS**

### **Banco:**
- `azimut-cms/prisma/schema.prisma` (model CompanyHistory)
- `azimut-cms/prisma/migrations/20260120_add_company_history.sql`
- `sql/populate_company_history_complete.sql` ⭐

### **Backend:**
- `azimut-cms/app/api/public/history/route.ts` ⭐

### **Frontend:**
- `src/components/CompanyTimeline.tsx` ⭐
- `src/components/AnimatedTimeline.tsx`
- `src/pages/StudioCredentials.tsx` ⭐

### **Docs:**
- `HISTORIA_AZIMUT_TIMELINE_COMPLETA.md`
- `HISTORIA_AZIMUT_RESUMO.md`
- `HISTORIA_AZIMUT_VISUAL.md`
- `BACKOFFICE_COMPANY_HISTORY.md`

---

## ⏱️ **TIMELINE DE DEPLOY**

```
00:00 ─► Aplicar SQL no banco (5 min)
00:05 ─► Testar API (2 min)
00:07 ─► Integrar frontend (5 min)
00:12 ─► Testar localmente (3 min)
00:15 ─► Commit & Push (2 min)
00:17 ─► Vercel deploy (2 min)
00:19 ─► Verificar produção (1 min)
00:20 ─► ✅ PRONTO!
```

---

## 🚀 **PRÓXIMOS PASSOS (FUTURO)**

Após deploy inicial:

1. **Adicionar logos de parcerias:**
   - Autodesk, Discreet, Hoplon, Olympya
   - Upload via backoffice

2. **Criar backoffice CRUD:**
   - `/admin/history` para gerenciar eventos
   - Adicionar/editar/deletar sem SQL

3. **Enriquecer eventos:**
   - Imagens históricas
   - Vídeos dos projetos
   - Links externos

4. **Filtros avançados:**
   - Por década
   - Por categoria
   - Por destaque

---

## 💡 **DICAS**

- **Backup antes de aplicar SQL:** Faça snapshot do banco no Neon
- **Teste em staging primeiro:** Se tiver ambiente staging
- **Monitor erros:** Use Sentry/Vercel logs após deploy
- **Performance:** API é rápida (~100ms), mas considere cache futuro

---

**✨ Boa sorte com o deploy! ✨**

Se algo der errado, consulte `HISTORIA_AZIMUT_TIMELINE_COMPLETA.md` para troubleshooting detalhado.

---

**Criado em:** 2026-01-20  
**Última atualização:** 2026-01-20  
**Status:** ✅ Pronto para uso
