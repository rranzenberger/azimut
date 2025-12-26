# 🏗️ ESTRUTURA DO PROJETO E LIMPEZA - AZIMUT

**Data da última atualização:** 26 de Dezembro de 2025  
**Status:** ✅ Projeto limpo e organizado

---

## 📊 ESTATÍSTICAS DO PROJETO

### ANTES DA LIMPEZA:
- **Total de arquivos:** 20.318
- **Principais causas:**
  - `node_modules/` (site principal): ~1.235 arquivos
  - `azimut-cms/node_modules/`: ~20.146 arquivos
  - Pastas duplicadas e desnecessárias
  - Scripts e documentação temporária

### DEPOIS DA LIMPEZA:
- **Total de arquivos (sem node_modules):** 163
- **Arquivos de código fonte:** ~52 (src/)
- **Arquivos do backoffice:** ~57 (azimut-cms/)
- **Redução:** -99.2% 🔥

---

## 📁 ESTRUTURA ATUAL DO PROJETO

```
azimut-site-vite-tailwind/
│
├── 🌐 SITE PRINCIPAL (Vite + React)
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── pages/           # Páginas do site
│   │   ├── data/            # Dados estáticos
│   │   ├── hooks/           # Custom hooks
│   │   ├── utils/           # Utilitários
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── i18n.ts          # Internacionalização
│   │
│   ├── public/              # Assets públicos
│   │   ├── fonts/
│   │   ├── team/
│   │   └── *.svg, *.png     # Logos e ícones
│   │
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── vercel.json
│
├── 🔐 BACKOFFICE (Next.js + Prisma)
│   └── azimut-cms/
│       ├── app/
│       │   ├── admin/       # Páginas admin
│       │   │   ├── pages/   # Gerenciar páginas
│       │   │   ├── projects/ # Gerenciar projetos
│       │   │   └── media/   # Upload de mídia
│       │   │
│       │   ├── api/         # API Routes
│       │   │   ├── admin/   # Endpoints admin
│       │   │   ├── leads/   # Captura de leads
│       │   │   ├── track/   # Analytics/tracking
│       │   │   └── geo/     # Geolocalização
│       │   │
│       │   ├── login/       # Página de login
│       │   └── layout.tsx
│       │
│       ├── prisma/
│       │   ├── schema.prisma # Schema do banco
│       │   ├── seed.ts      # Dados iniciais
│       │   └── migrations/  # Migrações
│       │
│       ├── src/
│       │   ├── lib/         # Bibliotecas
│       │   │   ├── auth.ts  # Autenticação
│       │   │   ├── prisma.ts # Cliente Prisma
│       │   │   ├── ai-scoring.ts # IA
│       │   │   └── image-optimizer.ts
│       │   └── types/       # TypeScript types
│       │
│       ├── public/          # Assets do CMS
│       ├── middleware.ts    # Middleware Next.js
│       ├── package.json
│       ├── next.config.js
│       ├── tsconfig.json
│       ├── .vercelignore    # ✨ NOVO!
│       └── vercel.json
│
├── 📝 CONFIGURAÇÕES
│   ├── .gitignore           # ✨ ATUALIZADO!
│   ├── package.json
│   └── PROJETO_ESTRUTURA_E_LIMPEZA.md # Este arquivo
│
└── 💾 BACKUP (FORA DO PROJETO)
    └── C:\Users\ranz\Documents\azimut-backups\
        └── azimut-backup-2025-12-26_02-14/

```

---

## 🧹 PASTAS REMOVIDAS E POR QUÊ

| Pasta/Arquivo | O que era | Por que removeu | Onde está agora |
|---------------|-----------|-----------------|-----------------|
| **`.cursor/`** | Configurações do editor Cursor | Não é código, só configuração local | Ignorado pelo Git |
| **`.vscode/`** | Configurações do VSCode | Não é código, só configuração local | Ignorado pelo Git |
| **`scripts/`** | Scripts PowerShell de deploy/config | Úteis localmente, mas não necessários no repositório | Backup + ignorado |
| **`dist/`** | Build do Vite (gerado automaticamente) | Recriado a cada build | Ignorado pelo Git |
| **`azimut-cms/azimut-cms/`** | Pasta DUPLICADA (erro de estrutura) | Redundante | Removida |
| **`*.zip`** | Backups compactados antigos | Ocupavam espaço desnecessariamente | Backup + ignorado |
| **`criar-zip-upload.ps1`** | Script temporário | Não mais necessário | Backup + ignorado |
| **`node_modules/`** | Dependências npm (21.381 arquivos!) | Recriado com `npm install` | **SEMPRE ignorado** |
| **`.next/`** | Cache de build do Next.js | Recriado a cada build | **SEMPRE ignorado** |

---

## 🔒 ARQUIVOS DE PROTEÇÃO

### 📄 `.gitignore` (RAIZ DO PROJETO)

**Função:** Impede que arquivos desnecessários sejam commitados no Git

**O que ignora:**
```gitignore
# Dependências
node_modules/
azimut-cms/node_modules/

# Builds
dist/
build/
.next/
azimut-cms/.next/
out/

# Editor
.cursor/
.vscode/
.idea/

# Variáveis de ambiente
.env
.env.local
azimut-cms/.env.local

# Backups
*backup*/
azimut-backups/

# Scripts temporários
*.ps1
*.sh

# Arquivos compactados
*.zip
*.tar.gz

# Documentação temporária
docs/
ANALISE_*.md
STATUS_*.md
DEPLOY_*.md
SOLUCAO_*.md
DIAGNOSTICO_*.md
```

