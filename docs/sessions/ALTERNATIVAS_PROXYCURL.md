# 🔄 Proxycurl Desligado - Alternativas

## ⚠️ Situação Atual

**Proxycurl foi desligado** e não está mais aceitando novos cadastros. A empresa migrou para o **NinjaPear** (helpdesk B2B).

---

## ✅ ALTERNATIVAS PARA ENRIQUECIMENTO DE LEADS

### 1. **Apollo.io** (RECOMENDADO) ⭐
**Link:** https://www.apollo.io

**O que faz:**
- Enriquecimento de perfis LinkedIn
- Dados de empresas
- Emails verificados
- Informações de contato

**Preço:**
- Free: 50 leads/mês
- Basic: $49/mês (10.000 leads)
- Professional: $99/mês (50.000 leads)

**API:** ✅ Sim, REST API completa

---

### 2. **Clearbit** 
**Link:** https://clearbit.com

**O que faz:**
- Enriquecimento de emails
- Dados de empresas
- Tecnologias usadas
- Funding e revenue

**Preço:**
- Free: 100 req/mês
- Starter: $99/mês (1.000 req)
- Growth: $299/mês (10.000 req)

**API:** ✅ Sim, REST API

---

### 3. **Hunter.io**
**Link:** https://hunter.io

**O que faz:**
- Encontrar emails por domínio
- Verificar emails
- Dados de empresas

**Preço:**
- Free: 25 req/mês
- Starter: $49/mês (500 req)
- Growth: $149/mês (5.000 req)

**API:** ✅ Sim

---

### 4. **Lusha**
**Link:** https://www.lusha.com

**O que faz:**
- Enriquecimento de perfis
- Dados de contato
- Informações de empresas

**Preço:**
- Free: 5 leads/mês
- Pro: $39/mês (40 leads)
- Scale: $99/mês (200 leads)

**API:** ✅ Sim

---

### 5. **ZoomInfo** (Enterprise)
**Link:** https://www.zoominfo.com

**O que faz:**
- Base de dados B2B gigante
- Enriquecimento completo
- Intent data

**Preço:**
- Enterprise: $15.000+/ano
- API disponível

**API:** ✅ Sim (Enterprise)

---

## 🎯 RECOMENDAÇÃO PARA O AZIMUT

### Opção A: Apollo.io (Melhor Custo-Benefício)
- ✅ API fácil de integrar
- ✅ Bom para começar ($49/mês)
- ✅ Dados de LinkedIn
- ✅ Suporte a múltiplos países (BR, CA)

### Opção B: Clearbit + Hunter.io (Combo)
- ✅ Clearbit: dados de empresas
- ✅ Hunter: encontrar emails
- ✅ Custo total: ~$148/mês

### Opção C: Começar sem Enriquecimento Externo
- ✅ Usar apenas SerpAPI (Google Search)
- ✅ Usar dados do próprio formulário
- ✅ Adicionar enriquecimento depois

---

## 📝 ATUALIZAÇÃO DO SISTEMA

### O que mudar:

1. **Substituir Proxycurl por Apollo.io** (ou outra alternativa)
2. **Atualizar n8n workflows** para usar nova API
3. **Atualizar código** em `src/api/enrichment.ts`

### Estrutura mantida:
- ✅ SQL do banco (não muda)
- ✅ Estrutura de tabelas (não muda)
- ✅ Fluxo geral (não muda)
- ✅ Apenas a fonte de dados muda

---

## 🚀 PRÓXIMOS PASSOS

### Se escolher Apollo.io:

1. **Criar conta:** https://www.apollo.io
2. **Obter API Key:** Dashboard → Settings → API
3. **Anotar:** `APOLLO_API_KEY=xxxxx`
4. **Atualizar n8n workflow** (substituir Proxycurl por Apollo)
5. **Testar integração**

### Se escolher começar sem enriquecimento externo:

1. **Pular Proxycurl/Apollo por enquanto**
2. **Usar apenas SerpAPI** (Google Search)
3. **Usar dados do formulário** (nome, email, empresa)
4. **Adicionar enriquecimento depois** quando tiver mais leads

---

## 📚 DOCUMENTAÇÃO ATUALIZADA

- `ROADMAP_CAPTACAO_INTELIGENTE.md` - Atualizado
- `EXECUTAR_AGORA.md` - Atualizado com alternativas
- `docs/n8n-workflows.md` - Será atualizado com Apollo.io

---

**Recomendação:** Começar com **Apollo.io** ou **começar sem enriquecimento externo** e adicionar depois.
