# 🎯 Próximos Passos Prioritários - Azimut Site

## 📊 Status Atual

✅ **Site Principal** - Implementado e funcionando  
✅ **Backoffice/CMS** - Código completo, precisa deploy  
✅ **Integração** - Código pronto (analytics.ts, useAzimutContent.ts)  
⏳ **Deploy CMS** - Pendente  
⏳ **Configuração** - Variáveis de ambiente pendentes  

---

## 🚀 PRIORIDADE 1: Deploy do Backoffice/CMS

### Objetivo
Colocar o CMS no ar para que o site possa consumir as APIs.

### Passos:

#### 1.1. Verificar/Criar Projeto na Vercel
1. Acesse: https://vercel.com/dashboard
2. Verifique se existe projeto `azimut-backoffice`
3. Se não existir, crie novo projeto conectando ao GitHub

#### 1.2. Configurar Root Directory
1. **Settings** → **General**
2. **Root Directory**: `azimut-cms`
3. **Framework Preset**: Next.js
4. **Build Command**: `npm run build`
5. **Output Directory**: `.next`

#### 1.3. Configurar Variáveis de Ambiente
**Settings** → **Environment Variables** → Adicione:

```bash
# Obrigatórias
DATABASE_URL=postgresql://usuario:senha@host:5432/database
JWT_SECRET=azimut-cms-secret-jwt-2025-production-change-me
NODE_ENV=production

# Supabase (para storage de imagens)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJh...

# Opcional (para IA)
AI_PROVIDER=deepseek
DEEPSEEK_API_KEY=sk-...

# Site URL
SITE_URL=https://azmt.com.br
```

⚠️ **Importante:**
- Marque todas as variáveis para **Production**, **Preview** e **Development**
- Substitua valores de exemplo pelos reais

#### 1.4. Fazer Deploy
**Opção A - Via GitHub (Recomendado):**
```bash
cd azimut-cms
git add .
git commit -m "Preparar deploy"
git push origin main
```

**Opção B - Manual:**
- Na Vercel: **Deployments** → **Redeploy**

#### 1.5. Executar Seed (Criar usuário admin)
```bash
cd azimut-cms
npm install
# Configure .env.local com as mesmas variáveis
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

Isso cria:
- Usuário admin: `admin@azimut.com.br`
- Senha: `Azimut2025!`

#### 1.6. Testar CMS
1. Acesse: `https://azimut-backoffice.vercel.app`
2. Teste login: `/login`
3. Teste API: `https://azimut-backoffice.vercel.app/api/geo`

---

## 🔗 PRIORIDADE 2: Integrar Site com CMS

### Objetivo
Conectar o site principal ao CMS para usar conteúdo dinâmico e tracking.

### Passos:

#### 2.1. Criar arquivo `.env` no site principal
Na raiz do projeto (`azimut-site-vite-tailwind`):

```bash
# URL do CMS (ajuste após deploy)
VITE_CMS_API_URL=https://azimut-backoffice.vercel.app/api
```

#### 2.2. Adicionar variável na Vercel (site principal)
1. Acesse projeto do site na Vercel
2. **Settings** → **Environment Variables**
3. Adicione: `VITE_CMS_API_URL=https://azimut-backoffice.vercel.app/api`
4. Marque para **Production**, **Preview** e **Development**

#### 2.3. Verificar integração nas páginas
O código já está pronto! Verifique se está sendo usado:

- ✅ `src/utils/analytics.ts` - Tracking implementado
- ✅ `src/hooks/useAzimutContent.ts` - Hook para conteúdo
- ⏳ Verificar se páginas estão usando

**Páginas que devem usar:**
- `src/pages/Home.tsx` - Usar `useAzimutContent`
- `src/pages/Contact.tsx` - Usar `submitLead`
- `src/pages/Work.tsx` - Usar `trackProjectInteraction`

