# 📊 TRACKING PWA - STATUS ATUAL E PRÓXIMOS PASSOS

**Data:** 11/01/2026  
**Status:** ✅ Implementado (logs temporários)

---

## ✅ O QUE ESTÁ FUNCIONANDO:

### **1. Site Principal:**
- ✅ Detecta quando PWA é instalado
- ✅ Detecta quando prompt é mostrado/aceito/recusado
- ✅ Envia eventos para backoffice via `/api/track`

### **2. Backoffice:**
- ✅ Recebe eventos via API
- ✅ Handler `handlePWAEvent()` processa eventos
- ⚠️ **Por enquanto:** Salva em logs estruturados (console.log)
- 📋 **Próximo:** Criar tabela `PWAInstall` no Prisma

---

## 🔍 COMO VER INSTALAÇÕES AGORA:

### **Método 1: Logs do Vercel (Temporário)**

1. Acessar: https://vercel.com/rranzenberger/azimut-backoffice
2. Ir em **"Logs"** ou **"Functions"**
3. Filtrar por: `[PWA_EVENT]`
4. Ver eventos estruturados em JSON

**Exemplo de log:**
```json
{
  "sessionId": "abc-123",
  "type": "installed",
  "platform": "Win32",
  "country": "BR",
  "timestamp": "2026-01-11T10:30:00Z"
}
```

---

### **Método 2: Criar Tabela no Prisma (Recomendado)**

**Precisa:**
1. Adicionar modelo `PWAInstall` no schema
2. Criar migration
3. Atualizar handler para salvar no banco

**Quer que eu crie a tabela agora?**

---

## 📈 O QUE PODEREMOS VER COM A TABELA:

### **Estatísticas:**
- Total de instalações
- Taxa de conversão (instalou / viu prompt)
- Por país/região
- Por dispositivo (mobile/desktop)
- Timeline de instalações

### **Dashboard (Futuro):**
```
┌─────────────────────────────────┐
│ 📊 PWA Installs Dashboard       │
├─────────────────────────────────┤
│ Total: 45 instalações           │
│ Taxa conversão: 32%             │
│                                 │
│ Por País:                       │
│ 🇧🇷 Brasil: 28 (62%)            │
│ 🇨🇦 Canadá: 12 (27%)            │
│ 🇺🇸 EUA: 5 (11%)                │
│                                 │
│ Por Dispositivo:                │
│ 📱 Mobile: 32 (71%)             │
│ 💻 Desktop: 13 (29%)            │
└─────────────────────────────────┘
```

---

## 💡 RECOMENDAÇÃO:

**Opção 1: Criar Tabela Agora (15 min)**
- ✅ Dados organizados no banco
- ✅ Pode consultar facilmente
- ✅ Base para dashboard depois

**Opção 2: Deixar em Logs (Temporário)**
- ⚠️ Precisa parsear logs manualmente
- ⚠️ Não é ideal para consultas
- ✅ Funciona por enquanto

---

## 🚀 PRÓXIMO PASSO:

**Quer que eu crie a tabela `PWAInstall` no Prisma agora?**
- Migration pronta
- Handler atualizado
- Endpoint para consultar instalações
- **Tempo:** ~15 minutos

**Ou prefere ver funcionando nos logs primeiro?**

---

## 📋 RESUMO:

✅ **Tracking implementado e funcionando**  
⚠️ **Dados em logs temporários**  
📅 **Próximo: Criar tabela no banco**

**Quer que eu crie a tabela agora?**
