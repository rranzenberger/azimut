# 🎯 ESTRATÉGIA: CAPTAÇÃO ATIVA VIA EDITAIS

**Data:** 02 de Janeiro de 2026  
**Foco:** Transformar editais em oportunidades de negócio

---

## 📋 1. ENTENDENDO A DINÂMICA

### 🔄 Diferença: Leads Passivos vs. Editais Ativos

**LEADS PASSIVOS (Sistema Atual):**
- Cliente nos procura
- Preenche formulário no site
- Entra no Kanban como "NEW"
- Nós reagimos

**EDITAIS ATIVOS (Nova Estratégia):**
- Nós procuramos oportunidades
- Identificamos editais abertos
- Preparamos e enviamos propostas
- Mencionamos site/portfólio como diferencial

---

## 🎯 2. COMO USAR EDITAIS A NOSSO FAVOR

### 2.1 Editais Relevantes para Azimut

#### ✅ **Cultura & Museus**
- Editais de exposições imersivas
- Projetos de museus interativos
- Tecnologia para patrimônio cultural
- Digitalização de acervos

#### ✅ **Audiovisual & Tecnologia**
- Editais de produção audiovisual com VR/AR
- Inovação tecnológica em cultura
- Festivais de cinema imersivo
- Documentários interativos

#### ✅ **Educação & Inovação**
- Editais de educação imersiva
- Tecnologia educacional
- Projetos de inclusão digital
- Formação profissional em XR

#### ✅ **Lei Rouanet**
- Projetos culturais com tecnologia
- Exposições imersivas
- Festivais e eventos
- Produções audiovisuais

### 2.2 Fontes de Editais

1. **Ministério da Cultura**
   - Portal de Editais
   - Programa Rouanet
   - Fundo Nacional de Cultura

2. **BNDES**
   - Editais de Cinema
   - Inovação Tecnológica
   - Cultura Digital

3. **Estados e Municípios**
   - Secretarias de Cultura
   - Fundações Culturais
   - Prefeituras

4. **Instituições Privadas**
   - Fundações (Itaú, Bradesco, etc.)
   - Institutos Culturais
   - Empresas com patrocínio cultural

5. **XRBR e Associações**
   - Editais do setor XR
   - Chamadas de projetos
   - Competições e prêmios

---

## 💼 3. COMO MENCIONAR SITE E PORTFÓLIO NAS PROPOSTAS

### 3.1 Estrutura Recomendada

#### **Seção 1: Apresentação da Empresa**
```
A Azimut é uma empresa especializada em experiências imersivas, 
com 30 anos de experiência em produção audiovisual, realidade virtual 
e aumentada, e inteligência artificial aplicada à cultura.

📍 Site: https://azmt.com.br
📁 Portfólio: https://azmt.com.br/work
🏛️ Studio: https://azmt.com.br/studio
```

#### **Seção 2: Experiência e Credenciais**
```
Nossa experiência inclui projetos para museus, festivais, marcas 
e instituições culturais. Acesse nosso portfólio completo em 
https://azmt.com.br/work para conhecer nossos projetos recentes.

Destaques:
- [Mencionar 2-3 projetos relevantes do portfólio]
- [Links diretos para projetos específicos]
- [Prêmios e reconhecimentos]
```

#### **Seção 3: Diferenciais Técnicos**
```
Nossa equipe multidisciplinar combina expertise técnica com 
direção de arte de alto nível. Conheça nossa equipe e metodologia 
em https://azmt.com.br/studio.

Tecnologias que dominamos:
- Realidade Virtual (VR)
- Realidade Aumentada (AR)
- Realidade Mista (MR)
- Inteligência Artificial
- Projeção Mapeada
- Interatividade
```

#### **Seção 4: Referências e Cases**
```
Para conhecer melhor nosso trabalho, acesse:
- Portfólio completo: https://azmt.com.br/work
- Cases de sucesso: [links específicos]
- Depoimentos de clientes: [se houver]

Nossos projetos já foram reconhecidos por:
- [Prêmios e menções]
- [Publicações]
- [Apresentações em eventos]
```

