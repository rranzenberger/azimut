# 🎁 ONDE PROCURAR OS ELEMENTOS "DEGUSTAR WEB3 NFT"

## ✅ CONFIRMAÇÃO: Os elementos ESTÃO no código

Todos os elementos foram implementados e estão presentes no código fonte. Se você não os vê no site, pode ser:
- Deploy não atualizado
- Cache do navegador/CDN
- Build falhando silenciosamente
- Condições de renderização

---

## 📍 LOCALIZAÇÕES EXATAS DOS ELEMENTOS

### 1. **BOTÃO WEB3 NO HEADER (Desktop ≥ 900px)**

**Onde procurar:**
- **Canto superior direito** da página
- **Imediatamente à direita** do botão vermelho "INICIAR UM PROJETO"
- Deve aparecer como um **botão roxo** com ícone 🎁 e texto "WEB3"

**Arquivo:** `src/components/Layout.tsx` (linhas 748-797)
**Condição:** `{!isMobile && (...)}` - Só aparece em telas ≥ 900px

**Como testar:**
1. Abra o site em uma janela larga (≥ 900px)
2. Olhe no canto superior direito
3. Deve haver DOIS botões lado a lado: "INICIAR UM PROJETO" (vermelho) e "WEB3" (roxo)

---

### 2. **BOTÃO WEB3 NO HEADER (Mobile < 900px)**

**Onde procurar:**
- **Canto superior direito** da página
- **Imediatamente à direita** do botão "+" (que abre contato)
- Deve aparecer como um **botão roxo quadrado** com apenas o ícone 🎁

**Arquivo:** `src/components/Layout.tsx` (linhas 831-859)
**Condição:** `{isMobile && (...)}` - Só aparece em telas < 900px

**Como testar:**
1. Abra o site em uma janela estreita (< 900px) ou use DevTools (F12 → ícone de celular)
2. Olhe no canto superior direito
3. Deve haver DOIS botões lado a lado: "+" (vermelho) e 🎁 (roxo)

---

### 3. **BANNER WEB3 NA SEÇÃO "PROJETOS EM DESTAQUE"**

**Onde procurar:**
- Na **página inicial** (`/pt` ou `/`)
- **Imediatamente abaixo** do título "PROJETOS EM DESTAQUE"
- **Imediatamente abaixo** do parágrafo com "Uma seleção dos nossos trabalhos..."
- **Antes** do primeiro card grande de projeto (ex: Museu Olímpico)

**Arquivo:** `src/pages/Home.tsx` (linhas 1273-1335)
**Aparência:** Bloco grande com fundo em gradiente roxo/azul/verde, ícone 🎁, título "Degustação: VR, NFT e Web3" e botão "Explorar Experiências"

**Como testar:**
1. Vá para a home (`azmt.com.br/pt` ou `azmt.com.br`)
2. Role até a seção "PROJETOS EM DESTAQUE"
3. Logo após o título e descrição, deve aparecer um **banner grande** com gradiente roxo/azul/verde

---

### 4. **TARJA WEB3 ABAIXO DOS PROJETOS**

**Onde procurar:**
- Na **página inicial** (`/pt` ou `/`)
- **Imediatamente abaixo** do botão "Ver Todos os Projetos"
- **Antes** da seção "Retrato do Estúdio" / "O que criamos"

**Arquivo:** `src/pages/Home.tsx` (linhas 1554-1655)
**Aparência:** Faixa horizontal com gradiente roxo/azul/verde, ícone 🎁, título "Degustação: VR, NFT e Web3" e botão "Explorar Experiências"

**Como testar:**
1. Vá para a home
2. Role até o final da seção de projetos
3. Após o botão "Ver Todos os Projetos", deve aparecer uma **faixa horizontal** com o tema Web3

---

### 5. **ITEM NO MENU "PROJETOS"**

**Onde procurar:**
- No **header**, clique em "PROJETOS" para abrir o dropdown
- Último item do menu: **"🎁 Degustação Web3"**

**Arquivo:** `src/components/Layout.tsx` (linhas 444-446)
**Como testar:**
1. Clique em "PROJETOS" no header
2. Role até o final do menu dropdown
3. Deve aparecer "🎁 Degustação Web3" (ou "🎁 Web3 Preview" em inglês)

---

### 6. **URL DIRETA DA DEGUSTAÇÃO**

**URLs para testar:**
- **PT:** `https://azmt.com.br/pt/experience-preview`
- **EN:** `https://azmt.com.br/en/experience-preview`
- **ES:** `https://azmt.com.br/es/experience-preview`
- **FR:** `https://azmt.com.br/fr/experience-preview`

**Arquivo:** `src/pages/ExperiencePreview.tsx` e `src/components/ExperiencePreview.tsx`

**Como testar:**
1. Abra diretamente a URL acima no navegador
2. Se a página carregar, a funcionalidade está no ar
3. Se der 404 ou erro, o deploy não incluiu essa rota

---

## 🔍 DIAGNÓSTICO: Por que não aparece?

