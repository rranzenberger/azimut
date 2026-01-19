# ✅ INTEGRAÇÃO N8N NO SITE - RESUMO

## 🎉 O QUE FOI FEITO:

### ✅ Arquivos Criados/Modificados:

1. **`src/api/n8n-enrichment.ts`** ✅ CRIADO
   - Função `submitLeadForEnrichment()` para chamar webhook do n8n
   - Não bloqueia o fluxo (assíncrono)
   - Trata erros sem interromper o usuário

2. **`src/components/SmartContactForm.tsx`** ✅ MODIFICADO
   - Import adicionado: `import { submitLeadForEnrichment } from '../api/n8n-enrichment'`
   - Chamada adicionada após salvar lead
   - Usa leadId da resposta ou ID temporário

3. **`INTEGRAR_N8N_NO_SITE.md`** ✅ CRIADO
   - Guia completo passo a passo

---

## 🎯 O QUE FALTA FAZER:

### 1. Adicionar Variável no Vercel (OBRIGATÓRIO)

1. **Acesse:** https://vercel.com
2. **Vá em:** Projeto "azimut" → Settings → Environment Variables
3. **Adicione:**
   - **Name:** `VITE_N8N_WEBHOOK_URL`
   - **Value:** `https://n8n-production-dce3.up.railway.app/webhook/lead-enrichment`
   - **Environment:** Todas (Production, Preview, Development)
4. **Salve**

### 2. Fazer Deploy

```bash
git add .
git commit -m "feat: Integrar n8n para enriquecimento automático de leads"
git push
```

**Vercel fará deploy automaticamente**

### 3. Testar

1. **Acesse o site:** https://azmt.com.br
2. **Preencha formulário de contato**
3. **Envie**
4. **Verifique n8n:** Aba "Executions" deve mostrar execução
5. **Verifique banco:** Lead deve ter `enriched_profile` preenchido

---

## 📋 CHECKLIST FINAL:

- [x] Arquivo `n8n-enrichment.ts` criado
- [x] `SmartContactForm.tsx` modificado
- [ ] Variável `VITE_N8N_WEBHOOK_URL` adicionada no Vercel
- [ ] Deploy feito
- [ ] Testado no site
- [ ] Verificado execução no n8n
- [ ] Verificado dados enriquecidos no banco

---

## 🔄 COMO FUNCIONA:

```
Usuário preenche formulário
    ↓
SmartContactForm.submitLead()
    ↓
Backend salva lead no banco
    ↓
Retorna leadId
    ↓
submitLeadForEnrichment() chama n8n webhook
    ↓
n8n workflow executa:
  - Busca informações (SerpAPI)
  - Analisa com Claude AI
  - Salva dados enriquecidos no banco
    ↓
Lead tem enriched_profile preenchido! ✅
```

---

## 💡 DICAS:

- **Não bloqueia:** O enriquecimento é assíncrono, usuário não espera
- **Erros silenciosos:** Se falhar, apenas loga, não mostra erro
- **Monitorar:** Veja execuções no n8n regularmente
- **Ajustar:** Prompts do Claude podem ser ajustados no n8n

---

## 🆘 SE TIVER PROBLEMAS:

### Variável não encontrada:
- Verifique se está no Vercel
- Verifique se o nome está correto (`VITE_N8N_WEBHOOK_URL`)
- Faça novo deploy

### Workflow não executa:
- Verifique se está ativo no n8n
- Verifique URL do webhook
- Veja logs em "Executions"

---

**Adicione a variável no Vercel e faça deploy! Depois teste e me avise!** 🚀