### 3.2 Template de Menção Curta (Para Formulários)

```
A Azimut (https://azmt.com.br) é especializada em experiências 
imersivas com 30 anos de experiência. Portfólio: azmt.com.br/work
```

### 3.3 Template de Menção Completa (Para Propostas Detalhadas)

```
SOBRE A AZIMUT

A Azimut é uma empresa brasileira com 30 anos de experiência 
em produção audiovisual e tecnologias imersivas. Especializamo-nos 
em criar experiências que combinam narrativa cinematográfica, 
tecnologia de ponta e direção de arte de alto nível.

NOSSOS SERVIÇOS
- Experiências imersivas (VR/AR/MR)
- Produção audiovisual
- Exposições interativas
- Museus digitais
- Festivais e eventos
- Educação imersiva

PORTFÓLIO E REFERÊNCIAS
Acesse nosso portfólio completo em: https://azmt.com.br/work

Nossos projetos incluem trabalhos para:
- Museus e instituições culturais
- Festivais de cinema e arte
- Marcas e empresas
- Projetos educacionais

EQUIPE E METODOLOGIA
Conheça nossa equipe e metodologia: https://azmt.com.br/studio

Nossa equipe multidisciplinar combina:
- Expertise técnica em XR
- Direção de arte premiada
- Experiência em projetos culturais
- Metodologia própria de desenvolvimento

CONTATO
Site: https://azmt.com.br
Email: [email]
Telefone: [telefone]
```

---

## 🗂️ 4. PROPOSTA: SISTEMA DE GESTÃO DE EDITAIS

### 4.1 Novo Modelo no Banco de Dados

```prisma
model Edital {
  id              String   @id @default(cuid())
  title           String   // Título do edital
  organization    String   // Organizador (MinC, BNDES, etc.)
  category        String   // Cultura, Audiovisual, Tecnologia, etc.
  budget          String?  // Orçamento disponível
  deadline        DateTime // Prazo de inscrição
  status          EditalStatus @default(OPEN)
  url             String?  // Link do edital
  description     String?  @db.Text
  requirements    String?  @db.Text // Requisitos
  ourProposal     String?  @db.Text // Nossa proposta
  proposalSentAt  DateTime?
  result          EditalResult?
  resultDate      DateTime?
  notes           String?  @db.Text
  assignedToId    String?
  assignedTo      User?    @relation("EditalAssignedTo", fields: [assignedToId], references: [id])
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum EditalStatus {
  OPEN           // Edital aberto, ainda não enviamos
  PREPARING      // Preparando proposta
  SENT           // Proposta enviada
  UNDER_REVIEW   // Em análise
  APPROVED       // Aprovado
  REJECTED       // Rejeitado
  WON            // Ganhamos o projeto
  LOST           // Perdemos para outro
}

enum EditalResult {
  PENDING
  APPROVED
  REJECTED
  WON
  LOST
}
```

### 4.2 Interface Kanban para Editais

```
📋 EDITAIS ABERTOS
   ↓
📝 PREPARANDO PROPOSTA
   ↓
📤 PROPOSTA ENVIADA
   ↓
👀 EM ANÁLISE
   ↓
✅ APROVADO / ❌ REJEITADO
   ↓
🎉 GANHAMOS / 😞 PERDEMOS
```

### 4.3 Funcionalidades Necessárias

1. **Rastreamento de Editais**
   - Cadastro manual de editais encontrados
   - Importação de editais (futuro: scraping)
   - Alertas de prazos

2. **Preparação de Propostas**
   - Templates por tipo de edital
   - Biblioteca de textos (sobre empresa, portfólio, etc.)
   - Checklist de documentos

3. **Acompanhamento**
   - Status de cada proposta
   - Histórico de envios
   - Resultados e feedbacks

4. **Métricas**
   - Taxa de aprovação
   - Editais por categoria
   - ROI por edital

