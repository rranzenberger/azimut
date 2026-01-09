# 📋 DETALHES COMPLETOS - MELHORIAS DO CRM

**Data:** 08 Janeiro 2026  
**Status:** 📝 Planejamento detalhado

---

## 🤔 **O QUE É CRM?**

**CRM = Customer Relationship Management (Gerenciamento de Relacionamento com Cliente)**

No contexto do site Azimut, o CRM é o sistema que gerencia os **leads** (pessoas interessadas) que entram em contato através do formulário do site.

### **Analogia Simples:**
Imagine uma **agenda de vendas digital** onde você:
- 📝 Anota informações de cada pessoa interessada
- 🏷️ Marca status (novo, contatado, proposta enviada, etc)
- ⭐ Prioriza (urgente, alta, média, baixa)
- 👤 Atribui para alguém da equipe
- 📊 Vê histórico de interações
- 🔍 Filtra e busca leads específicos

### **Por que é importante?**
- ✅ **Organização:** Não perde nenhum lead
- ✅ **Priorização:** Foca nos leads mais quentes primeiro
- ✅ **Rastreamento:** Sabe o status de cada negociação
- ✅ **Eficiência:** Equipe trabalha de forma coordenada
- ✅ **Análise:** Entende quais leads convertem melhor

---

## ✅ **O QUE JÁ EXISTE NO CRM ATUAL:**

### **1. Lista de Leads** (`/admin/leads`)
```
✅ Visualização em lista (cards)
✅ Visualização Kanban (por status)
✅ Paginação (50 leads por página)
✅ Cards com informações principais:
   - Nome, email, empresa
   - Status (badge colorido)
   - Prioridade (badge colorido)
   - Score, tipo de visitante
   - Data de criação
✅ Click no card → abre página de detalhes
```

### **2. Filtros**
```
✅ Status (NEW, CONTACTED, PROPOSAL_SENT, NEGOTIATION, WON, LOST)
✅ Prioridade (LOW, MEDIUM, HIGH, URGENT)
✅ Tipo de lead (CONTACT_FORM, BUDGET_INQUIRY)
✅ Data (dateFrom, dateTo)
✅ Busca por nome/email/empresa
```

### **3. Página de Detalhes** (`/admin/leads/[id]`)
```
✅ Todos os campos do formulário
✅ Análise comportamental (IA)
✅ Páginas visitadas
✅ Formulário de edição (lado direito):
   - Status (dropdown)
   - Prioridade (dropdown)
   - Responsável (dropdown)
   - Notas internas (textarea)
✅ Botão "Salvar Alterações"
```

### **4. API Backend**
```
✅ GET /api/admin/leads (listar com filtros)
✅ PUT /api/admin/leads/[id] (atualizar lead)
✅ Autenticação (verifica token)
✅ Validações
```

---

## 🚀 **O QUE VAMOS MELHORAR:**

### **1. 📝 MODAL DE EDIÇÃO RÁPIDA**

#### **Problema Atual:**
- Para editar um lead, precisa:
  1. Clicar no card
  2. Ir para página de detalhes
  3. Editar no formulário lateral
  4. Salvar
  5. Voltar para lista
- **Muito lento!** 😫

#### **Solução:**
- **Modal que abre na própria lista** (sem sair da página)
- Edição rápida dos campos principais
- Salva e atualiza a lista instantaneamente

#### **O que terá no modal:**
```
┌─────────────────────────────────────┐
│  ✕ Editar Lead: João Silva          │
├─────────────────────────────────────┤
│                                     │
│  Status: [Dropdown ▼]               │
│  Prioridade: [Dropdown ▼]           │
│  Responsável: [Dropdown ▼]          │
│                                     │
│  Notas Internas:                    │
│  ┌─────────────────────────────┐   │
│  │ [Textarea 4 linhas]          │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Cancelar]  [Salvar Alterações]   │
└─────────────────────────────────────┘
```

