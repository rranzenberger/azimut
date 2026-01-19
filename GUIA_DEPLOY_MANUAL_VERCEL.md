# 🚀 GUIA: Deploy Manual no Vercel (Sem Auto-Deploy)

## ⚠️ PROBLEMA ATUAL
O Vercel está fazendo deploy automático a cada push no GitHub, gerando custos desnecessários.

## ✅ SOLUÇÃO: Desativar Auto-Deploy

### Passo 1: Acessar Configurações do Projeto
1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto: **azimut-site-vite-tailwind**
3. Vá em **Settings** (Configurações)

### Passo 2: Desativar Auto-Deploy

**OPÇÃO 1: Desconectar Repositório (Mais Simples)**
1. Na página **Settings > Git** (onde você está agora)
2. Clique no botão **"Disconnect"** (cinza, no canto superior direito)
3. Isso desativa completamente o deploy automático
4. Você ainda pode fazer deploy manual via Dashboard ou CLI

**OPÇÃO 2: Manter Conectado mas Desabilitar Auto-Deploy**
1. Na página **Settings > Git**
2. Procure por uma seção chamada **"Production Branch"** ou **"Deploy Settings"**
3. Se não aparecer, pode estar em **Settings > General**
4. Procure por **"Automatically deploy from Git"** ou **"Auto-deploy"**
5. **DESATIVE** essa opção
6. Salve as alterações

**⚠️ IMPORTANTE:**
- Se você não encontrar a opção de "Auto-deploy", a forma mais garantida é **desconectar o repositório**
- Você pode reconectar depois se quiser, mas sem auto-deploy
- O botão **"Disconnect"** está visível na sua tela atual

### Passo 3: Verificar Integração GitHub
1. Ainda em **Settings > Git**
2. Se quiser manter a integração mas sem auto-deploy:
   - Mantenha a conexão com GitHub
   - Mas desative apenas o auto-deploy
3. Ou desconecte completamente se preferir

---

## 📋 COMO FAZER DEPLOY MANUAL

### Opção 1: Via Vercel Dashboard (Recomendado)
1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto: **azimut-site-vite-tailwind**
3. Clique no botão **"Deploy"** ou **"Redeploy"**
4. Escolha:
   - **Environment**: Production
   - **Branch**: main (ou a branch que quiser)
5. Clique em **"Redeploy"**
6. Aguarde o build completar (~2-5 minutos)

### Opção 2: Via Vercel CLI (Opcional)
```bash
# 1. Fazer login (só uma vez)
vercel login

# 2. Fazer deploy manual
vercel --prod

# Ou deploy de uma branch específica
vercel --prod --branch main
```

---

## 🎯 FLUXO RECOMENDADO

### Quando Fazer Deploy:
- ✅ Após implementar features importantes
- ✅ Após correções críticas
- ✅ Antes de apresentar para cliente
- ✅ Quando quiser testar em produção

### Quando NÃO Fazer Deploy:
- ❌ A cada commit pequeno
- ❌ Durante desenvolvimento/testes
- ❌ Commits de documentação
- ❌ Ajustes visuais menores (testar local primeiro)

---

## 💡 DICA: Deploy Apenas Quando Necessário

**Workflow Sugerido:**
1. Desenvolver localmente (`npm run dev`)
2. Testar tudo em localhost
3. Fazer commit e push para GitHub
4. **NÃO fazer deploy ainda** (auto-deploy desativado)
5. Quando estiver pronto, fazer deploy manual no Vercel

---

## 🔧 CONFIGURAÇÕES ATUAIS

### Arquivos de Configuração:
- ✅ `vercel.json` - Configuração do projeto (OK)
- ✅ `package.json` - Scripts de build (OK)
- ✅ Scripts de deploy removidos (OK)

### O que está causando auto-deploy:
- ⚠️ Configuração no Vercel Dashboard (não no código)
- ⚠️ Integração GitHub → Vercel ativada

---

## 📝 CHECKLIST PARA DESATIVAR AUTO-DEPLOY

- [ ] Acessar Vercel Dashboard
- [ ] Ir em Settings > Git
- [ ] Desativar "Automatically deploy from Git"
- [ ] Salvar alterações
- [ ] Testar: fazer um commit e verificar se NÃO faz deploy automático
- [ ] Fazer deploy manual quando necessário

---

## 🆘 TROUBLESHOOTING

### Se ainda fizer deploy automático:
1. Verificar se desativou corretamente em Settings > Git
2. Verificar se há Deploy Hooks ativos
3. Verificar se há webhooks do GitHub configurados

### Se quiser reativar depois:
1. Settings > Git
2. Ativar "Automatically deploy from Git"
3. Salvar

---

## ✅ RESULTADO ESPERADO

Após desativar:
- ✅ Commits no GitHub NÃO fazem deploy automático
- ✅ Você controla quando fazer deploy
- ✅ Economiza créditos do Vercel
- ✅ Deploy manual funciona normalmente

---

**Última atualização:** 2026-01-11
