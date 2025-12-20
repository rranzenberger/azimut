# 🌐 Site Principal - Verificar Deploy

## ✅ Backoffice: Redeploy Feito!

O backoffice já foi redeployado com as mudanças de hoje (menu lateral e logo).

---

## 🔍 Site Principal: O Que Verificar

### 1. Variável de Ambiente (IMPORTANTE!)

O site principal precisa ter a variável `VITE_CMS_API_URL` configurada na Vercel para se conectar ao CMS.

**Verificar:**
1. Acesse: https://vercel.com
2. Projeto: `azimut` (site principal)
3. Vá em: **Settings → Environment Variables**
4. Verifique se existe:
   - **Key:** `VITE_CMS_API_URL`
   - **Value:** `https://backoffice.azmt.com.br/api`

**Se NÃO existir:**
- Adicione a variável
- Value: `https://backoffice.azmt.com.br/api`
- Environments: All Environments
- Clique em **Save**

### 2. Mudanças para Deployar

**Verificar se há mudanças locais:**
- Se você fez mudanças no código do site hoje
- Se há commits não deployados

**Se houver mudanças:**
- Faça commit e push (se usar GitHub)
- Ou faça redeploy manual

**Se NÃO houver mudanças:**
- Só precisa garantir que a variável `VITE_CMS_API_URL` está configurada
- Não precisa fazer redeploy

---

## 🚀 Como Fazer Redeploy (Se Necessário)

### Opção 1: Se está conectado ao GitHub
```powershell
git add .
git commit -m "feat: Atualizar integração com CMS"
git push
# Vercel faz deploy automático
```

### Opção 2: Redeploy Manual
1. Acesse: https://vercel.com
2. Projeto: `azimut`
3. Vá em: **Deployments**
4. Clique em: **Redeploy** (último deploy)

---

## ✅ Checklist

- [ ] Verificar se `VITE_CMS_API_URL` está configurada na Vercel
- [ ] Se não estiver: Adicionar variável
- [ ] Verificar se há mudanças locais para deployar
- [ ] Se houver: Fazer commit/push ou redeploy
- [ ] Testar site em produção

---

## 🎯 Resumo

**O mais importante agora:**
1. ✅ Verificar se `VITE_CMS_API_URL` está configurada
2. ⚠️ Se não estiver, adicionar e fazer redeploy
3. ✅ Se já estiver, pode não precisar fazer nada

**O site só precisa de redeploy se:**
- Você fez mudanças no código hoje
- Ou se precisa adicionar/atualizar a variável `VITE_CMS_API_URL`

---

**Verifique primeiro se a variável está configurada!** 🔍


