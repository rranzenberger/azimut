# 🤖 ENRIQUECIMENTO DE LEADS NO BACKOFFICE

## ✅ O QUE FOI CRIADO:

### 1. Nova Página no Backoffice

**URL:** `/admin/enrichment`

**Localização:** `azimut-cms/app/admin/enrichment/page.tsx`

**Funcionalidades:**
- ✅ Ver todos os leads e status de enriquecimento
- ✅ Filtrar por status (Todos, Pendentes, Processando, Concluídos)
- ✅ Enriquecer lead individual
- ✅ Enriquecer todos os pendentes (em lote)
- ✅ Estatísticas (Total, Pendentes, Processando, Concluídos)
- ✅ Atualizar lista

---

### 2. API Routes Criadas

**`/api/enrichment/request`** (POST)
- Solicita enriquecimento de um lead específico
- Chama webhook do n8n
- Atualiza status do lead para "processing"

**`/api/admin/enrichment/leads`** (GET)
- Lista leads com filtros
- Retorna dados de enriquecimento

---

### 3. Menu Adicionado

**No menu lateral do backoffice:**
- ✅ Nova opção: **"🤖 Enriquecimento IA"**
- ✅ Aparece entre "Leads" e "Serviços"

---

## 🎯 COMO USAR:

### Acessar a Página:

1. **Acesse o backoffice:** https://backoffice.azmt.com.br
2. **Faça login**
3. **No menu lateral**, clique em **"🤖 Enriquecimento IA"**

### Funcionalidades:

#### 1. Ver Leads

- **Filtros disponíveis:**
  - Todos
  - Pendentes (não enriquecidos)
  - Processando (em andamento)
  - Concluídos (já enriquecidos)

#### 2. Enriquecer Lead Individual

1. **Encontre o lead** na lista
2. **Clique no botão "🤖 Enriquecer"**
3. **Aguarde alguns segundos**
4. **Clique em "🔄 Atualizar"** para ver o resultado

#### 3. Enriquecer Todos (Em Lote)

1. **Filtre por "Pendentes"**
2. **Clique em "Enriquecer Todos"**
3. **Confirme a ação**
4. **Aguarde alguns minutos**
5. **Atualize a página** para ver os resultados

---

## 🔄 COMO FUNCIONA (Automático):

### Fluxo Automático:

```
Lead preenche formulário no site
    ↓
Backend salva lead no banco
    ↓
Site chama n8n webhook (automático)
    ↓
n8n enriquece com IA
    ↓
n8n salva dados enriquecidos no banco
    ↓
Status muda para "completed" ✅
```

### Fluxo Manual (Backoffice):

```
Você acessa /admin/enrichment
    ↓
Clica "🤖 Enriquecer" em um lead
    ↓
Backend chama n8n webhook
    ↓
n8n enriquece com IA
    ↓
Status atualiza automaticamente
```

---

## 📋 STATUS DOS LEADS:

- **⏸️ Pendente:** Lead ainda não foi enriquecido
- **⏳ Processando:** Enriquecimento em andamento
- **✅ Concluído:** Lead foi enriquecido com sucesso

---

## 💡 DICAS:

- **Automático:** Novos leads são enriquecidos automaticamente
- **Manual:** Use o backoffice para re-enriquecer leads antigos
- **Em lote:** Use "Enriquecer Todos" para processar muitos leads
- **Atualizar:** Sempre clique em "🔄 Atualizar" para ver status atualizado

---

## 🆘 SE TIVER PROBLEMAS:

### Lead não enriquece:
- Verifique se o n8n está ativo
- Verifique se o webhook está funcionando
- Veja os logs do n8n em "Executions"

### Status não atualiza:
- Clique em "🔄 Atualizar"
- Aguarde alguns segundos (n8n pode demorar)
- Verifique se o workflow do n8n está salvando no banco

---

## ✅ CHECKLIST:

- [ ] Página `/admin/enrichment` acessível
- [ ] Menu "🤖 Enriquecimento IA" aparece
- [ ] Leads aparecem na lista
- [ ] Botão "Enriquecer" funciona
- [ ] Status atualiza corretamente
- [ ] Enriquecimento automático funcionando (novos leads)

---

**Acesse o backoffice e teste a nova página!** 🚀
