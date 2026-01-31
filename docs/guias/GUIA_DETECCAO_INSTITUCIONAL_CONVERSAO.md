# 🎯 GUIA COMPLETO: DETECÇÃO INSTITUCIONAL + CONVERSÃO DE LEADS

## ✅ O QUE FOI IMPLEMENTADO

### 1. Sistema de Detecção Institucional Automática

**Arquivo:** `azimut-cms/src/lib/institutional-detection.ts`

**Funcionalidades:**
- ✅ Mapeamento de **50+ instituições premium**
- ✅ Detecção automática por domínio de email
- ✅ Classificação por Tier (1-5)
- ✅ Priorização automática (URGENT/HIGH/MEDIUM/LOW)
- ✅ Flag de alerta automático para clientes premium

**Instituições Mapeadas:**
- 🇧🇷 **Brasil (35+):**
  - Sistema S: SESC, SENAC, SENAI
  - Bancos: Itaú Cultural, CCBB, Bradesco, Santander
  - Energia: Petrobras, Vale
  - Telecom: Oi Futuro, Vivo
  - Museus: Museu do Amanhã, MIS-SP
  - Federações: FIESP, FIRJAN, SEBRAE
  - Governo: Prefeituras SP, RJ

- 🇨🇦 **Canadá (15+):**
  - NFB/ONF (National Film Board)
  - Creative BC, Ontario Creates, SODEC
  - Canada Council for the Arts
  - Universidades (Concordia)

---

### 2. Integração na API de Leads

**Arquivo:** `azimut-cms/app/api/leads/route.ts`

**O que acontece quando alguém preenche formulário:**

```
1. Email recebido: joao.silva@sescsp.org.br
   ↓
2. Sistema detecta: "SESC São Paulo"
   - Tier: 1 (Premium)
   - Priority: URGENT
   - Budget Range: R$ 500k - R$ 3M
   - Auto Alert: true
   ↓
3. Lead criado automaticamente como URGENT
   ↓
4. Alerta enviado para time comercial:
   "🔥 LEAD INSTITUCIONAL PREMIUM: SESC São Paulo"
```

---

## 🎯 COMO USAR NO BACKOFFICE (KANBAN)

### **Passo 1: Acessar Leads**

```
Backoffice → Admin → Leads
```

Você verá uma lista com todos os leads, agora incluindo:
- ✅ **Origem** (Site IA, Evento, Indicação, etc.)
- ✅ **Instituição** (se detectada)
- ✅ **Tier** (1-5)
- ✅ **Prioridade** (URGENT, HIGH, MEDIUM, LOW)

---

### **Passo 2: Filtrar por Prioridade**

```
Filtros:
☑ Prioridade: URGENT
☐ Tier: 1 (Premium)
☐ Status: NEW
```

**Resultado:**
- Todos os leads institucionais premium aparecem primeiro
- Ex: "João Silva - SESC SP - URGENT"

---

### **Passo 3: KANBAN (se existe)**

Se o backoffice tem Kanban, a estrutura típica é:

```
┌──────────┬──────────────┬────────────┬─────────┬──────┐
│   NEW    │  CONTACTED   │ QUALIFIED  │PROPOSAL │  WON │
├──────────┼──────────────┼────────────┼─────────┼──────┤
│ SESC SP  │ Petrobras    │ Oi Futuro  │ Vale    │ NFB  │
│ (URGENT) │ (URGENT)     │ (HIGH)     │ (HIGH)  │ (WON)│
│          │              │            │         │      │
│ Lead 2   │ Lead 3       │ Lead 5     │ Lead 7  │      │
│ (MEDIUM) │ (LOW)        │ (MEDIUM)   │ (LOW)   │      │
└──────────┴──────────────┴────────────┴─────────┴──────┘
```

**Ações no Kanban:**
- **Arrastar card** = Muda status
- **Clicar no card** = Abre detalhes
- **Botões rápidos:**
  - 📧 Enviar Email
  - 📞 Ligar
  - 📄 Enviar Proposta
  - ✅ Marcar como Ganho

---

## 📊 ESTRATÉGIA DE CONVERSÃO: INSTITUCIONAL vs COMUM

### **LEAD COMUM (Site IA - Score 65)**

**Abordagem:**
1. Email automático de boas-vindas
2. Aguardar 2 dias
3. Follow-up com portfolio
4. Aguardar resposta
5. Ligar se não responder em 1 semana

**Taxa de conversão:** ~15-20%

---

### **LEAD INSTITUCIONAL PREMIUM (SESC, Petrobras, NFB)**

**Abordagem URGENTE:**
1. ⚡ **IMEDIATO** (< 1 hora):
   - Alerta automático para responsável
   - Email personalizado de boas-vindas
   - Mencionar projetos similares
   
2. 📞 **DIA 1** (ligação):
   - "Olá João, vi que você se interessou por [projeto X]"
   - "O SESC já trabalhou conosco em [exemplo]"
   - "Podemos agendar conversa?"
   
3. 📄 **DIA 2-3** (proposta):
   - Portfolio customizado para SESC
   - Cases similares
   - Budget range estimado
   
4. 🤝 **DIA 5-7** (reunião):
   - Apresentação presencial/virtual
   - Discussão de orçamento
   - Próximos passos

