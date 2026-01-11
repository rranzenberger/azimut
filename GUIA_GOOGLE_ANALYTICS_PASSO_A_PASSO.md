# 📊 GUIA COMPLETO: CONFIGURAR GOOGLE ANALYTICS 4

**Data:** 11/01/2026  
**Tempo estimado:** 10-15 minutos

---

## 📋 VISÃO GERAL

O código do Google Analytics já está implementado no site Azimut!
Você só precisa:
1. Criar conta no Google Analytics
2. Obter o Measurement ID
3. Adicionar no Vercel

---

## PASSO 1: CRIAR CONTA NO GOOGLE ANALYTICS

### 1.1 Acessar o Google Analytics
🔗 **Link:** https://analytics.google.com

### 1.2 Iniciar configuração
- Clique em **"Começar a medir"** (ou "Start measuring")
- Se já tiver conta Google, será logado automaticamente

### 1.3 Criar Conta
```
Nome da conta: Azimut
```
- Marque as opções de compartilhamento conforme preferir
- Clique **"Próxima"**

### 1.4 Criar Propriedade
```
Nome da propriedade: Azimut Website
Fuso horário: Brasil (GMT-3) ou Canada (GMT-8)
Moeda: BRL ou CAD
```
- Clique **"Próxima"**

### 1.5 Detalhes da empresa
- Categoria: Artes e Entretenimento ou Serviços Empresariais
- Tamanho: Pequena (1-10 funcionários)
- Clique **"Criar"**

### 1.6 Aceitar termos
- Aceite os Termos de Serviço
- Clique **"Aceito"**

---

## PASSO 2: CONFIGURAR FLUXO DE DADOS (WEB)

### 2.1 Selecionar plataforma
- Escolha **"Web"**

### 2.2 Configurar fluxo
```
URL do site: www.azmt.com.br
Nome do fluxo: Azimut Website
```
- Mantenha **"Medição aprimorada"** ativada
- Clique **"Criar fluxo"**

### 2.3 COPIAR O MEASUREMENT ID ⭐
Você verá algo como:
```
MEASUREMENT ID: G-XXXXXXXXXX
```
**COPIE ESTE CÓDIGO!** (ex: G-ABC123XYZ)

---

## PASSO 3: ADICIONAR NO VERCEL

### 3.1 Acessar Vercel
🔗 **Link:** https://vercel.com

### 3.2 Selecionar projeto
- Clique no projeto **azimut** (site principal)
- ⚠️ NÃO é o azimut-backoffice

### 3.3 Ir para Settings
- Clique em **"Settings"** no menu superior

### 3.4 Environment Variables
- No menu lateral, clique em **"Environment Variables"**

### 3.5 Adicionar variável
```
Key: VITE_GA_MEASUREMENT_ID
Value: G-XXXXXXXXXX (seu ID copiado)
```
- Environment: Production, Preview, Development (todas)
- Clique **"Save"**

### 3.6 Redeploy
- Vá para a aba **"Deployments"**
- Clique nos **"..."** do deploy mais recente
- Selecione **"Redeploy"**
- Aguarde 1-2 minutos

---

## PASSO 4: VERIFICAR SE FUNCIONOU

### 4.1 Acessar o site
🔗 **Link:** https://www.azmt.com.br

### 4.2 Abrir Console
- Pressione **F12** (ou Cmd+Option+I no Mac)
- Vá na aba **"Console"**

### 4.3 Verificar mensagem
Você deve ver:
```
✅ Google Analytics inicializado: G-XXXXXXXXXX
📊 GA Pageview: /pt
```

### 4.4 Verificar no GA
- Volte ao Google Analytics
- Vá em **"Relatórios"** → **"Em tempo real"**
- Você deve ver sua visita aparecer!

---

## 🎉 PRONTO!

O Google Analytics está funcionando em paralelo com o sistema interno.

---

## 📊 O QUE É TRACKADO AUTOMATICAMENTE

| Evento | Descrição |
|--------|-----------|
| page_view | Todas as páginas visitadas |
| scroll | Profundidade de scroll (25%, 50%, 75%, 90%) |
| click | Cliques em links externos |
| file_download | Downloads de arquivos |
| video_engagement | Interação com vídeos (se houver) |

---

## 📈 EVENTOS CUSTOMIZADOS (já implementados)

| Evento | Quando dispara |
|--------|----------------|
| project_interaction | Ver/clicar em projetos |
| conversion_lead | Submeter formulário de contato |
| user_interaction | Cliques em CTAs |
| chatbot_interaction | Usar o chatbot |
| language_change | Mudar idioma |
| pwa_event | Instalar PWA |

---

## 🔗 LINKS ÚTEIS

- **Google Analytics:** https://analytics.google.com
- **Documentação GA4:** https://support.google.com/analytics
- **Debug View:** Analytics → Admin → Debug View

---

## ❓ PROBLEMAS COMUNS

### Não aparece no console?
- Verifique se a variável foi adicionada corretamente
- Faça redeploy do site
- Limpe o cache do navegador (Ctrl+Shift+R)

### Não aparece no GA Real-time?
- Aguarde 1-2 minutos
- Verifique se não está usando bloqueador de anúncios
- Tente em modo incógnito

### ID começa com UA- ao invés de G-?
- Isso é o antigo Universal Analytics
- Crie uma nova propriedade GA4 (formato G-)

---

## ✅ CHECKLIST

- [ ] Conta GA criada
- [ ] Propriedade GA4 criada
- [ ] Measurement ID copiado (G-XXXXXXXXXX)
- [ ] Variável adicionada no Vercel
- [ ] Site redeployado
- [ ] Verificado no console
- [ ] Verificado no GA Real-time
