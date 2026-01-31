# 🔧 Como Corrigir Erro de Redirecionamento no Google

## 🚨 PROBLEMA IDENTIFICADO

O Google está tentando acessar `http://www.azmt.com.br/pt` e está encontrando um **erro de redirecionamento**.

**Causa:**
- Google está usando `http://` (sem HTTPS)
- Google está usando `www.azmt.com.br` (com www)
- Site está configurado para `https://azmt.com.br` (sem www)

---

## ✅ SOLUÇÃO IMPLEMENTADA

Adicionei redirects no `vercel.json` e `public/_redirects` para:
- ✅ `http://` → `https://` (forçar HTTPS)
- ✅ `www.azmt.com.br` → `azmt.com.br` (remover www)

---

## 🔄 O QUE FOI FEITO

### **1. Atualizado `vercel.json`:**
- Adicionado redirects para www → sem www
- Adicionado redirects para HTTP → HTTPS

### **2. Atualizado `public/_redirects`:**
- Adicionado redirects explícitos
- Mantido SPA routing

---

## ⏳ PRÓXIMOS PASSOS

### **1. Aguardar Deploy (2-3 minutos)**
- Vercel vai fazer deploy automaticamente
- Aguarde alguns minutos

### **2. Testar Redirects**
Após deploy, teste:
- `http://www.azmt.com.br/pt` → deve redirecionar para `https://azmt.com.br/pt`
- `http://azmt.com.br/pt` → deve redirecionar para `https://azmt.com.br/pt`
- `https://www.azmt.com.br/pt` → deve redirecionar para `https://azmt.com.br/pt`

### **3. Verificar no Google (Após 24-48h)**
1. Volte ao Google Search Console
2. Vá em "Inspeção de URL"
3. Digite: `https://azmt.com.br/pt` (com HTTPS e sem www)
4. Clique em "Testar URL publicada"
5. Deve aparecer: ✅ "URL está no Google" ou "URL pode ser indexada"

### **4. Solicitar Indexação (Depois)**
1. Após verificar que não há mais erro
2. Clique em "Solicitar indexação"
3. Aguarde 24-48h

---

## ✅ CHECKLIST

- [x] Redirects adicionados no `vercel.json`
- [x] Redirects adicionados no `public/_redirects`
- [x] Commit e push feito
- [ ] Aguardar deploy (2-3 min)
- [ ] Testar redirects manualmente
- [ ] Verificar no Google Search Console (24-48h)
- [ ] Solicitar indexação

---

## 🎯 RESULTADOS ESPERADOS

**Após deploy:**
- ✅ Redirects funcionando
- ✅ Google consegue acessar as páginas
- ✅ Erro de redirecionamento resolvido

**Após 24-48h:**
- ✅ Google indexa as páginas
- ✅ Páginas aparecem nos resultados

---

## 💡 DICA IMPORTANTE

**Use sempre HTTPS e sem www:**
- ✅ `https://azmt.com.br/pt`
- ❌ `http://www.azmt.com.br/pt`
- ❌ `http://azmt.com.br/pt`
- ❌ `https://www.azmt.com.br/pt`

**No Google Search Console:**
- Use `https://azmt.com.br` (sem www)
- Ou use `https://www.azmt.com.br` (se preferir www)

**Mas seja consistente!** Escolha um e use sempre.

---

## 🚀 PRÓXIMOS PASSOS

1. **Agora:** Aguardar deploy (2-3 min)
2. **Depois:** Testar redirects
3. **Depois (24-48h):** Verificar no Google
4. **Depois:** Solicitar indexação

---

## 📚 DOCUMENTAÇÃO

- **Arquivo modificado:** `vercel.json`
- **Arquivo modificado:** `public/_redirects`
- **Guia completo:** Este documento

---

## 🎉 PRONTO!

Redirects configurados! Aguarde o deploy e depois teste. 🚀
