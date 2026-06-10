# 🎯 Como Usar o Sistema de Análise Inteligente de Leads

## ✅ Sistema Implementado e Funcionando!

### 🚀 Funcionalidade: **Análise Automática de Leads com IA**

Esta é a funcionalidade que **MAIS TRAZ CLIENTES** porque qualifica, prioriza e gera insights automaticamente.

## 📍 Onde Acessar:

### 1. **Dashboard de Leads** (Principal)
```
https://backoffice.azmt.com.br/admin/leads/dashboard
```
- Métricas em tempo real
- Leads quentes destacados
- Insights da IA
- Botão para analisar todos os leads

### 2. **Lista de Leads**
```
https://backoffice.azmt.com.br/admin/leads
```
- Ver todos os leads
- Filtrar por score, prioridade, status
- Visualização em lista ou Kanban

## 🤖 Como Funciona:

### Análise Automática:
1. **Lead é criado** → Formulário de contato
2. **IA analisa automaticamente** → Claude ou DeepSeek
3. **Score calculado** → 0-100
4. **Priorização** → URGENT, HIGH, MEDIUM, LOW
5. **Salvo no banco** → Com análise completa

### O que a IA analisa:
- ✅ Tipo de organização (governo, museu, corporativo)
- ✅ Orçamento informado
- ✅ Timeline (urgente = mais pontos)
- ✅ Tipo de projeto
- ✅ Cargo/posição
- ✅ Dados completos vs incompletos

## 🎯 Score de Qualidade:

- **80-100:** Lead quente (URGENT) - Orçamento definido, timeline curto
- **60-79:** Lead bom (HIGH) - Interesse claro, orçamento médio
- **40-59:** Lead médio (MEDIUM) - Interesse, mas sem orçamento/timeline
- **0-39:** Lead frio (LOW) - Pouco interesse ou sem informações

## 📊 Scripts Disponíveis:

### 1. Analisar Todos os Leads:
```bash
ANALISAR_LEADS_IA.bat
```
- Analisa todos os leads sem análise
- Processa em lote (limite: 100)
- Salva análise no banco

### 2. Gerar Relatório Diário:
```bash
ENVIAR_RELATORIO_LEADS.bat
```
- Gera relatório HTML formatado
- Salva em `azimut-cms/reports/`
- Pronto para enviar por email (configurar SMTP)

## 📧 Configurar Email Automático (Opcional):

### Passo 1: Instalar SendGrid
```bash
cd azimut-cms
npm install @sendgrid/mail
```

### Passo 2: Adicionar no .env
```
SENDGRID_API_KEY=sua-chave-aqui
ADMIN_EMAIL=admin@azimut.com.br
```

### Passo 3: Editar script
Edite `azimut-cms/scripts/enviar-relatorio-leads-email.ts` e descomente o código SendGrid.

### Passo 4: Configurar Cron (Vercel)
No Vercel, configure cron job para executar diariamente:
```
0 9 * * * (9h da manhã)
```

## 🎯 Benefícios:

1. **Foca nos leads certos** - Não perde tempo com leads frios
2. **Resposta rápida** - Alertas para leads quentes
3. **Insights valiosos** - IA descobre padrões invisíveis
4. **Relatórios automáticos** - Email diário com resumo
5. **Dashboard visual** - Métricas em tempo real

## 📈 Métricas que Ajudam:

- **Taxa de Conversão** - Quantos leads viram clientes
- **Tempo de Resposta** - Quanto mais rápido, mais conversão
- **Fonte de Leads** - De onde vêm os melhores clientes
- **Funil de Conversão** - Onde estão perdendo leads
- **Score Médio** - Qualidade geral dos leads

## ✅ Status:

- ✅ Análise automática funcionando
- ✅ Dashboard visual implementado
- ✅ Relatórios prontos
- ✅ Scripts de automação criados
- ⚠️ Email automático (precisa configurar SMTP)

**Sistema pronto para uso! Cada novo lead é analisado automaticamente!** 🎉
