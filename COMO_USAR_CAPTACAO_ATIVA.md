# 🎯 COMO USAR: CAPTAÇÃO ATIVA DE LEADS EXTERNOS

## 📋 RESUMO:

Sistema para captar leads de fontes externas (LinkedIn, Instagram, produtoras, etc.), avaliar se vale a pena contactar e enviar emails personalizados e amigáveis.

---

## 🚀 PASSO A PASSO:

### **1. Executar SQL no Banco**

```sql
-- Execute o arquivo: sql/external_leads_schema.sql
```

Isso cria:
- Tabela `external_leads`
- Tabela `external_lead_emails`
- Tabela `lead_sources`
- Índices para performance

---

### **2. Importar Workflow n8n**

1. Acesse seu n8n: `https://seu-n8n.up.railway.app`
2. Vá em **Workflows**
3. Clique em **"Add workflow"**
4. Clique nos **3 pontinhos (⋮)**
5. Selecione **"Import from File"**
6. Escolha: `n8n-workflow-captacao-ativa.json`
7. **Configure credenciais:**
   - SerpAPI (já configurada)
   - Claude (já configurada)
   - PostgreSQL (já configurada)

---

### **3. Executar Captação**

**Opção A: Manual (Teste)**
1. No workflow, clique em **"Execute Workflow"**
2. Aguarde processar
3. Veja os leads captados

**Opção B: Agendado (Automático)**
1. Substitua "Manual Trigger" por **"Schedule Trigger"**
2. Configure para rodar diariamente
3. Leads serão captados automaticamente

---

### **4. Buscar Leads Específicos**

**No n8n, antes de executar, você pode definir:**

```json
{
  "source": "linkedin",
  "searchQuery": "produtor audiovisual Brasil",
  "location": "Brazil"
}
```

**Ou:**

```json
{
  "source": "instagram",
  "searchQuery": "#produtoraaudiovisual",
  "location": "Brazil"
}
```

**Ou:**

```json
{
  "source": "creative_bc",
  "searchQuery": "video editor Vancouver",
  "location": "Canada"
}
```

---

### **5. Ver Leads Captados no Backoffice**

1. Acesse: `https://backoffice.azmt.com.br/admin/external-leads`
2. Veja todos os leads captados
3. Filtre por temperatura (Frio/Morno/Quente)
4. Veja scoring e dados enriquecidos

---

### **6. Enviar Email Personalizado**

**Para leads "Quentes" (score >= 70):**

1. No backoffice, encontre o lead
2. Clique em **"Gerar Email Personalizado"**
3. Claude gera email baseado em:
   - Nome e cargo
   - Projetos encontrados
   - Interesses (futebol, aventura, etc.)
   - Tom natural e amigável
4. Revise o email
5. Clique em **"Enviar Email"**
6. Email é enviado via Resend

---

## 📊 FONTES DE LEADS:

### **1. LinkedIn**
- **Busca:** "produtor audiovisual Brasil"
- **Busca:** "editor de vídeo Canadá"
- **Busca:** "produtora cultural"

### **2. Instagram**
- **Hashtags:** #produtoraaudiovisual #editorvideo
- **Perfis:** Produtoras conhecidas
- **Portfólios:** Behance, Vimeo

### **3. Secretaria de Cultura**
- **Listas públicas** de produtores cadastrados
- **Diretórios** de editais

### **4. NFB (National Film Board)**
- **Diretório** de produtores
- **Banco de talentos**

### **5. Creative BC**
- **Banco de talentos**
- **Diretório** de empresas criativas

---

## 🎯 SCORING AUTOMÁTICO:

**Critérios (0-100 pontos):**

- **Cargo/Área (0-30):**
  - Produtor audiovisual: +25
  - Editor de vídeo: +20
  - Produtor cultural: +20
  - Interessado em estudar no Canadá: +15

- **Empresa/Organização (0-25):**
  - NFB, Creative BC: +25
  - Produtora conhecida: +20
  - Empresa relevante: +15

- **Projetos/Portfólio (0-25):**
  - Projetos relevantes: +25
  - Portfólio online: +15

- **Engajamento Social (0-20):**
  - LinkedIn ativo: +10
  - Instagram profissional: +10

**Classificação:**
- **0-40:** Frio (Cold) - Não contactar
- **41-69:** Morno (Warm) - Avaliar manualmente
- **70-100:** Quente (Hot) - Contactar

---

## 📧 EMAIL PERSONALIZADO:

**Exemplo gerado pelo Claude:**

```
Olá João,

Vi que você trabalha como Produtor Audiovisual na Empresa X e fiquei impressionado com seu projeto "Nome do Projeto".

Somos a Azimut, um estúdio especializado em experiências imersivas VR/AR e cinema interativo, atuando entre Brasil e Canadá desde 1996.

Vi que você é fã do Flamengo - também adoro futebol! 

Seus projetos em realidade virtual são exatamente o tipo de trabalho que admiramos.

Gostaria de saber se você tem interesse em:
- Estudar no Canadá (VFS/VanArts)
- Projetos de realidade virtual/aumentada
- Cinema interativo
- Exposições culturais

Podemos conversar? Seria um prazer conhecer melhor seu trabalho!

Abraços,
Equipe Azimut
```

---

## ✅ CHECKLIST:

- [ ] SQL executado (external_leads_schema.sql)
- [ ] Workflow importado no n8n
- [ ] Credenciais configuradas
- [ ] Teste manual executado
- [ ] Leads captados verificados
- [ ] Backoffice acessado
- [ ] Email personalizado testado

---

**Tudo pronto para captar leads externos!** 🚀
