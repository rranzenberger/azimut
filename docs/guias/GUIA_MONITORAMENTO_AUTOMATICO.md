# 🤖 Monitoramento Automático com DeepSeek/Claude

## ✅ O que foi implementado

### **1. Configuração por Projeto** ⚙️

#### **Localização:**
- `/admin/projects/[id]/monitoring`
- Acesso: Editar projeto → Aba "Monitoramento"

#### **Configurações:**
- ✅ **Ativar/Desativar Monitoramento**
- ✅ **Palavras-chave** (separadas por vírgula)
- ✅ **Tipo de Crédito** (Cliente, Autoral, Evento)
- ✅ **Texto do Crédito** (ex: "Animação por Azimut")
- ✅ **Contribuições da Azimut** (ex: "arte generativa, motion design")

#### **Como Funciona:**
1. Você define qual projeto está sendo monitorado
2. Adiciona palavras-chave relacionadas
3. Ativa monitoramento
4. **DeepSeek/Claude monitora automaticamente**
5. Resultados aparecem na área de curadoria

---

### **2. Monitoramento Automático** 🔄

#### **Processo:**
1. **Sistema busca** conteúdo nas fontes:
   - Instagram
   - YouTube
   - Google News
   - LinkedIn
   - Jornais
   - Blogs

2. **DeepSeek/Claude analisa:**
   - Relevância para o projeto
   - Sugere títulos
   - Sugere resumos
   - Adiciona créditos
   - Identifica se deve ser destacado

3. **Salva na Curadoria:**
   - Status: `PENDING`
   - Aparece em `/admin/making-of/curation`
   - Você revisa e aprova

---

### **3. Cron Job Automático** ⏰

#### **Configuração no Vercel:**
```json
{
  "crons": [
    {
      "path": "/api/cron/monitor-projects",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

#### **Frequência:**
- **A cada 6 horas** (padrão)
- Ou configurar outra frequência
- Executa automaticamente

#### **Proteção:**
- Requer `CRON_SECRET` no `.env`
- Só executa com secret key

---

### **4. Busca Manual** 🔍

#### **No Backoffice:**
- Botão "🔍 Buscar Agora (DeepSeek/Claude)"
- Busca imediatamente
- Não precisa esperar cron job
- Útil para testar

---

## 🎯 Fluxo Completo

```
1. Configurar Projeto
   - Vá em /admin/projects/[id]/monitoring
   - Ative monitoramento
   - Adicione palavras-chave
   - Salve
   ↓
2. Monitoramento Automático
   - Cron job executa a cada 6h
   - OU você clica "Buscar Agora"
   ↓
3. DeepSeek/Claude Busca
   - Busca em múltiplas fontes
   - Analisa relevância
   - Processa com IA
   ↓
4. Resultados na Curadoria
   - Aparecem em /admin/making-of/curation
   - Status: PENDING
   - Você revisa
   ↓
5. Aprovar e Publicar
   - Seleciona os relevantes
   - Aprova
   - Sistema publica automaticamente
```

---

## 📋 Exemplo Prático

### **Projeto: Rio Museu Olímpico**

#### **Configuração:**
```
Monitoramento: ✅ Ativado
Palavras-chave: Rio Museu Olímpico, instalação imersiva, Azimut, LED 20x5m
Tipo de Crédito: CLIENTE
Texto do Crédito: Animação por Azimut
Contribuições: arte generativa, motion design, LED 20x5m
```

#### **O que acontece:**
1. Sistema busca conteúdo sobre "Rio Museu Olímpico"
2. DeepSeek/Claude analisa relevância
3. Encontra post no Instagram mencionando o projeto
4. Salva como sugestão na curadoria
5. Você revisa e aprova
6. Publica automaticamente no Blog, Social, etc.

---

## 🔧 Configuração

### **1. Variáveis de Ambiente:**

```env
# DeepSeek (backup)
DEEPSEEK_API_KEY=sk-...

# Claude (prioridade)
ANTHROPIC_API_KEY=sk-ant-...

# Cron Job
CRON_SECRET=seu_secret_aqui
```

### **2. Vercel Cron (opcional):**

Adicionar em `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/monitor-projects",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

---

## ✅ Status

- ✅ Interface de configuração criada
- ✅ Monitoramento automático implementado
- ✅ Integração com DeepSeek/Claude
- ✅ Cron job criado
- ✅ Busca manual implementada
- ⏳ Testes pendentes

**Sistema pronto! Configure um projeto e teste!** 🚀
