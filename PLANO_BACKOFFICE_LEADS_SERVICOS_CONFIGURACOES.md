# 📋 Plano de Implementação - Backoffice: Leads, Serviços e Configurações

**Data:** 2025-01-27

---

## 🎯 VISÃO GERAL

### Status Atual
- ✅ **Leads**: Modelo no banco existe, API existe, mas falta página de gerenciamento
- ✅ **Serviços**: Modelo no banco existe, mas falta página de gerenciamento
- ❌ **Configurações**: Não existe ainda, precisa criar

---

## 1. 📊 LEADS - Página de Gerenciamento

### O Que Já Existe
- ✅ Modelo `Lead` no Prisma
- ✅ API `/api/leads` (POST para criar)
- ✅ Dashboard mostra leads recentes
- ✅ Componente `LeadCard` existe

### O Que Falta
- ❌ Página `/admin/leads` para listar todos os leads
- ❌ Filtros (status, prioridade, tipo, data)
- ❌ Visualização detalhada de lead
- ❌ Edição de status/prioridade
- ❌ Integração com Kabbam/CRM
- ❌ Exportação de leads
- ❌ Análise de conversão

### Funcionalidades a Implementar

#### 1.1 Listagem de Leads (`/admin/leads`)
- **Grid/Lista** de todos os leads
- **Filtros:**
  - Status (NEW, IN_PROGRESS, WON, LOST)
  - Prioridade (LOW, MEDIUM, HIGH, URGENT)
  - Tipo (CONTACT_FORM, BUDGET_INQUIRY)
  - Data (últimos 7 dias, 30 dias, 90 dias, todos)
  - País (BR, CA)
- **Ordenação:** Data, Prioridade, Score
- **Busca:** Nome, email, empresa

#### 1.2 Detalhes do Lead (`/admin/leads/[id]`)
- **Informações do contato:**
  - Nome, email, telefone, empresa, cargo
- **Informações do projeto:**
  - Tipo, orçamento, timeline, descrição
- **Análise comportamental:**
  - Páginas visitadas
  - Projetos visualizados
  - Score de conversão
  - Tipo de visitante identificado
- **Histórico:**
  - Quando foi criado
  - Mudanças de status
  - Interações
- **Ações:**
  - Mudar status
  - Mudar prioridade
  - Adicionar notas
  - Enviar email
  - Exportar para Kabbam/CRM

#### 1.3 Análise de Leads
- **Métricas:**
  - Taxa de conversão
  - Leads por fonte
  - Leads por tipo
  - Tempo médio de resposta
- **Gráficos:**
  - Leads ao longo do tempo
  - Distribuição por prioridade
  - Distribuição por status

---

## 2. 🛠️ SERVIÇOS - Página de Gerenciamento

### O Que Já Existe
- ✅ Modelo `Service` no Prisma
- ✅ Campos multilíngues (PT, EN, ES, FR)
- ✅ Relação com projetos

### O Que Falta
- ❌ Página `/admin/services` para gerenciar serviços
- ❌ CRUD completo (criar, editar, deletar)
- ❌ Upload de ícones
- ❌ Ordenação (priority)
- ❌ Status (DRAFT, PUBLISHED, ARCHIVED)

### Funcionalidades a Implementar

#### 2.1 Listagem de Serviços (`/admin/services`)
- **Grid** de serviços
- **Filtros:**
  - Status (DRAFT, PUBLISHED, ARCHIVED)
  - Segmento
- **Ordenação:** Prioridade, Nome, Data
- **Busca:** Nome, descrição

#### 2.2 Criar/Editar Serviço (`/admin/services/new` e `/admin/services/[slug]/edit`)
- **Campos:**
  - Slug (único)
  - Título (PT, EN, ES, FR)
  - Descrição (PT, EN, ES, FR)
  - Ícone (upload ou seleção)
  - Status (DRAFT, PUBLISHED, ARCHIVED)
  - Prioridade (0-100)
  - Segmentos (array de strings)
- **Preview:** Como aparece no site
- **Projetos relacionados:** Lista de projetos que usam este serviço

---

## 3. ⚙️ CONFIGURAÇÕES - Página de Configurações

### O Que Falta (Tudo)
- ❌ Modelo `Settings` no Prisma
- ❌ Página `/admin/settings`
- ❌ Sistema de configurações

### Funcionalidades a Implementar

#### 3.1 Configurações Gerais
- **Site:**
  - Nome do site
  - Logo
  - Favicon
  - Domínio principal
  - Email de contato
  - Telefone
  - Endereço
- **SEO:**
  - Meta description padrão
  - Keywords padrão
  - Google Analytics ID
  - Google Tag Manager ID
- **Social:**
  - Links de redes sociais (LinkedIn, Instagram, Facebook, etc.)
  - Open Graph image padrão

#### 3.2 Configurações de Integração
- **Kabbam/CRM:**
  - API Key
  - API URL
  - Habilitar/desabilitar integração
- **Email:**
  - Serviço (Resend, SendGrid, etc.)
  - API Key
  - Email de notificações
  - Template de email
- **DeepSeek AI:**
  - API Key
  - Modelo padrão
  - Temperature padrão

