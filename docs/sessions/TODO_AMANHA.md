# 📋 PARA VOCÊ FAZER AMANHÃ
**Atualizado:** 2026-01-11 03:00 AM (MADRUGADA)

---

## 🚨 URGENTE - BUG CRÍTICO ENCONTRADO

### ❌ Problema: ServiceDetail.tsx (página vazia)
**Arquivo:** `CHECKPOINT_SERVICEDETAIL_2026-01-11.md` ← **LEIA ESTE PRIMEIRO!**

**Resumo:**
- Página `/pt/what/cinema-audiovisual` renderiza apenas 3 seções
- Todo o conteúdo principal (hero, descrição, deliverables, processo) **desaparece**
- Bug 100% reproduzível, causa desconhecida
- Tentativas de correção: **TODAS FALHARAM** (8 abordagens diferentes)

**WORKAROUND TEMPORÁRIO:**
```tsx
// Desabilitar rota por enquanto até descobrir causa:
// Em src/App.tsx, comentar:
// <Route path="/:lang/what/:slug" element={...ServiceDetail...} />
```

**Prioridade:** 🔴 **CRÍTICA** - Impede usuários de ver detalhes dos serviços

---

## ⚡ IMPLEMENTADO DURANTE A NOITE

### ✅ 1. Google Analytics 4
- **Arquivo criado:** `src/components/GoogleAnalytics.tsx`
- **Integrado em:** `src/App.tsx`
- **Status:** ✅ Pronto, mas precisa configurar ID

#### O QUE FAZER:
1. Criar conta Google Analytics 4 (se não tiver): https://analytics.google.com
2. Criar propriedade "Azimut Site"
3. Copiar o **Measurement ID** (formato: G-XXXXXXXXXX)
4. No Vercel → Settings → Environment Variables:
   - Nome: `VITE_GA_MEASUREMENT_ID`
   - Valor: `G-XXXXXXXXXX` (seu ID real)
   - Ambientes: Production, Preview, Development
5. Redeploy

**Benefício:** Você vai ver tudo: páginas visitadas, leads gerados, tempo no site, conversões!

---

### ✅ 2. Chatbot IA Melhorado
- **Arquivo atualizado:** `src/components/ClaudeAssistant.tsx`
- **Status:** ✅ Funcionando (detecção de perfil desabilitada temporariamente)

#### O QUE FAZER:
1. Testar no site: https://azmt.com.br
2. Abrir chatbot (canto inferior direito)
3. Enviar mensagens:
   - "Quero estudar VR em Vancouver"
   - "Preciso de um tour virtual para meu museu"
   - "Quanto custa uma produção 360°?"
4. Ver se IA responde corretamente

**Se não responder:**
- Verificar se API keys estão configuradas no Vercel
- Ver console F12 se tem erros

---

### ✅ 3. Tracking de Eventos
- **Arquivos criados:** Funções `trackEvent`, `trackConversion`, `trackInteraction`
- **Status:** ✅ Pronto para usar

**Como usar no backoffice:**
```typescript
import { trackConversion } from '@/components/GoogleAnalytics'

// Quando um lead for criado:
trackConversion('lead', {
  lead_type: 'academy',
  school: 'VanArts',
  value: 1500
})
```

---

### ✅ 4. Rota `/academy/research` Adicionada
- **Status:** ✅ Implementada no `App.tsx`
- **Componente:** `Research.tsx` (já existia)

---

## 🧪 TESTES OBRIGATÓRIOS

### 1. Site Principal (azmt.com.br)
- [ ] Acessar homepage
- [ ] Navegar para /academy/vancouver
- [ ] Clicar em "Calculate your investment" → deve rolar suavemente
- [ ] Ver se calculadora pisca (efeito pulse)
- [ ] Trocar idioma: PT → EN → ES → FR
- [ ] Ver se conteúdo muda corretamente
- [ ] **🔴 NÃO TESTAR `/what/:slug` (ServiceDetail) - TEM BUG**

### 2. Chatbot IA
- [ ] Abrir chatbot (ícone canto inferior direito)
- [ ] Enviar 3-5 mensagens
- [ ] Ver se respostas fazem sentido
- [ ] Verificar se badge mostra "Claude" ou "DeepSeek"

### 3. Formulários
- [ ] Vancouver → Consulta Gratuita
- [ ] Preencher e enviar
- [ ] Ver se chega no backoffice

### 4. Backoffice (azimut-backoffice.vercel.app)
- [ ] Login
- [ ] Dashboard de leads
- [ ] Ver se leads aparecem
- [ ] Editar um lead
- [ ] Ver insights IA (se tiver)

### 5. Console F12
- [ ] Abrir console em todas as páginas
- [ ] Verificar se NÃO tem erros vermelhos
- [ ] Se tiver, copiar e me enviar

---

## 🔑 CONFIGURAÇÕES PENDENTES

### Google Analytics
```bash
# No Vercel → Settings → Environment Variables
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### API Keys (se não configurou ainda)
```bash
# Site Principal
VITE_CLAUDE_API_KEY=sk-ant-...
VITE_DEEPSEEK_API_KEY=sk-...

