# 📋 GUIA PASSO A PASSO - O QUE FAZER AGORA

**Data:** 11/01/2026  
**Status:** Correções aplicadas, aguardando você verificar

---

## 🎯 PASSO 1: VERIFICAR DEPLOY (2 minutos)

### 1.1. Acessar Vercel:
```
1. Abrir navegador
2. Ir em: https://vercel.com/dashboard
3. Fazer login (se necessário)
4. Procurar projeto: "azimut-backoffice" ou "azimut-cms"
```

### 1.2. Verificar Status:
```
Olhar para o último deploy:
- ✅ VERDE ("Ready") = Passou! → Ir para PASSO 2
- ❌ VERMELHO ("Error") = Ainda com erro → Ir para PASSO 4
```

**⏱️ Tempo:** 2 minutos

---

## ✅ PASSO 2: DEPLOY PASSOU - CONFIGURAR API KEY (5 minutos)

### 2.1. Obter API Key da Claude:
```
1. Abrir: https://console.anthropic.com
2. Fazer login
3. Ir em: "API Keys" (menu lateral)
4. Clicar: "Create Key"
5. Dar um nome (ex: "azimut-backoffice")
6. COPIAR a key completa (começa com "sk-ant-api03-...")
   ⚠️ IMPORTANTE: Copiar TUDO!
```

### 2.2. Configurar no Vercel:
```
1. Voltar para Vercel Dashboard
2. Projeto: azimut-backoffice
3. Ir em: Settings (menu superior)
4. Clicar: Environment Variables (menu lateral esquerdo)
5. Clicar: "Add" ou "Add New"
6. Preencher:
   - Key: CLAUDE_API_KEY
   - Value: [colar a key que você copiou]
   - Environment: Production (marcar ✓)
7. Clicar: "Save"
```

### 2.3. Redeploy:
```
1. Ir em: Deployments (menu superior)
2. Clicar nos "..." do último deploy
3. Clicar: "Redeploy"
4. Aguardar 2-3 minutos
5. Verificar se está VERDE ✅
```

**⏱️ Tempo:** 5 minutos

---

## 🧪 PASSO 3: TESTAR SISTEMA (5 minutos)

### 3.1. Acessar Backoffice:
```
1. Ir na URL do backoffice:
   - https://azimut-backoffice-[sua-url].vercel.app
   - OU o domínio que você configurou
2. Fazer login
```

### 3.2. Testar Upload:
```
1. Ir em: Mídia / Media / Upload
2. Clicar: "Arrastar arquivo ou clicar para selecionar"
3. Selecionar 1 imagem (JPG, PNG, etc)
4. Aguardar upload completar
5. Ver se aparece na galeria
```

### 3.3. Testar IA:
```
1. Clicar na imagem que você enviou
2. Ver se aparece botão: "🤖 Analisar com IA"
3. Clicar no botão
4. Aguardar análise (pode demorar 10-30 segundos)
5. Ver se aparece modal com:
   - Categoria sugerida
   - Tags sugeridas
   - Caption sugerida
   - Qualidade da imagem
6. Clicar: "Aplicar Sugestões"
7. Ver se salvou corretamente
```

**⏱️ Tempo:** 5 minutos

---

## ❌ PASSO 4: DEPLOY AINDA FALHOU - ME ENVIAR ERRO (2 minutos)

### 4.1. Copiar Erro:
```
1. No Vercel, clicar no deploy que falhou (vermelho)
2. Abrir aba: "Build Logs" ou "Logs"
3. Scroll até o FINAL do log
4. Copiar as últimas 20-30 linhas
5. OU tirar print da tela do erro
```

### 4.2. Me Enviar:
```
1. Colar o erro aqui no chat
2. OU enviar o print
3. EU VOU CORRIGIR IMEDIATAMENTE!
```

**⏱️ Tempo:** 2 minutos  
**Depois:** Eu corrijo em 5 minutos

---

## 📊 RESUMO RÁPIDO:

### ✅ Se Deploy Passou:
```
1. ✅ Verificar deploy (2 min)
2. ✅ Obter API Key (2 min)
3. ✅ Configurar no Vercel (2 min)
4. ✅ Redeploy (3 min)
5. ✅ Testar sistema (5 min)
```

**Total:** 14 minutos para estar 100% funcionando!

### ❌ Se Deploy Falhou:
```
1. ❌ Verificar deploy (2 min)
2. ❌ Me enviar erro (1 min)
3. ⚡ Eu corrijo (5 min)
4. ✅ Testar novamente (2 min)
```

**Total:** 10 minutos para resolver!

---

## 🎯 O QUE ESPERAR:

### Se Tudo OK:
- ✅ Deploy verde
- ✅ API Key configurada
- ✅ Upload funcionando
- ✅ IA analisando imagens
- ✅ Sistema completo funcionando!

### Se Ainda Erro:
- ❌ Me enviar print
- ⚡ Eu corrijo rápido
- ✅ Redeploy
- ✅ Funciona!

---

## 💡 DICAS:

### API Key:
- **Não compartilhe** a API Key publicamente
- **Guarde** em local seguro
- **Custo:** R$ 0,022 por imagem analisada (muito barato!)

### Teste:
- **Comece** com 1 imagem pequena (1-2MB)
- **Aguarde** a análise completar (10-30s)
- **Verifique** se as sugestões fazem sentido

---

## 🚀 PRÓXIMA AÇÃO:

**IR AGORA NO VERCEL E VERIFICAR:**

1. ✅ Verde? → Configurar API Key
2. ❌ Vermelho? → Me enviar erro

**TEMPO:** 2 minutos

**DEPOIS ME DIGA:** "Verde" ou "Vermelho" + print do erro (se vermelho)

---

## 📞 PRECISA DE AJUDA?

**Qualquer dúvida:**
- Me pergunte aqui
- Eu ajudo passo a passo
- Não tem erro que eu não corrija! 💪

---

**BORA VERIFICAR! 🚀**