---

## 📊 5. ESTRATÉGIA DE CAPTAÇÃO ATIVA

### 5.1 Processo Recomendado

#### **ETAPA 1: Identificação (Semanal)**
- [ ] Buscar editais abertos (MinC, BNDES, Estados)
- [ ] Filtrar por relevância (cultura, tecnologia, XR)
- [ ] Cadastrar no sistema
- [ ] Avaliar viabilidade

#### **ETAPA 2: Análise (2-3 dias)**
- [ ] Ler edital completo
- [ ] Verificar requisitos
- [ ] Avaliar fit com nosso portfólio
- [ ] Decidir: participar ou não

#### **ETAPA 3: Preparação (1-2 semanas)**
- [ ] Preparar proposta personalizada
- [ ] Mencionar site/portfólio estrategicamente
- [ ] Incluir cases relevantes
- [ ] Revisar documentos

#### **ETAPA 4: Envio**
- [ ] Enviar dentro do prazo
- [ ] Confirmar recebimento
- [ ] Atualizar status no sistema

#### **ETAPA 5: Acompanhamento**
- [ ] Acompanhar análise
- [ ] Participar de esclarecimentos (se houver)
- [ ] Registrar resultado
- [ ] Aprender com feedback

### 5.2 Métricas de Sucesso

```
Taxa de Participação: % de editais relevantes que participamos
Taxa de Aprovação: % de propostas aprovadas
Taxa de Conversão: % de aprovações que viram projetos
ROI por Edital: Receita gerada / Tempo investido
```

---

## 🎯 6. PRÓXIMOS PASSOS

### Fase 1: Estrutura Básica (1 semana)
1. ✅ Criar modelo `Edital` no Prisma
2. ✅ Migração do banco
3. ✅ Interface básica de cadastro
4. ✅ Lista de editais

### Fase 2: Gestão (2 semanas)
5. ✅ Kanban de editais
6. ✅ Templates de proposta
7. ✅ Biblioteca de textos
8. ✅ Alertas de prazos

### Fase 3: Automação (1 mês)
9. ✅ Integração com fontes de editais
10. ✅ Notificações automáticas
11. ✅ Métricas e relatórios
12. ✅ Histórico e aprendizado

---

## 💡 7. DICAS ESTRATÉGICAS

### ✅ **O Que Fazer**
- Mencionar site/portfólio de forma natural
- Personalizar cada proposta
- Destacar projetos relevantes
- Mostrar expertise técnica
- Incluir links diretos para cases

### ❌ **O Que Evitar**
- Mencionar site de forma forçada
- Propostas genéricas
- Links quebrados
- Informações desatualizadas
- Excesso de informações

### 🎯 **Diferenciais a Destacar**
- 30 anos de experiência
- Portfólio diversificado
- Equipe multidisciplinar
- Tecnologias de ponta
- Cases de sucesso
- Reconhecimentos e prêmios

---

## 📝 8. TEMPLATE DE PROPOSTA (Exemplo)

```
PROJETO: [Nome do Projeto]

SOBRE A AZIMUT
A Azimut (https://azmt.com.br) é uma empresa especializada em 
experiências imersivas, com 30 anos de experiência em produção 
audiovisual, realidade virtual e aumentada.

PORTFÓLIO
Conheça nossos projetos: https://azmt.com.br/work

Destaques relevantes:
- [Projeto 1] - Link direto
- [Projeto 2] - Link direto
- [Projeto 3] - Link direto

EQUIPE
Nossa equipe multidisciplinar: https://azmt.com.br/studio

PROPOSTA
[Descrição detalhada do projeto proposto]

ORÇAMENTO
[Orçamento detalhado]

CRONOGRAMA
[Cronograma de execução]

CONTATO
Site: https://azmt.com.br
Email: [email]
Telefone: [telefone]
```

---

**Conclusão:** Transformar editais em oportunidades ativas de negócio, usando site e portfólio como diferencial competitivo.





