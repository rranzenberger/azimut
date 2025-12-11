# 🎯 AZIMUT CMS

**Sistema de gerenciamento de conteúdo com IA integrada para captura inteligente de leads**

## 🌟 Features

### ✅ CMS Completo
- Gestão de projetos/cases multilíngue (PT, EN, FR, ES)
- Upload e otimização automática de imagens (WebP, AVIF)
- Sistema de tags e categorização
- Preview antes de publicar
- Versionamento de conteúdo

### 🤖 IA Integrada (DeepSeek / OpenAI / Gemini)
- **Tracking comportamental silencioso** (sem cookies invasivos)
- **Scoring automático de visitantes**:
  - Identifica: curadores de museus, secretarias de cultura, organizadores de festivais, gestores de marca, etc.
  - Calcula score de conversão (0-100)
  - Recomenda projetos personalizados
  - Sugere próximas ações
- **Personalização por geolocalização** (IP → país/região)
- **Captura de leads contextualizada** (com histórico comportamental completo)

### 📊 Analytics Inteligente
- Rastreamento de páginas visitadas
- Tempo gasto em cada seção
- Projetos visualizados
- Scroll depth
- Análise de interesse por categoria

### 🔒 Segurança
- Autenticação com JWT
- Suporte a MFA (2FA)
- Rate limiting
- Auditoria completa (logs de todas as ações)
- IP whitelisting (opcional)

---

## 🚀 Instalação

### 1. Pré-requisitos

