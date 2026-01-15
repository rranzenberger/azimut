# 🎯 GUIA: Dashboard de Leads Integrado ao Backoffice

## ✅ O QUE FOI CRIADO:

### 1. **Componente LeadsDashboard** (`src/components/LeadsDashboard.tsx`)
- Dashboard completo para visualizar todos os leads
- Filtros por temperatura (hot/warm/cold)
- Busca por texto
- Ordenação por score ou data
- Exportação CSV/JSON
- Modal de detalhes do lead
- Visual premium

---

## 🔧 INTEGRAÇÃO COM BACKOFFICE:

### **Endpoint Necessário no Backoffice:**

O dashboard espera um endpoint GET em:
```
GET /api/leads
```

**Resposta esperada:**
```json
[
  {
    "id": "lead-123",
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "+5511999999999",
    "company": "Museu de Arte",
    "position": "Diretor",
    "projectType": "Instalação Imersiva",
    "budget": "R$ 100.000 - R$ 500.000",
    "timeline": "3-6 meses",
    "description": "Queremos criar uma instalação...",
    "visitorFingerprint": "fingerprint-abc123",
    "sessionId": "session-xyz789",
    "createdAt": "2026-01-15T10:30:00Z",
    "source": {
      "url": "https://azmt.com.br/pt/contact",
      "referrer": "https://google.com",
      "utm_source": "google",
      "utm_medium": "cpc",
      "utm_campaign": "academy-2026"
    }
  }
]
```

---

## 📊 ENDPOINT DE LEAD SCORING:

O dashboard calcula o score automaticamente, mas você pode criar um endpoint no backoffice para calcular scores mais precisos:

```
POST /api/leads/score
Body: { "visitorFingerprint": "fingerprint-abc123" }
```

**Resposta esperada:**
```json
{
  "score": 85,
  "level": "hot",
  "factors": {
    "pagesVisited": 12,
    "timeSpent": 1800,
    "videosWatched": 3,
    "formsStarted": 2,
    "formsCompleted": 1,
    "scrollDepth": 95,
    "ctaClicks": 5
  }
}
```

---

## 🚀 COMO USAR NO BACKOFFICE:

### **Opção 1: Página Dedicada no Backoffice**

Criar uma página `/admin/leads` no backoffice e importar o componente:

```tsx
import LeadsDashboard from '@/components/LeadsDashboard'

export default function LeadsAdminPage() {
  return (
    <div className="container mx-auto p-6">
      <LeadsDashboard 
        lang="pt"
        apiUrl="https://backoffice.azmt.com.br"
      />
    </div>
  )
}
```

### **Opção 2: Iframe no Backoffice**

Se o backoffice for Next.js ou outro framework, você pode usar um iframe:

```html
<iframe 
  src="https://azmt.com.br/admin/leads-dashboard"
  width="100%" 
  height="800px"
  frameborder="0"
></iframe>
```

### **Opção 3: Rota no Site Principal**

Adicionar rota protegida no site principal:

```tsx
// src/App.tsx
import LeadsDashboard from './components/LeadsDashboard'

// Rota protegida (adicionar autenticação)
<Route 
  path="/admin/leads" 
  element={
    <ProtectedRoute>
      <LeadsDashboard lang="pt" />
    </ProtectedRoute>
  } 
/>
```

---

## 🔐 AUTENTICAÇÃO:

Para proteger o dashboard, você pode:

1. **Usar autenticação do backoffice:**
   - Passar token JWT via headers
   - Validar no endpoint `/api/leads`

2. **Criar rota protegida no site:**
   - Verificar sessão do backoffice
   - Redirecionar para login se não autenticado

---

## 📈 FUNCIONALIDADES:

### **Filtros:**
- **Todos** - Mostra todos os leads
- **Quentes** - Score ≥ 70
- **Mornos** - Score 40-69
- **Frios** - Score < 40

### **Busca:**
- Por nome, email, empresa ou tipo de projeto

### **Ordenação:**
- Por score (maior primeiro)
- Por data (mais recente primeiro)

### **Exportação:**
- CSV - Para Excel/Google Sheets
- JSON - Para integrações

### **Detalhes:**
- Clique em qualquer lead para ver detalhes completos
- Score detalhado com fatores
- Informações de contato
- Histórico de interações

---

## 🎨 CUSTOMIZAÇÃO:

O dashboard usa as classes CSS do site Azimut:
- `card-adaptive` - Cards adaptativos ao tema
- `dropdown-azimut` - Dropdowns no estilo Azimut
- `input-adaptive` - Inputs adaptativos
- Cores do tema (dark/light)

---

## 📝 PRÓXIMOS PASSOS:

1. **Criar endpoint `/api/leads` no backoffice**
2. **Adicionar autenticação**
3. **Criar página no backoffice** (`/admin/leads`)
4. **Testar integração**
5. **Adicionar notificações** (email quando lead quente)

---

## ✅ STATUS:

- ✅ Componente criado
- ✅ Visual premium implementado
- ✅ Filtros e busca funcionando
- ✅ Exportação CSV/JSON
- ⏳ Aguardando endpoint no backoffice
- ⏳ Aguardando integração no backoffice

---

**Pronto para usar assim que o endpoint estiver disponível!** 🚀
