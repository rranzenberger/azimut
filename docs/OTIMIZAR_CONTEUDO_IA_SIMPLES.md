# 🤖 Otimizar Conteúdo com IA - Guia Simples

## ✅ O QUE FOI CRIADO

1. **API de Otimização:** `/api/admin/projects/optimize-seo`
2. **Script Automatizado:** `azimut-cms/scripts/otimizar-projetos-seo.ts`

---

## 🚀 COMO USAR

### **Opção 1: Via API (Recomendado)**

**Endpoint:**
```
POST https://backoffice.azmt.com.br/api/admin/projects/optimize-seo
```

**Body:**
```json
{
  "projectId": "id-do-projeto",
  "lang": "pt"
}
```

**Resposta:**
```json
{
  "success": true,
  "analysis": {
    "keywords": ["palavra-chave 1", "palavra-chave 2", ...],
    "metaTitle": "Título otimizado",
    "metaDescription": "Descrição otimizada",
    "headings": { "h1": "...", "h2": [...] },
    "improvements": ["Melhoria 1", "Melhoria 2", ...]
  }
}
```

---

### **Opção 2: Script Automatizado**

**Executar:**
```bash
cd azimut-cms
npx tsx scripts/otimizar-projetos-seo.ts
```

**O que faz:**
- Busca 10 projetos publicados
- Otimiza cada um com IA
- Mostra sugestões no console

---

## 📋 O QUE A IA OTIMIZA

Para cada projeto, a IA sugere:

1. **Keywords** (10-15 palavras-chave relevantes)
2. **Meta Title** (50-60 caracteres)
3. **Meta Description** (150-160 caracteres)
4. **Headings** (H1, H2, H3 otimizados)
5. **Alt Texts** (sugestões para imagens)
6. **Schema.org** (tipos recomendados)
7. **Melhorias** (sugestões específicas)

---

## 🎯 PRÓXIMOS PASSOS

### **1. Integrar no Backoffice (Futuro)**

Adicionar botão "Otimizar SEO com IA" em cada projeto:
- Ao clicar, chama a API
- Mostra sugestões
- Permite salvar

### **2. Otimizar em Lote**

Executar o script para otimizar todos os projetos:
- Modificar script para salvar sugestões
- Aplicar automaticamente ou revisar manualmente

---

## 💡 DICA

**Use quando:**
- ✅ Criar novo projeto
- ✅ Atualizar projeto existente
- ✅ Melhorar SEO de projetos antigos

**Custo:**
- ~$0.003-0.009 por análise (Claude)
- Muito barato para o valor que agrega!

---

## ✅ PRONTO!

Agora você pode otimizar qualquer projeto com IA! 🎉