#### 2.4. Testar integração
1. Rode o site: `npm run dev`
2. Abra DevTools → Network
3. Navegue pelo site
4. Verifique se há chamadas para `/api/track` e `/api/public/content`

---

## 🧪 PRIORIDADE 3: Testes e Validação

### Objetivo
Garantir que tudo funciona end-to-end.

### Checklist:

#### 3.1. Testes do CMS
- [ ] Login funciona
- [ ] Dashboard carrega
- [ ] Upload de imagem funciona
- [ ] API `/api/geo` retorna país
- [ ] API `/api/public/content` retorna conteúdo
- [ ] API `/api/track` aceita eventos
- [ ] API `/api/leads` cria leads

#### 3.2. Testes do Site
- [ ] Site carrega normalmente
- [ ] Tracking envia dados (verificar Network tab)
- [ ] Conteúdo personalizado aparece (se implementado)
- [ ] Formulário de contato envia lead
- [ ] Budget Wizard funciona

#### 3.3. Testes de Integração
- [ ] Site consegue acessar APIs do CMS
- [ ] Tracking funciona em todas as páginas
- [ ] Leads são capturados no banco
- [ ] IA analisa comportamento (se configurada)

---

## 🤖 PRIORIDADE 4: Configurar IA (Opcional)

### Objetivo
Ativar análise inteligente de visitantes.

### Opções:

#### Opção 1: DeepSeek (Recomendado - Barato)
1. Acesse: https://platform.deepseek.com/
2. Crie conta (grátis para começar)
3. Gere API Key
4. Adicione no CMS: `DEEPSEEK_API_KEY=sk-...`

#### Opção 2: Gemini (Google - Gratuito)
1. Acesse: https://makersuite.google.com/app/apikey
2. Gere API Key
3. No CMS: `AI_PROVIDER=gemini` + `GEMINI_API_KEY=...`

#### Opção 3: OpenAI (Pago)
1. Acesse: https://platform.openai.com/
2. Gere API Key
3. No CMS: `AI_PROVIDER=openai` + `OPENAI_API_KEY=sk-...`

---

## 📊 PRIORIDADE 5: Monitoramento

### Objetivo
Acompanhar funcionamento e métricas.

### Configurar:

#### 5.1. Logs da Vercel
- Acesse: **Deployments** → Clique no deploy → **Logs**
- Monitore erros recorrentes

#### 5.2. Prisma Studio (Local)
```bash
cd azimut-cms
npm run prisma:studio
```
Acesse: http://localhost:5555
- Veja leads capturados
- Veja sessões de visitantes
- Veja scores calculados pela IA

#### 5.3. Dashboard do CMS
- Acesse: `https://azimut-backoffice.vercel.app/admin`
- Veja estatísticas de visitantes e leads

---

## 🎯 Resumo Rápido

### Para colocar tudo no ar (30 minutos):

1. **Deploy CMS** (15 min)
   - Configurar Vercel
   - Adicionar variáveis de ambiente
   - Fazer deploy
   - Executar seed

2. **Integrar Site** (10 min)
   - Adicionar `VITE_CMS_API_URL` no site
   - Fazer redeploy do site

3. **Testar** (5 min)
   - Testar APIs
   - Testar tracking
   - Testar formulário

### Próximos passos após deploy:

- Configurar IA (DeepSeek/Gemini)
- Adicionar mais conteúdo no CMS
- Personalizar conteúdo por geolocalização
- Configurar notificações de email para leads

---

## 📚 Documentação de Referência

- **Deploy CMS**: `azimut-cms/DEPLOY_AGORA.md`
- **Checklist**: `azimut-cms/CHECKLIST_DEPLOY.md`
- **Integração**: `azimut-cms/INTEGRATION_GUIDE.md`
- **Setup Supabase**: `azimut-cms/SETUP_RAPIDO_SUPABASE.md`
- **Setup DeepSeek**: `azimut-cms/DEEPSEEK_SETUP.md`

---

**🚀 Comece pela PRIORIDADE 1 para colocar o CMS no ar!**