#### 3.3 Configurações de Conteúdo
- **Idiomas:**
  - Habilitar/desabilitar idiomas (PT, EN, ES, FR)
  - Idioma padrão
- **Mercados:**
  - Mercados ativos
  - Mercado padrão
- **Editais:**
  - Habilitar/desabilitar seção de editais
  - Fonte de dados de editais

#### 3.4 Configurações de Sistema
- **Usuários:**
  - Criar/editar/deletar usuários
  - Gerenciar permissões (roles)
- **Backup:**
  - Exportar dados
  - Importar dados
- **Logs:**
  - Ver logs do sistema
  - Limpar logs antigos

---

## 🚀 ROADMAP DE IMPLEMENTAÇÃO

### Fase 1: Leads (1-2 semanas)
1. ✅ Criar página `/admin/leads`
2. ✅ Implementar listagem com filtros
3. ✅ Criar página de detalhes `/admin/leads/[id]`
4. ✅ Implementar edição de status/prioridade
5. ✅ Adicionar análise e métricas

### Fase 2: Serviços (1 semana)
1. ✅ Criar página `/admin/services`
2. ✅ Implementar CRUD completo
3. ✅ Adicionar upload de ícones
4. ✅ Implementar ordenação por prioridade

### Fase 3: Configurações (1-2 semanas)
1. ✅ Criar modelo `Settings` no Prisma
2. ✅ Criar página `/admin/settings`
3. ✅ Implementar configurações gerais
4. ✅ Implementar configurações de integração
5. ✅ Implementar gerenciamento de usuários

---

## 📊 PRIORIDADE

### 🔴 Alta Prioridade
1. **Leads** - Já tem dados, só falta interface
2. **Serviços** - Já tem dados, só falta interface

### 🟡 Média Prioridade
3. **Configurações** - Necessário para integrações

---

## 💡 SUGESTÕES DE DESIGN

### Leads
- **Layout:** Tabela com cards expansíveis
- **Cores:** 
  - NEW: Azul
  - IN_PROGRESS: Amarelo
  - WON: Verde
  - LOST: Cinza
- **Prioridade:** Badge colorido (LOW=cinza, MEDIUM=amarelo, HIGH=laranja, URGENT=vermelho)

### Serviços
- **Layout:** Grid de cards (similar a projetos)
- **Preview:** Mostrar como aparece no site
- **Ícones:** Biblioteca de ícones ou upload

### Configurações
- **Layout:** Tabs por categoria
- **Validação:** Validar campos antes de salvar
- **Preview:** Mostrar como configurações afetam o site

---

## 🔧 ARQUIVOS A CRIAR

### Leads
- `azimut-cms/app/admin/leads/page.tsx` - Listagem
- `azimut-cms/app/admin/leads/[id]/page.tsx` - Detalhes
- `azimut-cms/app/admin/leads/components/LeadFilters.tsx`
- `azimut-cms/app/admin/leads/components/LeadTable.tsx`
- `azimut-cms/app/admin/leads/components/LeadDetails.tsx`
- `azimut-cms/app/api/admin/leads/route.ts` - GET (listar)
- `azimut-cms/app/api/admin/leads/[id]/route.ts` - GET, PUT, DELETE

### Serviços
- `azimut-cms/app/admin/services/page.tsx` - Listagem
- `azimut-cms/app/admin/services/new/page.tsx` - Criar
- `azimut-cms/app/admin/services/[slug]/edit/page.tsx` - Editar
- `azimut-cms/app/admin/services/components/ServiceCard.tsx`
- `azimut-cms/app/admin/services/components/ServiceForm.tsx`
- `azimut-cms/app/api/admin/services/route.ts` - GET, POST
- `azimut-cms/app/api/admin/services/[slug]/route.ts` - GET, PUT, DELETE

### Configurações
- `azimut-cms/app/admin/settings/page.tsx` - Página principal
- `azimut-cms/app/admin/settings/components/SettingsTabs.tsx`
- `azimut-cms/app/admin/settings/components/GeneralSettings.tsx`
- `azimut-cms/app/admin/settings/components/IntegrationSettings.tsx`
- `azimut-cms/app/admin/settings/components/UserManagement.tsx`
- `azimut-cms/app/api/admin/settings/route.ts` - GET, PUT
- Adicionar modelo `Settings` ao `schema.prisma`

---

## ✅ CHECKLIST

### Leads
- [ ] Criar página de listagem
- [ ] Implementar filtros
- [ ] Criar página de detalhes
- [ ] Implementar edição de status
- [ ] Adicionar análise de conversão
- [ ] Integrar com Kabbam (opcional)

### Serviços
- [ ] Criar página de listagem
- [ ] Criar página de criação
- [ ] Criar página de edição
- [ ] Implementar upload de ícones
- [ ] Adicionar ordenação

### Configurações
- [ ] Criar modelo Settings no Prisma
- [ ] Criar página de configurações
- [ ] Implementar configurações gerais
- [ ] Implementar configurações de integração
- [ ] Implementar gerenciamento de usuários

---

**Próximo passo:** Começar pela implementação de Leads, já que é a mais urgente e já tem dados no banco.

