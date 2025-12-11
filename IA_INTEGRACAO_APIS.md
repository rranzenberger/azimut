# 🤖 INTEGRAÇÃO DE IA - APIs e Implementação

## 🎯 Objetivo: Azimut Assistant (Chat Inteligente)

### **Funcionalidades Desejadas:**
- ✅ Orientação de clientes (como ChatGPT/Gemini)
- ✅ Recomendações baseadas em histórico (como seu sistema de 1994)
- ✅ Conversão de pedidos confusos → escopos claros
- ✅ Ajuda em orçamentos
- ✅ Triagem técnica
- ✅ Explicação pedagógica (Academy)

---

## 🔌 **APIS DE IA DISPONÍVEIS (2025)**

### **1. DeepSeek (Recomendado - Open Source Friendly)**

#### **Por que DeepSeek:**
- ✅ **Open Source friendly** (modelos abertos)
- ✅ **Gratuito** para uso básico
- ✅ **API simples** (similar OpenAI)
- ✅ **Bom para português**
- ✅ **Custo baixo** (muito mais barato que GPT-4)

#### **Como usar:**
```typescript
// Instalar: npm install openai (usa mesmo SDK do OpenAI)

import OpenAI from 'openai'

const deepseek = new OpenAI({
  apiKey: process.env.VITE_DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1'
})

async function askAzimutAssistant(question: string, context: UserContext) {
  const response = await deepseek.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      {
        role: 'system',
        content: `Você é o Azimut Assistant, um assistente especializado em experiências imersivas, VR/XR, museus e tecnologia.
        
        Seu papel:
        - Orientar clientes sobre projetos Azimut
        - Recomendar serviços baseado em necessidades
        - Explicar tecnologias (VR, XR, IA) de forma simples
        - Ajudar com orçamentos e escopos
        - Conduzir para soluções adequadas
        
        Contexto do usuário:
        - Interesses: ${context.interests.join(', ')}
        - Projetos vistos: ${context.viewedProjects.join(', ')}
        - Localização: ${context.location}
        - Idioma: ${context.lang}
        
        Seja amigável, técnico quando necessário, e sempre conduza para uma solução Azimut.`
      },
      {
        role: 'user',
        content: question
      }
    ],
    temperature: 0.7,
    max_tokens: 500
  })
  
  return response.choices[0].message.content
}
```

#### **Custo:**
- **Gratuito**: 1M tokens/mês
- **Pago**: $0.14 por 1M tokens (input) + $0.28 por 1M tokens (output)
- **Muito mais barato** que GPT-4 ($30/1M tokens)

#### **Limites:**
- Rate limit: 50 requests/minuto (gratuito)
- Modelo: `deepseek-chat` (equivalente GPT-3.5)

---

### **2. OpenAI (GPT-4/GPT-3.5)**

#### **Quando usar:**
- ✅ Precisa de melhor qualidade (GPT-4)
- ✅ Orçamento maior
- ✅ Funcionalidades avançadas (function calling)

#### **Como usar:**
```typescript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY
})

async function askAzimutAssistant(question: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview', // ou 'gpt-3.5-turbo' (mais barato)
    messages: [
      {
        role: 'system',
        content: 'Você é o Azimut Assistant...'
      },
      {
        role: 'user',
        content: question
      }
    ]
  })
  
  return response.choices[0].message.content
}
```

#### **Custo:**
- GPT-4 Turbo: $10/1M tokens (input) + $30/1M tokens (output)
- GPT-3.5 Turbo: $0.50/1M tokens (input) + $1.50/1M tokens (output)

---

### **3. Google Gemini (Gratuito - Bom para Português)**

#### **Quando usar:**
- ✅ Gratuito para começar
- ✅ Excelente para português
- ✅ Multimodal (texto + imagens)

#### **Como usar:**
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY)

async function askAzimutAssistant(question: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  
  const prompt = `Você é o Azimut Assistant...\n\nPergunta: ${question}`
  
  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text()
}
```

#### **Custo:**
- **Gratuito**: 60 requests/minuto
- **Pago**: $0.00025/1K tokens (muito barato!)

---

### **4. Anthropic Claude (Melhor Qualidade)**

#### **Quando usar:**
- ✅ Precisa de melhor qualidade que GPT-4
- ✅ Contexto longo (até 200K tokens)
- ✅ Orçamento maior

#### **Custo:**
- Claude 3 Opus: $15/1M tokens (input) + $75/1M tokens (output)
- Claude 3 Sonnet: $3/1M tokens (input) + $15/1M tokens (output)

---

## 🎯 **RECOMENDAÇÃO PARA AZIMUT:**

### **Fase 1: Começar com DeepSeek (Gratuito)**
```
✅ API simples
✅ Gratuito para começar
✅ Bom para português
✅ Custo baixo quando crescer
✅ Open source friendly
```

### **Fase 2: Se precisar melhor qualidade → Gemini Pro**
```
✅ Ainda gratuito (60 req/min)
✅ Excelente para português
✅ Multimodal (futuro: imagens)
```

### **Fase 3: Se precisar máximo → GPT-4 ou Claude**
```
✅ Melhor qualidade
✅ Function calling avançado
✅ Custo maior
```

---

## 🚀 **IMPLEMENTAÇÃO SUGERIDA**

### **1. Criar Azimut Assistant Component**

```tsx
// src/components/AzimutAssistant.tsx

