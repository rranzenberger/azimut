# 📋 Resumo Rápido - Otimização SEO com IA

## ⚠️ PROBLEMA ATUAL

**Erro:** "invalid x-api-key"

**Causa:** Chave da API do Anthropic não configurada

---

## ✅ O QUE FAZER AGORA

### **1. Configurar a Chave (2 minutos)**

**Criar arquivo `.env` na pasta `azimut-cms`:**

1. Abra o Explorador de Arquivos
2. Vá até: `C:\Users\ranz\Documents\azimut-site-vite-tailwind\azimut-cms`
3. Crie um arquivo chamado `.env` (se não existir)
4. Adicione esta linha:
   ```
   ANTHROPIC_API_KEY=sua-chave-aqui
   ```

**Onde pegar a chave:**
- Acesse: https://console.anthropic.com/
- Login → API Keys → Create Key
- Copie e cole no arquivo `.env`

---

### **2. Testar Novamente**

Duplo clique em: `EXECUTAR_OTIMIZAR_SEO.bat`

---

## 📋 VARIÁVEIS NECESSÁRIAS

**Para o script funcionar, precisa de:**

1. ✅ `ANTHROPIC_API_KEY` - Chave da API do Anthropic (Claude)
2. ✅ `DATABASE_URL` - URL do banco de dados (já deve estar configurada)

---

## 🎯 RESUMO ULTRA SIMPLES

**Agora:**
1. Criar arquivo: `azimut-cms/.env`
2. Adicionar: `ANTHROPIC_API_KEY=sua-chave`
3. Executar: `EXECUTAR_OTIMIZAR_SEO.bat`

**Depois:**
- Script vai otimizar 10 projetos
- Mostrar sugestões de SEO
- Você pode usar as sugestões

---

## ✅ PRONTO!

Configure a chave e teste novamente! 🎉
