# 🔍 Como Verificar 3 Domínios no Bing

## 📋 SITUAÇÃO

Você tem **3 domínios** no Bing:
1. `azimut.com.br` - Não verificado
2. `azimutimmersive.com` - Não verificado (meta tag já adicionada ✅)
3. `azmt.com.br` - Não verificado

---

## ⚠️ LIMITAÇÃO DO BING

**Bing permite apenas UMA meta tag `msvalidate.01` por página!**

**Solução:**
- ✅ `azimutimmersive.com` → Meta tag (já adicionada)
- ⚠️ `azimut.com.br` → CNAME ou XML
- ⚠️ `azmt.com.br` → CNAME ou XML

---

## 🚀 COMO VERIFICAR CADA DOMÍNIO

### **1. azimutimmersive.com (Meta Tag - JÁ FEITO!)**

**Status:** ✅ Código já adicionado no `index.html`

**Próximos passos:**
1. Aguarde 3 minutos (deploy)
2. No Bing, clique em **"Verify now"** ao lado de `azimutimmersive.com`
3. Deve verificar automaticamente! ✅

---

### **2. azimut.com.br (CNAME ou XML)**

**Opção A: CNAME (Recomendado)**

1. No Bing, clique em **"Verify now"** ao lado de `azimut.com.br`
2. Escolha: **"Add CNAME record to DNS"**
3. O Bing vai mostrar:
   - **Nome:** (exemplo: `azimut`)
   - **Valor:** (exemplo: `verification.bing.com`)
4. Acesse seu painel DNS (onde você gerencia o domínio)
5. Adicione registro CNAME:
   - **Tipo:** CNAME
   - **Nome:** (o que o Bing forneceu)
   - **Valor:** (o que o Bing forneceu)
6. Aguarde 5-10 minutos (propagação DNS)
7. Volte ao Bing e clique em **"Verify"**

**Opção B: XML File**

1. No Bing, clique em **"Verify now"** ao lado de `azimut.com.br`
2. Escolha: **"XML File"**
3. Baixe o arquivo `BingSiteAuth.xml`
4. Faça upload na raiz do site `azimut.com.br`
5. Volte ao Bing e clique em **"Verify"**

---

### **3. azmt.com.br (CNAME ou XML)**

Mesmo processo do `azimut.com.br`:
- Use CNAME (recomendado) ou XML File
- Siga as instruções do Bing

---

## ✅ CHECKLIST

### **azimutimmersive.com:**
- [x] Meta tag adicionada no `index.html`
- [x] Commit e push feito
- [ ] Aguardar deploy (3 min)
- [ ] Clicar em "Verify now"
- [ ] Verificar se funcionou

### **azimut.com.br:**
- [ ] Clicar em "Verify now"
- [ ] Escolher método (CNAME ou XML)
- [ ] Seguir instruções
- [ ] Verificar

### **azmt.com.br:**
- [ ] Clicar em "Verify now"
- [ ] Escolher método (CNAME ou XML)
- [ ] Seguir instruções
- [ ] Verificar

---

## 🎯 PRÓXIMOS PASSOS

1. **Agora:** Aguardar deploy do `azimutimmersive.com` (3 min)
2. **Depois:** Verificar `azimutimmersive.com` no Bing
3. **Depois:** Configurar `azimut.com.br` (CNAME ou XML)
4. **Depois:** Configurar `azmt.com.br` (CNAME ou XML)

---

## 💡 DICA

**Qual domínio é o principal?**
- Se `azimutimmersive.com` é o principal → Já está configurado! ✅
- Os outros dois podem usar CNAME (mais fácil que XML)

---

## 🚀 COMEÇAR

**Agora:**
1. Aguarde 3 minutos
2. Clique em **"Verify now"** para `azimutimmersive.com`
3. Me avise o resultado!

Depois configuramos os outros dois! 🎉
