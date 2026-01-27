# 🚀 Como Automatizar Verificações de SEO

## 🎯 OBJETIVO

Automatizar testes de redirects e verificação de URLs para SEO.

---

## 📋 SCRIPTS DISPONÍVEIS

### **1. `scripts/test-redirects.ps1`**
Testa se os redirects HTTP→HTTPS e www→sem www estão funcionando.

**Como usar:**
```powershell
.\scripts\test-redirects.ps1
```

**O que faz:**
- Testa redirects de `http://www.azmt.com.br` → `https://azmt.com.br`
- Testa redirects de `http://azmt.com.br` → `https://azmt.com.br`
- Testa redirects de `https://www.azmt.com.br` → `https://azmt.com.br`
- Gera relatório com resultados

---

### **2. `scripts/verificar-google-search-console.ps1`**
Ajuda a verificar status no Google Search Console.

**Como usar:**
```powershell
.\scripts\verificar-google-search-console.ps1
```

**O que faz:**
- Lista URLs para verificar
- Testa se URLs estão acessíveis
- Fornece instruções passo a passo

---

### **3. `scripts/automatizar-seo.ps1`** ⭐ **RECOMENDADO**
Script completo que faz tudo automaticamente.

**Como usar:**
```powershell
# Testar tudo
.\scripts\automatizar-seo.ps1 -All

# Ou testar apenas redirects
.\scripts\automatizar-seo.ps1 -TestRedirects

# Ou verificar apenas URLs
.\scripts\automatizar-seo.ps1 -CheckUrls
```

**O que faz:**
- ✅ Testa todos os redirects
- ✅ Verifica se URLs estão acessíveis
- ✅ Gera relatório completo
- ✅ Sugere próximos passos

---

## 🚀 USO RÁPIDO

### **Opção 1: Script Completo (Recomendado)**
```powershell
cd c:\Users\ranz\Documents\azimut-site-vite-tailwind
.\scripts\automatizar-seo.ps1 -All
```

### **Opção 2: Apenas Redirects**
```powershell
.\scripts\test-redirects.ps1
```

### **Opção 3: Apenas URLs**
```powershell
.\scripts\verificar-google-search-console.ps1
```

---

## 📊 INTERPRETAÇÃO DOS RESULTADOS

### **✅ Tudo OK:**
```
✅ Redirects OK: 12/12
✅ URLs OK: 4/4
```

**Próximos passos:**
1. Aguarde 24-48h
2. Verifique no Google Search Console
3. Solicite indexação

---

### **⚠️ Alguns Problemas:**
```
✅ Redirects OK: 10/12
✅ URLs OK: 3/4
```

**O que fazer:**
1. Verifique se deploy foi concluído
2. Aguarde alguns minutos
3. Execute novamente

---

### **❌ Muitos Erros:**
```
✅ Redirects OK: 5/12
✅ URLs OK: 1/4
```

**O que fazer:**
1. Verifique configurações no Vercel
2. Verifique se domínio está correto
3. Verifique se SSL está ativo

---

## 🔄 QUANDO EXECUTAR

### **Após Deploy:**
```powershell
.\scripts\automatizar-seo.ps1 -All
```

### **Semanalmente (Monitoramento):**
```powershell
.\scripts\automatizar-seo.ps1 -All
```

### **Antes de Solicitar Indexação:**
```powershell
.\scripts\automatizar-seo.ps1 -All
```

---

## 📝 EXEMPLO DE SAÍDA

```
═══════════════════════════════════════════
🚀 AUTOMAÇÃO SEO - AZIMUT
═══════════════════════════════════════════

1️⃣  TESTANDO REDIRECTS...

  ✅ Redirects OK: 12/12

2️⃣  VERIFICANDO URLs...

  ✅ OK - https://azmt.com.br/pt
  ✅ OK - https://azmt.com.br/pt/work
  ✅ OK - https://azmt.com.br/pt/academy
  ✅ OK - https://azmt.com.br/pt/contact

  ✅ URLs OK: 4/4

═══════════════════════════════════════════
📊 RELATÓRIO FINAL
═══════════════════════════════════════════

Data/Hora: 2026-01-27 15:30:00

Redirects:
  ✅ OK: 12/12

URLs:
  ✅ OK: 4/4

═══════════════════════════════════════════
🎯 PRÓXIMOS PASSOS
═══════════════════════════════════════════

✅ TUDO FUNCIONANDO!

1. Aguarde 24-48h para o Google re-rastrear
2. Acesse: https://search.google.com/search-console
3. Vá em 'Inspeção de URL'
4. Teste: https://azmt.com.br/pt
5. Se não houver erro, clique em 'Solicitar indexação'
```

---

## 🎯 CHECKLIST AUTOMATIZADO

- [x] Scripts criados
- [ ] Executar após deploy
- [ ] Verificar resultados
- [ ] Aguardar 24-48h
- [ ] Verificar no Google Search Console
- [ ] Solicitar indexação

---

## 💡 DICAS

**Execute sempre após:**
- ✅ Deploy no Vercel
- ✅ Mudanças em redirects
- ✅ Mudanças em configurações de domínio

**Execute semanalmente para:**
- ✅ Monitorar status
- ✅ Detectar problemas cedo
- ✅ Manter SEO otimizado

---

## 🚀 PRONTO!

Agora você pode automatizar todas as verificações de SEO! 🎉

Execute:
```powershell
.\scripts\automatizar-seo.ps1 -All
```
