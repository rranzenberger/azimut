# 🌍 Mapeamento Completo: Países e Idiomas

## 📋 Resumo

O sistema agora detecta automaticamente o país via timezone e ajusta o idioma correspondente. **Inglês é usado como fallback internacional** para países que não falam português, francês ou espanhol.

---

## 🗺️ Mapeamento por Idioma

### 🇵🇹 **PORTUGUÊS (PT)**
- **Brasil** (todos os timezones)
- **Portugal** (Europe/Lisbon)

### 🇬🇧 **INGLÊS (EN)**
- **Estados Unidos** (todos os timezones)
- **Canadá** (exceto Quebec/Montreal)
- **Reino Unido** (Europe/London)
- **Irlanda** (Europe/Dublin)
- **Austrália** (todos os timezones)
- **Nova Zelândia** (Pacific/Auckland)
- **África do Sul** (Africa/Johannesburg)

### 🇫🇷 **FRANCÊS (FR)**
- **França** (Europe/Paris)
- **Quebec/Montreal** (America/Montreal) ⚠️ **Especial**
- **Guiana Francesa** (America/Cayenne)
- **Bélgica** (Europe/Brussels)
- **Suíça** (Europe/Zurich)

### 🇪🇸 **ESPANHOL (ES)**
- **México** (todos os timezones)
- **Argentina** (todos os timezones)
- **Colômbia** (America/Bogota)
- **Chile** (America/Santiago)
- **Peru** (America/Lima)
- **Venezuela** (America/Caracas)
- **Espanha** (Europe/Madrid, Europe/Barcelona)
- **Outros países latino-americanos** (Guatemala, El Salvador, Nicarágua, Costa Rica, Panamá, Cuba, Bolívia, Paraguai, Uruguai, Equador)

---

## 🌐 Fallback Internacional: Inglês

Para países que **não falam português, francês ou espanhol**, o sistema usa **inglês como padrão** (língua internacional):

### **Exemplos:**
- 🇩🇪 **Alemanha** → Inglês (EN)
- 🇨🇳 **China** → Inglês (EN)
- 🇯🇵 **Japão** → Inglês (EN)
- 🇮🇹 **Itália** → Inglês (EN)
- 🇷🇺 **Rússia** → Inglês (EN)
- 🇮🇳 **Índia** → Inglês (EN)
- 🇰🇷 **Coreia do Sul** → Inglês (EN)
- **Outros países europeus** → Inglês (EN)
- **Outros países asiáticos** → Inglês (EN)
- **Outros países africanos** → Inglês (EN)

---

## 📍 Casos Especiais

### **1. Quebec/Montreal (Canadá)**
- **Timezone:** `America/Montreal`
- **Idioma:** **Francês (FR)** ⚠️
- **Motivo:** Quebec é francófono

### **2. Guiana Francesa**
- **Timezone:** `America/Cayenne`
- **Idioma:** **Francês (FR)**
- **Motivo:** Território francês

### **3. Outros países do Canadá**
- **Timezone:** `America/Toronto`, `America/Vancouver`, etc.
- **Idioma:** **Inglês (EN)**
- **Motivo:** Resto do Canadá é anglófono

---

## 🔍 Como Funciona

### **1. Detecção via Timezone:**
```typescript
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
// Exemplo: "America/New_York" → US → EN
// Exemplo: "Europe/Paris" → FR → FR
// Exemplo: "America/Montreal" → CA (Quebec) → FR
```

### **2. Mapeamento País → Idioma:**
```typescript
if (countryCode === 'BR' || countryCode === 'PT') return 'pt'
if (countryCode === 'FR' || countryCode === 'GF') return 'fr'
if (countryCode === 'MX' || countryCode === 'AR') return 'es'
// Fallback: return 'en'
```

### **3. Fallback Final:**
- Se timezone não for reconhecido → Usa idioma do navegador
- Se idioma do navegador não for PT/FR/ES → **Inglês (EN)**

---

## ✅ Exemplos Práticos

### **França:**
- Timezone: `Europe/Paris`
- País: França (FR)
- Idioma: **Francês (FR)** ✅

### **Quebec/Montreal:**
- Timezone: `America/Montreal`
- País: Canadá (CA)
- Região: Quebec
- Idioma: **Francês (FR)** ✅

### **Guiana Francesa:**
- Timezone: `America/Cayenne`
- País: Guiana Francesa (GF)
- Idioma: **Francês (FR)** ✅

### **Argentina:**
- Timezone: `America/Buenos_Aires`
- País: Argentina (AR)
- Idioma: **Espanhol (ES)** ✅

### **México:**
- Timezone: `America/Mexico_City`
- País: México (MX)
- Idioma: **Espanhol (ES)** ✅

### **Colômbia:**
- Timezone: `America/Bogota`
- País: Colômbia (CO)
- Idioma: **Espanhol (ES)** ✅

### **Alemanha:**
- Timezone: `Europe/Berlin`
- País: Alemanha (DE)
- Idioma: **Inglês (EN)** ✅ (fallback internacional)

### **China:**
- Timezone: `Asia/Shanghai`
- País: China (CN)
- Idioma: **Inglês (EN)** ✅ (fallback internacional)

### **África do Sul:**
- Timezone: `Africa/Johannesburg`
- País: África do Sul (ZA)
- Idioma: **Inglês (EN)** ✅

---

## 🎯 Resumo

### **Idiomas Suportados:**
1. **Português (PT)** - Brasil, Portugal
2. **Inglês (EN)** - EUA, Canadá (exceto Quebec), Reino Unido, Irlanda, Austrália, Nova Zelândia, África do Sul, **+ fallback internacional**
3. **Francês (FR)** - França, Quebec, Guiana Francesa, Bélgica, Suíça
4. **Espanhol (ES)** - México, Argentina, Colômbia, Chile, Peru, Venezuela, Espanha, outros países latino-americanos

### **Estratégia:**
- ✅ Detecta país via timezone
- ✅ Mapeia país para idioma
- ✅ **Inglês como fallback internacional** (para Alemanha, China, Japão, etc.)
- ✅ Funciona 100% client-side (não depende de API)

---

**Agora o sistema funciona para todos os países!** 🌍

