# 🔐 Variáveis de Ambiente - Azimut CMS

Copie este arquivo para `.env.local` e preencha com os valores reais.

```env
# ═══════════════════════════════════════════════════════════════
# AZIMUT CMS - Variáveis de Ambiente
# ═══════════════════════════════════════════════════════════════

# Database (PostgreSQL)
# Exemplo: postgresql://user:password@host:5432/database?sslmode=require
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require

# JWT Secret (para autenticação admin)
# Use um valor aleatório forte em produção
JWT_SECRET=azimut-cms-secret-jwt-2025-production-change-me
ADMIN_JWT_SECRET=azimut-cms-secret-jwt-2025-production-change-me
NEXTAUTH_SECRET=azimut-cms-secret-jwt-2025-production-change-me

# Supabase (para armazenamento de mídia)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Node Environment
NODE_ENV=production

# Site URL (para CORS)
SITE_URL=https://azmt.com.br

# Basic Auth (opcional - para preview)
BASIC_AUTH_ENABLED=false
BASIC_AUTH_USER=admin
BASIC_AUTH_PASS=azimut2025

# IA Provider (opcional)
# DeepSeek (recomendado - grátis)
DEEPSEEK_API_KEY=your-deepseek-api-key

# OpenAI (alternativa)
OPENAI_API_KEY=your-openai-api-key

# Gemini (alternativa)
GEMINI_API_KEY=your-gemini-api-key
```

## 📝 Variáveis Obrigatórias para Deploy

### Produção (Vercel)

1. **DATABASE_URL** - String de conexão PostgreSQL
2. **JWT_SECRET** - Chave secreta para JWT (use valor forte!)
3. **NODE_ENV** - `production`
4. **NEXT_PUBLIC_SUPABASE_URL** - URL do projeto Supabase (se usar)
5. **SUPABASE_SERVICE_ROLE_KEY** - Chave de serviço do Supabase (se usar)

### Opcionais

- **SITE_URL** - URL do site principal (para CORS)
- **DEEPSEEK_API_KEY** - Para usar IA de scoring (recomendado)
- **BASIC_AUTH_ENABLED** - Ativar Basic Auth para preview

## 🔒 Segurança

⚠️ **NUNCA** commite o arquivo `.env.local` no Git!

O arquivo `.gitignore` já está configurado para ignorar arquivos `.env*`.

