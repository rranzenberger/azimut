# 🎁 INSTRUÇÕES: Onde Procurar "Degustar Web3 NFT"

## ✅ CONFIRMAÇÃO

**Status do código:** ✅ Os elementos ESTÃO implementados e commitados
**Status do git:** ✅ Commits enviados para `origin/main`
**Último commit Web3:** `2083ba7 - fix: Forçar visibilidade dos elementos Web3 com estilos inline`

---

## 📍 ONDE PROCURAR (5 LOCAIS)

### 1️⃣ **HEADER - Botão WEB3 (Desktop)**
- **Local:** Canto superior direito
- **Posição:** À direita do botão vermelho "INICIAR UM PROJETO"
- **Aparência:** Botão roxo com 🎁 e texto "WEB3"
- **Condição:** Só aparece se a janela tiver ≥ 900px de largura

**Teste:**
1. Abra o site em janela larga (≥ 900px)
2. Olhe no canto superior direito
3. Deve ter 2 botões: "INICIAR UM PROJETO" (vermelho) + "WEB3" (roxo)

---

### 2️⃣ **HEADER - Botão 🎁 (Mobile)**
- **Local:** Canto superior direito
- **Posição:** À direita do botão "+" (contato)
- **Aparência:** Botão roxo quadrado com apenas 🎁
- **Condição:** Só aparece se a janela tiver < 900px de largura

**Teste:**
1. Abra DevTools (F12) → ícone de celular
2. Largura < 900px
3. Deve ter 2 botões: "+" (vermelho) + 🎁 (roxo)

---

### 3️⃣ **HOME - Banner na Seção "Projetos em Destaque"**
- **Local:** Página inicial (`/pt` ou `/`)
- **Posição:** Logo abaixo do título "PROJETOS EM DESTAQUE" e do parágrafo
- **Aparência:** Bloco grande com gradiente roxo/azul/verde, ícone 🎁, título "Degustação: VR, NFT e Web3"
- **Antes de:** O primeiro card grande de projeto

**Teste:**
1. Vá para `azmt.com.br/pt`
2. Role até "PROJETOS EM DESTAQUE"
3. Logo após o título e descrição, deve aparecer um **banner grande** com gradiente

---

### 4️⃣ **HOME - Tarja abaixo dos Projetos**
- **Local:** Página inicial (`/pt` ou `/`)
- **Posição:** Logo abaixo do botão "Ver Todos os Projetos"
- **Aparência:** Faixa horizontal com gradiente roxo/azul/verde, ícone 🎁, título "Degustação: VR, NFT e Web3"
- **Antes de:** Seção "Retrato do Estúdio" / "O que criamos"

**Teste:**
1. Vá para `azmt.com.br/pt`
2. Role até o final da seção de projetos
3. Após "Ver Todos os Projetos", deve aparecer uma **faixa horizontal** Web3

---

### 5️⃣ **MENU PROJETOS - Item "🎁 Degustação Web3"**
- **Local:** Header → Clique em "PROJETOS"
- **Posição:** Último item do dropdown
- **Aparência:** "🎁 Degustação Web3" (ou "🎁 Web3 Preview" em inglês)

**Teste:**
1. Clique em "PROJETOS" no header
2. Role até o final do menu
3. Deve aparecer "🎁 Degustação Web3"

---

## 🔗 URL DIRETA (TESTE RÁPIDO)

**Teste esta URL primeiro:**
```
https://azmt.com.br/pt/experience-preview
```

**Se funcionar:** A página existe, o problema é apenas visibilidade dos botões/banners
**Se não funcionar (404):** O deploy não incluiu a rota

---

## 🚨 SE NÃO APARECER: CHECKLIST

### Passo 1: Hard Refresh
- **Windows/Linux:** `Ctrl + Shift + R`
- **Mac:** `Cmd + Shift + R`
- **Ou:** DevTools (F12) → Botão direito no refresh → "Empty Cache and Hard Reload"

### Passo 2: Modo Anônimo
- Abra uma janela anônima/privada
- Acesse `azmt.com.br/pt`
- Teste novamente

### Passo 3: Limpar Cache
1. DevTools (F12)
2. Application → Storage → Clear site data
3. Recarregar página

### Passo 4: Verificar Largura da Janela
- **Desktop:** Janela deve ter ≥ 900px para ver botão "WEB3"
- **Mobile:** Janela deve ter < 900px para ver botão 🎁
- Use DevTools (F12) → ícone de celular para testar

### Passo 5: Verificar Console
1. DevTools (F12) → Console
2. Procure por erros (vermelho)
3. Se houver erros, podem estar bloqueando a renderização

### Passo 6: Verificar Vercel
1. Acesse dashboard do Vercel
2. Verifique se o último deploy foi concluído
3. Verifique logs de build (pode ter erros silenciosos)

### Passo 7: Aguardar CDN
- CDN pode levar 5-15 minutos para atualizar
- Mesmo com deploy concluído, pode demorar para aparecer

---

## 🔍 DIAGNÓSTICO TÉCNICO

### Verificar se elementos existem no HTML:
1. DevTools (F12) → Elements/Inspector
2. Procurar por: `experience-preview` ou `WEB3` ou `🎁`
3. Se encontrar no HTML mas não ver na tela: problema de CSS
4. Se não encontrar no HTML: problema de renderização ou deploy

### Verificar condições JavaScript:
1. DevTools (F12) → Console
2. Digite: `window.innerWidth`
3. Se < 900: deve aparecer botão 🎁 (mobile)
4. Se ≥ 900: deve aparecer botão "WEB3" (desktop)

---

## 📞 PRÓXIMOS PASSOS

Se após todos os passos acima ainda não aparecer:

1. **Verificar build local:**
   ```bash
   npm run build
   ```
   Se der erro, corrigir antes de fazer deploy

2. **Forçar novo deploy:**
   ```bash
   git commit --allow-empty -m "chore: Forçar redeploy - Web3 visibility"
   git push origin main
   ```

3. **Verificar Vercel:**
   - Dashboard → Projeto → Deployments
   - Verificar se build foi concluído
   - Verificar logs para erros

4. **Contatar suporte:**
   - Se tudo acima foi verificado e ainda não funciona
   - Pode ser problema de CDN ou configuração do Vercel

---

## 📝 RESUMO RÁPIDO

**5 lugares para procurar:**
1. Header desktop (≥ 900px): Botão "WEB3" roxo à direita de "INICIAR UM PROJETO"
2. Header mobile (< 900px): Botão 🎁 roxo à direita de "+"
3. Home - Banner: Logo abaixo de "PROJETOS EM DESTAQUE"
4. Home - Tarja: Logo abaixo de "Ver Todos os Projetos"
5. Menu PROJETOS: Último item "🎁 Degustação Web3"

**URL direta para testar:**
- `https://azmt.com.br/pt/experience-preview`

**Se não aparecer:**
1. Hard refresh (Ctrl+Shift+R)
2. Modo anônimo
3. Limpar cache
4. Verificar largura da janela (≥ 900px desktop, < 900px mobile)
5. Verificar console por erros
6. Aguardar CDN (5-15 min)
