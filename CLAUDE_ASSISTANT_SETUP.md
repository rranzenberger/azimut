# 🤖 CLAUDE AI ASSISTANT - SETUP

## 🎯 O que foi implementado:

### ✅ CHATBOT CLAUDE COMPLETO
- **Botão flutuante** no canto inferior direito (todas as páginas)
- **Auto-open** após 15 segundos de navegação
- **Exit intent** (abre quando usuário vai sair)
- **Multi-idioma** (PT/EN/ES/FR)
- **Qualificação automática de leads**
- **3 prompts personalizados**:
  - 🎓 **Student**: Para Academy/Vancouver
  - 💼 **Business**: Para projetos corporativos
  - ❓ **General**: Perguntas gerais

---

## 📦 ARQUIVOS CRIADOS:

```
src/
├── components/
│   └── ClaudeAssistant.tsx          ← Componente frontend do chatbot
├── services/
│   └── claude-api.ts                ← Integração com Claude API
└── api/
    ├── chat/
    │   └── claude.ts                ← Endpoint de chat
    └── leads/
        └── capture.ts               ← Captura de leads via chat
```

---

## 🔑 CONFIGURAÇÃO (OBRIGATÓRIA):

### 1. Obter Claude API Key

1. Acesse: https://console.anthropic.com/
2. Crie uma conta (se não tiver)
3. Vá em "API Keys" → "Create Key"
4. Copie a chave (começa com `sk-ant-api03-...`)

### 2. Configurar `.env`

Crie um arquivo `.env` na raiz do projeto:

```bash
# Claude API
VITE_CLAUDE_API_KEY=sk-ant-api03-SUA-CHAVE-AQUI
```

### 3. Instalar dependências (se necessário)

```bash
npm install @anthropic-ai/sdk
```

---

## 💰 CUSTOS (CLAUDE API):

| Modelo | Custo por conversa | Estimativa mensal |
|--------|-------------------|-------------------|
| Claude Sonnet 4 | ~$0.01-0.05 | $50-150 (1000-3000 conversas) |

**ROI Esperado:** +40% de leads qualificados 🚀

---

## 🎨 PERSONALIZAÇÃO:

### Mudar prompts do assistente:

Edite `src/services/claude-api.ts`:

```typescript
const SYSTEM_PROMPTS = {
  student_pt: `Seu prompt aqui...`,
  business_pt: `Seu prompt aqui...`,
  // ...
}
```

### Mudar textos da interface:

Edite `src/components/ClaudeAssistant.tsx`:

```typescript
const content: Record<Lang, any> = {
  pt: {
    title: 'Seu título',
    greeting: 'Sua saudação',
    // ...
  }
}
```

---

## 🧪 TESTAR LOCALMENTE:

```bash
# 1. Configurar .env
echo "VITE_CLAUDE_API_KEY=sk-ant-api03-..." > .env

# 2. Rodar o site
npm run dev

# 3. Abrir http://localhost:5173
# O chatbot deve aparecer automaticamente após 15s
```

---

## 🚀 DEPLOY (VERCEL):

1. **Adicionar variável de ambiente:**
   - Vercel Dashboard → Project → Settings → Environment Variables
   - Adicionar: `VITE_CLAUDE_API_KEY` = `sk-ant-api03-...`

2. **Deploy:**
   ```bash
   git add .
   git commit -m "feat: Claude AI Assistant implementado"
   git push origin main
   ```

---

## 📊 FUNCIONALIDADES:

### ✅ Detecção automática de perfil:
- Se usuário visita `/academy` → Usa prompt "student"
- Se usuário visita `/work` → Usa prompt "business"
- Outros → Usa prompt "general"

### ✅ Captura inteligente de leads:
- Detecta email no chat → Salva automaticamente
- Detecta telefone → Salva automaticamente
- Integra com sistema de leads existente

### ✅ Quick Actions:
- "💼 Quero criar um projeto"
- "🎓 Estudar em Vancouver"
- "💰 Solicitar orçamento"
- "❓ Tenho uma dúvida"

### ✅ Responsivo:
- Desktop: Janela 400x600px
- Mobile: Fullscreen adaptado

---

## 🐛 TROUBLESHOOTING:

### Chatbot não aparece:
1. Verificar se `.env` está configurado
2. Abrir console do navegador (F12)
3. Procurar erros relacionados a "Claude"

### Erro "API Key inválida":
1. Verificar se a chave está correta
2. Verificar se a chave não expirou
3. Verificar créditos na conta Anthropic

### Respostas lentas:
- Normal! Claude pode levar 1-3 segundos para responder
- Considerar upgrading plan se necessário

---

## 🎯 PRÓXIMOS PASSOS (OPCIONAIS):

### FASE 2: Personalização Avançada
- [ ] Detecção de perfil por comportamento
- [ ] Conteúdo adaptativo na Home
- [ ] Recomendações de projetos

### FASE 3: Lead Scoring
- [ ] Pontuação automática de leads
- [ ] Integração com Slack
- [ ] Notificações para leads quentes (>70 pontos)

### FASE 4: Analytics
- [ ] Dashboard de conversas
- [ ] Métricas de conversão
- [ ] A/B testing de prompts

---

## ❓ DÚVIDAS?

- Claude API Docs: https://docs.anthropic.com/
- Suporte Anthropic: support@anthropic.com
- Azimut Dev Team: dev@azimut.com.br
