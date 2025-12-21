# ✅ Repositório Correto! Verificar Root Directory

## ✅ Confirmado

**Settings → Git:**
- ✅ Repositório conectado: `rranzenberger/azimut` (CORRETO!)
- ✅ Conectado há 18 minutos
- ✅ Configuração está correta

---

## 🎯 Próximo Passo: Verificar Root Directory

### **PASSO 1: Ir para Build and Deployment**

1. **No menu lateral esquerdo, clique em "Build and Deployment"**
   - Está logo abaixo de "General"

2. **Você verá a tela de configurações de build**

---

### **PASSO 2: Verificar Root Directory**

**Na tela "Build and Deployment":**

1. **Procure pela seção "Root Directory"** (primeira seção)

2. **Veja o campo de texto:**
   - ✅ **Deve estar:** `azimut-cms`
   - ❌ **NÃO deve estar:** vazio ou outro valor

3. **Se estiver vazio:**
   - Clique no campo
   - Digite: `azimut-cms`
   - Clique em "Save"
   - Aguarde confirmação

4. **Se já estiver `azimut-cms`:**
   - ✅ Está correto!
   - Pule para Passo 3

---

### **PASSO 3: Fazer Novo Deploy**

**Se Root Directory está correto, fazer novo deploy:**

**Opção A: Fazer novo push (recomendado)**
```bash
git commit --allow-empty -m "chore: Trigger deploy with correct root directory"
git push origin main
```

**Opção B: Redeploy manual**
1. Vá em "Deployments"
2. Clique no deploy mais recente
3. Clique em "Redeploy"
4. **IMPORTANTE:** Desmarque "Use existing Build Cache"
5. Clique em "Redeploy"

---

## ✅ Checklist

- [x] Repositório conectado: `rranzenberger/azimut` ✅
- [ ] Root Directory verificado: `azimut-cms` ⏳
- [ ] Se vazio: Digitei e salvei ⏳
- [ ] Novo deploy feito ⏳
- [ ] Deploy status: "Ready" (verde) ⏳

---

## 🎯 O Que Esperar

**Se Root Directory estiver correto:**
- ✅ Deploy deve funcionar
- ✅ Status: "Ready" (verde)
- ✅ Commit: `333fff4` ou mais recente
- ✅ Backoffice deve funcionar

**Se Root Directory estiver vazio:**
- ❌ Deploy vai falhar com erro: "Root Directory 'azimut-cms' does not exist"
- ⚠️ Precisa digitar `azimut-cms` e salvar

---

## 🎯 Resumo Visual

```
CONFIGURAÇÃO ATUAL:
└── Repositório: rranzenberger/azimut ✅
└── Root Directory: ??? ← VERIFICAR AGORA!

PRÓXIMO:
└── Build and Deployment → Root Directory
    └── Deve estar: azimut-cms ✅
    └── Se vazio: Digitar e salvar ⚠️
```

---

**Ação imediata:** Clique em "Build and Deployment" → Verifique Root Directory → Se estiver vazio, digite `azimut-cms` e salve!

