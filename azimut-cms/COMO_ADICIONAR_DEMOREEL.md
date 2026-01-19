# 🎬 Sistema Híbrido: Hero Media com Flexibilidade Total

## ✅ Sistema Implementado: Upload Local + URL Manual

Agora você tem **2 opções** para cada mídia:

1. ✅ **Upload Local** (via "Mídias") - PRIORIDADE 1
2. ✅ **URL Manual** (YouTube/Vimeo/Unsplash) - PRIORIDADE 2 (fallback)

**Lógica:** Se selecionar Media, usa ela. Se não, usa URL manual.

---

## 📋 Passo a Passo Completo

### 1. Aplicar Migrations no Banco

```bash
cd azimut-cms
npx prisma migrate deploy
npx prisma generate
```

---

## 🎯 OPÇÃO 1: Upload Local (Recomendado)

### A) Enviar Imagem de Fundo do Hero

1. Ir em: **Backoffice** → **Mídias**
2. Selecionar **"Tipo: Imagem"**
3. Fazer upload da imagem (ex: 1920x1080, até 8MB)
4. Preencher **Alt (PT)**: "Fundo Hero - Tecnologia Criativa"
5. Clicar em **"Enviar mídia"**

### B) Enviar Vídeo Demoreel

1. Ir em: **Backoffice** → **Mídias**
2. Selecionar **"Tipo: Vídeo"**
3. Fazer upload do vídeo (MP4, até 25MB, ideal 10-20s)
4. Preencher **Alt (PT)**: "Demoreel Azimut 2026"
5. Clicar em **"Enviar mídia"**

### C) Configurar na Página Home

1. Ir em: **Backoffice** → **Páginas do Site** → **Home**
2. Rolar até **"🎬 Hero Media"**
3. **Imagem de Fundo do Hero:**
   - **Opção 1: Mídia (Upload Local) - PRIORIDADE 1**
   - Selecionar no dropdown
   - Ver preview automático
4. **Vídeo Demoreel:**
   - **Opção 1: Mídia (Upload Local) - PRIORIDADE 1**
   - Selecionar no dropdown
   - Ver preview/link
5. **Salvar Alterações**

---

## 🌐 OPÇÃO 2: URL Manual (Rápido e Simples)

### Quando Usar?

- Vídeo já está no YouTube/Vimeo
- Imagem já está no Unsplash/Cloudinary
- Teste rápido sem upload

### Como Usar?

1. Ir em: **Backoffice** → **Páginas** → **Home** → **Hero Media**
2. **Imagem de Fundo do Hero:**
   - **Opção 2: URL Manual - PRIORIDADE 2**
   - Colar URL: `https://images.unsplash.com/photo-...`
3. **Vídeo Demoreel:**
   - **Opção 2: URL Manual - PRIORIDADE 2**
   - Colar URL: `https://www.youtube.com/watch?v=...`
4. **Salvar Alterações**

---

## 🔄 Sistema de Prioridade

```
┌─────────────────────────────────────────┐
│ 1. Media Selecionada?                   │
│    ✅ SIM → USA MEDIA                   │
│    ❌ NÃO → Vai para 2                  │
├─────────────────────────────────────────┤
│ 2. URL Manual Preenchida?               │
│    ✅ SIM → USA URL MANUAL              │
│    ❌ NÃO → USA FALLBACK (projeto)      │
└─────────────────────────────────────────┘
```

### Exemplo Prático:

| Cenário | Media | URL Manual | Resultado |
|---------|-------|------------|-----------|
| 1 | ✅ Selecionada | ✅ Preenchida | **USA MEDIA** |
| 2 | ❌ Nenhuma | ✅ Preenchida | **USA URL** |
| 3 | ❌ Nenhuma | ❌ Vazia | **USA FALLBACK** |

---

## 🎯 Casos de Uso

### Caso 1: Site em Produção (Profissional)
```
✅ Upload Local (Mídias)
- Controle total dos arquivos
- Otimização automática
- Backup no servidor
```

### Caso 2: Teste Rápido ou Vídeo Externo
```
✅ URL Manual
- YouTube/Vimeo (sem hosting)
- Unsplash (imagens gratuitas)
- Teste antes de fazer upload
```

### Caso 3: Sistema Híbrido (Melhor dos 2 Mundos)
```
✅ Imagem: Upload Local
✅ Vídeo: YouTube URL
= Flexibilidade máxima!
```

---

## 🔧 Estrutura no Banco de Dados

### Tabela `Page`:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `heroBackgroundImageId` | TEXT | ID da Media (PRIORIDADE 1) |
| `heroBackgroundImageUrl` | TEXT | URL manual (PRIORIDADE 2) |
| `demoreelVideoId` | TEXT | ID da Media (PRIORIDADE 1) |
| `demoreelVideoUrl` | TEXT | URL manual (PRIORIDADE 2) |

---

## 💡 Vantagens do Sistema Híbrido

| Recurso | Benefício |
|---------|-----------|
| ✅ **Flexibilidade** | Escolhe o melhor método para cada caso |
| ✅ **Facilidade** | URL manual para testes rápidos |
| ✅ **Profissionalismo** | Upload local para produção |
| ✅ **Compatibilidade** | Funciona com YouTube/Vimeo/Unsplash |
| ✅ **Sem Riscos** | Se um falhar, tenta o outro |

---

## 📝 Exemplo Completo

### Configuração Final:

```
HERO BACKGROUND:
  ├─ Opção 1: Media ID = "abc-123" (imagem local)
  └─ Opção 2: URL = (vazio)
  → RESULTADO: Usa imagem local ✅

DEMOREEL VIDEO:
  ├─ Opção 1: Media ID = (vazio)
  └─ Opção 2: URL = "https://youtube.com/watch?v=..."
  → RESULTADO: Usa vídeo do YouTube ✅
```

---

## 🚀 Interface do Backoffice

```
🎬 Hero Media (Imagem & Demoreel)

┌─────────────────────────────────────────┐
│ 🖼️ Imagem de Fundo do Hero              │
├─────────────────────────────────────────┤
│ Opção 1: Mídia (Upload Local) ⭐        │
│ [Dropdown: Selecionar...] ▼             │
│ ✅ Preview da imagem selecionada        │
├─────────────────────────────────────────┤
│ Opção 2: URL Manual                     │
│ [https://...] 🔒 Desabilitado          │
│ (mídia selecionada tem prioridade)      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 🎥 Vídeo Demoreel Institucional          │
├─────────────────────────────────────────┤
│ Opção 1: Mídia (Upload Local) ⭐        │
│ [Dropdown: Selecionar...] ▼             │
│ ✅ Preview + Link para vídeo            │
├─────────────────────────────────────────┤
│ Opção 2: URL Manual                     │
│ [https://youtube.com/...] 🔒           │
│ (vídeo selecionado tem prioridade)      │
└─────────────────────────────────────────┘
```

---

## ✨ Recursos Especiais

### 🔒 Bloqueio Inteligente
- Se selecionar Media, URL manual fica **desabilitado** (cinza)
- Evita confusão sobre qual será usado

### ✅ Preview Visual
- Vê a imagem/vídeo **antes** de salvar
- Confirma que selecionou o arquivo certo

### 🔄 Fallback Automático
- Se não preencher nenhum, usa imagem do projeto featured
- Site **nunca** fica quebrado

---

## 🎉 Pronto!

Sistema híbrido **100% funcional**! Use como preferir:
- 🏢 **Profissional:** Upload local
- ⚡ **Rápido:** URL manual
- 🎯 **Mix:** Melhor de cada!

**Próximo passo:** Aplicar migrations e começar a usar! 🚀
