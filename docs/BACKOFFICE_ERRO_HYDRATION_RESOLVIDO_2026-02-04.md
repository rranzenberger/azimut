# Relatório: Erro de Hydration no Backoffice - Resolvido

**Data:** 04/02/2026  
**Ambiente:** https://backoffice.azmt.com.br  
**Status:** ✅ RESOLVIDO

---

## Sintomas do Erro

### Mensagem de Erro
```
Application error: a server-side exception has occurred (see the server logs for more information).
Digest: 1309179462
```

### Erros no Console do Navegador
```
Uncaught Error: Minified React error #418
Uncaught Error: Minified React error #423
```

### Páginas Afetadas
- `/admin` (Dashboard)
- `/admin/team` (Equipe)
- `/admin/markets` (Mercados)
- `/admin/history` (Timeline & Histórico)
- `/admin/credentials` (Credenciais)
- `/admin/services` (Serviços)

### Comportamento
- Página ficava em branco com mensagem de erro
- Cliques em links do menu não navegavam (ficava travado na URL atual)
- Erro ocorria em todas as páginas admin após login

---

## Causa Raiz

### Problema: Event Handlers em Server Components

No Next.js 14+ com App Router, existem dois tipos de componentes:
1. **Server Components** (padrão) - renderizados no servidor
2. **Client Components** - renderizados no cliente (marcados com `"use client"`)

**Event handlers** como `onMouseEnter`, `onMouseLeave`, `onClick` (com lógica) **SÓ funcionam em Client Components**.

### Código Problemático (ERRADO)

```tsx
// app/admin/team/page.tsx - Server Component (sem "use client")
export default async function TeamPage() {
  // ...
  return (
    <Link
      href="/admin/team/new"
      onMouseEnter={(e) => {  // ❌ ERRO! Event handler em Server Component
        e.currentTarget.style.backgroundColor = '#dc2626';
      }}
      onMouseLeave={(e) => {  // ❌ ERRO!
        e.currentTarget.style.backgroundColor = '#ef4444';
      }}
    >
      + Novo Membro
    </Link>
  );
}
```

### Por que o erro acontece?
1. O servidor renderiza o HTML sem os event handlers
2. O cliente tenta "hidratar" (hydrate) o HTML com React
3. React detecta que o HTML do servidor não corresponde ao esperado
4. Erro de hydration (#418, #423) é lançado

---

## Solução Implementada

### 1. Criar Componentes Client Reutilizáveis

**Arquivo:** `app/admin/components/HoverCard.tsx`

```tsx
'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface HoverCardProps {
  href: string;
  children: ReactNode;
}

export function HoverCard({ href, children }: HoverCardProps) {
  return (
    <Link
      href={href}
      style={{
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.1)',
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)';
        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
      }}
    >
      {children}
    </Link>
  );
}

export function HoverButton({ href, children }: HoverCardProps) {
  return (
    <Link
      href={href}
      style={{
        padding: '10px 20px',
        backgroundColor: '#ef4444',
        color: 'white',
        textDecoration: 'none',
        borderRadius: 6,
        fontWeight: 600,
        fontSize: 14,
        display: 'inline-block',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#dc2626';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#ef4444';
      }}
    >
      {children}
    </Link>
  );
}
```

### 2. Usar os Componentes nas Páginas

**Código Corrigido (CERTO):**

```tsx
// app/admin/team/page.tsx - Server Component
import { HoverCard, HoverButton } from '../components/HoverCard';

export default async function TeamPage() {
  // ... buscar dados do banco
  return (
    <div>
      <HoverButton href="/admin/team/new">
        + Novo Membro
      </HoverButton>
      
      {members.map((member) => (
        <HoverCard key={member.id} href={`/admin/team/${member.id}`}>
          <h3>{member.name}</h3>
        </HoverCard>
      ))}
    </div>
  );
}
```

### 3. Refatorar o Layout Admin

**Arquivo:** `app/admin/layout.tsx`

Separar em:
- **Server Component** (`layout.tsx`) - autenticação e busca de dados
- **Client Component** (`AdminLayoutClient.tsx`) - toda a UI interativa

```tsx
// app/admin/layout.tsx - Server Component
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { AdminLayoutClient } from './components/AdminLayoutClient';

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { email: true, role: true },
  });

  return (
    <AdminLayoutClient userData={{ email: user?.email, role: user?.role }}>
      {children}
    </AdminLayoutClient>
  );
}
```

---

## Arquivos Modificados

| Arquivo | Alteração |
|---------|-----------|
| `app/admin/components/HoverCard.tsx` | **CRIADO** - Componentes Client reutilizáveis |
| `app/admin/components/AdminLayoutClient.tsx` | **CRIADO** - Layout Client separado |
| `app/admin/layout.tsx` | Refatorado para usar AdminLayoutClient |
| `app/admin/team/page.tsx` | Removido event handlers, usa HoverCard/HoverButton |
| `app/admin/markets/page.tsx` | Removido event handlers, usa HoverCard/HoverButton |
| `app/admin/history/page.tsx` | Removido event handlers, usa HoverCard/HoverButton |
| `app/admin/credentials/page.tsx` | Removido event handlers, usa HoverCard/HoverButton |
| `app/admin/components/KeyboardShortcuts.tsx` | Removido `<style jsx>` (não suportado no App Router) |
| `app/admin/components/MonitorLink.tsx` | Removido `<style jsx>` e animações inline |
| `src/lib/auth.ts` | Adicionado `JWT_SECRET` como fallback |

---

## Como Diagnosticar Este Erro no Futuro

### 1. Verificar o Console do Navegador
Se aparecer:
- `Minified React error #418` → Hydration mismatch
- `Minified React error #423` → Hydration failed

### 2. Buscar Event Handlers em Server Components
```bash
# No diretório azimut-cms
grep -r "onMouseEnter\|onMouseLeave\|onClick" app/admin --include="*.tsx" | grep -v "use client"
```

### 3. Verificar se o arquivo tem "use client"
Se um arquivo usa event handlers, DEVE ter `"use client"` no topo.

### 4. Verificar styled-jsx
O App Router do Next.js 14+ **NÃO suporta** `<style jsx>`. Use CSS modules ou inline styles.

---

## Regras para Evitar Este Erro

### ✅ FAZER

1. **Marcar componentes interativos com `"use client"`**
2. **Criar componentes Client separados para interatividade**
3. **Manter Server Components para busca de dados**
4. **Usar CSS transitions em vez de animações JS quando possível**

### ❌ NÃO FAZER

1. **Usar event handlers em Server Components**
2. **Usar `<style jsx>` no App Router**
3. **Misturar lógica de servidor com interatividade de cliente no mesmo componente**

---

## Referências

- [Next.js - Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [React Error #418](https://react.dev/errors/418) - Hydration mismatch
- [React Error #423](https://react.dev/errors/423) - Hydration failed
- [Next.js - Dynamic Server Usage](https://nextjs.org/docs/messages/dynamic-server-error)

---

## Histórico de Deploys Relacionados

| Data | Deploy ID | Descrição |
|------|-----------|-----------|
| 04/02/2026 | dpl_D17F5GXNRD1epZLxcp7CDkQFTs7o | Layout refatorado (ainda com erro) |
| 04/02/2026 | dpl_mkmt19htt... | **CORREÇÃO FINAL** - HoverCard/HoverButton |

---

*Relatório gerado em 04/02/2026 após resolução do problema.*
