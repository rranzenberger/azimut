# 🚀 PRÓXIMO PASSO: Deploy do n8n

## ✅ Você já tem (ou está prestes a ter):

1. ✅ SerpAPI Key
2. ✅ Resend Key
3. ⏳ Claude Key (criar agora se ainda não tiver)

---

## 🎯 AGORA: Fazer Deploy do n8n

Você tem **3 opções**:

---

### OPÇÃO A: Railway.app (MAIS FÁCIL - RECOMENDADO) ⭐

**Vantagens:**
- ✅ Deploy automático
- ✅ Grátis para começar
- ✅ Fácil de configurar
- ✅ URL automática

**Passos:**
1. Acessar: https://railway.app
2. Sign Up (pode usar GitHub)
3. New Project → Deploy from GitHub
4. Conectar repositório (ou criar novo)
5. Adicionar n8n service
6. Configurar variáveis de ambiente (as 3 API keys)
7. Deploy automático
8. **Pegar URL:** `https://seu-projeto.railway.app`

**Custo:** Free tier disponível, depois ~$5-20/mês

---

### OPÇÃO B: VPS (DigitalOcean, AWS, etc)

**Vantagens:**
- ✅ Mais controle
- ✅ Custo fixo (~$5-10/mês)

**Passos:**
1. Criar VPS (Ubuntu 22.04)
2. Instalar Docker: `curl -fsSL https://get.docker.com | sh`
3. Instalar Docker Compose
4. Copiar `n8n/docker-compose.yml`
5. Criar `.env` com as API keys
6. `docker-compose up -d`
7. **Pegar URL:** `http://seu-ip:5678`

**Custo:** ~$5-10/mês (VPS básico)

---

### OPÇÃO C: Local (Para Testes)

**Vantagens:**
- ✅ Grátis
- ✅ Bom para testar

**Passos:**
1. Instalar Docker Desktop
2. Copiar `n8n/docker-compose.yml`
3. Criar `.env` com as API keys
4. `docker-compose up -d`
5. **Acessar:** `http://localhost:5678`

**Custo:** Grátis (só roda no seu PC)

---

## 📝 CONFIGURAÇÃO DAS API KEYS NO N8N

Depois do deploy, você precisa adicionar as keys:

### Se usar Railway/VPS:
Adicionar como **Environment Variables**:
```
SERPAPI_KEY=d2ab112c03ced773aeb5ca38fb9f541bb62de0d8818ca222cc2530f4a7f32888
RESEND_API_KEY=re_6SVbbww8_JsVHjW3mXqEfkCA1UzgKCkov
CLAUDE_API_KEY=xxxxx
```

### Se usar Local:
Criar arquivo `.env` na pasta `n8n/`:
```
SERPAPI_KEY=d2ab112c03ced773aeb5ca38fb9f541bb62de0d8818ca222cc2530f4a7f32888
RESEND_API_KEY=re_6SVbbww8_JsVHjW3mXqEfkCA1UzgKCkov
CLAUDE_API_KEY=xxxxx
```

---

## 🎯 RECOMENDAÇÃO:

**Para começar rápido:** Opção A (Railway.app)
**Para economizar:** Opção C (Local para testes)
**Para produção:** Opção B (VPS)

---

## ✅ CHECKLIST COMPLETO:

- [ ] Ter as 3 API keys (SerpAPI, Resend, Claude)
- [ ] Escolher onde fazer deploy (Railway, VPS ou Local)
- [ ] Fazer deploy do n8n
- [ ] Configurar as 3 API keys
- [ ] Acessar interface do n8n
- [ ] Criar workflow básico
- [ ] Testar webhook

---

## 📚 ARQUIVOS DE REFERÊNCIA:

- `n8n/docker-compose.yml` - Configuração Docker
- `n8n/.env.example` - Exemplo de variáveis
- `docs/n8n-workflows.md` - Como criar workflows
- `SETUP_ECONOMICO.md` - Guia completo

---

**Qual opção você quer usar? Railway, VPS ou Local?** 🚀