### Problema 1: Deploy não foi feito
**Sintomas:**
- Nenhum dos elementos aparece
- A URL `/experience-preview` retorna 404

**Solução:**
1. Verificar se há commits não enviados: `git status`
2. Fazer push: `git push origin main`
3. Verificar no Vercel se o deploy foi concluído
4. Aguardar alguns minutos para o CDN atualizar

---

### Problema 2: Cache do navegador/CDN
**Sintomas:**
- Elementos não aparecem mesmo após refresh
- Site parece "antigo"

**Solução:**
1. **Hard refresh:** `Ctrl + Shift + R` (Windows/Linux) ou `Cmd + Shift + R` (Mac)
2. **Limpar cache:** DevTools (F12) → Application → Clear Storage → Clear site data
3. **Modo anônimo:** Abrir em janela anônima/privada
4. **Aguardar:** CDN pode levar 5-15 minutos para atualizar

---

### Problema 3: Build falhando
**Sintomas:**
- Deploy aparece como "Ready" mas site não muda
- Erros no console do navegador

**Solução:**
1. Verificar logs do Vercel
2. Verificar se há erros de TypeScript/compilação
3. Testar build local: `npm run build`

---

### Problema 4: Condições de renderização
**Sintomas:**
- Elementos aparecem em algumas telas mas não em outras
- Botão WEB3 não aparece no header

**Solução:**
1. **Desktop:** Verificar se a janela tem ≥ 900px de largura
2. **Mobile:** Verificar se a janela tem < 900px de largura
3. **Testar ambos:** Usar DevTools (F12) para alternar entre mobile/desktop

---

### Problema 5: CSS escondendo elementos
**Sintomas:**
- Elementos existem no HTML mas não são visíveis
- Console mostra elementos mas não aparecem na tela

**Solução:**
1. Abrir DevTools (F12)
2. Ir em Elements/Inspector
3. Procurar por elementos com `display: none` ou `visibility: hidden`
4. Verificar se há `z-index` muito baixo

---

## 🧪 TESTE RÁPIDO

Execute estes passos na ordem:

1. **Teste a URL direta:**
   ```
   https://azmt.com.br/pt/experience-preview
   ```
   Se funcionar, a página existe. Se não, o deploy não incluiu.

2. **Teste o header (Desktop):**
   - Abra o site em janela larga (≥ 900px)
   - Olhe no canto superior direito
   - Deve ter 2 botões: "INICIAR UM PROJETO" e "WEB3"

3. **Teste o header (Mobile):**
   - Abra DevTools (F12) → ícone de celular
   - Largura < 900px
   - Deve ter 2 botões: "+" e 🎁

4. **Teste a home:**
   - Vá para `/pt`
   - Role até "PROJETOS EM DESTAQUE"
   - Deve ter um banner Web3 logo abaixo do título

5. **Teste o menu:**
   - Clique em "PROJETOS" no header
   - Deve aparecer "🎁 Degustação Web3" no final do menu

---

## 📝 CHECKLIST DE VERIFICAÇÃO

- [ ] URL `/experience-preview` funciona?
- [ ] Botão WEB3 aparece no header desktop (≥ 900px)?
- [ ] Botão 🎁 aparece no header mobile (< 900px)?
- [ ] Banner Web3 aparece na seção "Projetos em Destaque"?
- [ ] Tarja Web3 aparece abaixo de "Ver Todos os Projetos"?
- [ ] Item "🎁 Degustação Web3" aparece no menu PROJETOS?
- [ ] Fez hard refresh (Ctrl+Shift+R)?
- [ ] Testou em modo anônimo?
- [ ] Verificou logs do Vercel?
- [ ] Build local funciona (`npm run build`)?

---

## 🚨 SE NADA FUNCIONAR

1. **Verificar git:**
   ```bash
   git status
   git log --oneline -5
   ```

2. **Verificar se os arquivos foram modificados:**
   ```bash
   git diff src/components/Layout.tsx
   git diff src/pages/Home.tsx
   ```

3. **Fazer commit e push forçado:**
   ```bash
   git add .
   git commit -m "fix: garantir visibilidade elementos Web3"
   git push origin main
   ```

4. **Verificar Vercel:**
   - Acessar dashboard do Vercel
   - Verificar se o último deploy foi concluído
   - Verificar logs de build

5. **Contatar suporte:**
   - Se tudo acima foi verificado e ainda não funciona, pode ser problema de CDN ou configuração do Vercel

---

## 📞 INFORMAÇÕES TÉCNICAS

**Arquivos modificados:**
- `src/components/Layout.tsx` (botões header)
- `src/pages/Home.tsx` (banner e tarja)
- `src/pages/ExperiencePreview.tsx` (página de degustação)
- `src/components/ExperiencePreview.tsx` (componente de degustação)

**Breakpoints:**
- Desktop: `window.innerWidth >= 900`
- Mobile: `window.innerWidth < 900`

**Estilos:**
- Botão WEB3: `rgba(139, 92, 246, 0.25)` (roxo)
- Banner/Tarja: Gradiente roxo/azul/verde

**Rota:**
- `/pt/experience-preview` (e variações por idioma)
