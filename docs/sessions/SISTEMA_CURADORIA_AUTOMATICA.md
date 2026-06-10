# 🤖 SISTEMA DE CUADORIA AUTOMÁTICA COM IA
## Análise Inteligente de Imagens e Recomendação Personalizada

---

## 🎯 O QUE FOI CRIADO

### **1. Análise Automática de Imagens (`lib/image-analysis.ts`)**
Sistema que usa **DeepSeek** para analisar imagens automaticamente:

- ✅ **Detecta categoria:** jornal, instalações, ginástica, eventos, making-of, tecnologia
- ✅ **Define TIER:** 1 (máximo), 2 (alto), 3 (complementar)
- ✅ **Gera tags:** palavras-chave relevantes automaticamente
- ✅ **Identifica público-alvo:** governantes, centros-culturais, produtoras, etc.
- ✅ **Cria descrições:** em 4 idiomas (PT, EN, ES, FR)
- ✅ **Calcula relevância:** 0-100%
- ✅ **Define destaque:** se deve aparecer em destaque

### **2. Script de Análise em Lote (`scripts/analyze-olympic-images-ai.ts`)**
Analisa todas as imagens do projeto automaticamente:

```bash
cd azimut-cms
npx tsx scripts/analyze-olympic-images-ai.ts
```

**O que faz:**
- Busca todas as imagens do Museu Olímpico
- Analisa cada uma com DeepSeek
- Atualiza descrições (alt text) em 4 idiomas
- Cria/associa tags automaticamente
- Ajusta ordem por TIER e relevância

### **3. API de Análise (`/api/admin/media/analyze`)**
Endpoint para analisar imagens individualmente:

```javascript
POST /api/admin/media/analyze
Body: { mediaId: "..." }
```

**Uso:** Pode ser chamado do backoffice quando uma nova imagem é adicionada.

---

## 🔄 INTEGRAÇÃO COM SISTEMA EXISTENTE

### **DeepSeek já está implementado:**
- ✅ `azimut-cms/src/lib/ai-provider.ts` - Serviço de IA
- ✅ Configurado em Settings do backoffice
- ✅ Usado em: chatbot, scoring de visitantes, tradução

### **Sistema de Recomendação já existe:**
- ✅ `usePersonalizedContent.ts` - Personalização de conteúdo
- ✅ `ai-scoring.ts` - Scoring de interesse
- ✅ `/api/track` - Tracking comportamental
- ✅ `/api/visitor/profile` - Perfil do visitante

### **Como funciona a integração:**

```
1. Imagem adicionada ao backoffice
   ↓
2. Análise automática com DeepSeek
   ↓
3. Tags e categorias detectadas
   ↓
4. Sistema de recomendação usa essas tags
   ↓
5. Visitante vê conteúdo relevante ao seu interesse
```

---

## 🎨 CUADORIA AUTOMÁTICA POR INTERESSE

### **Como o sistema identifica interesse:**

1. **Tracking comportamental:**
   - Páginas visitadas
   - Projetos visualizados
   - Tempo gasto
   - Interações (cliques, scroll)

2. **Análise com IA (DeepSeek):**
   - Identifica tipo de visitante
   - Calcula scores de interesse
   - Recomenda projetos relevantes

3. **Geolocalização:**
   - País detectado
   - Idioma ajustado
   - Conteúdo localizado

### **Tipos de visitantes identificados:**

- 🏛️ **GOVERNMENT** - Secretarias, prefeituras
- 🎨 **CURATOR** - Centros culturais, museus
- 🎬 **PRODUCER** - Produtoras, agências
- 🏢 **BRAND** - Empresas, marcas
- 🎓 **EDUCATION** - Instituições educacionais
- 🔬 **TECH** - Parceiros tecnológicos
- 👥 **PUBLICO_GERAL** - Curiosos, visitantes

### **Recomendações personalizadas:**

- **Governantes:** Projetos oficiais, números, credibilidade
- **Curadores:** Curadoria, integração, tecnologia
- **Produtoras:** Produção audiovisual, UI/grafismo
- **Empresas:** Tecnologia, escala, inovação
- **Público geral:** Experiências interativas, visual

---

## 🚀 COMO USAR

### **Opção 1: Análise Automática ao Adicionar Imagem**

Quando você adiciona uma imagem no backoffice:
1. Sistema detecta automaticamente
2. Analisa com DeepSeek
3. Sugere tags e descrições
4. Você aprova ou ajusta

### **Opção 2: Análise em Lote (Script)**

```bash
cd azimut-cms
npx tsx scripts/analyze-olympic-images-ai.ts
```

Analisa todas as imagens de uma vez e atualiza tudo.

### **Opção 3: Análise Individual (API)**

Chamar API quando necessário:
```javascript
fetch('/api/admin/media/analyze', {
  method: 'POST',
  body: JSON.stringify({ mediaId: '...' })
})
```

---

## 📊 FLUXO COMPLETO

### **1. Adicionar Imagem:**
```
Você adiciona imagem → Backoffice → Análise automática → Tags/Descrições
```

### **2. Visitante Acessa:**
```
Visitante navega → Sistema rastreia → IA analisa interesse → Mostra conteúdo relevante
```

### **3. Curadoria Automática:**
```
Tags detectadas → Filtros aparecem → Seções organizadas → Recomendações personalizadas
```

---

## 🎯 BENEFÍCIOS

### **Para você:**
- ✅ **Sem trabalho manual:** Tags e descrições geradas automaticamente
- ✅ **Consistência:** Todas as imagens analisadas da mesma forma
- ✅ **Escalável:** Funciona para 10 ou 1000 imagens
- ✅ **Inteligente:** IA entende contexto e relevância

### **Para visitantes:**
- ✅ **Conteúdo relevante:** Vê o que interessa
- ✅ **Experiência personalizada:** Site se adapta ao interesse
- ✅ **Descoberta:** Encontra projetos relacionados
- ✅ **Engajamento:** Fica mais tempo, explora mais

---

## 🔧 CONFIGURAÇÃO NECESSÁRIA

### **1. DeepSeek API Key:**
- Acesse: `https://backoffice.azmt.com.br/admin/settings`
- Configure: `DEEPSEEK_API_KEY`
- Ou via variável de ambiente: `DEEPSEEK_API_KEY`

### **2. Verificar se está ativo:**
```bash
# Verificar se API está configurada
cd azimut-cms
grep DEEPSEEK .env
```

---

## 📝 PRÓXIMOS PASSOS

1. **Executar análise inicial:**
   ```bash
   npx tsx scripts/analyze-olympic-images-ai.ts
   ```

2. **Verificar resultados:**
   - Backoffice: `/admin/projects/museu-olimpico-rio`
   - Ver tags criadas
   - Ver descrições melhoradas

3. **Testar recomendação:**
   - Acesse o site
   - Navegue por projetos
   - Veja recomendações personalizadas

---

## ✅ STATUS

- ✅ **Análise de imagens:** Implementado
- ✅ **Detecção de tags:** Implementado
- ✅ **Sistema de recomendação:** Já existia, agora integrado
- ✅ **Geolocalização:** Já existia, funcionando
- ✅ **DeepSeek:** Configurado e ativo

**Sistema completo e pronto para usar!** 🎉

