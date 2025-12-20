# 🧪 Como Testar o Site - Passo a Passo Visual

## 🎯 Objetivo

Verificar se o site está conectado ao CMS e funcionando corretamente.

---

## 📍 PASSO 1: Descobrir a URL do Site

### Onde encontrar:

1. **Acesse:** https://vercel.com
2. **Projeto:** `azimut` (site principal)
3. **Vá em:** **Deployments**
4. **Clique no último deploy** (o que você acabou de fazer)
5. **Procure por:**
   - Botão **"Visit"** ou **"Domains"**
   - A URL pode ser:
     - `https://azimut.vercel.app`
     - `https://azimut-git-main-xxxxx.vercel.app`
     - Ou seu domínio customizado (ex: `https://azmt.com.br`)

**Anote essa URL!** 📝

---

## 🌐 PASSO 2: Abrir o Site no Navegador

1. **Abra uma nova aba** no seu navegador (Chrome, Firefox, Edge, etc.)
2. **Digite a URL** que você anotou
3. **Pressione Enter**
4. **O site deve abrir normalmente**

---

## 🔍 PASSO 3: Abrir o Console do Navegador

### Método 1: Tecla F12 (Mais Rápido)

1. **Pressione a tecla F12** no teclado
2. **Uma janela vai abrir** na parte inferior ou lateral da tela
3. **Essa janela é o "DevTools"** (Ferramentas do Desenvolvedor)

### Método 2: Botão Direito

1. **Clique com o botão direito** em qualquer lugar da página
2. **Clique em:** "Inspecionar" ou "Inspect" ou "Inspecionar elemento"
3. **A mesma janela vai abrir**

---

## 📊 PASSO 4: Verificar o Console

### O que fazer:

1. **Na janela que abriu**, procure por **abas no topo**
2. **Clique na aba "Console"** (geralmente a primeira ou segunda)
3. **Você vai ver mensagens** aparecendo

### O que procurar:

#### ✅ **Se estiver funcionando, você pode ver:**

```
🌍 País detectado: BR
🎯 Projetos personalizados do CMS: 3
```

Ou mensagens similares em verde/preto (não são erros).

#### ❌ **Se NÃO estiver funcionando, você vai ver:**

```
Failed to fetch
Network error
CORS error
```

Mensagens em **vermelho** são erros.

---

## 🔍 PASSO 5: Verificar Requisições (Opcional)

### Se quiser ver mais detalhes:

1. **Na mesma janela do DevTools**, clique na aba **"Network"** (Rede)
2. **Recarregue a página** (F5 ou Ctrl+R)
3. **Procure por requisições** que começam com:
   - `/api/public/content`
   - `/api/geo`
   - `/api/track`

4. **Clique em uma dessas requisições**
5. **Verifique o status:**
   - **200** = ✅ Funcionando!
   - **404** = ❌ Não encontrado
   - **500** = ❌ Erro no servidor

---

## ✅ O Que Significa Cada Coisa

### `🌍 País detectado: BR`
- ✅ O site detectou seu país (Brasil)
- ✅ Está conectando ao CMS
- ✅ Funcionando!

### `🎯 Projetos personalizados do CMS: X`
- ✅ O CMS retornou X projetos
- ✅ O site está consumindo conteúdo do CMS
- ✅ Funcionando!

### Requisições `/api/public/content` com status 200
- ✅ A API do CMS está respondendo
- ✅ O site consegue buscar conteúdo
- ✅ Funcionando!

---

## 🐛 Se Aparecer Erros

### Erro: "Failed to fetch" ou "Network error"

**O que significa:**
- O site não conseguiu conectar ao CMS
- Pode ser que a variável não foi aplicada ainda

**O que fazer:**
1. Verificar se o build completou na Vercel
2. Aguardar mais alguns minutos
3. Recarregar a página (F5)
4. Se continuar, me avise!

### Erro: "CORS error"

**O que significa:**
- Problema de permissão entre site e CMS

**O que fazer:**
- Me avise que vou verificar a configuração do CMS

---

## 📋 Resumo Visual

```
1. Vercel → Deployments → Pegar URL
   ↓
2. Abrir URL no navegador
   ↓
3. Pressionar F12
   ↓
4. Clicar na aba "Console"
   ↓
5. Verificar mensagens:
   ✅ Verde/preto = Funcionando!
   ❌ Vermelho = Erro (me avise)
```

---

## 🎯 Resultado Esperado

**Se tudo estiver funcionando:**
- ✅ Site abre normalmente
- ✅ Console mostra mensagens informativas (não erros)
- ✅ Conteúdo do CMS aparece na página
- ✅ Projetos aparecem no Portfolio

---

**Siga esses passos e me diga o que apareceu no console!** 🔍