- Node.js 18+
- PostgreSQL 14+ (ou Supabase)
- Conta DeepSeek (https://platform.deepseek.com/) - **GRÁTIS para começar!**

### 2. Clone e instale dependências

```bash
cd azimut-cms
npm install
```

### 3. Configure o banco de dados

```bash
# Copie o .env.example
cp .env.example .env.local

# Edite .env.local e configure:
# - DATABASE_URL (PostgreSQL ou Supabase)
# - DEEPSEEK_API_KEY (ou outro provider de IA)
# - NEXT_PUBLIC_SUPABASE_URL (para storage de imagens)
# - SUPABASE_SERVICE_ROLE_KEY
```

**Exemplo `.env.local`:**

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/azimut_cms"

# IA Provider (escolha um)
AI_PROVIDER="deepseek"  # Recomendado!
DEEPSEEK_API_KEY="sk-..."  # Obtenha em https://platform.deepseek.com/

# Storage
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJh..."
SUPABASE_SERVICE_ROLE_KEY="eyJh..."

# NextAuth
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="gere-com-openssl-rand-base64-32"

# Site público
SITE_URL="http://localhost:5173"
```

### 4. Setup do banco de dados

```bash
# Gerar cliente Prisma
npm run prisma:generate

# Criar tabelas
npm run prisma:push

# Popular com dados iniciais
npm run prisma:seed
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse: **http://localhost:3001**

---

## 🔑 Credenciais Padrão

Após rodar o seed:

- **Email**: `admin@azimut.com.br`
- **Senha**: `Azimut2025!`

⚠️ **IMPORTANTE**: Altere a senha após primeiro login!

---

## 📡 Endpoints da API

### Públicos (para o site consumir)

#### `GET /api/geo`
Detecta país do visitante via IP.

```bash
curl http://localhost:3001/api/geo
# Retorna: { "country": "BR", "detected": true }
```

#### `GET /api/public/content`
Retorna conteúdo personalizado.

Query params:
- `lang` (pt|en|fr|es) - padrão: pt
- `country` (BR|CA|US|etc) - padrão: DEFAULT
- `page` (home|studio|portfolio|etc) - padrão: home
- `sessionId` (opcional) - para personalização comportamental

```bash
curl "http://localhost:3001/api/public/content?lang=pt&country=BR&page=home"
```

Resposta:
```json
{
  "lang": "pt",
  "market": {
    "code": "BR",
    "label": "Brasil",
    "heroMessage": "Experiências imersivas..."
  },
  "highlightProjects": [...],
  "services": [...],
  "page": {...}
}
```

#### `POST /api/track`
Rastreia comportamento do visitante (silencioso).

```bash
curl -X POST http://localhost:3001/api/track \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "uuid-aqui",
    "event": "page_view",
    "data": {
      "pageSlug": "portfolio",
      "timeSpent": 45,
      "scrollDepth": 75
    }
  }'
```

#### `POST /api/leads`
Captura lead com contexto comportamental.

```bash
curl -X POST http://localhost:3001/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "uuid-aqui",
    "name": "João Silva",
    "email": "joao@museu.com.br",
    "projectType": "museu",
    "description": "Precisamos de uma instalação imersiva..."
  }'
```

---

## 🤖 Como funciona a IA

### 1. Tracking Silencioso

Quando um visitante acessa o site:

1. Sistema gera um `sessionId` único (armazenado no sessionStorage)
2. A cada página visitada, envia dados para `/api/track`
3. A cada projeto visualizado, registra interação
4. Calcula tempo gasto e profundidade de scroll

**Nenhum cookie invasivo é usado!** Apenas sessionStorage temporário.

### 2. Análise Comportamental

A IA (DeepSeek) analisa:

- Quais páginas o visitante passou mais tempo
- Quais projetos visualizou (tipo: museu, marca, festival, etc.)
- Quais tags/tecnologias chamaram atenção (VR, IA, instalação, etc.)
- De qual país está acessando
- Idioma preferido

### 3. Inferência de Perfil

Com base no comportamento, a IA infere:

```
Se visitou muito projetos de museus + está no Brasil + leu sobre cenografia
→ Provável: MUSEUM_CURATOR (curador de museu)
→ Score de conversão: 75/100
→ Prioridade: HIGH

Se visitou projetos de cidades + tempo alto em "Prefeituras"
→ Provável: CITY_OFFICIAL (secretaria de cultura/turismo)
→ Score de conversão: 82/100
→ Prioridade: URGENT
```

### 4. Recomendação Personalizada

A IA sugere:

- **3 projetos mais relevantes** para aquele visitante
- **Próxima ação** sugerida (ex: "Ver mais projetos de museus")
- **Próxima página** (ex: "portfolio", "contact")

### 5. Captura de Lead

Quando o visitante preenche o formulário:

- Lead é criado com **TODO o histórico** comportamental
- Email é enviado para equipe com **análise da IA**:
  ```
  🎯 Novo Lead - Curador de Museu (75% confiança)
  
  Visitou: portfolio, research (3min cada)
  Projetos visualizados: Rio Museu Olímpico, Gramado VR
  Score de conversão: 75/100
  Prioridade: HIGH
  ```

---

## 💰 Custos de IA

### DeepSeek (Recomendado)
- **Gratuito** para primeiros testes
- **~$1-3/mês** para uso moderado (100-500 análises/mês)
- **~$5-10/mês** para uso intenso (1000+ análises/mês)
- Open source, pode self-host

### OpenAI
- **~$30-50/mês** para mesma carga

### Gemini (Google)
- **Gratuito** até 60 requisições/minuto
- Depois ~$15-25/mês

### Llama 3 (Meta)
- **Totalmente gratuito** (self-hosted via Ollama)
- Requer servidor próprio

**💡 Recomendação:** Comece com **DeepSeek** (barato, rápido, bom).

---

## 📚 Documentação Adicional

- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Como integrar o CMS no site
- [prisma/schema.prisma](./prisma/schema.prisma) - Modelo de dados completo
- [src/lib/ai-provider.ts](./src/lib/ai-provider.ts) - Camada de abstração de IA
- [src/lib/ai-scoring.ts](./src/lib/ai-scoring.ts) - Lógica de scoring

---

## 🛠 Scripts Úteis

```bash
# Desenvolvimento
npm run dev                # Inicia servidor (porta 3001)

# Banco de dados
npm run prisma:studio      # Interface visual do banco
npm run prisma:migrate     # Criar migração
npm run prisma:push        # Aplicar mudanças sem migração
npm run prisma:seed        # Popular com dados iniciais

# Produção
npm run build              # Build para produção
npm start                  # Iniciar em produção
```

---

## 🚢 Deploy

### Opção 1: Vercel (Recomendado)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configure environment variables no dashboard
```

### Opção 2: Railway

```bash
# Conecte ao GitHub e configure:
# - PostgreSQL add-on
# - Environment variables
# - Deploy automático
```

### Opção 3: Docker

```dockerfile
# Dockerfile incluído (criar se necessário)
docker build -t azimut-cms .
docker run -p 3001:3001 azimut-cms
```

---

## 🎯 Roadmap

- [x] CMS básico com projetos
- [x] Upload e otimização de imagens
- [x] API pública de conteúdo
- [x] Tracking comportamental
- [x] IA de scoring e recomendação
- [x] Captura de leads contextualizada
- [ ] Dashboard de analytics visual
- [ ] Chat IA para visitantes (Navigator)
- [ ] A/B testing de conteúdo
- [ ] Integração com CRM (Pipedrive, HubSpot)
- [ ] Notificações em tempo real (WebSockets)
- [ ] App mobile para gestão

---

## 📄 Licença

Propriedade de Azimut Creative Tech Studio.

---

## 🤝 Suporte

Dúvidas? Entre em contato:
- **Email**: admin@azimut.com.br
- **Docs**: [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)

---

**Feito com ❤️ e IA por Azimut**












