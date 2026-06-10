# 🔐 Proteção por Senha - Site em Construção

**Status:** ✅ **IMPLEMENTADO E FUNCIONAL**

---

## 📋 Como Funciona

O site agora tem um sistema de proteção por senha que pode ser **ativado ou desativado** facilmente através de variáveis de ambiente.

### 🎯 Dois Modos de Operação:

1. **🔓 Modo Público** (padrão)
   - Site acessível sem senha
   - Qualquer pessoa pode acessar
   - Ideal para quando o site estiver pronto

2. **🔒 Modo Protegido** (site em construção)
   - Exige login com usuário e senha
   - Redireciona para `/login` se não autenticado
   - Ideal para proteger o site durante desenvolvimento

---

## ⚙️ Como Configurar

### **Opção 1: Arquivo `.env` Local (Desenvolvimento)**

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env`:
   ```env
   # Para ATIVAR proteção (exigir senha):
   VITE_PREVIEW_ENABLED=true
   
   # Para DESATIVAR proteção (público):
   VITE_PREVIEW_ENABLED=false
   
   # Credenciais (opcional - usa padrão se não definir):
   VITE_PREVIEW_USER=azimut
   VITE_PREVIEW_PASS=Azimut2025!Preview
   ```

3. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### **Opção 2: Vercel (Produção)**

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto `azimut-site-vite-tailwind`
3. Vá em **Settings** > **Environment Variables**
4. Adicione as variáveis:
   - `VITE_PREVIEW_ENABLED` = `true` (para proteger) ou `false` (para público)
   - `VITE_PREVIEW_USER` = `azimut` (opcional)
   - `VITE_PREVIEW_PASS` = `Azimut2025!Preview` (opcional)
5. Faça um novo deploy

---

## 🔑 Credenciais Padrão

Quando a proteção está ativa, as credenciais padrão são:

- **Usuário:** `azimut`
- **Senha:** `Azimut2025!Preview`

Você pode personalizar essas credenciais através das variáveis de ambiente.

---

## ✅ Status Atual

Por padrão, a proteção está **DESATIVADA** (`VITE_PREVIEW_ENABLED=false`), então o site está **público** e funcionando normalmente.

Para **ativar a proteção**, defina `VITE_PREVIEW_ENABLED=true`.

---

## 🧪 Como Testar

### Testar Modo Público (sem proteção):
```bash
# No .env:
VITE_PREVIEW_ENABLED=false

# Acesse qualquer página - deve abrir direto
```

### Testar Modo Protegido (com senha):
```bash
# No .env:
VITE_PREVIEW_ENABLED=true

# Acesse qualquer página - deve redirecionar para /login
# Use as credenciais: azimut / Azimut2025!Preview
```

---

## 🔄 Mudança Rápida

### Para Proteger o Site (ativar senha):
```env
VITE_PREVIEW_ENABLED=true
```

### Para Deixar Público (remover senha):
```env
VITE_PREVIEW_ENABLED=false
```

**Ou simplesmente remova a variável** - o padrão é público.

---

## 📝 Notas Importantes

1. ✅ **Não quebra nada** - O sistema verifica a variável e permite acesso direto se desabilitado
2. ✅ **Reversível** - Pode ativar/desativar a qualquer momento
3. ✅ **Seguro** - Credenciais podem ser personalizadas via variáveis de ambiente
4. ✅ **Funciona em produção** - Configure no Vercel e faça deploy

---

## 🚀 Próximos Passos

1. **Para proteger o site agora:**
   - Configure `VITE_PREVIEW_ENABLED=true` no Vercel
   - Faça um novo deploy

2. **Para deixar público quando pronto:**
   - Configure `VITE_PREVIEW_ENABLED=false` no Vercel
   - Faça um novo deploy

---

**Data:** 02/01/2026  
**Versão:** 1.0

