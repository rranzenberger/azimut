# 📋 PARA VOCÊ FAZER AMANHÃ

Bom dia! 🌅 Trabalhei durante a noite e implementei várias melhorias. Agora preciso que você faça alguns testes.

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

## 🧪 TESTES OBRIGATÓRIOS

### 1. Site Principal (azmt.com.br)
- [ ] Acessar homepage
- [ ] Navegar para /academy/vancouver
- [ ] Clicar em "Calculate your investment" → deve rolar suavemente
- [ ] Ver se calculadora pisca (efeito pulse)
- [ ] Trocar idioma: PT → EN → ES → FR
- [ ] Ver se conteúdo muda corretamente

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

---

## 🎯 PRIORIDADES

**ALTA (fazer hoje):**
1. Testar site completo (10 minutos)
2. Configurar Google Analytics ID (5 minutos)
3. Testar chatbot (5 minutos)

**MÉDIA (fazer esta semana):**
1. Configurar API keys (se quiser chatbot)
2. Testar backoffice completo
3. Ver analytics após 24h

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

## 🚀 PRÓXIMOS PASSOS (FUTURO)

Depois de testar tudo, podemos implementar:

1. **Navegação Inteligente:** IA detecta perfil e mostra projetos relevantes
2. **Lead Scoring:** Backoffice prioriza leads automaticamente
3. **Email Automatizado:** Leads recebem email personalizado
4. **Dashboard Analytics:** Ver métricas em tempo real
5. **Imagens OG:** Cards bonitos ao compartilhar no WhatsApp/LinkedIn

---

**Bom trabalho! 💪**  
Me avise quando testar e como foi. Se tiver dúvidas ou erros, é só colar o erro aqui.

Boa sorte! 🎉
