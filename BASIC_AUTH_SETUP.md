# 🔐 Basic Auth - Proteção Temporária do Site

Este documento explica como ativar/desativar o Basic Auth para proteger o site durante a revisão de conteúdo.

## 📋 Como Funciona

O Basic Auth adiciona uma tela de login simples (usuário/senha) que aparece **antes** de qualquer pessoa acessar o site. É temporário e pode ser removido facilmente.

## ⚙️ Configuração

### **1. Variáveis de Ambiente na Vercel**

Acesse o projeto na Vercel → **Settings** → **Environment Variables** e adicione:

#### **Para o Site Principal (Vite):**
```
BASIC_AUTH_ENABLED=true
BASIC_AUTH_USER=seu_usuario
BASIC_AUTH_PASS=sua_senha_forte
```

#### **Para o Backoffice (Next.js CMS):**
```
BASIC_AUTH_ENABLED=true
BASIC_AUTH_USER=seu_usuario
BASIC_AUTH_PASS=sua_senha_forte
```

### **2. Credenciais Recomendadas**

- **Usuário:** `azimut` ou `admin`
- **Senha:** Use uma senha forte (ex: `Azimut2025!Preview`)

**⚠️ IMPORTANTE:** Compartilhe as credenciais apenas com Ranz, Anick e Alberto.

## 🚀 Como Ativar

1. Adicione as variáveis acima na Vercel
2. Faça um novo deploy (ou aguarde o próximo)
3. Ao acessar o site, aparecerá a tela de login

## 🔓 Como Desativar (Quando Terminar a Revisão)

**Opção 1 - Remover Variável (Recomendado):**
- Na Vercel, delete ou mude `BASIC_AUTH_ENABLED` para `false`
- Faça um novo deploy

**Opção 2 - Remover Código:**
- Delete os arquivos `middleware.ts` (site principal) e ajuste `azimut-cms/middleware.ts`
- Faça deploy

## 📝 Notas

- ✅ O Basic Auth **NÃO interfere** no login da Vercel (dashboard)
- ✅ Funciona em todos os domínios (azmt.com.br, azmt.ca, etc.)
- ✅ Pode ser ativado/desativado sem alterar código
- ✅ Quando desativado, o site funciona normalmente

## 🎯 Próximos Passos

1. ✅ Basic Auth implementado
2. ⏳ Adicionar variáveis na Vercel
3. ⏳ Testar acesso com credenciais
4. ⏳ Revisar conteúdo do site
5. ⏳ Desativar Basic Auth quando pronto para público

---

**Dúvidas?** O Basic Auth é temporário e será removido quando o site estiver 100% pronto! 🚀

