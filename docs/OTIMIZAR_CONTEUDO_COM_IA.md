# 🤖 Como Otimizar Conteúdo com IA

## 🎯 OBJETIVO

Usar nossa API de análise SEO com IA (Claude/DeepSeek) para otimizar automaticamente projetos e páginas.

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
  "type": "project",
  "targetSearchEngines": ["google", "bing"]
}
```

---

## 📝 EXEMPLO PRÁTICO

### **Exemplo 1: Otimizar um Projeto**

**Conteúdo do projeto:**
```
Projeto de realidade virtual para museu, experiência imersiva com interatividade, 
desenvolvido em Unity, inclui áudio espacial e tracking de movimento. 
Cliente: Museu de Arte Moderna de São Paulo. Ano: 2024.
```

**Chamada da API:**
```bash
curl -X POST https://backoffice.azmt.com.br/api/seo/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Projeto de realidade virtual para museu, experiência imersiva com interatividade, desenvolvido em Unity, inclui áudio espacial e tracking de movimento. Cliente: Museu de Arte Moderna de São Paulo. Ano: 2024.",
    "type": "project",
    "targetSearchEngines": ["google", "bing"]
  }'
```

**Resultado esperado:**
```json
{
  "success": true,
  "analysis": {
    "keywords": [
      "realidade virtual museu",
      "VR experiência imersiva",
      "Unity VR",
      "áudio espacial VR",
      "tracking movimento VR",
      "Museu Arte Moderna SP",
      "experiência interativa museu",
      "VR cultural",
      "tecnologia imersiva",
      "realidade virtual arte"
    ],
    "metaTitle": "VR Museu - Experiência Imersiva Interativa | Azimut",
    "metaDescription": "Projeto de realidade virtual para Museu de Arte Moderna de São Paulo. Experiência imersiva desenvolvida em Unity com áudio espacial e tracking de movimento. 2024.",
    "headings": {
      "h1": "Experiência VR Imersiva para Museu de Arte Moderna SP",
      "h2": [
        "Tecnologia e Desenvolvimento",
        "Recursos de Interatividade",
        "Resultados e Impacto"
      ]
    },
    "altTexts": [
      "Experiência de realidade virtual imersiva no Museu de Arte Moderna de São Paulo com interatividade e áudio espacial",
      "Interface Unity mostrando ambiente VR com tracking de movimento para experiência cultural"
    ],
    "schemaOrg": ["Project", "CreativeWork", "SoftwareApplication"],
    "improvements": [
      "Adicionar mais keywords relacionadas a VR cultural",
      "Incluir Schema.org VideoObject se houver vídeo",
      "Otimizar para mobile-first",
      "Adicionar mais detalhes sobre tecnologias usadas"
    ]
  }
}
```

---

## 🎯 ESTRATÉGIA DE USO

### **1. Análise Inicial (Novos Projetos)**

**Quando criar novo projeto:**
1. Cole o conteúdo do projeto
2. Chame a API
3. Use as sugestões da IA
4. Salve no banco de dados

**Exemplo:**
```typescript
// No backoffice, ao criar projeto:
const analysis = await fetch('https://backoffice.azmt.com.br/api/seo/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    content: project.description,
    type: 'project',
    targetSearchEngines: ['google', 'bing']
  })
})

const { analysis } = await analysis.json()

// Usar:
project.metaTitle = analysis.metaTitle
project.metaDescription = analysis.metaDescription
project.keywords = analysis.keywords.join(', ')
```

---

### **2. Otimização Contínua (Projetos Existentes)**

**Re-analise projetos antigos mensalmente:**
1. Pegue projetos com pouco tráfego
2. Analise com IA
3. Compare com top 10 do Google
4. Ajuste baseado em dados reais

---

### **3. Análise de Competição**

**Use IA para analisar competidores:**
1. Pegue top 10 resultados do Google
2. Analise com IA
3. Identifique gaps de conteúdo
4. Sugira melhorias

---

## 🔧 INTEGRAÇÃO NO BACKOFFICE (Futuro)

**Podemos adicionar:**
- Botão "Otimizar SEO com IA" em cada projeto
- Análise automática ao salvar projeto
- Sugestões em tempo real enquanto você digita
- Dashboard de SEO com métricas

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

### **Para Novos Projetos:**
- [ ] Criar projeto no backoffice
- [ ] Chamar API de análise SEO
- [ ] Usar sugestões da IA
- [ ] Salvar projeto otimizado

### **Para Projetos Existentes:**
- [ ] Selecionar projetos com pouco tráfego
- [ ] Analisar com IA
- [ ] Comparar com competidores
- [ ] Ajustar conteúdo

---

## 🚀 COMEÇAR AGORA

**Teste a API:**

1. Pegue um projeto existente
2. Cole o conteúdo aqui
3. Eu chamo a API e te mostro as sugestões
4. Você aplica as melhorias

**Ou:**

1. Acesse o backoffice
2. Crie um novo projeto
3. Use a API para otimizar
4. Salve o projeto

---

## 💡 DICAS

**Para melhores resultados:**
- Seja específico no conteúdo
- Inclua detalhes (tecnologias, clientes, anos)
- Especifique tipo (project, page, blog)
- Especifique buscadores (google, bing)

---

## 📚 RECURSOS

- **API Endpoint:** `https://backoffice.azmt.com.br/api/seo/analyze`
- **Documentação:** `docs/COMO_USAR_IA_PARA_SEO.md`
- **Claude API:** https://docs.anthropic.com
- **DeepSeek API:** https://platform.deepseek.com/docs

---

## 🎯 PRÓXIMOS PASSOS

1. **Testar API** com projetos reais
2. **Integrar no backoffice** (botão "Otimizar SEO")
3. **Análise automática** ao salvar projeto
4. **Dashboard de SEO** com métricas

---

## 🚀 COMEÇAR AGORA

**Quer testar?**
- Me envie o conteúdo de um projeto
- Eu chamo a API e te mostro as sugestões
- Você aplica as melhorias

Ou prefere que eu integre no backoffice primeiro? 🎉
