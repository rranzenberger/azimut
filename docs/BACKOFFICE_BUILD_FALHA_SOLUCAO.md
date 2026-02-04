# Backoffice: Build Falhando → Domínio Mostra Site Errado

## Problema Recorrente (3x)

Quando o **build do backoffice falha**, o domínio `azimut-backoffice.vercel.app` passa a servir o **site principal** em vez do backoffice. Isso acontece porque a Vercel mantém um cache/fallback do último deploy funcional, mas às vezes serve o projeto errado.

### Sintomas

1. Acessar `https://azimut-backoffice.vercel.app/login` mostra o site principal (com menu HOME, SOLUTIONS, WORK, etc.)
2. O chat "Azimut Assistant" aparece no canto inferior direito
3. A página de login do backoffice não carrega

### Causa Raiz

**Erro de TypeScript no Next.js 14+**: O parâmetro `params` em rotas dinâmicas (`[id]`) é uma **Promise** e precisa ser `await`ed.

```typescript
// ❌ ERRADO (causa erro de build)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = params  // ← ERRO: params é Promise, não objeto
  // ...
}

// ✅ CORRETO
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params  // ← CORRETO: await antes de desestruturar
  // ...
}
```

### Arquivos Afetados (histórico)

| Data | Arquivo | Erro |
|------|---------|------|
| 2026-02-01 | `app/api/admin/press/[id]/route.ts` | `Property 'id' does not exist on type 'Promise<{ id: string }>'` |
| 2026-02-01 | `app/api/admin/publications/[id]/route.ts` | Mesmo erro |

---

## Como Diagnosticar

### 1. Verificar se o build está falhando

```bash
# No diretório azimut-cms
vercel --prod --yes --scope team_UzGGtFQzDYcmwGZslTOxjyrT
```

Se aparecer erro como:
```
Type error: Property 'id' does not exist on type 'Promise<{ id: string }>'
```

O problema é o `params` sem `await`.

### 2. Verificar logs no Vercel

```bash
vercel logs azimut-backoffice --scope team_UzGGtFQzDYcmwGZslTOxjyrT
```

Ou acesse: https://vercel.com/azimuts-projects-6435f869/azimut-backoffice/deployments

---

## Como Corrigir

### Passo 1: Encontrar arquivos com rotas dinâmicas

Procure por arquivos em `azimut-cms/app/api/**/[id]/route.ts` ou similares.

### Passo 2: Corrigir o padrão

Em cada função (`GET`, `PUT`, `DELETE`, etc.):

```typescript
// Mudar de:
const { id } = params

// Para:
const { id } = await params
```

### Passo 3: Garantir tipagem correta

```typescript
// Tipagem correta para Next.js 14+
{ params }: { params: Promise<{ id: string }> }
```

### Passo 4: Commit e deploy

```bash
git add -A
git commit -m "fix: await params in Next.js 14 dynamic routes"
git push origin main

# Forçar deploy do backoffice
cd azimut-cms
vercel --prod --yes --scope team_UzGGtFQzDYcmwGZslTOxjyrT
```

---

## Prevenção

### 1. Sempre usar `await params` em rotas dinâmicas

Ao criar novas rotas com `[id]`, `[slug]`, etc., sempre usar:

```typescript
const { id } = await params
```

### 2. Testar build localmente antes de push

```bash
cd azimut-cms
npm run build
```

### 3. Verificar erros de TypeScript

```bash
cd azimut-cms
npx tsc --noEmit
```

---

## URLs de Referência

| Recurso | URL |
|---------|-----|
| Backoffice (produção) | https://backoffice.azmt.com.br |
| Backoffice (vercel.app) | https://azimut-backoffice.vercel.app |
| Dashboard Vercel | https://vercel.com/azimuts-projects-6435f869/azimut-backoffice |
| Deployments | https://vercel.com/azimuts-projects-6435f869/azimut-backoffice/deployments |

---

## Histórico de Ocorrências

| Data | Problema | Solução | Commit |
|------|----------|---------|--------|
| 2026-02-01 | `params` sem await em press/publications | Adicionado `await params` | `4d43bd7` |

---

## Checklist Rápido

Quando o backoffice mostrar o site errado:

- [ ] Verificar se há erro de build no Vercel dashboard
- [ ] Procurar por `const { id } = params` (sem await) em rotas `[id]`
- [ ] Corrigir para `const { id } = await params`
- [ ] Commit e push
- [ ] Forçar deploy: `vercel --prod --yes` no diretório `azimut-cms`
- [ ] Testar: https://azimut-backoffice.vercel.app/login
