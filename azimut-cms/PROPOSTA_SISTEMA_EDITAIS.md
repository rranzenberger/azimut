# 💻 PROPOSTA TÉCNICA: Sistema de Gestão de Editais

**Data:** 02 de Janeiro de 2026  
**Objetivo:** Implementar sistema para gerenciar editais abertos e propostas enviadas

---

## 🎯 1. OBJETIVO

Criar um sistema integrado ao backoffice para:
- ✅ Rastrear editais abertos no Brasil
- ✅ Preparar e enviar propostas
- ✅ Acompanhar status das propostas
- ✅ Mencionar site/portfólio estrategicamente
- ✅ Gerar métricas de sucesso

---

## 📊 2. ARQUITETURA PROPOSTA

### 2.1 Modelo de Dados (Prisma)

```prisma
model Edital {
  id              String        @id @default(cuid())
  title           String        // "Edital de Exposições Imersivas 2026"
  organization    String        // "Ministério da Cultura"
  category        EditalCategory
  budget          String?       // "R$ 500.000 - R$ 1.000.000"
  deadline        DateTime      // Prazo de inscrição
  status          EditalStatus  @default(OPEN)
  url             String?       // Link do edital
  description     String?       @db.Text
  requirements    String?       @db.Text
  ourProposal     String?       @db.Text
  proposalSentAt  DateTime?
  result          EditalResult?
  resultDate      DateTime?
  notes           String?       @db.Text
  assignedToId    String?
  assignedTo      User?         @relation("EditalAssignedTo", fields: [assignedToId], references: [id])
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

enum EditalCategory {
  CULTURE         // Cultura
  AUDIOVISUAL     // Audiovisual
  TECHNOLOGY      // Tecnologia
  EDUCATION       // Educação
  MUSEUMS         // Museus
  FESTIVALS       // Festivais
  LEI_ROUANET     // Lei Rouanet
  OTHER           // Outros
}

enum EditalStatus {
  OPEN            // Edital aberto, ainda não enviamos
  PREPARING       // Preparando proposta
  SENT            // Proposta enviada
  UNDER_REVIEW    // Em análise
  APPROVED        // Aprovado
  REJECTED        // Rejeitado
  WON             // Ganhamos o projeto
  LOST            // Perdemos para outro
}

enum EditalResult {
  PENDING
  APPROVED
  REJECTED
  WON
  LOST
}
```

### 2.2 Relação com Leads

```prisma
// Um edital pode gerar um lead se ganharmos
model Lead {
  // ... campos existentes ...
  editalId        String?
  edital          Edital?       @relation("LeadFromEdital", fields: [editalId], references: [id])
}
```

---

## 🎨 3. INTERFACE PROPOSTA

### 3.1 Página Principal: `/admin/editais`

