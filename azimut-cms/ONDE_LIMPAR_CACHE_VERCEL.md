# 📍 Onde Limpar Cache no Vercel

## 🎯 Cache que Você Precisa Limpar:

### 1. **Build Cache** (O mais importante para este problema)

**Localização:**
1. Vercel Dashboard → Projeto `azimut-backoffice-md8t`
2. **Settings** (aba superior)
3. **Build and Deployment** (menu lateral esquerdo)
4. Role até a seção **"Build Cache"**
5. Clique em **"Clear Build Cache"**

**OU durante o Redeploy:**
1. **Deployments** (aba superior)
2. Clique nos **3 pontos (⋯)** do último deployment
3. Selecione **"Redeploy"**
4. **IMPORTANTE**: Desmarque **"Use existing Build Cache"**
5. Clique em **"Redeploy"**

### 2. **CDN Cache** (Opcional, mas recomendado)

**Localização (que você está vendo na imagem):**
1. **Settings** → **General** (ou na seção de Cache)
2. Seção **"CDN Cache"**
3. Clique em **"Purge CDN Cache"**

**Quando usar:**
- Se após limpar Build Cache ainda houver problemas
- Para garantir que o conteúdo antigo não seja servido

### 3. **Data Cache** (Opcional)

**Localização:**
- Na mesma página que você está vendo
- Seção **"Data Cache"**
- Clique em **"Purge Data Cache"**

**Quando usar:**
- Se houver problemas com dados do banco de dados
- Geralmente não é necessário para este problema

## ✅ Passo a Passo Recomendado:

### Passo 1: Limpar Build Cache (OBRIGATÓRIO)
1. Settings → **Build and Deployment**
2. Role até **"Build Cache"**
3. Clique em **"Clear Build Cache"**

### Passo 2: Fazer Redeploy Sem Cache
1. **Deployments** → Último deployment
2. 3 pontos (⋯) → **"Redeploy"**
3. **Desmarcar**: "Use existing Build Cache"
4. Confirmar

### Passo 3: Limpar CDN Cache (Recomendado)
1. Settings → **General** (ou onde você está agora)
2. Seção **"CDN Cache"**
3. Clique em **"Purge CDN Cache"**

## 🎯 Resumo:

- **Build Cache**: Settings → Build and Deployment → Build Cache
- **CDN Cache**: Settings → General → CDN Cache (onde você está agora)
- **Data Cache**: Settings → General → Data Cache (opcional)

**Para este problema específico (404), você precisa limpar o BUILD CACHE principalmente.**
















