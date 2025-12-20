# ⚡ QUICK START - Azimut CMS

## 🚀 Começar em 5 minutos

### 1. Instalar dependências

```bash
cd azimut-cms
npm install
```

### 2. Configurar banco de dados (opção fácil: Supabase)

#### Criar projeto no Supabase (grátis)

1. Acesse: https://supabase.com
2. Crie um projeto (ex: "azimut-cms")
3. Copie as credenciais

#### Configurar .env.local

```bash
cp .env.example .env.local
```

Edite `.env.local`:

```bash
# 1. Database (copie do Supabase > Settings > Database > Connection String)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"

# 2. Storage (copie do Supabase > Settings > API)
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJh..." # public anon key
SUPABASE_SERVICE_ROLE_KEY="eyJh..." # service_role key (secret)

# 3. NextAuth (gere um secret)
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="cole-aqui-resultado-de: openssl rand -base64 32"

# 4. DeepSeek (IA)
# Obtenha grátis em: https://platform.deepseek.com/
AI_PROVIDER="deepseek"
DEEPSEEK_API_KEY="sk-..."
```

### 3. Criar bucket no Supabase para imagens

1. Acesse: Supabase > Storage
2. Crie bucket chamado: `media`
3. Configure como **público**

### 4. Rodar migrations

```bash
npm run prisma:push
npm run prisma:seed
```

Você verá:
```
✅ Database seeded successfully!

📝 Credenciais do Admin:
   Email: admin@azimut.com.br
   Senha: Azimut2025!

🚀 Acesse: http://localhost:3001/login
```

### 5. Iniciar servidor

```bash
npm run dev
```

Acesse: **http://localhost:3001**

---

## 🎯 Testar a IA

### Opção 1: Usar DeepSeek (Recomendado - barato)

1. Acesse: https://platform.deepseek.com/
2. Crie conta (grátis)
3. Gere API key
4. Cole no `.env.local`:
   ```bash
   DEEPSEEK_API_KEY="sk-..."
   ```

### Opção 2: Usar Gemini (Google - gratuito)

1. Acesse: https://makersuite.google.com/app/apikey
2. Gere API key
3. Configure:
   ```bash
   AI_PROVIDER="gemini"
   GEMINI_API_KEY="..."
   ```

### Opção 3: Usar OpenAI (pago)

```bash
AI_PROVIDER="openai"
OPENAI_API_KEY="sk-..."
```

---

## 🧪 Testar Integração com Site

### 1. Adicionar variável de ambiente no site

No site principal (`azimut-site-vite-tailwind`):

Criar `.env.local`:
```bash
VITE_CMS_API_URL=http://localhost:3001/api
```

### 2. Testar tracking

Abra o console do navegador e navegue pelo site.

Você verá:
```
🌍 País detectado: BR
```

### 3. Testar captura de lead

Preencha o formulário de contato.

No terminal do CMS você verá:
```
🎯 Lead qualificado detectado: [sessionId]
{
  type: 'MUSEUM_CURATOR',
  conversionScore: 75
}
```

---

## 📊 Ver dados no banco

```bash
npm run prisma:studio
```

Acesse: http://localhost:5555

Você verá todas as tabelas:
- `VisitorSession` - Sessões de visitantes
- `PageView` - Páginas visitadas
- `InterestScore` - Scores calculados pela IA
- `Lead` - Leads capturados

---

## 🎨 Próximo passo: Adicionar projetos

*O dashboard admin está em desenvolvimento.*

Por enquanto, adicione projetos via Prisma Studio ou direto no banco.

Exemplo de projeto:

```sql
INSERT INTO "projects" (
  id, slug, title, type, country, year,
  "summaryPt", "summaryEn",
  status, featured, "priorityHome",
  "createdById", "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'rio-museu-olimpico',
  'Rio Museu Olímpico',
  'MUSEU',
  'Brasil',
  2023,
  'Direção de tecnologia e audiovisual para experiência imersiva permanente.',
  'Technology and audiovisual direction for permanent immersive experience.',
  'PUBLISHED',
  true,
  10,
  (SELECT id FROM users WHERE email = 'admin@azimut.com.br'),
  NOW(),
  NOW()
);
```

---

## ✅ Checklist

- [ ] Instalou dependências
- [ ] Criou projeto no Supabase
- [ ] Configurou .env.local
- [ ] Criou bucket `media` no Supabase
- [ ] Rodou migrations e seed
- [ ] Obteve API key da IA (DeepSeek/Gemini/OpenAI)
- [ ] Testou login no CMS
- [ ] Configurou variável no site principal
- [ ] Testou tracking comportamental
- [ ] Testou captura de lead

---

## 🆘 Problemas Comuns

### Erro de conexão com banco

```
Error: Can't reach database server
```

**Solução:** Verifique se DATABASE_URL está correto. No Supabase, use "Session mode" connection string.

### Erro no upload de imagem

```
Storage error: Bucket not found
```

**Solução:** Crie o bucket `media` no Supabase Storage e torne-o público.

### IA não responde

```
AI enhancement failed
```

**Solução:** Verifique se API key está correta. O sistema funciona mesmo sem IA (usa apenas regras), mas as recomendações serão menos precisas.

---

## 📚 Documentação Completa

- [README.md](./README.md) - Guia completo
- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Integração com site
- [BACKOFFICE_COMPLETE_SUMMARY.md](./BACKOFFICE_COMPLETE_SUMMARY.md) - Resumo técnico

---

**Pronto! Seu CMS com IA está funcionando! 🎉**





















