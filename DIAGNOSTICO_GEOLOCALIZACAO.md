# 🌍 **DIAGNÓSTICO COMPLETO: GEOLOCALIZAÇÃO E ACESSO INTERNACIONAL**

**Data:** 26 de Dezembro de 2025  
**Status:** ⚠️ **CANADÁ NÃO CONSEGUE ACESSAR + IDIOMAS NÃO MUDAM**

---

## 🚨 **PROBLEMAS IDENTIFICADOS:**

### 1️⃣ **CANADÁ NÃO CARREGA O SITE** ❌
**Sintoma:** Amigos no Canadá não conseguem acessar, só funciona com VPN para BR

**Possíveis Causas:**
- ✅ **API de Geolocalização bloqueada por CORS** (ipapi.co)
- ⚠️ **Timeout muito curto** (3 segundos pode não ser suficiente)
- ⚠️ **Fetch bloqueado antes do render** (site não carrega se API falhar)

### 2️⃣ **IDIOMAS NÃO MUDAM AUTOMATICAMENTE** ❌
**Sintoma:** Site não detecta idioma do país corretamente

**Causas Identificadas:**
- ✅ **Ordem de detecção está invertida**
- ✅ **localStorage sobrescreve detecção de IP**
- ✅ **API pode estar sendo bloqueada**

---

## 📋 **IMPLEMENTAÇÃO ATUAL (COMO ESTÁ):**

### **App.tsx (Inicialização):**
```typescript
1. localStorage (se existir)
   └─> usa idioma salvo ✅
2. detectGeoFromTimezone()
   └─> detecta via timezone do navegador ✅
3. detectLanguageFromBrowser()
   └─> fallback: idioma do navegador ✅
4. Padrão: 'pt' ✅

5. useEffect assíncrono:
   - detectCountryFromIP() (API externa)
   - Se IP ≠ Timezone → VPN detectada → muda idioma ⚠️
```

### **Problema:**
```typescript
// ❌ PROBLEMA 1: API BLOQUEIA O SITE
const response = await fetch('https://ipapi.co/json/', {
  signal: AbortSignal.timeout(3000), // ❌ 3 segundos pode não ser suficiente
});

// ❌ PROBLEMA 2: Se API falhar, site trava no Canadá
```

---

## 🔧 **SOLUÇÃO PROPOSTA:**

### **Ordem Correta de Detecção:**

```
┌────────────────────────────────────────┐
│ 1. VERIFICAR localStorage              │
│    Se usuário ESCOLHEU idioma:         │
│    └─> SEMPRE respeitar escolha ✅     │
└────────────────────────────────────────┘
           │
           ↓
┌────────────────────────────────────────┐
│ 2. DETECTAR VIA IP (API assíncrona)    │
│    ⚠️ NÃO BLOQUEAR RENDERIZAÇÃO        │
│    - Timeout: 5s (não 3s)              │
│    - Se falhar: continuar normalmente  │
│    - Canadá: EN (ou FR se Quebec)      │
└────────────────────────────────────────┘
           │
           ↓ (se IP falhar)
┌────────────────────────────────────────┐
│ 3. DETECTAR VIA TIMEZONE (fallback)    │
│    - America/Toronto → EN              │
│    - America/Montreal → FR             │
│    - America/Sao_Paulo → PT            │
└────────────────────────────────────────┘
           │
           ↓ (se timezone falhar)
┌────────────────────────────────────────┐
│ 4. DETECTAR VIA NAVEGADOR (fallback)   │
│    - navigator.language                │
└────────────────────────────────────────┘
           │
           ↓ (último fallback)
┌────────────────────────────────────────┐
│ 5. PADRÃO: EN (língua internacional)   │
│    ⚠️ NÃO 'pt' (só Brasil usa)         │
└────────────────────────────────────────┘
```

---

## 🛠️ **MUDANÇAS NECESSÁRIAS:**

### **1. TIMEOUT MAIOR + NÃO BLOQUEAR:**
```typescript
// ANTES ❌
signal: AbortSignal.timeout(3000) // Muito curto!

// DEPOIS ✅
signal: AbortSignal.timeout(5000) // 5 segundos
```

### **2. SITE CARREGA IMEDIATAMENTE:**
```typescript
// ANTES ❌
// Se API falhar, site não carrega

// DEPOIS ✅
// Site SEMPRE carrega, API atualiza depois (se conseguir)
```

### **3. ORDEM DE PRIORIDADE CORRETA:**
```typescript
1. localStorage (escolha manual do usuário)
2. IP API (real location, funciona com VPN)
3. Timezone (fallback confiável)
4. Browser language (fallback)
5. 'en' (padrão internacional, NÃO 'pt')
```

### **4. LOGS PARA DEBUG:**
```typescript
console.log('🌍 Detecção de país:', {
  ip: ipGeo,
  timezone: timezoneGeo,
  browser: browserLang,
  final: detectedLang
});
```

---

## 🇨🇦 **CONFIGURAÇÃO ESPECÍFICA PARA CANADÁ:**

### **Timezones Canadenses:**
```typescript
// INGLÊS (maioria do Canadá)
- America/Toronto
- America/Vancouver
- America/Winnipeg
- America/Edmonton
- America/Calgary
- America/Halifax

// FRANCÊS (Quebec)
- America/Montreal (detecta automaticamente)
```

### **Detecção Quebec:**
```typescript
if (timezone.includes('America/Montreal')) {
  return { country: 'Canada', countryCode: 'CA', region: 'Quebec' };
  // Idioma: FR ✅
}
```

---

## 🔄 **API ALTERNATIVAS (se ipapi.co falhar):**

### **Opções:**
1. **ipapi.co** (atual) - 30k req/mês grátis
2. **ip-api.com** - 45 req/min grátis
3. **ipify.org** + **ipapi.com** - combinação
4. **cloudflare** (headers CF-IPCountry) - se hospedar na Cloudflare

---

## 📊 **TESTE DE VALIDAÇÃO:**

### **Cenários:**
1. ✅ Brasil sem VPN → PT
2. ✅ Brasil com VPN Canadá → EN (ou FR se Quebec)
3. ✅ Canadá (Toronto) → EN
4. ✅ Canadá (Montreal) → FR
5. ✅ EUA → EN
6. ✅ França → FR
7. ✅ Argentina → ES
8. ✅ Portugal → PT
9. ✅ Alemanha → EN (fallback)
10. ✅ China → EN (fallback)

---

## 🎯 **PRÓXIMOS PASSOS:**

1. ✅ Aumentar timeout da API (3s → 5s)
2. ✅ Site SEMPRE carrega (não bloquear por API)
3. ✅ Mudar padrão de 'pt' → 'en'
4. ✅ Adicionar logs detalhados
5. ✅ Testar com VPN de vários países
6. ✅ Confirmar que Canadá consegue acessar

---

## 🔗 **ARQUIVOS ENVOLVIDOS:**

- `src/utils/geoDetection.ts` ← Lógica de detecção
- `src/App.tsx` ← Inicialização e useEffect
- `src/hooks/useAzimutContent.ts` ← Hook que usa detecção

---

**Status Final:** ⚠️ Aguardando implementação das correções
























