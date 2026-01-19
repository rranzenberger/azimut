# 🎯 SISTEMA DE CAPTAÇÃO ATIVA DE LEADS EXTERNOS

## 🎯 OBJETIVO:

Captar leads de fontes externas (não do site) e avaliar se vale a pena contactar:
- Secretaria de Cultura
- NFB (National Film Board) Canadá
- Creative BC
- Editores de vídeo
- Produtoras
- Interessados em estudar no Canadá
- Produtores audiovisuais
- Produtores culturais

**E avaliar:**
- ✅ Rastrear LinkedIn, Instagram, redes sociais
- ✅ Classificar: Frio / Morno / Quente
- ✅ Ver preferências (futebol, aventura, projetos)
- ✅ Enviar email natural e amigável (não robótico)

---

## 🏗️ ARQUITETURA:

```
┌─────────────────────────────────────────────────────────┐
│  FONTES DE LEADS EXTERNOS                                │
├─────────────────────────────────────────────────────────┤
│  • Secretaria de Cultura (listas públicas)              │
│  • NFB Canadá (diretório de produtores)                 │
│  • Creative BC (banco de talentos)                        │
│  • LinkedIn (busca por cargo/empresa)                    │
│  • Instagram (hashtags, perfis públicos)                │
│  • Editores de vídeo (portfólios online)                │
│  • Produtoras (sites, diretórios)                       │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  n8n WORKFLOW: Captação Ativa                            │
├─────────────────────────────────────────────────────────┤
│  1. Trigger Manual ou Agendado                          │
│  2. Buscar Leads (SerpAPI - Google/LinkedIn)            │
│  3. Enriquecer Perfil (Claude AI)                       │
│  4. Scoring Automático (Frio/Morno/Quente)              │
│  5. Salvar no Banco (PostgreSQL)                        │
│  6. Gerar Email Personalizado (Claude)                   │
│  7. Enviar Email (Resend) - Apenas Quentes              │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  BACKOFFICE: Gerenciar Leads Externos                   │
├─────────────────────────────────────────────────────────┤
│  • Listar leads captados                                 │
│  • Ver scoring (Frio/Morno/Quente)                       │
│  • Ver dados enriquecidos (preferências, projetos)      │
│  • Aprovar envio de email                                │
│  • Enviar email manualmente                              │
│  • Rastrear respostas                                    │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 COMPONENTES NECESSÁRIOS:

### **1. Banco de Dados**

**Nova tabela:** `external_leads`

```sql
CREATE TABLE IF NOT EXISTS external_leads (
  id TEXT PRIMARY KEY,
  source VARCHAR(100) NOT NULL, -- 'secretaria_cultura', 'nfb', 'creative_bc', 'linkedin', etc.
  name VARCHAR(200),
  email VARCHAR(200),
  company VARCHAR(200),
  phone VARCHAR(50),
  linkedin_url VARCHAR(500),
  instagram_url VARCHAR(500),
  website VARCHAR(500),
  role VARCHAR(200), -- Cargo detectado
  location VARCHAR(200), -- Cidade/País
  bio TEXT, -- Biografia/descrição
  interests JSONB, -- {sports: [], hobbies: [], etc}
  projects JSONB, -- Projetos encontrados
  social_media_data JSONB, -- Dados brutos das redes
  lead_score INTEGER DEFAULT 0, -- 0-100
  lead_temperature VARCHAR(20) DEFAULT 'cold', -- 'cold', 'warm', 'hot'
  scoring_reason TEXT, -- Por que foi classificado assim
  enrichment_status VARCHAR(20) DEFAULT 'pending',
  enriched_at TIMESTAMP,
  email_sent BOOLEAN DEFAULT false,
  email_sent_at TIMESTAMP,
  email_opened BOOLEAN DEFAULT false,
  email_opened_at TIMESTAMP,
  email_replied BOOLEAN DEFAULT false,
  email_replied_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

### **2. n8n Workflow: Captação Ativa**

**Workflow:** `captacao-ativa-leads`

**Nodes:**
1. **Manual Trigger** (ou Schedule - diário)
2. **Set** → Define fonte e critérios de busca
3. **SerpAPI** → Busca no Google/LinkedIn
4. **Code** → Processa resultados e extrai perfis
5. **Claude AI** → Analisa perfil e gera scoring
6. **PostgreSQL** → Salva lead externo
7. **IF** → Se score >= 70 (Quente), gera email
8. **Claude AI** → Gera email personalizado
9. **Resend** → Envia email (opcional - pode ser manual)

---

### **3. Sistema de Scoring**

**Critérios (0-100 pontos):**

- **Cargo/Área (0-30 pontos):**
  - Produtor audiovisual: +25
  - Editor de vídeo: +20
  - Produtor cultural: +20
  - Interessado em estudar no Canadá: +15
  - Outros: +5

- **Empresa/Organização (0-25 pontos):**
  - NFB, Creative BC, Secretaria Cultura: +25
  - Produtora conhecida: +20
  - Empresa relevante: +15
  - Freelancer: +10

- **Projetos/Portfólio (0-25 pontos):**
  - Projetos relevantes encontrados: +25
  - Portfólio online: +15
  - Menções em mídia: +10

- **Engajamento Social (0-20 pontos):**
  - LinkedIn ativo: +10
  - Instagram profissional: +10
  - Muitos seguidores: +5

**Classificação:**
- **0-40 pontos:** Frio (Cold) - Não contactar
- **41-69 pontos:** Morno (Warm) - Avaliar manualmente
- **70-100 pontos:** Quente (Hot) - Contactar

---

### **4. Templates de Email Personalizados**

**Gerados pelo Claude com base em:**
- Nome e cargo
- Projetos encontrados
- Interesses (futebol, aventura, etc.)
- Origem/cidade
- Tom natural e amigável

**Exemplo:**
```
Olá [Nome],

Vi que você trabalha como [Cargo] na [Empresa] e fiquei impressionado com [Projeto específico que encontramos].

Somos a Azimut, um estúdio especializado em experiências imersivas VR/AR e cinema interativo, atuando entre Brasil e Canadá desde 1996.

[Se gosta de futebol:] Vi que você é fã do [Time] - também adoro futebol! 

[Se tem projetos relevantes:] Seus projetos em [Área] são exatamente o tipo de trabalho que admiramos.

Gostaria de saber se você tem interesse em:
- Estudar no Canadá (VFS/VanArts)
- Projetos de realidade virtual/aumentada
- Cinema interativo
- Exposições culturais

Podemos conversar? Seria um prazer conhecer melhor seu trabalho!

Abraços,
[Assinatura Azimut]
```

---

### **5. Backoffice: Página de Leads Externos**

**Rota:** `/admin/external-leads`

**Funcionalidades:**
- Listar leads captados por fonte
- Filtrar por temperatura (Frio/Morno/Quente)
- Ver dados enriquecidos (preferências, projetos)
- Aprovar envio de email
- Enviar email manualmente
- Ver histórico de emails enviados
- Rastrear aberturas/respostas

---

## 🚀 IMPLEMENTAÇÃO:

### **Fase 1: Banco de Dados e Schema**

1. Criar tabela `external_leads`
2. Adicionar índices
3. Criar relacionamentos (se necessário)

### **Fase 2: n8n Workflow**

1. Criar workflow "Captação Ativa"
2. Configurar busca SerpAPI
3. Configurar análise Claude
4. Configurar scoring
5. Configurar salvamento no banco

### **Fase 3: Backoffice**

1. Criar página `/admin/external-leads`
2. Listar leads externos
3. Mostrar scoring e dados enriquecidos
4. Botão para aprovar/envio de email

### **Fase 4: Email Personalizado**

1. Integrar Claude para gerar emails
2. Integrar Resend para envio
3. Rastrear aberturas/respostas

---

## 📊 FONTES DE LEADS:

### **1. Secretaria de Cultura**
- Listas públicas de produtores cadastrados
- Diretórios de editais
- Sites governamentais

### **2. NFB (National Film Board) Canadá**
- Diretório de produtores
- Banco de talentos
- Projetos financiados

### **3. Creative BC**
- Banco de talentos
- Diretório de empresas criativas
- Eventos e networking

### **4. LinkedIn**
- Busca por cargo: "Editor de vídeo", "Produtor audiovisual"
- Busca por empresa: "Produtora", "Estúdio"
- Busca por localização: "Brasil", "Canadá"

### **5. Instagram**
- Hashtags: #produtoraaudiovisual #editorvideo
- Perfis de produtoras
- Portfólios visuais

### **6. Editores de Vídeo**
- Portfólios online (Vimeo, YouTube)
- Diretórios profissionais
- Sites de freelancers

---

## 🎯 PRÓXIMOS PASSOS:

1. **Criar schema SQL** para `external_leads`
2. **Criar workflow n8n** de captação ativa
3. **Criar página backoffice** para gerenciar
4. **Implementar scoring** automático
5. **Criar templates** de email personalizados

---

**Vou criar tudo isso agora!** 🚀
