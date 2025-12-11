# 🚀 Quick Start - PWA + Analytics

Guia rápido para ativar PWA e Analytics no Azimut.

---

## ⚡ PWA - 3 Passos

### 1. Build e Deploy
```bash
npm run build
# Deploy para produção com HTTPS
```

### 2. Verificar
```
✅ https://azimut.com/manifest.json
✅ https://azimut.com/sw.js
✅ https://azimut.com/offline.html
```

### 3. Testar
- Abrir site em mobile
- Menu > "Adicionar à tela inicial"
- App instalado! 🎉

---

## 📊 Analytics - 2 Passos

### 1. Criar Conta Plausible
```
1. Ir para: https://plausible.io/register
2. Criar conta (ou free trial)
3. Adicionar site: azimut.com
4. Pronto! Já está configurado no código.
```

### 2. Verificar
```bash
# Produção:
1. Abrir https://azimut.com
2. DevTools > Network
3. Ver: script.js (plausible.io)
4. Console: sem erros

# Dashboard:
https://plausible.io/azimut.com
```

---

## 🎯 Goals no Plausible

Configurar no dashboard:

```
1. Settings > Goals > Add Goal
2. Criar:
   - Event: "Budget Wizard" + action = "completed"
   - Event: "Scroll Depth" + depth = "75%"
   - Event: "CTA Click" + location = "header"
```

---

## ✅ Pronto!

PWA e Analytics funcionando em **5 minutos**.

Dashboard: https://plausible.io/azimut.com












