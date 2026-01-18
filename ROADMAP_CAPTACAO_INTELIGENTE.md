# 🎯 ROADMAP: Sistema de Captação Inteligente com IA

> **Criado:** 18/01/2026 | **Status:** Em Implementação

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Fases de Implementação](#fases)
4. [Arquivos Criados](#arquivos)
5. [Próximos Passos](#próximos)

---

## 🎯 VISÃO GERAL {#visão-geral}

### Objetivo
Sistema que pesquisa e conhece o lead ANTES de falar com ele, gerando comunicação natural e personalizada.

### Resultado Esperado
- Email genérico → Email que parece escrito por humano que conhece a pessoa
- Chatbot robótico → Chatbot que faz small talk baseado em dados reais
- Taxa de resposta 3x maior

---

## 🏗️ ARQUITETURA {#arquitetura}

```
[Lead chega] → [Captura] → [Pesquisa IA] → [Perfil] → [Ação Personalizada]
     │            │            │              │              │
   Form        IP/páginas   LinkedIn      Estruturado    Email
   Chat        visitadas    Google        JSON           Chat
   WhatsApp    origem       Redes                        WhatsApp
```

---

## 📅 FASES DE IMPLEMENTAÇÃO {#fases}

### ✅ FASE 0: Preparação (CONCLUÍDA)
- [x] Estrutura de pastas criada
- [x] SQL do banco de dados
- [x] Configuração n8n (docker-compose)
- [x] Código de integração (TypeScript)
- [x] Prompts do Claude
- [x] Documentação de workflows

### 🔄 FASE 1: Infraestrutura (PRÓXIMA)
- [ ] Deploy n8n (Railway ou VPS)
- [ ] Criar contas: Proxycurl, SerpAPI
- [ ] Configurar variáveis de ambiente
- [ ] Executar SQL no banco
- [ ] Testar conexões

### 📝 FASE 2: Enriquecimento
- [ ] Criar workflow no n8n
- [ ] Integrar Proxycurl
- [ ] Integrar SerpAPI
- [ ] Integrar Claude
- [ ] Salvar no banco
- [ ] Notificações

### 📧 FASE 3: Comunicação
- [ ] Templates de email
- [ ] Workflow de envio
- [ ] Integração Resend
- [ ] Follow-up automático
- [ ] Tracking

### 🤖 FASE 4: Chatbot
- [ ] Atualizar ClaudeAssistant.tsx
- [ ] API de contexto
- [ ] Histórico de conversa
- [ ] Testes

---

## 📁 ARQUIVOS CRIADOS {#arquivos}

### Estrutura de Pastas
```
azimut-site-vite-tailwind/
├── sql/
│   └── enrichment_schema.sql          ✅ Criado
├── n8n/
│   ├── docker-compose.yml             ✅ Criado
│   └── .env.example                   ✅ Criado
├── src/
│   └── api/
│       └── enrichment.ts              ✅ Criado
└── docs/
    ├── claude-prompts.md              ✅ Criado
    └── n8n-workflows.md               ✅ Criado
```

### Descrição dos Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `sql/enrichment_schema.sql` | Schema completo do banco (tabelas, índices, views) |
| `n8n/docker-compose.yml` | Configuração Docker para n8n |
| `n8n/.env.example` | Template de variáveis de ambiente |
| `src/api/enrichment.ts` | Funções TypeScript para integração |
| `docs/claude-prompts.md` | Prompts otimizados para Claude |
| `docs/n8n-workflows.md` | Guia de workflows do n8n |

---

## 🚀 PRÓXIMOS PASSOS {#próximos}

### 1. Deploy do n8n

**Opção A: Railway (Recomendado)**
1. Criar conta em https://railway.app
2. New Project → Deploy from GitHub
3. Usar `n8n/docker-compose.yml`
4. Configurar variáveis de ambiente

**Opção B: VPS**
```bash
cd n8n
docker-compose up -d
```

### 2. Configurar APIs

| API | Link | Ação |
|-----|------|------|
| Proxycurl | https://nubela.co/proxycurl | Criar conta, pegar API key |
| SerpAPI | https://serpapi.com | Criar conta, pegar API key |
| Resend | https://resend.com | Já tem? Verificar key |

### 3. Executar SQL

```bash
# Conectar no Neon
psql $NEON_DATABASE_URL

# Executar schema
\i sql/enrichment_schema.sql
```

### 4. Criar Workflows no n8n

1. Acessar n8n (http://localhost:5678)
2. Importar workflows de `docs/n8n-workflows.md`
3. Configurar credenciais
4. Testar com lead de teste

---

## 💰 CUSTOS MENSAIS

| Ferramenta | Custo | Status |
|------------|-------|--------|
| n8n (self-hosted) | ~$20 | Pendente |
| Claude API | ~$20 | ✅ Já tem |
| Proxycurl | $49 | Pendente |
| SerpAPI | $50 | Pendente |
| Resend | $0 | ✅ Já tem |

**Total:** ~$140/mês

---

## ✅ CHECKLIST GERAL

### Infraestrutura
- [ ] n8n deployado
- [ ] APIs configuradas
- [ ] Banco atualizado
- [ ] Variáveis de ambiente

### Enriquecimento
- [ ] Workflow funcionando
- [ ] Perfis sendo salvos
- [ ] Notificações chegando

### Comunicação
- [ ] Emails sendo enviados
- [ ] Tracking funcionando
- [ ] Follow-up automático

### Chatbot
- [ ] Contexto sendo usado
- [ ] Histórico sendo salvo
- [ ] Testes passando

---

## 🔗 LINKS ÚTEIS

- n8n Docs: https://docs.n8n.io
- Proxycurl: https://nubela.co/proxycurl/docs
- SerpAPI: https://serpapi.com/search-api
- Claude API: https://docs.anthropic.com
- Resend: https://resend.com/docs

---

**Última atualização:** 18/01/2026
