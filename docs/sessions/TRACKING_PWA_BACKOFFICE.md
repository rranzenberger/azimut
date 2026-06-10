# 📊 TRACKING DE PWA INSTALLS - COMO MONITORAR NO BACKOFFICE

**Data:** 11/01/2026  
**Status:** ✅ Implementando

---

## 🎯 O QUE FOI IMPLEMENTADO:

### ✅ **1. Tracking de PWA no Site:**

#### **Arquivo: `src/utils/pwa.ts`**
- ✅ Detecta quando PWA é instalado
- ✅ Detecta quando prompt é mostrado
- ✅ Detecta quando usuário aceita/recusa
- ✅ Envia eventos para backoffice via API

#### **Arquivo: `src/utils/analytics.ts`**
- ✅ Função `trackPWAEvent()` criada
- ✅ Envia eventos para `/api/track` do backoffice

#### **Arquivo: `src/components/InstallPrompt.tsx`**
- ✅ Track quando prompt é mostrado
- ✅ Track quando usuário aceita/recusa
- ✅ Track quando instala

---

### ✅ **2. API no Backoffice:**

#### **Arquivo: `azimut-cms/app/api/track/route.ts`**
- ✅ Handler `handlePWAEvent()` criado
- ✅ Salva eventos PWA no `VisitorSession.metadata`
- ✅ Eventos salvos:
  - `installed` - Usuário instalou
  - `prompt_shown` - Prompt foi mostrado
  - `prompt_dismissed` - Usuário recusou

#### **Dados Salvos:**
```json
{
  "type": "installed" | "prompt_shown" | "prompt_dismissed",
  "timestamp": "2026-01-11T10:30:00Z",
  "platform": "Win32",
  "isPWA": true,
  "outcome": "accepted" | "dismissed"
}
```

---

## 📊 COMO VER QUEM INSTALOU NO BACKOFFICE:

### **Método 1: Query SQL Direta (Temporário)**

```sql
-- Ver sessões que instalaram PWA
SELECT 
  vs.sessionId,
  vs.ipAddress,
  vs.country,
  vs.language,
  vs.createdAt,
  vs.lastActivityAt,
  vs.metadata->'pwaEvents' as pwa_events
FROM "VisitorSession" vs
WHERE vs.metadata->'pwaInstalled' = 'true'
ORDER BY vs.lastActivityAt DESC;
```

---

### **Método 2: API Endpoint (Recomendado)**

**Criar:** `azimut-cms/app/api/admin/analytics/pwa-installs/route.ts`

```typescript
// GET /api/admin/analytics/pwa-installs
// Retorna lista de usuários que instalaram PWA
```

---

### **Método 3: Dashboard Visual (Futuro)**

**Criar página no backoffice:**
- `/admin/analytics/pwa-installs`
- Mostrar:
  - Total de instalações
  - Taxa de conversão (instalou / viu prompt)
  - Por país/região
  - Timeline de instalações
  - Dispositivos (mobile/desktop)

---

## 🔍 COMO VERIFICAR AGORA:

### **1. Via Prisma Studio:**
```bash
cd azimut-cms
npx prisma studio
```

**Navegar para:**
- `VisitorSession` → Filtrar por `metadata.pwaInstalled = true`

---

### **2. Via API (Criar endpoint):**

**Criar:** `azimut-cms/app/api/admin/analytics/pwa-installs/route.ts`

---

## 📈 ESTATÍSTICAS QUE PODEMOS VER:

1. **Total de Instalações:**
   - Quantos usuários instalaram o PWA

2. **Taxa de Conversão:**
   - Instalou / Viu prompt = % conversão

3. **Por País:**
   - Onde mais instalam (Brasil, Canadá, etc)

4. **Por Dispositivo:**
   - Mobile vs Desktop
   - iOS vs Android

5. **Timeline:**
   - Quando mais instalam (horário/dia)

6. **Engajamento:**
   - Usuários que instalam = mais engajados
   - Comparar comportamento (instalou vs não instalou)

---

## 🚀 PRÓXIMOS PASSOS:

### **Opção 1: Query Manual (Agora)**
- Usar Prisma Studio ou SQL direto
- Ver dados já salvos

### **Opção 2: API Endpoint (Rápido)**
- Criar `/api/admin/analytics/pwa-installs`
- Retornar JSON com instalações

### **Opção 3: Dashboard Visual (Completo)**
- Página dedicada no backoffice
- Gráficos e estatísticas
- Filtros e busca

---

## 💡 RECOMENDAÇÃO:

**Começar com Opção 2 (API Endpoint):**
- Rápido de implementar (15 min)
- Já permite ver dados
- Pode evoluir para dashboard depois

**Quer que eu crie o endpoint agora?**

---

## 📋 CHECKLIST:

- [x] Tracking de PWA no site
- [x] API para receber eventos
- [x] Salvar no banco (VisitorSession.metadata)
- [ ] Endpoint para consultar instalações
- [ ] Dashboard visual (opcional)

---

**Status:** ✅ Tracking funcionando, falta visualização no backoffice