# Backoffice
CLAUDE_API_KEY=sk-ant-...
DEEPSEEK_API_KEY=sk-...
DATABASE_URL=postgresql://...
```

**Como pegar:**
- Claude: https://console.anthropic.com/settings/keys
- DeepSeek: https://platform.deepseek.com/api_keys

---

## 📊 O QUE ESPERAR

### No Google Analytics (após 24h):
- Número de visitantes
- Páginas mais visitadas
- Tempo médio no site
- Taxa de conversão (leads)
- Origem do tráfego (Google, redes sociais, etc)

### No Chatbot:
- Respostas inteligentes e contextuais
- Custo baixo (90% DeepSeek, 10% Claude)
- Badge mostrando qual IA está respondendo

---

## ❓ SE ALGO NÃO FUNCIONAR

1. **Site não carrega / tela preta:**
   - F12 → Console → copiar erro
   - Me enviar

2. **Chatbot não responde:**
   - Verificar API keys no Vercel
   - Ver console F12

3. **Formulário não envia:**
   - Verificar DATABASE_URL no Vercel (backoffice)
   - Ver console F12

4. **Google Analytics não trackeia:**
   - Verificar se `VITE_GA_MEASUREMENT_ID` está configurado
   - Aguardar 24h para dados aparecerem

5. **🔴 Página de detalhes de serviços vazia:**
   - CONHECIDO! Leia `CHECKPOINT_SERVICEDETAIL_2026-01-11.md`
   - Bug em investigação, workaround disponível

---

## 🎯 PRIORIDADES

**🔴 CRÍTICA (resolver ANTES de tudo):**
1. ~~Debugar ServiceDetail.tsx~~ **PAUSADO** - bug complexo, continuar amanhã
2. Considerar workaround temporário (desabilitar rota)

**ALTA (fazer hoje):**
1. Testar site completo (10 minutos) - **EXCETO `/what/:slug`**
2. Configurar Google Analytics ID (5 minutos)
3. Testar chatbot (5 minutos)

**MÉDIA (fazer esta semana):**
1. Configurar API keys (se quiser chatbot)
2. Testar backoffice completo
3. Ver analytics após 24h
4. **Retomar debug do ServiceDetail.tsx** com cabeça fresca

**BAIXA (pode esperar):**
1. Criar imagens OG personalizadas
2. Melhorar conteúdo de algumas páginas

---

## 📝 CHECKLIST FINAL

Marque conforme testar:

**Site Principal:**
- [ ] Homepage carrega
- [ ] Menu funciona (PT/EN/ES/FR)
- [ ] Vancouver page carrega
- [ ] Botão "Calculate" funciona (scroll + pulse)
- [ ] Formulários enviam
- [ ] Console F12 sem erros
- [ ] **🔴 `/what/:slug` - CONHECIDO BUG (não testar)**

**Chatbot:**
- [ ] Abre corretamente
- [ ] Responde mensagens
- [ ] Mostra badge da IA

**Backoffice:**
- [ ] Login funciona
- [ ] Dashboard carrega
- [ ] Leads aparecem
- [ ] Edição funciona

**Analytics:**
- [ ] GA ID configurado no Vercel
- [ ] Redeploy feito
- [ ] Aguardando 24h para dados

---

## 🔄 CHECKPOINTS DISPONÍVEIS

Se precisar voltar atrás ou revisar o que foi feito:

1. **`CHECKPOINT_SERVICEDETAIL_2026-01-11.md`** ← 🔴 **BUG CRÍTICO**
   - Diagnóstico completo do bug em ServiceDetail.tsx
   - Todas as tentativas de correção documentadas
   - Backup do código atual
   - Próximos passos e planos B

2. **`STATUS_IMPLEMENTACAO_ATUAL.md`** (se existir)
   - Status geral do projeto

3. **`PROGRESSO_MELHORIAS_HOME.md`** (se existir)
   - Melhorias feitas na homepage

---

## 🚀 PRÓXIMOS PASSOS (FUTURO)

Depois de testar tudo e resolver o bug do ServiceDetail, podemos implementar:

1. **Navegação Inteligente:** IA detecta perfil e mostra projetos relevantes
2. **Lead Scoring:** Backoffice prioriza leads automaticamente
3. **Email Automatizado:** Leads recebem email personalizado
4. **Dashboard Analytics:** Ver métricas em tempo real
5. **Imagens OG:** Cards bonitos ao compartilhar no WhatsApp/LinkedIn

---

## 🛡️ COMO USAR OS CHECKPOINTS

**Se eu (IA) der "merda" novamente:**

1. **Pare imediatamente** o que está fazendo
2. **Leia o checkpoint** correspondente
3. **Restaure o código** se necessário:
   ```bash
   git status
   git diff src/pages/ServiceDetail.tsx
   git restore src/pages/ServiceDetail.tsx  # se quiser voltar
   ```
4. **Tente uma abordagem diferente** das listadas no checkpoint

**Se você (humano) quiser revisar o que foi feito:**

1. Abra o checkpoint mais recente
2. Leia a seção "RESUMO DO PROBLEMA"
3. Veja "TENTATIVAS DE CORREÇÃO"
4. Escolha uma das "PRÓXIMAS OPÇÕES"

---

**Bom trabalho! 💪**  
Me avise quando testar e como foi. Se tiver dúvidas ou erros, é só colar o erro aqui.

**⚠️ IMPORTANTE:** Se quiser que eu continue debugando o ServiceDetail.tsx amanhã, me mostre este documento e diga "continuar do checkpoint ServiceDetail".

Boa sorte! 🎉