#### **Como funcionará:**
1. **Botão "Editar"** em cada card da lista
2. **Click** → Modal abre (overlay escuro + modal centralizado)
3. **Editar campos** → Salvar
4. **Modal fecha** → Lista atualiza automaticamente
5. **ESC ou click fora** → Fecha sem salvar

#### **Arquivos a criar/modificar:**
```
📁 azimut-cms/app/admin/leads/components/
   ✏️ QuickEditModal.tsx (NOVO)
   ✏️ LeadsList.tsx (adicionar botão "Editar")
```

#### **API:**
- Usar a mesma `PUT /api/admin/leads/[id]` (já existe!)

---

### **2. ✅ BULK ACTIONS (Ações em Lote)**

#### **Problema Atual:**
- Para mudar status de 10 leads, precisa:
  1. Clicar em cada um
  2. Editar
  3. Salvar
  4. Repetir 10x
- **Muito trabalhoso!** 😫

#### **Solução:**
- **Checkboxes** em cada card
- **Selecionar múltiplos leads**
- **Ações em lote:** Mudar status, prioridade, exportar CSV, deletar

#### **Interface:**
```
┌─────────────────────────────────────────────┐
│  [☑] Selecionar todos                       │
│  [ ] João Silva    [ ] Maria Santos         │
│  [ ] Pedro Costa    [ ] Ana Oliveira         │
│                                             │
│  [3 selecionados]                           │
│  [Mudar Status ▼] [Mudar Prioridade ▼]      │
│  [Exportar CSV] [Arquivar] [Deletar]        │
└─────────────────────────────────────────────┘
```

#### **Funcionalidades:**

**A. Seleção:**
- ☑ Checkbox em cada card
- ☑ "Selecionar todos" (header)
- ☑ Contador: "3 selecionados"
- ☑ Barra de ações aparece quando seleciona

**B. Mudar Status em Lote:**
- Dropdown: "Mudar Status →"
- Opções: NEW, CONTACTED, PROPOSAL_SENT, etc
- Confirmação: "Alterar status de 3 leads para CONTACTED?"
- Salva todos de uma vez

**C. Mudar Prioridade em Lote:**
- Dropdown: "Mudar Prioridade →"
- Opções: LOW, MEDIUM, HIGH, URGENT
- Confirmação similar

**D. Exportar CSV:**
- Botão: "Exportar CSV"
- Gera arquivo com leads selecionados
- Campos: nome, email, empresa, status, prioridade, score, data
- Download automático

**E. Arquivar (Soft Delete):**
- Marca leads como "arquivados"
- Não aparecem mais na lista (mas ficam no banco)
- Filtro "Mostrar arquivados" para recuperar

**F. Deletar (Hard Delete):**
- Remove do banco permanentemente
- Confirmação: "Tem certeza? Esta ação não pode ser desfeita."
- ⚠️ Cuidado!

#### **Arquivos a criar/modificar:**
```
📁 azimut-cms/app/admin/leads/components/
   ✏️ LeadsList.tsx (adicionar checkboxes + barra ações)
   ✏️ BulkActionsBar.tsx (NOVO - barra de ações)

📁 azimut-cms/app/api/admin/leads/
   ✏️ route.ts (adicionar PATCH para bulk update)
   ✏️ export.ts (NOVO - endpoint export CSV)
```

#### **API Endpoints:**
```
PATCH /api/admin/leads/bulk
Body: {
  leadIds: ["id1", "id2", "id3"],
  updates: {
    status: "CONTACTED",
    priority: "HIGH"
  }
}

GET /api/admin/leads/export?ids=id1,id2,id3&format=csv
Response: CSV file download
```

---

### **3. 📜 HISTÓRICO DE AÇÕES (Timeline)**

#### **Problema Atual:**
- Não tem como saber:
  - Quem mudou o status?
  - Quando foi contatado?
  - Quem adicionou notas?
  - Histórico de mudanças

#### **Solução:**
- **Timeline** na página de detalhes
- Registra todas as ações automaticamente
- Mostra: quem, quando, o que mudou

