# 🎯 GUIA COMPLETO: CUADORIA AUTOMÁTICA COM IA

## ✅ O QUE FOI CRIADO

### **Script Completo: `curate-olympic-images-complete.ts`**

Este script faz **TUDO automaticamente**:

1. ✅ **Busca todas as imagens** do Museu Olímpico no banco de dados
2. ✅ **Analisa cada uma com DeepSeek** para detectar:
   - Categoria (jornal, instalações, ginástica, eventos, making-of, tecnologia)
   - TIER de impacto (1, 2, 3)
   - Tags relevantes (até 5 por imagem)
   - Público-alvo (governantes, centros-culturais, produtoras, etc.)
   - Descrições melhoradas em 4 idiomas
   - Relevância (0-100%)
3. ✅ **Cria/atualiza tags** no banco de dados
4. ✅ **Associa tags ao projeto** automaticamente
5. ✅ **Organiza por TIER e relevância**
6. ✅ **Prepara para sistema de recomendação**

---

## 🚀 COMO USAR

### **1. Executar o Script:**

```bash
cd azimut-cms
npx tsx scripts/curate-olympic-images-complete.ts
```

### **2. O que acontece:**

- 🔍 Busca todas as imagens do projeto no banco
- 🤖 Analisa cada uma com DeepSeek (pode levar alguns minutos)
- ✅ Atualiza descrições em 4 idiomas
- 🏷️ Cria tags automaticamente
- 📊 Organiza por TIER e relevância
- 📈 Mostra estatísticas completas

### **3. Resultado:**

- ✅ Todas as imagens analisadas
- ✅ Tags criadas e associadas
- ✅ Descrições melhoradas
- ✅ Ordem ajustada por importância
- ✅ Pronto para recomendação personalizada

---

## 🔄 INTEGRAÇÃO COM SISTEMA DE RECOMENDAÇÃO

### **Como funciona a integração:**

```
1. Imagem analisada → Tags detectadas
   ↓
2. Tags associadas ao projeto
   ↓
3. Visitante navega → Sistema rastreia interesse
   ↓
4. DeepSeek analisa comportamento (ai-scoring.ts)
   ↓
5. Sistema recomenda projetos baseado em tags
   ↓
6. Visitante vê conteúdo relevante ao interesse
```

### **Sistema de Scoring já existe:**

- ✅ `ai-scoring.ts` - Analisa comportamento do visitante
- ✅ `usePersonalizedContent.ts` - Personaliza conteúdo
- ✅ `/api/track` - Rastreia navegação
- ✅ `/api/visitor/profile` - Retorna perfil personalizado

### **Tags são usadas para:**

- 🎯 **Scoring de interesse:** Sistema identifica o que visitante quer
- 🔍 **Busca e filtros:** Visitante encontra conteúdo relevante
- 📊 **Recomendações:** Projetos relacionados aparecem automaticamente
- 🎨 **Curadoria:** Conteúdo organizado por categoria e TIER

---

## 📊 ESTATÍSTICAS DO SCRIPT

O script mostra:

- 📸 **Total de imagens** no banco
- ✅ **Imagens analisadas** com sucesso
- ❌ **Erros** (se houver)
- 🏷️ **Tags criadas/atualizadas**
- 📊 **Distribuição por categoria**
- ⭐ **Distribuição por TIER** (1, 2, 3)
- 🎯 **Distribuição por público-alvo**

---

## 🎯 CATEGORIAS DETECTADAS

- **jornal:** Imagens de matérias, capas, reconhecimento público
- **instalacoes:** Tecnologia, interatividade, inovação
- **ginastica:** Áreas temáticas, curadoria, detalhamento
- **eventos:** Inauguração, autoridades, público
- **making-of:** Processo, construção, backstage
- **tecnologia:** Sistemas, backoffice, arquitetura técnica
- **outros:** Conteúdo complementar

---

## ⭐ TIER DE IMPACTO

- **TIER 1 (Máximo):** Impressiona governantes, credibilidade oficial, tecnologia inovadora
- **TIER 2 (Alto):** Impressiona centros culturais, produtoras, mostra curadoria
- **TIER 3 (Complementar):** Enriquece o conteúdo

---

## 🎯 PÚBLICO-ALVO

- **governantes:** Secretarias, prefeituras, autoridades
- **centros-culturais:** Museus, curadores, instituições culturais
- **produtoras:** Agências, produtoras audiovisuais
- **empresas:** Marcas, empresas, parceiros
- **publico-geral:** Visitantes, curiosos
- **parceiros:** Parceiros tecnológicos, colaboradores

---

## 🔧 CONFIGURAÇÃO NECESSÁRIA

### **DeepSeek API Key:**

1. Acesse: `https://backoffice.azmt.com.br/admin/settings`
2. Configure: `DEEPSEEK_API_KEY`
3. Ou variável de ambiente: `DEEPSEEK_API_KEY`

### **Verificar se está configurado:**

```bash
cd azimut-cms
grep DEEPSEEK .env
```

---

## 💡 PARA O FUTURO

### **Quando adicionar novas imagens:**

1. **Opção 1: Automático (recomendado)**
   - Sistema pode analisar automaticamente ao adicionar
   - Tags e descrições são sugeridas
   - Você aprova ou ajusta

2. **Opção 2: Manual**
   - Execute o script novamente
   - Apenas imagens novas serão analisadas
   - Tags existentes são preservadas

### **Sistema de Recomendação:**

- ✅ Já está funcionando
- ✅ Usa tags para recomendar projetos
- ✅ Personaliza conteúdo por interesse
- ✅ Funciona com geolocalização

---

## ✅ PRONTO PARA USAR!

**Execute o script e veja a mágica acontecer:**

```bash
cd azimut-cms
npx tsx scripts/curate-olympic-images-complete.ts
```

**Tempo estimado:** 1-2 minutos por imagem (depende da API DeepSeek)

---

## 📝 NOTAS IMPORTANTES

- ⏱️ **Tempo:** O script faz delay de 1 segundo entre análises para não sobrecarregar a API
- 🔄 **Idempotente:** Pode executar várias vezes, apenas atualiza o que mudou
- 🏷️ **Tags:** Tags são criadas automaticamente, você pode ajustar depois
- 📊 **Estatísticas:** Script mostra relatório completo ao final

---

## 🎉 RESULTADO FINAL

Após executar o script:

- ✅ Todas as imagens analisadas
- ✅ Tags criadas e associadas
- ✅ Descrições melhoradas em 4 idiomas
- ✅ Ordem ajustada por TIER e relevância
- ✅ Sistema de recomendação funcionando
- ✅ Conteúdo personalizado por interesse

**Sistema completo e integrado!** 🚀

