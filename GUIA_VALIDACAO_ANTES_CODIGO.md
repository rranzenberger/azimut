# 🛡️ GUIA DE VALIDAÇÃO ANTES DE ESCREVER CÓDIGO

**Objetivo:** Evitar erros básicos de TypeScript, Prisma e APIs

---

## ✅ CHECKLIST OBRIGATÓRIO ANTES DE COMMITAR

### 1. Verificar Schema do Prisma
- [ ] **Ler o schema completo** do modelo que vou usar
- [ ] **Verificar nomes exatos** das propriedades (case-sensitive)
- [ ] **Verificar tipos** (String, Int, Boolean, DateTime, etc)
- [ ] **Verificar nullable** (`?` = opcional, sem `?` = obrigatório)
- [ ] **Verificar enums** (valores exatos: `DRAFT`, `PUBLISHED`, `ABERTO`, etc)
- [ ] **Verificar relações** (hasMany, belongsTo, etc)

**Comando útil:**
```bash
cat azimut-cms/prisma/schema.prisma | grep -A 20 "model NomeDoModelo"
```

### 2. Verificar APIs Existentes
- [ ] **Procurar APIs similares** que já usam o mesmo modelo
- [ ] **Copiar padrão** de formatação de resposta
- [ ] **Usar mesmos nomes** de propriedades
- [ ] **Seguir mesma estrutura** de include/select

**Exemplo:** Se vou usar `Project`, ver como `/api/public/content/route.ts` formata projetos.

### 3. Verificar Tipos TypeScript
- [ ] **Não usar `any`** sem necessidade
- [ ] **Tratar nullable** com `|| null` ou `?.`
- [ ] **Usar tipos do Prisma** quando possível
- [ ] **Testar localmente** antes de commitar

**Comando útil:**
```bash
cd azimut-cms && npx tsc --noEmit
```

### 4. Verificar Campos Vazios/Nulos
- [ ] **Sempre ter fallback** para campos nullable
- [ ] **Usar valores padrão** quando apropriado
- [ ] **Validar antes de usar** em operações críticas
- [ ] **Popular campos obrigatórios** se necessário

### 5. Verificar Enums
- [ ] **Ler enum completo** no schema
- [ ] **Usar valores exatos** (case-sensitive)
- [ ] **Não inventar valores** que não existem

**Exemplo:**
- ❌ `status: 'ACTIVE'` (não existe)
- ✅ `status: 'PUBLISHED'` (correto)

### 6. Verificar Relações do Prisma
- [ ] **Verificar se relação existe** antes de usar `include`
- [ ] **Verificar nome exato** da relação
- [ ] **Verificar se é array** (hasMany) ou objeto (belongsTo)

**Exemplo:**
- ❌ `include: { tags: true }` em Service (não existe)
- ✅ Usar `service.segments` (array de strings)

### 7. Testar Build Local
- [ ] **Rodar `npm run build`** antes de commitar
- [ ] **Verificar erros TypeScript** (`npx tsc --noEmit`)
- [ ] **Verificar erros de lint** (se houver)
- [ ] **Testar API localmente** se possível

---

## 🔍 PADRÕES COMUNS DE ERRO

### Erro 1: Propriedade não existe
**Sintoma:** `Property 'X' does not exist on type 'Y'`  
**Causa:** Nome errado ou propriedade não existe no modelo  
**Solução:** Verificar schema do Prisma

### Erro 2: Enum incorreto
**Sintoma:** `Type '"X"' is not assignable to type 'Enum'`  
**Causa:** Valor do enum não existe  
**Solução:** Verificar enum completo no schema

### Erro 3: Nullable não tratado
**Sintoma:** `Type 'null' is not assignable to type 'string'`  
**Causa:** Campo pode ser null mas código espera string  
**Solução:** Adicionar `|| ''` ou `|| null` ou `?.`

### Erro 4: Relação não existe
**Sintoma:** `Unknown arg 'X' in include`  
**Causa:** Tentando incluir relação que não existe  
**Solução:** Verificar relações no schema

### Erro 5: Formato inconsistente
**Sintoma:** Frontend espera formato diferente  
**Causa:** API retorna formato diferente de outras APIs  
**Solução:** Comparar com APIs existentes e seguir padrão

---

## 📋 TEMPLATE DE VALIDAÇÃO

Antes de criar uma nova API ou componente:

```markdown
### Validação para [Nome da Feature]

1. **Schema Prisma:**
   - Modelo: `ModelName`
   - Propriedades usadas: `prop1`, `prop2`, `prop3`
   - Enums: `StatusEnum` → valores: `VAL1`, `VAL2`
   - Relações: `relation1` (hasMany), `relation2` (belongsTo)

2. **APIs Existentes:**
   - Similar a: `/api/public/content/route.ts`
   - Formato de resposta: `{ id, slug, title, ... }`

3. **Tipos TypeScript:**
   - Interface: `InterfaceName`
   - Nullable: `prop1?: string`
   - Arrays: `tags: string[]`

4. **Testes:**
   - [ ] `npx tsc --noEmit` → sem erros
   - [ ] `npm run build` → sucesso
   - [ ] API testada localmente → funciona
```

---

## 🎯 REGRA DE OURO

**"Se não tenho certeza, verifico o schema primeiro"**

Antes de usar qualquer propriedade, enum ou relação:
1. Abrir `azimut-cms/prisma/schema.prisma`
2. Procurar o modelo
3. Verificar propriedades, tipos, enums, relações
4. Só então usar no código

---

## 📚 REFERÊNCIAS RÁPIDAS

### Modelos Principais
- `Project` → `status: ProjectStatus` (DRAFT, PUBLISHED, ARCHIVED)
- `Service` → `status: ServiceStatus` (DRAFT, PUBLISHED, ARCHIVED)
- `Edital` → `status: EditalStatus` (ABERTO, FECHADO, ENVIADO, GANHO, PERDIDO)
- `Media` → `originalUrl`, `thumbnailUrl`, `mediumUrl`, `largeUrl` (NÃO tem `url`)
- `PageView` → `viewedAt` (NÃO tem `createdAt`)

### APIs de Referência
- `/api/public/content/route.ts` → Formato padrão de projetos
- `/api/admin/pages/route.ts` → CRUD padrão
- `/api/track/route.ts` → Tracking de visitantes

---

**Última atualização:** 2025-01-27  
**Criado após:** 7 erros consecutivos de deploy