### 📄 `azimut-cms/.vercelignore` (PASTA DO BACKOFFICE)

**Função:** Diz ao Vercel quais arquivos NÃO processar durante o build

**O que ignora:**
```
node_modules
.cursor
.vscode
.idea
docs
public/cases
scripts
*.log
*.local
.env.local
.env.*.local
.next
out
dist
build
coverage
.nyc_output
.DS_Store
*.pem
.turbo
```

**Por que isso é crucial:** O Vercel estava tentando processar 20.317 arquivos, causando "RangeError: Maximum call stack size exceeded". Com `.vercelignore`, ele processa apenas ~60 arquivos necessários!

---

## 📦 BACKUP

### Localização:
```
C:\Users\ranz\Documents\azimut-backups\azimut-backup-2025-12-26_02-14\
```

### Conteúdo:
- ✅ Projeto completo antes da limpeza
- ✅ Todos os scripts (.ps1)
- ✅ Todas as documentações (.md)
- ✅ Configurações antigas

### Como restaurar (se necessário):
```powershell
Copy-Item -Path "C:\Users\ranz\Documents\azimut-backups\azimut-backup-2025-12-26_02-14" -Destination "C:\Users\ranz\Documents\azimut-restaurado" -Recurse
```

---

## 🚀 WORKFLOW ATUAL

### 1️⃣ CLONAR PROJETO:
```bash
git clone https://github.com/rranzenberger/azimut-backoffice.git azimut-site-vite-tailwind
cd azimut-site-vite-tailwind
```

### 2️⃣ INSTALAR DEPENDÊNCIAS:

**Site principal:**
```bash
npm install
```

**Backoffice:**
```bash
cd azimut-cms
npm install
```

### 3️⃣ CONFIGURAR VARIÁVEIS:

**Site principal:** Não precisa (sem .env)

**Backoffice:** Copiar `.env.local` exemplo:
```bash
cd azimut-cms
# Criar .env.local com:
DATABASE_URL="postgresql://..."
SITE_URL="https://azmt.com.br"
```

### 4️⃣ DESENVOLVER:

**Site principal:**
```bash
npm run dev          # http://localhost:5173
```

**Backoffice:**
```bash
cd azimut-cms
npm run dev          # http://localhost:3000
```

### 5️⃣ COMMIT E PUSH:
```bash
git add .
git commit -m "feat: Minha mudança"
git push origin main
```

**✅ Git vai ignorar automaticamente:** node_modules, .next, backups, etc.

---

## 🔗 DEPLOY NO VERCEL

### Site Principal (azmt.com.br):
- **Repositório:** `rranzenberger/azimut`
- **Root Directory:** `/` (raiz)
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Variáveis:** Nenhuma necessária

### Backoffice:
- **Repositório:** `rranzenberger/azimut-backoffice`
- **Root Directory:** `azimut-cms` ⚠️ **IMPORTANTE!**
- **Framework:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Variáveis necessárias:**
  - `DATABASE_URL` (Neon DB)
  - `SITE_URL` (https://azmt.com.br)

---

## ✅ COMMITS IMPORTANTES

| Commit | Data | Descrição |
|--------|------|-----------|
| `abdd4f9` | 26/12/2025 | Criado `.vercelignore` para resolver stack overflow |
| `cabfd55` | 26/12/2025 | Limpeza de pastas desnecessárias (.cursor, .vscode, scripts, dist, zips) |
| `3e40e09` | 26/12/2025 | `.gitignore` melhorado para proteger contra uploads acidentais |

---

## 🎯 BENEFÍCIOS DA LIMPEZA

✅ **Git push/pull 99% mais rápido** (sem 20.000 arquivos)  
✅ **Build no Vercel sem stack overflow**  
✅ **Repositório limpo e profissional**  
✅ **Menos espaço ocupado localmente**  
✅ **Fácil de entender a estrutura**  
✅ **Backup seguro do projeto antigo**  

---

## ⚠️ LEMBRETE IMPORTANTE

### NUNCA COMMITE:
- ❌ `node_modules/`
- ❌ `.next/`
- ❌ `.env.local`
- ❌ Backups
- ❌ Scripts temporários

### O `.gitignore` PROTEGE CONTRA ISSO! 🔒

Se você executar `npm install` e depois `git status`, o Git **NÃO VAI DETECTAR** o node_modules. Isso é o comportamento correto!

---

## 📞 BANCO DE DADOS

### Neon DB (PostgreSQL):
- **Host:** `ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech`
- **Database:** `neondb`
- **Connection String:** Está em `.env.local` (não commitado no Git)

### Como aplicar migrações:
```bash
cd azimut-cms
npx prisma migrate dev
```

### Como popular dados iniciais:
```bash
cd azimut-cms
npx prisma db seed
```

---

## 🔧 COMANDOS ÚTEIS

### Limpar tudo e reinstalar:
```bash
# Remover node_modules
Remove-Item -Recurse -Force node_modules
cd azimut-cms
Remove-Item -Recurse -Force node_modules

# Reinstalar
cd ..
npm install
cd azimut-cms
npm install
```

### Ver tamanho do projeto:
```bash
# Total de arquivos
Get-ChildItem -Recurse -File | Measure-Object | Select-Object -ExpandProperty Count

# Sem node_modules
Get-ChildItem -Recurse -File -Exclude node_modules | Measure-Object | Select-Object -ExpandProperty Count
```

---

**🎉 PROJETO LIMPO E ORGANIZADO!**

