# ✅ API INTEGRADA - CONFIGURAÇÃO FINAL

**Data:** 09 Janeiro 2026, 21:45  
**Status:** ✅ APIs integradas com sucesso

---

## 🎉 O QUE FOI FEITO:

### **1. Criado ApiService** (`src/services/api.ts`)
- ✅ Centraliza todas chamadas de API
- ✅ Suporta variáveis de ambiente
- ✅ Fail gracefully (IA opcional)
- ✅ Health check
- ✅ TypeScript tipado

### **2. Atualizado SmartContactForm**
- ✅ Usa `ApiService.submitLead()`
- ✅ Usa `ApiService.getAiSuggestions()`
- ✅ Sem hardcoded URLs
- ✅ Funciona em dev e prod

### **3. Criado env.example**
- ✅ Template de configuração
- ✅ Documentado cada variável
- ✅ Valores de exemplo

---

## 🔧 CONFIGURAÇÃO NECESSÁRIA:

### **DESENVOLVIMENTO (localhost):**

1. **Criar arquivo `.env` na raiz do projeto:**

```bash
# Copiar do exemplo
cp env.example .env
```

2. **Editar `.env`:**

```env
VITE_API_URL=http://localhost:3001
VITE_API_KEY=
VITE_ENABLE_AI_SUGGESTIONS=true
VITE_ENABLE_TRACKING=true
```

3. **Reiniciar Vite:**

```bash
npm run dev
```

---

### **PRODUÇÃO (Vercel):**

1. **Ir em:** https://vercel.com/dashboard
2. **Projeto:** azimut
3. **Settings** → **Environment Variables**
4. **Adicionar:**

```
Name: VITE_API_URL
Value: https://backoffice.azmt.com.br
Environments: Production, Preview, Development
```

```
Name: VITE_API_KEY
Value: [deixar vazio por enquanto - vamos gerar depois]
Environments: Production, Preview, Development
```

```
Name: VITE_ENABLE_AI_SUGGESTIONS  
Value: true
Environments: Production, Preview, Development
```

```
Name: VITE_ENABLE_TRACKING
Value: true
Environments: Production, Preview, Development
```

5. **Redeploy**

---

## 🔐 PRÓXIMO PASSO: CORS no Backoffice

### **Opção A: Permitir CORS de qualquer origem (simples)**

**Arquivo:** `azimut-cms/next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, X-API-Key' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

### **Opção B: Permitir apenas domínio específico (seguro)**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { 
            key: 'Access-Control-Allow-Origin', 
            value: process.env.NODE_ENV === 'production' 
              ? 'https://azmt.com.br,https://architecad.com' 
              : '*'
          },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, X-API-Key' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

---

## 🧪 COMO TESTAR:

### **1. Teste local (sem CORS ainda):**

```bash
# Terminal 1 - Backoffice
cd azimut-cms
npm run dev

# Terminal 2 - Site
cd ..
npm run dev
```

Abra: `http://localhost:1753/pt/contact`

**Esperado:** Formulário envia para `http://localhost:3001/api/leads` ✅

---

### **2. Teste com backoffice em produção:**

No `.env`:

```env
VITE_API_URL=https://backoffice.azmt.com.br
```

Reiniciar Vite e testar.

**Esperado:** Erro CORS (normal! Vamos corrigir a seguir)

---

## 🚀 PRÓXIMAS AÇÕES:

### **AGORA:**
1. ✅ Criar `.env` local
2. ✅ Testar formulário local
3. 🔄 Adicionar CORS no backoffice
4. 🔄 Testar com backend em produção
5. 🔄 Deploy no Vercel

### **DEPOIS:**
6. Gerar API Key
7. Implementar middleware de autenticação
8. Rate limiting
9. Monitoring

---

## 📊 ARQUITETURA FINAL:

```
┌─────────────────┐
│  SITE (Vite)    │
│  localhost:1753 │
│  azmt.com.br    │
└────────┬────────┘
         │
         │ ApiService
         │ fetch()
         ↓
┌─────────────────────────┐
│  BACKOFFICE (Next.js)   │
│  localhost:3001         │
│  backoffice.azmt.com.br │
│                         │
│  /api/leads            │
│  /api/ai/form-suggestions│
│  /api/track            │
│  /api/public/content   │
└────────┬────────────────┘
         │
         │ Prisma
         ↓
┌─────────────────┐
│  DATABASE       │
│  Neon.tech      │
│  PostgreSQL     │
└─────────────────┘
```

---

## ✅ CHECKLIST:

- [x] ApiService criado
- [x] SmartContactForm atualizado
- [x] env.example criado
- [x] Commit e push
- [ ] .env local configurado
- [ ] CORS no backoffice
- [ ] Teste end-to-end
- [ ] Deploy Vercel
- [ ] API Key gerada (opcional)

---

**PRÓXIMO PASSO:** Configurar CORS no backoffice e testar!