#### **Interface:**
```
┌─────────────────────────────────────────────┐
│  📜 Histórico de Ações                      │
├─────────────────────────────────────────────┤
│                                             │
│  🟢 Hoje, 14:30                             │
│  João Silva mudou status para CONTACTED    │
│                                             │
│  🟢 Hoje, 10:15                             │
│  Maria Santos adicionou nota:              │
│  "Cliente interessado em VR"                │
│                                             │
│  🟡 Ontem, 16:45                            │
│  Lead criado via formulário                 │
│                                             │
│  🟡 Ontem, 16:45                            │
│  Status inicial: NEW                        │
│  Prioridade inicial: HIGH                   │
└─────────────────────────────────────────────┘
```

#### **O que será registrado:**
- ✅ Criação do lead (automático)
- ✅ Mudança de status (automático)
- ✅ Mudança de prioridade (automático)
- ✅ Atribuição de responsável (automático)
- ✅ Adição/edição de notas (automático)
- ✅ Contato feito (manual - botão "Registrar Contato")
- ✅ Email enviado (automático - quando implementar emails)

#### **Modelo de Dados:**
```prisma
model LeadActivity {
  id          String   @id @default(uuid())
  leadId      String
  userId      String?  // Quem fez a ação
  actionType  String   // "STATUS_CHANGED", "NOTE_ADDED", etc
  oldValue    String?  // Valor anterior
  newValue    String?  // Valor novo
  description String   // "Status mudou de NEW para CONTACTED"
  metadata    Json?    // Dados extras
  createdAt   DateTime @default(now())
  
  lead        Lead     @relation(fields: [leadId], references: [id])
  user        User?    @relation(fields: [userId], references: [id])
  
  @@index([leadId])
  @@index([createdAt])
}
```

#### **Arquivos a criar/modificar:**
```
📁 azimut-cms/prisma/schema.prisma
   ✏️ Adicionar model LeadActivity

📁 azimut-cms/app/admin/leads/components/
   ✏️ LeadActivityTimeline.tsx (NOVO)
   ✏️ LeadDetails.tsx (adicionar seção timeline)

📁 azimut-cms/app/api/admin/leads/[id]/route.ts
   ✏️ Adicionar criação de activity ao atualizar
```

#### **API:**
- Criar activity automaticamente no `PUT /api/admin/leads/[id]`
- GET `/api/admin/leads/[id]/activities` (opcional - para carregar timeline)

---

### **4. 🔍 FILTRO POR SCORE**

#### **Problema Atual:**
- Filtros existem para: status, prioridade, tipo, data
- **Mas não tem filtro por score!**
- Score é muito importante (0-100) para priorizar leads quentes

#### **Solução:**
- **Dropdown de filtro por score** nos filtros existentes
- Opções: >=90, >=80, >=70, >=60, >=40, todos

#### **Interface:**
```
┌─────────────────────────────────────────────┐
│  Filtros                                    │
├─────────────────────────────────────────────┤
│  [Buscar...]                                │
│                                             │
│  Status: [Todos ▼]                          │
│  Prioridade: [Todas ▼]                      │
│  Score: [Todos ▼] ← NOVO!                   │
│    - Todos                                  │
│    - 🔥🔥 Muito Quente (>=90)               │
│    - 🔥 Quente (>=80)                       │
│    - 🌡️ Morno (>=70)                        │
│    - ⚡ Interessado (>=60)                   │
│    - ❄️ Frio (>=40)                          │
│  Tipo: [Todos ▼]                            │
│  Data: [__/__/____] até [__/__/____]        │
└─────────────────────────────────────────────┘
```

#### **Lógica:**
- Score vem de `lead.leadScore` (0-100)
- Ou de `session.interestScore.conversionScore` (se não tiver leadScore)
- Filtro: `WHERE leadScore >= 70` (exemplo)

#### **Arquivos a modificar:**
```
📁 azimut-cms/app/admin/leads/components/
   ✏️ LeadsFilters.tsx (adicionar dropdown score)

📁 azimut-cms/app/admin/leads/page.tsx
   ✏️ Adicionar scoreMin nos filtros

📁 azimut-cms/app/api/admin/leads/route.ts
   ✏️ Adicionar filtro scoreMin no WHERE
```