import React, { useState } from 'react'
import { askAzimutAssistant } from '../api/ai'

const AzimutAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSend = async () => {
    if (!input.trim()) return
    
    // Adicionar mensagem do usuário
    setMessages([...messages, { role: 'user', content: input }])
    setInput('')
    setIsLoading(true)
    
    // Buscar contexto do usuário (cookies, histórico)
    const context = getUserContext()
    
    // Chamar IA
    const response = await askAzimutAssistant(input, context)
    
    // Adicionar resposta
    setMessages(prev => [...prev, { role: 'assistant', content: response }])
    setIsLoading(false)
  }
  
  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-slate-900 rounded-2xl shadow-2xl border border-white/10">
      {/* Chat interface */}
    </div>
  )
}
```

### **2. Sistema de Recomendação Baseado em Histórico**

```typescript
// src/utils/recommendationEngine.ts

interface UserHistory {
  viewedProjects: string[]
  timeSpent: { [project: string]: number }
  clickedServices: string[]
  tags: string[]
}

/**
 * Similar ao seu sistema de 1994 (locadora de filmes)
 * Recomenda projetos baseado no que o usuário já viu
 */
export function getRecommendationsFromHistory(
  history: UserHistory,
  allProjects: CaseItem[]
): CaseItem[] {
  // Projetos similares aos que ele viu
  const viewed = allProjects.filter(p => history.viewedProjects.includes(p.slug))
  
  // Extrair tags dos projetos vistos
  const userTags = new Set<string>()
  viewed.forEach(p => p.tags.forEach(tag => userTags.add(tag)))
  
  // Encontrar projetos com tags similares
  const scored = allProjects
    .filter(p => !history.viewedProjects.includes(p.slug)) // Não mostrar o que já viu
    .map(project => {
      let score = 0
      
      // Tags em comum
      project.tags.forEach(tag => {
        if (userTags.has(tag)) score += 2
      })
      
      // Serviços em comum
      viewed.forEach(v => {
        const commonServices = project.services.filter(s => v.services.includes(s))
        score += commonServices.length
      })
      
      // Categoria similar
      const similarCategory = viewed.some(v => v.category === project.category)
      if (similarCategory) score += 1
      
      return { project, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => s.project)
  
  return scored
}
```

### **3. Conversão de Pedidos Confusos → Escopos Claros**

```typescript
// src/api/ai.ts

/**
 * Usa IA para converter pedido confuso em escopo claro
 * Exemplo: "Quero algo legal para meu museu" → Escopo técnico detalhado
 */
export async function clarifyProjectRequest(
  userRequest: string,
  context: UserProfile
): Promise<{
  scope: string
  services: string[]
  estimatedBudget: string
  timeline: string
  deliverables: string[]
}> {
  const prompt = `
Você é um especialista em projetos imersivos. Converta este pedido confuso em um escopo técnico claro:

Pedido do cliente: "${userRequest}"

Contexto:
- Orçamento: ${context.budget}
- Localização: ${context.location}
- Prazo: ${context.deadline}
- Necessidades: ${context.needs.join(', ')}

Retorne um JSON com:
{
  "scope": "Descrição técnica clara do projeto",
  "services": ["VR/XR", "Museografia", ...],
  "estimatedBudget": "R$ 50k - R$ 200k",
  "timeline": "6-12 meses",
  "deliverables": ["Instalação imersiva", "Conteúdo VR", ...]
}
`

  const response = await askAzimutAssistant(prompt, context)
  return JSON.parse(response)
}
```

---

## 📊 **COMPARAÇÃO DE APIs**

| API | Custo | Qualidade | Português | Recomendação |
|-----|-------|-----------|-----------|--------------|
| **DeepSeek** | Gratuito → $0.14/1M | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ **COMEÇAR AQUI** |
| **Gemini** | Gratuito → $0.00025/1K | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ **SEGUNDA OPÇÃO** |
| **GPT-3.5** | $0.50/1M | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⚠️ Se DeepSeek não funcionar |
| **GPT-4** | $10/1M | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⚠️ Se precisar máximo |
| **Claude** | $3-15/1M | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⚠️ Se precisar máximo |

---

## 🔧 **SETUP RÁPIDO (DeepSeek)**

### **1. Obter API Key:**
1. Acessar: https://platform.deepseek.com
2. Criar conta (gratuito)
3. Gerar API key

### **2. Instalar SDK:**
```bash
npm install openai
```

### **3. Criar arquivo de API:**
```typescript
// src/api/ai.ts
import OpenAI from 'openai'

const deepseek = new OpenAI({
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1'
})

export async function askAzimutAssistant(question: string, context: any) {
  // Implementação acima
}
```

### **4. Adicionar variável de ambiente:**
```env
# .env.local
VITE_DEEPSEEK_API_KEY=sk-...
```

---

## 🎯 **PRÓXIMOS PASSOS:**

1. ✅ Budget Wizard criado e integrado
2. ⏳ Criar componente Azimut Assistant (chat)
3. ⏳ Integrar DeepSeek API
4. ⏳ Sistema de recomendação baseado em histórico
5. ⏳ Conversão de pedidos confusos → escopos claros

---

**Última atualização:** Dezembro 2025












