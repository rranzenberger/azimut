# 📊 COMO EDITAR O NÚMERO "46" - TIMELINE DINÂMICA

**Data:** 2026-01-20  
**Status:** ✅ Implementado - Número agora é **dinâmico**

---

## 🎯 **O QUE FOI FEITO:**

### **1. Número "46" agora é DINÂMICO** ✅

O número "46" que aparece na página `/studio/credibilidade` agora é **calculado automaticamente** a partir dos dados da timeline histórica.

**Como funciona:**
- Busca o **ano mais antigo** da timeline (`CompanyHistory`)
- Calcula: `Ano Atual - Ano Mais Antigo = Anos de Inovação`
- Se não houver dados, usa **fallback 46**

**Onde aparece:**
- Hero: "**46** ANOS DE INOVAÇÃO" (número grande)
- Subtitle: "**46** anos transformando ideias..."
- Timeline subtitle: "Explore **46** anos de história..."

---

## ✏️ **COMO EDITAR O NÚMERO:**

### **Opção 1: Editar via Backoffice (Recomendado)** 🎯

1. Acesse o **Backoffice**: `https://backoffice.azmt.com.br`
2. Vá em **"Company History"** ou **"História da Empresa"**
3. Adicione/edite eventos históricos:
   - **Para aumentar o número**: Adicione eventos com anos mais antigos (ex: 1978, 1975)
   - **Para diminuir**: Remova eventos antigos ou ajuste o ano do evento mais antigo
4. O número será **atualizado automaticamente** na página

**Exemplo:**
- Se adicionar um evento de **1980**, o número será: `2026 - 1980 = 46 anos` ✅
- Se adicionar um evento de **1975**, o número será: `2026 - 1975 = 51 anos` ✅

---

### **Opção 2: Editar Diretamente no Código (Fallback)** 🔧

Se quiser mudar o **fallback padrão** (quando não há dados da API):

**Arquivo:** `src/pages/StudioCredentials.tsx`

**Linha ~23:**
```typescript
const [yearsOfInnovation, setYearsOfInnovation] = useState<number>(46) // ← Mude aqui
```

**Exemplo:**
```typescript
const [yearsOfInnovation, setYearsOfInnovation] = useState<number>(50) // Fallback 50
```

---

### **Opção 3: Editar Conteúdo Hardcoded (Não Recomendado)** ⚠️

Se quiser forçar um número específico **sempre** (ignorando cálculo dinâmico):

**Arquivo:** `src/pages/StudioCredentials.tsx`

**Linhas ~27-31 (PT), ~155-159 (EN), etc:**
```typescript
subtitle: '46 anos transformando ideias em experiências imersivas', // ← Mude aqui
hero: {
  bigNumber: '46', // ← E aqui
  bigNumberLabel: 'anos de inovação',
}
```

**⚠️ ATENÇÃO:** Isso só funciona se você **desabilitar** o cálculo dinâmico (remover o `useEffect`).

---

## 🔍 **VERIFICAR SE ESTÁ FUNCIONANDO:**

### **1. Console do Navegador (F12):**
- Abra: `https://azmt.com.br/pt/studio/credibilidade`
- Pressione **F12** → Aba **Console**
- Procure por: `[StudioCredentials] Não foi possível calcular anos dinamicamente`
  - Se aparecer: API não está respondendo (verificar backoffice)
  - Se não aparecer: Está funcionando! ✅

### **2. Testar API Diretamente:**
Abra no navegador:
```
https://backoffice.azmt.com.br/api/public/history?lang=pt
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "year": 1980,
      "title": "Primeiros Passos em Computação",
      ...
    },
    ...
  ],
  "stats": {
    "yearRange": {
      "start": 1980,
      "end": 2026
    }
  }
}
```

**Se retornar 404:**
- Verificar se o backoffice está rodando
- Verificar se a rota `/api/public/history` existe
- Verificar se há dados na tabela `CompanyHistory`

---

## 🐛 **PROBLEMA: TIMELINE NÃO APARECE (Erro 404)**

### **Sintomas:**
- Mensagem: "Erro ao carregar timeline"
- Console: `Failed to fetch company history`
- API retorna: `404 Not Found`

### **Soluções:**

#### **1. Verificar se a API existe:**
```bash
# No backoffice (azimut-cms)
ls azimut-cms/app/api/public/history/route.ts
```

#### **2. Verificar se há dados no banco:**
```sql
-- No banco Neon/Vercel
SELECT COUNT(*) FROM "CompanyHistory" WHERE "isPublished" = true;
```

Se retornar `0`, execute:
```sql
-- Executar o SQL de população
\i sql/populate_company_history_complete.sql
```

#### **3. Verificar variáveis de ambiente:**
No frontend (`.env`):
```env
VITE_BACKOFFICE_URL=https://backoffice.azmt.com.br
```

---

## 📝 **RESUMO:**

| Item | Status | Como Editar |
|------|--------|-------------|
| **Número "46"** | ✅ Dinâmico | Via Backoffice (adicionar eventos antigos) |
| **Timeline** | ⚠️ Depende da API | Popular banco com SQL |
| **Fallback** | ✅ 46 (hardcoded) | Editar `useState(46)` em `StudioCredentials.tsx` |

---

## 🎯 **PRÓXIMOS PASSOS:**

1. ✅ Número "46" agora é dinâmico
2. ⏳ Popular banco com dados históricos (executar SQL)
3. ⏳ Verificar se API `/api/public/history` está funcionando
4. ⏳ Testar timeline na página

---

## 📚 **ARQUIVOS RELACIONADOS:**

- `src/pages/StudioCredentials.tsx` - Página principal (número dinâmico)
- `src/components/CompanyTimeline.tsx` - Componente da timeline
- `azimut-cms/app/api/public/history/route.ts` - API endpoint
- `sql/populate_company_history_complete.sql` - Dados históricos
