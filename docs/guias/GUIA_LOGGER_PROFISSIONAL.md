# 📝 GUIA: Sistema de Logger Profissional

**Data:** 20 Janeiro 2026  
**Status:** ✅ Implementado

---

## 🎯 O QUE FOI FEITO

Criamos um sistema de logging profissional que:
- ✅ Mantém logs em desenvolvimento
- ✅ Remove logs em produção automaticamente (via Vite)
- ✅ Erros sempre logados (mesmo em produção)
- ✅ Debug mode via localStorage para emergências
- ✅ Preparado para integração com Sentry/LogRocket

---

## 📦 COMO USAR

### **1. Importar o Logger**

```typescript
import { logger } from '@/utils/logger'
// ou
import logger from '@/utils/logger'
```

### **2. Tipos de Log**

#### **logger.log()** - Logs normais
```typescript
logger.log('Usuário fez login:', userData)
// Só aparece em desenvolvimento ou se debug ativado
```

#### **logger.info()** - Informações importantes
```typescript
logger.info('Formulário enviado com sucesso')
// Só aparece em desenvolvimento ou se debug ativado
```

#### **logger.debug()** - Debug detalhado
```typescript
logger.debug('Estado do componente:', state)
// Só aparece em desenvolvimento
```

#### **logger.warn()** - Avisos
```typescript
logger.warn('API não configurada, usando fallback')
// Aparece em desenvolvimento ou se debug ativado
```

#### **logger.error()** - Erros críticos
```typescript
logger.error(error, { context: 'API call failed', url: '/api/leads' })
// SEMPRE aparece (mesmo em produção)
// Em produção, pode ser enviado para Sentry
```

#### **logger.api.request()** - Logs de API (request)
```typescript
logger.api.request('/api/leads', 'POST', { hasData: true })
// Só em desenvolvimento ou debug
```

#### **logger.api.response()** - Logs de API (response)
```typescript
logger.api.response('/api/leads', 200)
// Só em desenvolvimento ou debug
```

#### **logger.api.error()** - Erros de API
```typescript
logger.api.error('/api/leads', error, { action: 'submitLead' })
// Sempre aparece
```

#### **logger.perf()** - Performance
```typescript
logger.perf('Component render', 150)
// Só em desenvolvimento
```

---

## 🔧 FUNÇÕES AUXILIARES

### **measurePerformance()** - Medir performance
```typescript
import { measurePerformance } from '@/utils/logger'

const endMeasure = measurePerformance('API call')
// ... código ...
endMeasure() // Loga automaticamente o tempo
```

### **logSafe()** - Logar dados sensíveis de forma segura
```typescript
import { logSafe } from '@/utils/logger'

const userData = {
  name: 'João',
  email: 'joao@email.com',
  password: 'senha123', // Será removido
  token: 'abc123' // Será removido
}

logSafe(userData, ['password', 'token', 'apiKey'])
// Output: { name: 'João', email: 'joao@email.com', password: '***REDACTED***', token: '***REDACTED***' }
```

---

## 🚨 DEBUG MODE (Para Emergências)

Se precisar ver logs em produção temporariamente:

### **Ativar:**
```javascript
// No console do navegador (F12):
localStorage.setItem('azimut_debug', 'true')
// Recarregue a página
```

### **Desativar:**
```javascript
// No console do navegador:
localStorage.removeItem('azimut_debug')
// Recarregue a página
```

---

## 📋 MIGRAÇÃO DE LOGS ANTIGOS

### **ANTES:**
```typescript
console.log('User data:', userData)
console.warn('API não configurada')
console.error('Error:', error)
```

### **DEPOIS:**
```typescript
logger.log('User data:', userData)
logger.warn('API não configurada')
logger.error(error, { context: 'User action' })
```

---

## ✅ ARQUIVOS JÁ MIGRADOS

- ✅ `src/services/api.ts` - Todos os logs de API migrados

---

## 📝 PRÓXIMOS ARQUIVOS PARA MIGRAR

### **Alta Prioridade:**
- [ ] `src/services/claude-api.ts`
- [ ] `src/services/deepseek-api.ts`
- [ ] `src/api/chat/claude.ts`
- [ ] `src/api/leads/capture.ts`

### **Média Prioridade:**
- [ ] `src/components/Layout.tsx`
- [ ] `src/hooks/usePersonalization.ts`
- [ ] `src/utils/visitorFingerprint.ts`

### **Baixa Prioridade:**
- [ ] Outros arquivos com console.log

---

## 🎯 REGRAS DE USO

### **1. Use logger.log() para:**
- Informações gerais de debug
- Estados de componentes
- Fluxo de dados

### **2. Use logger.info() para:**
- Ações importantes do usuário
- Sucessos de operações
- Informações relevantes

### **3. Use logger.debug() para:**
- Logs muito detalhados
- Informações técnicas
- Debug profundo

### **4. Use logger.warn() para:**
- Avisos não críticos
- Fallbacks
- Situações recuperáveis

### **5. Use logger.error() para:**
- Erros críticos
- Falhas de API
- Exceções não tratadas

### **6. Use logger.api.* para:**
- Todas as chamadas de API
- Requests e responses
- Erros de API

### **7. Use logger.perf() para:**
- Medições de performance
- Tempos de execução
- Otimizações

---

## 🔒 SEGURANÇA

### **NUNCA faça:**
```typescript
// ❌ ERRADO - Expõe dados sensíveis
logger.log('API Key:', API_KEY)
logger.log('User password:', password)
logger.log('Token:', token)
```

### **SEMPRE faça:**
```typescript
// ✅ CORRETO - Usa logSafe
logSafe({ apiKey: API_KEY, password }, ['apiKey', 'password'])

// ✅ CORRETO - Não loga dados sensíveis
logger.log('API Key configurada:', API_KEY ? 'Sim' : 'Não')
```

---

## 🚀 INTEGRAÇÃO COM SENTRY (Futuro)

Quando quiser integrar com Sentry:

```typescript
// src/utils/logger.ts
import * as Sentry from '@sentry/react'

// No logger.error():
if (isProduction) {
  if (error instanceof Error) {
    Sentry.captureException(error, { extra: context })
  } else {
    Sentry.captureMessage(errorMessage, { level: 'error', extra: context })
  }
}
```

---

## 📊 BENEFÍCIOS

### **Performance:**
- Logs removidos automaticamente em produção
- Menos overhead no bundle final
- Melhor performance

### **Segurança:**
- Dados sensíveis não expostos
- Logs controlados
- Debug mode opcional

### **Profissionalismo:**
- Console limpo em produção
- Logs formatados e organizados
- Fácil de debugar quando necessário

### **Manutenibilidade:**
- Código mais limpo
- Logs consistentes
- Fácil de encontrar problemas

---

## 🎯 PRÓXIMOS PASSOS

1. ✅ Criar logger profissional (FEITO)
2. ✅ Migrar `api.ts` (FEITO)
3. ⏳ Migrar outros arquivos críticos
4. ⏳ Integrar com Sentry (opcional)
5. ⏳ Documentar padrões de uso

---

**Status:** ✅ Sistema implementado e funcionando!  
**Próximo:** Migrar outros arquivos gradualmente
