# 🎯 Sistema de Enriquecimento de Leads - Guia Rápido

## 🚀 Setup Rápido

### 1. Executar SQL no Banco

**Opção A: Via Script (Linux/Mac)**
```bash
export DATABASE_URL="postgresql://user:pass@host/dbname"
bash scripts/setup-enrichment.sh
```

**Opção B: Via Script (Windows PowerShell)**
```powershell
$env:DATABASE_URL = "postgresql://user:pass@host/dbname"
.\scripts\setup-enrichment.ps1
```

**Opção C: Manual (pgAdmin ou psql)**
```sql
-- Conectar no banco e executar:
\i sql/enrichment_schema.sql
```

### 2. Deploy do n8n

**Railway (Recomendado)**
1. Criar conta em https://railway.app
2. New Project → Deploy from GitHub
3. Usar `n8n/docker-compose.yml`
4. Configurar variáveis de ambiente

**VPS Local**
```bash
cd n8n
cp .env.example .env
# Editar .env com suas keys
docker-compose up -d
```

### 3. Configurar APIs

| API | Link | Ação |
|-----|------|------|
| Proxycurl | https://nubela.co/proxycurl | Criar conta, pegar key |
| SerpAPI | https://serpapi.com | Criar conta, pegar key |
| Resend | https://resend.com | Verificar key existente |

### 4. Criar Workflows no n8n

1. Acessar n8n (http://localhost:5678 ou URL do Railway)
2. Seguir guia em `docs/n8n-workflows.md`
3. Configurar credenciais
4. Testar com lead de teste

---

## 📁 Estrutura de Arquivos

```
├── sql/
│   └── enrichment_schema.sql      # Schema do banco
├── n8n/
│   ├── docker-compose.yml          # Config Docker
│   └── .env.example               # Template de variáveis
├── src/api/
│   └── enrichment.ts              # API TypeScript
├── docs/
│   ├── claude-prompts.md          # Prompts otimizados
│   └── n8n-workflows.md          # Guia de workflows
├── scripts/
│   ├── setup-enrichment.sh       # Setup Linux/Mac
│   └── setup-enrichment.ps1      # Setup Windows
└── ROADMAP_CAPTACAO_INTELIGENTE.md
```

---

## 🔧 Variáveis de Ambiente Necessárias

```env
# n8n
N8N_PASSWORD=senha_forte
N8N_HOST=localhost
WEBHOOK_URL=http://localhost:5678

# Database
DATABASE_URL=postgresql://user:pass@host/dbname

# APIs
PROXYCURL_API_KEY=your_key
SERPAPI_KEY=your_key
CLAUDE_API_KEY=your_key
RESEND_API_KEY=your_key
```

---

## ✅ Checklist de Implementação

- [ ] SQL executado no banco
- [ ] n8n deployado e acessível
- [ ] APIs configuradas (Proxycurl, SerpAPI)
- [ ] Variáveis de ambiente configuradas
- [ ] Workflow de enriquecimento criado
- [ ] Workflow de email criado
- [ ] Teste com lead real

---

## 📚 Documentação Completa

- **Roadmap:** `ROADMAP_CAPTACAO_INTELIGENTE.md`
- **Prompts:** `docs/claude-prompts.md`
- **Workflows:** `docs/n8n-workflows.md`

---

**Última atualização:** 18/01/2026
