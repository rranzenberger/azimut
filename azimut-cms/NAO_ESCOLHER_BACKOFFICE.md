# ⚠️ ATENÇÃO: NÃO Escolher "backoffice"!

## 🚨 ERRO COMUM

**NÃO escolha:** `rranzenberger/azimut-backoffice` ❌

**Escolha:** `rranzenberger/azimut` ✅

---

## ✅ Passo a Passo Correto

### **PASSO 1: Selecionar Usuário**

1. **Você já selecionou:** `rranzenberger` ✅
2. **Isso está CORRETO!**

---

### **PASSO 2: Escolher Repositório** ⚠️ ATENÇÃO!

**Na lista de repositórios, você verá:**

- ✅ **`azimut`** ← **ESCOLHA ESTE!**
- ❌ **`azimut-backoffice`** ← **NÃO ESCOLHA ESTE!**

**Ação:**
1. **Procure por:** `azimut` (sem "backoffice")
2. **Clique em "Connect"** ao lado de `azimut`
3. **NÃO clique** em `azimut-backoffice`

---

### **PASSO 3: Tela de Configuração** (MUITO IMPORTANTE!)

**Após clicar em "Connect", uma tela de configuração aparecerá:**

#### **3.1. Root Directory** ⚠️ ESSENCIAL!

1. **Procure por:** "Root Directory" ou "Project Root"
2. **Clique em "Edit"** ou "Configure"
3. **Digite:** `azimut-cms`
4. ✅ **Isso é CRUCIAL!** Sem isso, não funciona!

#### **3.2. Framework Preset**

- Selecione: **"Next.js"** (ou deixe auto-detect)

#### **3.3. Build Command**

- Deve aparecer: `cd azimut-cms && npm run build`
- Se não aparecer, digite manualmente

#### **3.4. Output Directory**

- Deve aparecer: `.next`
- Ou deixe vazio

#### **3.5. Production Branch**

- Selecione: **`main`**

#### **3.6. Environment Variables**

- Se necessário, adicione as variáveis:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `NODE_ENV=production`

#### **3.7. Deploy**

- Clique em **"Deploy"** ou **"Connect"**

---

## 🎯 Resumo Visual

```
TELA ATUAL:
└── rranzenberger (selecionado) ✅
    └── Lista de repositórios:
        ├── azimut ← ESCOLHA ESTE! ✅
        └── azimut-backoffice ← NÃO ESCOLHA! ❌

TELA SEGUINTE (Configuração):
└── Root Directory: azimut-cms ← DIGITE AQUI! ⚠️
└── Production Branch: main
└── [Deploy] ← CLIQUE AQUI
```

---

## ⚠️ Por Que NÃO Escolher "backoffice"?

**Repositório `azimut-backoffice`:**
- ❌ Pode não existir
- ❌ Pode estar vazio
- ❌ Não tem os commits novos (`333fff4`, etc.)

**Repositório `azimut`:**
- ✅ É o repositório principal
- ✅ Tem todos os commits
- ✅ Tem o código do CMS em `azimut-cms/`

---

## ✅ Checklist

- [ ] Selecionado: `rranzenberger` ✅
- [ ] Escolhido: `azimut` (NÃO `azimut-backoffice`) ✅
- [ ] Clicado em "Connect" ✅
- [ ] Configurado Root Directory: `azimut-cms` ⚠️
- [ ] Clicado em "Deploy" ✅

---

## 🎯 Lembrete

**O projeto `azimut-backoffice` na Vercel deve estar conectado ao repositório `azimut` no GitHub, com Root Directory `azimut-cms`.**

Isso permite que o projeto encontre os arquivos do CMS dentro do repositório principal.

---

**Última atualização:** Instruções para não escolher repositório errado

