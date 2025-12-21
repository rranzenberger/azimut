# 🎯 Como Funciona: Root Directory

## ❓ Sua Pergunta

> "Se eu escolher `azimut`, vai conectar a home azimut não o backoffice certo?"

## ✅ Resposta: **SIM, mas com Root Directory funciona!**

---

## 🏗️ Estrutura do Repositório

**Um único repositório GitHub:** `rranzenberger/azimut`

```
rranzenberger/azimut/
├── azimut-cms/          ← Código do BACKOFFICE (CMS)
│   ├── app/
│   ├── prisma/
│   ├── package.json
│   └── ...
├── src/                 ← Código do SITE PRINCIPAL
│   ├── pages/
│   ├── components/
│   └── ...
├── package.json
└── ...
```

---

## 🎯 Como Funciona na Vercel

### **Projeto 1: `azimut` (Site Principal)**

**Configuração:**
- **Repositório:** `rranzenberger/azimut`
- **Root Directory:** (raiz ou `src/`)
- **Resultado:** Vercel procura arquivos na raiz ou em `src/`
- **Deploy:** Site principal (`www.azmt.com.br`)

---

### **Projeto 2: `azimut-backoffice` (CMS)**

**Configuração:**
- **Repositório:** `rranzenberger/azimut` (MESMO repositório!)
- **Root Directory:** `azimut-cms` ⚠️ **AQUI ESTÁ A DIFERENÇA!**
- **Resultado:** Vercel procura arquivos em `azimut-cms/`
- **Deploy:** Backoffice (`backoffice.azmt.com.br`)

---

## 🔑 A Mágica: Root Directory

**Root Directory** = Onde o Vercel procura os arquivos do projeto

- **Sem Root Directory:** Vercel procura na raiz do repositório
- **Com Root Directory `azimut-cms`:** Vercel procura em `azimut-cms/`

**Exemplo:**

```
Repositório: rranzenberger/azimut
├── azimut-cms/
│   └── package.json  ← Vercel usa este (Root: azimut-cms)
└── package.json      ← Vercel usa este (Root: raiz)
```

---

## ✅ Por Que Isso Funciona?

1. **Mesmo repositório, pastas diferentes:**
   - Site principal: `src/`
   - Backoffice: `azimut-cms/`

2. **Root Directory define qual pasta usar:**
   - Projeto `azimut`: Root = raiz → usa `src/`
   - Projeto `azimut-backoffice`: Root = `azimut-cms` → usa `azimut-cms/`

3. **Ambos podem estar conectados ao mesmo repositório:**
   - ✅ Isso é PERFEITAMENTE NORMAL
   - ✅ Muitos projetos fazem isso
   - ✅ É a forma correta de organizar

---

## 🎯 Resumo Visual

```
REPOSITÓRIO GITHUB:
└── rranzenberger/azimut
    ├── azimut-cms/  ← Backoffice
    └── src/         ← Site principal

VERCEL PROJETO 1: "azimut"
└── Repositório: rranzenberger/azimut
└── Root Directory: (raiz)
└── Deploy: www.azmt.com.br

VERCEL PROJETO 2: "azimut-backoffice"
└── Repositório: rranzenberger/azimut (MESMO!)
└── Root Directory: azimut-cms ⚠️
└── Deploy: backoffice.azmt.com.br
```

---

## ✅ Conclusão

**SIM, você deve conectar `azimut` ao projeto `azimut-backoffice`!**

**Mas configure:**
- ✅ Root Directory: `azimut-cms`
- ✅ Isso faz o Vercel procurar arquivos em `azimut-cms/`
- ✅ Resultado: Deploy do backoffice, não do site principal

**Sem Root Directory:**
- ❌ Vercel procuraria na raiz
- ❌ Não encontraria os arquivos do backoffice
- ❌ Deploy falharia

**Com Root Directory `azimut-cms`:**
- ✅ Vercel procura em `azimut-cms/`
- ✅ Encontra os arquivos do backoffice
- ✅ Deploy funciona perfeitamente

---

## 🎯 Ação

1. **Conecte:** `rranzenberger/azimut` ✅
2. **Configure:** Root Directory = `azimut-cms` ⚠️
3. **Deploy:** Funcionará perfeitamente! ✅

---

**Última atualização:** Explicação sobre Root Directory e como ambos projetos podem usar o mesmo repositório

