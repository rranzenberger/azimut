# 🤖 Como Usar IA (Claude/DeepSeek) para Otimizar SEO

## 🎯 RESUMO

Use nossa API de análise SEO com IA para otimizar automaticamente:
- ✅ Keywords relevantes
- ✅ Meta titles e descriptions
- ✅ Headings (H1, H2, H3)
- ✅ Alt texts para imagens
- ✅ Schema.org recomendado
- ✅ Melhorias específicas por buscador

---

## 🚀 COMO USAR A API

### **Endpoint:**
```
POST https://backoffice.azmt.com.br/api/seo/analyze
```

### **Headers:**
```json
{
  "Content-Type": "application/json"
}
```

### **Body:**
```json
{
  "content": "Texto do projeto ou página que você quer otimizar",
  "type": "project", // ou "page", "blog", etc.
  "targetSearchEngines": ["google", "bing"] // opcional, padrão: ["google", "bing"]
}
```

### **Resposta:**
```json
{
  "success": true,
  "analysis": {
    "keywords": ["VR", "realidade virtual", "experiências imersivas", ...],
    "metaTitle": "Título otimizado (50-60 caracteres)",
    "metaDescription": "Descrição otimizada (150-160 caracteres)",
    "headings": {
      "h1": "Título principal otimizado",
      "h2": ["Subtítulo 1", "Subtítulo 2"],
      "h3": ["Sub-subtítulo 1", "Sub-subtítulo 2"]
    },
    "altTexts": [
      "Descrição otimizada para imagem 1",
      "Descrição otimizada para imagem 2"
    ],
    "schemaOrg": ["Project", "CreativeWork", "VideoObject"],
    "improvements": [
      "Adicionar mais keywords relacionadas a VR",
      "Otimizar para mobile-first",
      "Adicionar Schema.org VideoObject"
    ],
    "competitorAnalysis": "Sugestões baseadas em melhores práticas",
    "searchEngines": {
      "google": "Otimizações específicas para Google",
      "bing": "Otimizações específicas para Bing"
    }
  },
  "searchEngines": ["google", "bing"],
  "timestamp": "2026-01-27T..."
}
```

---

## 📝 EXEMPLOS PRÁTICOS

### **Exemplo 1: Otimizar um Projeto**

```bash
curl -X POST https://backoffice.azmt.com.br/api/seo/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Projeto de realidade virtual para museu, experiência imersiva com interatividade, desenvolvido em Unity, inclui áudio espacial e tracking de movimento.",
    "type": "project",
    "targetSearchEngines": ["google", "bing", "yandex"]
  }'
```

**Resultado esperado:**
- Keywords: ["realidade virtual", "VR museu", "experiência imersiva", "Unity VR", ...]
- Meta Title: "VR Museu - Experiência Imersiva Interativa | Azimut"
- Meta Description: "Projeto de realidade virtual para museu com experiência imersiva, desenvolvido em Unity. Inclui áudio espacial e tracking de movimento."
- Schema.org: ["Project", "CreativeWork", "SoftwareApplication"]

---

### **Exemplo 2: Otimizar Página de Serviço**

```bash
curl -X POST https://backoffice.azmt.com.br/api/seo/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Serviços de desenvolvimento de experiências imersivas em VR e AR para empresas, eventos e espaços culturais. Atuamos entre Brasil e Canadá.",
    "type": "page",
    "targetSearchEngines": ["google", "bing"]
  }'
```

---

### **Exemplo 3: Usar no Backoffice (Interface Admin)**

**No futuro, podemos adicionar:**
- Botão "Otimizar SEO com IA" em cada projeto
- Análise automática ao salvar projeto
- Sugestões em tempo real enquanto você digita

---

## 🎯 ESTRATÉGIA DE USO

### **1. Análise Inicial (Novos Projetos)**
- Use IA para gerar keywords, títulos e descrições
- Revise e ajuste manualmente
- Salve no banco de dados

### **2. Otimização Contínua (Projetos Existentes)**
- Re-analise projetos antigos mensalmente
- Compare com top 10 do Google
- Ajuste baseado em dados reais

### **3. Análise de Competição**
- Use IA para analisar competidores
- Identifique gaps de conteúdo
- Sugira melhorias

---

## 💡 DICAS DE PROMPT

### **Para Melhores Resultados:**

1. **Seja específico no conteúdo:**
   - ✅ "Projeto VR para museu com Unity, áudio espacial, tracking de movimento"
   - ❌ "Projeto legal de VR"

2. **Especifique tipo:**
   - ✅ `"type": "project"`
   - ✅ `"type": "page"`
   - ✅ `"type": "blog"`

3. **Especifique buscadores:**
   - ✅ `"targetSearchEngines": ["google", "bing"]`
   - ✅ `"targetSearchEngines": ["google", "bing", "yandex"]`

---

## 🔧 INTEGRAÇÃO NO CÓDIGO

### **TypeScript/JavaScript:**

```typescript
async function optimizeSEO(content: string, type: string) {
  const response = await fetch('https://backoffice.azmt.com.br/api/seo/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      type,
      targetSearchEngines: ['google', 'bing'],
    }),
  })

  const data = await response.json()
  return data.analysis
}

// Usar:
const analysis = await optimizeSEO(
  'Projeto VR para museu...',
  'project'
)

console.log('Keywords:', analysis.keywords)
console.log('Meta Title:', analysis.metaTitle)
console.log('Meta Description:', analysis.metaDescription)
```

---

## 📊 CUSTO ESTIMADO

**Por análise:**
- Claude Sonnet: ~$0.003-0.009 (3-9 centavos)
- DeepSeek: ~$0.0003-0.0009 (0.3-0.9 centavos)

**Cenário: 100 projetos, análise mensal:**
- Claude: ~$0.30-0.90/mês
- DeepSeek: ~$0.03-0.09/mês

**Recomendação:** Use Claude para análises importantes, DeepSeek para volume alto.

---

## ✅ CHECKLIST

- [ ] API criada: `/api/seo/analyze`
- [ ] Testar com exemplo de projeto
- [ ] Integrar no backoffice (futuro)
- [ ] Documentar uso
- [ ] Monitorar custos

---

## 🚀 PRÓXIMOS PASSOS

1. **Testar API** com projetos reais
2. **Integrar no backoffice** (botão "Otimizar SEO")
3. **Análise automática** ao salvar projeto
4. **Dashboard de SEO** com métricas

---

## 📚 RECURSOS

- **API Endpoint:** `https://backoffice.azmt.com.br/api/seo/analyze`
- **Documentação:** `docs/ESTRATEGIA_MULTI_BUSCADORES.md`
- **Claude API:** https://docs.anthropic.com
- **DeepSeek API:** https://platform.deepseek.com/docs