#### **API:**
- Query param: `?scoreMin=70`
- WHERE clause: `leadScore >= 70` OU `interestScore.conversionScore >= 70`

---

## 📊 **RESUMO DAS MELHORIAS:**

| Feature | Impacto | Tempo | Prioridade |
|---------|---------|-------|------------|
| **Modal Edição Rápida** | ⭐⭐⭐⭐⭐ Alto | 4-6h | 🔥 Alta |
| **Bulk Actions** | ⭐⭐⭐⭐ Muito Alto | 6-8h | 🔥 Alta |
| **Histórico de Ações** | ⭐⭐⭐ Médio | 4-6h | ⚡ Média |
| **Filtro por Score** | ⭐⭐⭐⭐ Alto | 2-3h | 🔥 Alta |

**TOTAL ESTIMADO:** 16-23 horas (2-3 dias de trabalho)

---

## 🎯 **ORDEM DE IMPLEMENTAÇÃO RECOMENDADA:**

### **FASE 1: Quick Wins (1 dia)**
1. ✅ **Filtro por Score** (2-3h) - Mais rápido, impacto imediato
2. ✅ **Modal Edição Rápida** (4-6h) - Melhora UX significativamente

### **FASE 2: Features Avançadas (1-2 dias)**
3. ✅ **Bulk Actions** (6-8h) - Economiza muito tempo
4. ✅ **Histórico de Ações** (4-6h) - Rastreabilidade completa

---

## 🛠️ **TECNOLOGIAS QUE VAMOS USAR:**

- **Frontend:** React (Next.js), TypeScript
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (via Supabase)
- **UI:** Inline styles (já usado no projeto)
- **CSV Export:** Biblioteca `papaparse` ou `csv-stringify`

---

## 📝 **CHECKLIST DE IMPLEMENTAÇÃO:**

### **Modal Edição Rápida:**
- [ ] Criar componente `QuickEditModal.tsx`
- [ ] Adicionar botão "Editar" em cada card
- [ ] Implementar overlay + modal
- [ ] Conectar com API PUT
- [ ] Atualizar lista após salvar
- [ ] Testar em diferentes tamanhos de tela

### **Bulk Actions:**
- [ ] Adicionar checkbox em cada card
- [ ] Checkbox "Selecionar todos"
- [ ] Criar componente `BulkActionsBar.tsx`
- [ ] Implementar PATCH /api/admin/leads/bulk
- [ ] Implementar GET /api/admin/leads/export
- [ ] Adicionar confirmações de ações destrutivas
- [ ] Testar com muitos leads selecionados

### **Histórico de Ações:**
- [ ] Criar migration para `LeadActivity`
- [ ] Atualizar schema Prisma
- [ ] Criar componente `LeadActivityTimeline.tsx`
- [ ] Adicionar criação de activity no PUT
- [ ] Mostrar timeline na página de detalhes
- [ ] Adicionar botão "Registrar Contato"

### **Filtro por Score:**
- [ ] Adicionar dropdown nos filtros
- [ ] Adicionar `scoreMin` no WHERE clause
- [ ] Testar com diferentes valores
- [ ] Mostrar badge de score nos cards

---

## 🎉 **RESULTADO ESPERADO:**

Após implementar todas as melhorias:

✅ **Edição 5x mais rápida** (modal vs página separada)  
✅ **Ações em lote economizam horas** (10 leads em 1 click vs 10 cliques)  
✅ **Rastreabilidade completa** (sabe quem fez o quê)  
✅ **Filtros mais poderosos** (encontra leads quentes rapidamente)  
✅ **Workflow profissional** (como CRM enterprise)  

---

**Pronto para começar? 🚀**

Qual feature você quer implementar primeiro?

1. Filtro por Score (mais rápido)
2. Modal Edição Rápida (maior impacto UX)
3. Bulk Actions (maior economia de tempo)
4. Histórico de Ações (completude)