```
┌─────────────────────────────────────────────────────────┐
│ 📋 EDITAIS                                              │
│                                                         │
│ [🔍 Buscar] [➕ Novo Edital] [📊 Métricas]              │
│                                                         │
│ ┌───────────────────────────────────────────────────┐ │
│ │ 📋 ABERTOS (5)                                     │ │
│ │ ┌───────────────────────────────────────────────┐ │ │
│ │ │ Edital MinC - Exposições Imersivas           │ │ │
│ │ │ Prazo: 15/01/2026 | Budget: R$ 500k-1M      │ │ │
│ │ │ [Ver] [Preparar] [Arquivar]                 │ │ │
│ │ └───────────────────────────────────────────────┘ │ │
│ └───────────────────────────────────────────────────┘ │
│                                                         │
│ ┌───────────────────────────────────────────────────┐ │
│ │ 📝 PREPARANDO (2)                                  │ │
│ │ ┌───────────────────────────────────────────────┐ │ │
│ │ │ Edital BNDES - Cinema Digital                │ │ │
│ │ │ Prazo: 20/01/2026 | Status: Em preparação    │ │ │
│ │ │ [Continuar] [Enviar]                          │ │ │
│ │ └───────────────────────────────────────────────┘ │ │
│ └───────────────────────────────────────────────────┘ │
│                                                         │
│ ┌───────────────────────────────────────────────────┐ │
│ │ 📤 ENVIADOS (8)                                    │ │
│ │ ┌───────────────────────────────────────────────┐ │ │
│ │ │ Edital Estado SP - Cultura Digital           │ │ │
│ │ │ Enviado: 28/12/2025 | Status: Em análise     │ │ │
│ │ │ [Ver] [Acompanhar]                            │ │ │
│ │ └───────────────────────────────────────────────┘ │ │
│ └───────────────────────────────────────────────────┘ │
│                                                         │
│ ┌───────────────────────────────────────────────────┐ │
│ │ ✅ RESULTADOS (3)                                 │ │
│ │ ┌───────────────────────────────────────────────┐ │ │
│ │ │ Edital XRBR - Projetos Imersivos             │ │ │
│ │ │ Resultado: ✅ APROVADO | Data: 20/12/2025    │ │ │
│ │ │ [Ver] [Criar Lead]                            │ │ │
│ │ └───────────────────────────────────────────────┘ │ │
│ └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Formulário de Cadastro/Edição

```
┌─────────────────────────────────────────────────────────┐
│ 📝 NOVO EDITAL                                           │
│                                                         │
│ Título: [___________________________]                  │
│ Organizador: [Ministério da Cultura ▼]                  │
│ Categoria: [Cultura ▼]                                  │
│ Budget: [R$ 500.000 - R$ 1.000.000]                     │
│ Prazo: [15/01/2026]                                      │
│ URL: [https://...]                                       │
│                                                         │
│ Descrição:                                              │
│ [_________________________________]                     │
│ [_________________________________]                     │
│                                                         │
│ Requisitos:                                             │
│ [_________________________________]                     │
│                                                         │
│ Responsável: [Alberto ▼]                                │
│                                                         │
│ [Salvar] [Cancelar]                                     │
└─────────────────────────────────────────────────────────┘
```

### 3.3 Editor de Proposta

```
┌─────────────────────────────────────────────────────────┐
│ 📝 PROPOSTA: Edital MinC - Exposições Imersivas          │
│                                                         │
│ [📋 Template] [💾 Salvar] [📤 Enviar]                  │
│                                                         │
│ ┌───────────────────────────────────────────────────┐ │
│ │ [Template: Básico ▼]                              │ │
│ │                                                   │ │
│ │ SOBRE A AZIMUT                                    │ │
│ │                                                   │ │
│ │ A Azimut (https://azmt.com.br) é uma empresa...  │ │
│ │                                                   │ │
│ │ [Inserir link do portfólio] [Inserir link studio]│ │
│ │                                                   │ │
│ │ [_________________________________]               │ │
│ │ [_________________________________]               │ │
│ │                                                   │ │
│ │ [Preview] [Exportar PDF]                         │ │
│ └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 4. FUNCIONALIDADES

### 4.1 Cadastro de Editais

- ✅ Formulário de cadastro manual
- ✅ Campos: título, organizador, categoria, budget, prazo, URL
- ✅ Upload de documentos (futuro)
- ✅ Atribuição de responsável

### 4.2 Preparação de Propostas

- ✅ Editor de texto rico
- ✅ Templates pré-configurados
- ✅ Biblioteca de textos (sobre empresa, portfólio, etc.)
- ✅ Inserção rápida de links (site, portfólio, studio)
- ✅ Preview da proposta
- ✅ Exportação para PDF

### 4.3 Acompanhamento

- ✅ Status visual (Kanban)
- ✅ Alertas de prazos
- ✅ Histórico de mudanças
- ✅ Notas e comentários
- ✅ Anexos (futuro)

### 4.4 Métricas

- ✅ Total de editais por status
- ✅ Taxa de aprovação
- ✅ Editais por categoria
- ✅ ROI por edital
- ✅ Timeline de prazos

---

## 📅 5. PLANO DE IMPLEMENTAÇÃO

### FASE 1: Estrutura Básica (1 semana)

**Backend:**
- [ ] Criar modelo `Edital` no Prisma
- [ ] Criar enums (`EditalCategory`, `EditalStatus`, `EditalResult`)
- [ ] Migração do banco
- [ ] API routes básicas (CRUD)

**Frontend:**
- [ ] Página `/admin/editais`
- [ ] Lista de editais
- [ ] Formulário de cadastro
- [ ] Visualização de detalhes

**Entregável:** Sistema básico funcionando

---

### FASE 2: Gestão de Propostas (1 semana)

**Backend:**
- [ ] Campo `ourProposal` no modelo
- [ ] Templates de proposta
- [ ] Biblioteca de textos
- [ ] Exportação PDF (futuro)

**Frontend:**
- [ ] Editor de proposta
- [ ] Templates dropdown
- [ ] Inserção rápida de links
- [ ] Preview da proposta

**Entregável:** Sistema de propostas funcional

---

### FASE 3: Kanban e Acompanhamento (1 semana)

**Backend:**
- [ ] Atualização de status
- [ ] Histórico de mudanças
- [ ] Notas e comentários

**Frontend:**
- [ ] Visualização Kanban
- [ ] Drag-and-drop de status
- [ ] Alertas de prazos
- [ ] Filtros e busca

**Entregável:** Kanban funcional

---

### FASE 4: Métricas e Relatórios (1 semana)

**Backend:**
- [ ] Endpoints de métricas
- [ ] Agregações de dados
- [ ] Exportação de dados

**Frontend:**
- [ ] Dashboard de métricas
- [ ] Gráficos e visualizações
- [ ] Relatórios exportáveis

**Entregável:** Métricas e relatórios

---

## 🔗 6. INTEGRAÇÃO COM SISTEMA ATUAL

### 6.1 Relação com Leads

Quando um edital é **aprovado** ou **ganho**, criar automaticamente um Lead:

```typescript
// Quando edital.status muda para WON
if (edital.status === 'WON') {
  const lead = await prisma.lead.create({
    data: {
      name: edital.organization,
      email: 'edital@' + edital.organization.toLowerCase(),
      projectType: edital.title,
      budget: edital.budget,
      status: 'NEW',
      sourceUrl: edital.url,
      utmSource: 'edital',
      utmMedium: 'proposal',
      utmCampaign: edital.category,
      editalId: edital.id,
      notes: `Gerado automaticamente do edital: ${edital.title}`
    }
  });
}
```

### 6.2 Compartilhamento de Dados

- ✅ Usuários (assignedTo) compartilhados
- ✅ Notas e comentários similares
- ✅ Histórico de ações
- ✅ Métricas integradas

---

## 📊 7. MÉTRICAS PROPOSTAS

### 7.1 Métricas de Editais

```
Total de Editais: X
├─ Abertos: Y
├─ Preparando: Z
├─ Enviados: W
└─ Resultados: V
    ├─ Aprovados: A
    ├─ Rejeitados: R
    ├─ Ganhos: G
    └─ Perdidos: P
```

### 7.2 Taxas

```
Taxa de Participação: (Editais que participamos / Editais relevantes) × 100
Taxa de Aprovação: (Aprovados / Enviados) × 100
Taxa de Conversão: (Ganhos / Aprovados) × 100
ROI Médio: Receita total / Tempo investido
```

### 7.3 Por Categoria

```
Editais por Categoria:
├─ Cultura: X
├─ Audiovisual: Y
├─ Tecnologia: Z
└─ Outros: W
```

---

## 🎯 8. PRÓXIMOS PASSOS

### Imediato (Esta Semana)
1. ✅ Validar proposta com equipe
2. ✅ Definir prioridades
3. ✅ Iniciar FASE 1

### Curto Prazo (2 Semanas)
4. ✅ Implementar FASE 1 e 2
5. ✅ Testar sistema básico
6. ✅ Coletar feedback

### Médio Prazo (1 Mês)
7. ✅ Completar FASE 3 e 4
8. ✅ Integração com Leads
9. ✅ Treinamento da equipe

---

## 💡 9. CONSIDERAÇÕES

### ✅ Vantagens
- Sistema integrado ao backoffice
- Rastreamento completo de oportunidades
- Métricas de sucesso
- Templates padronizados

### ⚠️ Desafios
- Manter editais atualizados (manual por enquanto)
- Tempo de preparação de propostas
- Acompanhamento de prazos

### 🚀 Futuro
- Scraping automático de editais
- IA para sugestão de propostas
- Integração com calendário
- Notificações automáticas

---

**Conclusão:** Sistema proposto oferece base sólida para gestão ativa de editais, transformando oportunidades em projetos.