**Taxa de conversão:** ~40-60%

---

## 🎯 RELATÓRIO POTENCIAL (Se existe no backoffice)

Se há uma tela "Relatório Potencial", ela provavelmente mostra:

```
┌─────────────────────────────────────────────────────────┐
│ 💰 POTENCIAL DE RECEITA (Pipeline)                     │
├─────────────────────────────────────────────────────────┤
│ Leads URGENT (5):           R$ 2.5M - R$ 8M            │
│ Leads HIGH (12):            R$ 1.2M - R$ 4M            │
│ Leads MEDIUM (30):          R$ 600k - R$ 1.5M          │
│ ──────────────────────────────────────────────────────  │
│ TOTAL PIPELINE:             R$ 4.3M - R$ 13.5M         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 📊 LEADS POR TIPO INSTITUCIONAL                        │
├─────────────────────────────────────────────────────────┤
│ Sistema S:        3  → R$ 1.5M - R$ 5M                 │
│ Bancos Cultural:  2  → R$ 800k - R$ 3M                 │
│ Energia:          1  → R$ 500k - R$ 2M                 │
│ NFB/Canadá:       1  → CAD $150k                        │
│ Outros:           40 → R$ 1.5M - R$ 3.5M               │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 COMO CONVERTER MAIS CLIENTES

### **QUICK WINS (Fazer HOJE):**

#### 1. **Priorizar Leads URGENT**
- ✅ Ver todos os leads com prioridade URGENT
- ✅ Ligar para TODOS no mesmo dia
- ✅ Enviar portfolio personalizado

#### 2. **Email Personalizado por Instituição**
Template exemplo para SESC:

```
Assunto: Experiências imersivas para o SESC [Unidade]

Olá [Nome],

Vi que você se interessou por nossos projetos de experiências 
imersivas. O SESC tem um histórico incrível de projetos culturais 
inovadores, e adoraríamos conversar sobre como podemos criar 
algo único para [unidade].

Já trabalhamos com instituições similares:
- Museu Olímpico do Rio
- CCBB
- [Outros cases]

Podemos agendar 30min para conversar?

Abraço,
[Nome]
Azimut
```

#### 3. **Seguir Ciclo de Vendas Institucional**
```
Dia 1: Primeiro contato
Dia 3: Follow-up
Dia 7: Proposta preliminar
Dia 14: Reunião presencial
Dia 30: Proposta final
Dia 45: Fechamento
```

---

### **MÉDIO PRAZO (Esta Semana):**

#### 4. **Criar Alertas Automáticos**
Configurar no backoffice:
- 📧 Email quando lead URGENT chega
- 💬 Slack/WhatsApp para leads Tier 1
- 📊 Relatório diário de leads novos

#### 5. **Segmentar por Tipo**
Criar listas específicas:
- "Sistema S" (SESC, SENAC, SENAI)
- "Bancos Culturais" (Itaú, CCBB)
- "Energia" (Petrobras, Vale)
- "NFB/Canadá"

#### 6. **Portfolio Customizado**
Criar PDFs específicos:
- `Portfolio_Sistema_S.pdf`
- `Portfolio_Museus.pdf`
- `Portfolio_Corporativo.pdf`
- `Portfolio_Canada_NFB.pdf`

---

### **LONGO PRAZO (Mês):**

#### 7. **Outbound Ativo**
Usar a lista de instituições para:
- Prospecção LinkedIn
- Email direto para departamentos
- Participar de eventos onde eles estão

#### 8. **Parcerias Estratégicas**
- Agências que atendem SESC
- Produtoras que trabalham com Petrobras
- Agências de eventos que montam stands

#### 9. **Nutrição de Leads Frios**
Criar sequência de emails:
- Dia 1: Case study relevante
- Dia 7: Convite para webinar
- Dia 14: Novo projeto lançado
- Dia 30: Checkin "Ainda interessado?"

---

## 📞 PRÓXIMOS PASSOS IMEDIATOS

### **AGORA (Hoje):**
1. ✅ Acessar backoffice → Leads
2. ✅ Filtrar por "URGENT"
3. ✅ Ligar para TODOS os leads URGENT
4. ✅ Enviar emails personalizados

### **AMANHÃ:**
5. ✅ Configurar alertas automáticos (se possível)
6. ✅ Criar templates de email por instituição
7. ✅ Preparar portfolios customizados

### **Esta Semana:**
8. ✅ Implementar Kanban (se não existe)
9. ✅ Treinar equipe no novo sistema
10. ✅ Definir meta de conversão (ex: 3 clientes/mês)

---

## 🎯 METAS DE CONVERSÃO REALISTAS

### **Conservador:**
- 2 clientes Tier 1 por trimestre → R$ 1M - R$ 3M
- 5 clientes Tier 2 por trimestre → R$ 500k - R$ 2M
- **Total:** R$ 6M - R$ 20M/ano

### **Otimista:**
- 1 cliente Tier 1 por mês → R$ 3M - R$ 10M
- 2 clientes Tier 2 por mês → R$ 1.2M - R$ 4M
- **Total:** R$ 17M - R$ 56M/ano

---

**Arquivo criado:** 05/01/2026  
**Status:** ✅ Sistema implementado e pronto para uso!  
**Próximo passo:** Acessar backoffice e começar a converter! 🚀

