# 🔍 VERIFICAR CONFIGURAÇÃO DO VERCEL

## ⚠️ PROBLEMA: 404 em /login

O site continua dando 404 na rota `/login`. Isso significa que o Vercel está configurado incorretamente.

---

## 📋 PASSO 1: IDENTIFICAR QUAL PROJETO ESTÁ EM `azmt.com.br`

### 1. Acesse: https://vercel.com/dashboard

### 2. Você verá uma lista de projetos. Procure qual tem o domínio `azmt.com.br`

Exemplo:
```
📦 azimut               → Domains: azmt.com.br
📦 azimut-cms           → Domains: enberger.com
```

### 3. Clique no projeto que tem `azmt.com.br`

---

## 📋 PASSO 2: VERIFICAR CONFIGURAÇÃO

### 1. Vá em **Settings** (⚙️) → **General**

### 2. Procure a seção **Build & Development Settings**

### 3. Verifique as configurações:

#### ✅ **CONFIGURAÇÃO CORRETA** (para Site Vite):
```
Framework Preset: Other (ou Vite)
Root Directory: . (vazio ou apenas um ponto)
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node.js Version: 18.x ou superior
```

#### ❌ **CONFIGURAÇÃO ERRADA** (se estiver assim):
```
Framework Preset: Next.js
Root Directory: azimut-cms  ❌ ERRADO!
Build Command: npm run build
Output Directory: .next
```

---

## 📋 PASSO 3: CORRIGIR SE NECESSÁRIO

### Se a configuração estiver errada:

1. **Framework Preset**: Mude para `Other`
2. **Root Directory**: 
   - Clique em **Edit**
   - **DEIXE VAZIO** ou coloque apenas um ponto: `.`
   - Clique em **Save**
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

### ⚠️ IMPORTANTE:
- **Root Directory vazio** = Raiz do repositório (projeto Vite)
- **Root Directory = azimut-cms** = Subpasta (projeto Next.js)

---

## 📋 PASSO 4: FORÇAR REDEPLOY

### Após salvar as configurações:

1. Vá em **Deployments** (menu superior)
2. Localize o último deployment
3. Clique nos **3 pontinhos** `...` à direita
4. Selecione **"Redeploy"**
5. **IMPORTANTE**: Na janela que abrir, **DESMARQUE** a opção:
   ```
   ☐ Use existing Build Cache
   ```
6. Clique em **Redeploy**

---

## 📋 PASSO 5: AGUARDAR O BUILD

### O deployment vai levar cerca de 1-2 minutos

Você pode acompanhar o progresso em **Deployments**.

Quando aparecer:
```
✅ Ready
```

O site está pronto!

---

## 📋 PASSO 6: TESTAR

### 1. Primeiro, teste a página de debug:

```
https://azmt.com.br/debug.html
```

#### ✅ **Se aparecer:**
```
✅ PROJETO VITE CORRETO!
```
**Significa que o Vercel está servindo o projeto certo!**

#### ❌ **Se der 404:**
**Significa que o Root Directory ainda está errado ou o projeto errado está linkado ao domínio.**

### 2. Depois, teste a página de login:

```
https://azmt.com.br/login
```

#### ✅ **Deve aparecer:**
- Logo Azimut
- Campo Usuário
- Campo Senha **com olhinho 👁️**
- Botão Entrar

---

## 🚨 SE AINDA NÃO FUNCIONAR:

### Problema: `/debug.html` dá 404

**Causa**: O projeto linkado ao domínio `azmt.com.br` está errado.

**Solução**:

1. No dashboard do Vercel, vá em **Settings** → **Domains**
2. Você verá o domínio `azmt.com.br` linkado
3. Clique em **Edit** ou **Remove**
4. Adicione o domínio **NO PROJETO CORRETO** (aquele com Root Directory vazio)

---

## 🚨 SE O PROJETO ESTIVER CORRETO MAS DER 404:

### Pode ser cache do Vercel Edge Network

**Solução**:

1. No projeto, vá em **Settings** → **General**
2. Role até o final
3. Procure por **Delete Project** (não faça isso!)
4. Acima disso tem uma opção: **Purge Vercel Cache**
5. Clique e confirme

Ou:

1. Vá em **Deployments**
2. Selecione o último deployment **Ready**
3. Clique nos **3 pontinhos**
4. **Promote to Production**

---

## 📞 CHECKLIST RÁPIDO:

```
☐ 1. Identifiquei qual projeto tem azmt.com.br
☐ 2. Verifiquei que Root Directory está VAZIO (ou .)
☐ 3. Framework está como "Other" ou "Vite"
☐ 4. Output Directory é "dist"
☐ 5. Fiz Redeploy SEM cache
☐ 6. Aguardei 1-2 minutos
☐ 7. Testei /debug.html
☐ 8. Testei /login
```

---

## ✅ RESULTADO ESPERADO:

Após seguir todos os passos:

1. `https://azmt.com.br/debug.html` → ✅ Página de debug aparece
2. `https://azmt.com.br/login` → ✅ Página de login com olhinho 👁️
3. `https://azmt.com.br/` → ✅ Redireciona para /login (usuário não autenticado)

---

## 💡 DICA FINAL:

Se ainda estiver dando 404, **tire screenshots** de:
1. Settings → General (Build & Development Settings)
2. Settings → Domains
3. Último deployment (página de logs)

E me mostre!



















