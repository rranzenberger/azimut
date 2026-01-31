# Fase 1 Segura: CTAs Navegação SEM Quebrar Backoffice

## ⚠️ REGRA DE OURO

**NÃO MODIFICAR:**
- ❌ Integração com backoffice (`useAzimutContent`)
- ❌ Fallbacks existentes (`defaultCases`, `defaultProjects`, etc)
- ❌ Lógica de prioridade (Backoffice → IA → Estático)
- ❌ Qualquer código relacionado a CMS

**APENAS ADICIONAR:**
- ✅ Componente novo (`PageNavigationCTAs.tsx`)
- ✅ CTAs no final de cada página (após último `</section>`)
- ✅ Links contextuais no conteúdo (sem modificar lógica existente)

---

## TAREFA 1: Criar Componente de CTAs (100% Isolado)

### Arquivo: `src/components/PageNavigationCTAs.tsx` (NOVO)

**Características:**
- ✅ Componente 100% independente
- ✅ Não depende de backoffice
- ✅ Não modifica nada existente
- ✅ Apenas renderiza 2 botões

**Código:**
```tsx
import React from 'react'
import { Link } from 'react-router-dom'
import type { Lang } from '../i18n'

interface PageNavigationCTAsProps {
  lang: Lang
  primary: {
    label: string
    href: string
    icon?: string
  }
  secondary: {
    label: string
    href: string
    icon?: string
  }
}

export const PageNavigationCTAs: React.FC<PageNavigationCTAsProps> = ({
  lang,
  primary,
  secondary
}) => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          {/* Botão Primário */}
          <Link
            to={primary.href}
            className="group relative flex items-center justify-center gap-3 rounded-xl border-2 border-azimut-red bg-azimut-red px-8 py-4 font-sora text-sm font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_24px_rgba(201,35,55,0.4)]"
          >
            {primary.icon && <span className="text-xl">{primary.icon}</span>}
            <span>{primary.label}</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Botão Secundário */}
          <Link
            to={secondary.href}
            className="group flex items-center justify-center gap-3 rounded-xl border-2 border-azimut-red/60 bg-transparent px-8 py-4 font-sora text-sm font-semibold uppercase tracking-[0.1em] text-azimut-red transition-all duration-300 hover:border-azimut-red hover:bg-azimut-red/10"
          >
            {secondary.icon && <span className="text-xl">{secondary.icon}</span>}
            <span>{secondary.label}</span>
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
```

**Checklist:**
- [ ] Criar componente isolado
- [ ] Testar componente sozinho
- [ ] Verificar que não depende de backoffice

---

## TAREFA 2: Adicionar CTAs em Home.tsx (MUITO CUIDADOSO)

### Localização:
- Final da página: após linha 1378 (`</section>`) e antes de linha 1380 (`</main>`)
- Adicionar APÓS o último conteúdo, ANTES do fechamento do `main`

**Código a adicionar (APENAS no final, antes de `</main>`):**
```tsx
{/* CTAs de Navegação - Adicionado no final, não modifica nada existente */}
<PageNavigationCTAs
  lang={lang}
  primary={{
    label: lang === 'pt' ? 'Ver Projetos' : lang === 'es' ? 'Ver Proyectos' : lang === 'fr' ? 'Voir Projets' : 'View Projects',
    href: `/${lang}/work`,
    icon: '🎬'
  }}
  secondary={{
    label: lang === 'pt' ? 'Ver Soluções' : lang === 'es' ? 'Ver Soluciones' : lang === 'fr' ? 'Voir Solutions' : 'View Solutions',
    href: `/${lang}/what`,
    icon: '✨'
  }}
/>
```

**Import a adicionar (no topo, com outros imports):**
```tsx
import { PageNavigationCTAs } from '../components/PageNavigationCTAs'
```

**Checklist:**
- [ ] Adicionar import no topo
- [ ] Localizar final de Home.tsx (linha ~1378)
- [ ] Adicionar CTAs antes de `</main>`
- [ ] Verificar que não modifiquei nada existente
- [ ] Testar que backoffice continua funcionando

---

## TAREFA 3: Adicionar CTAs em WhatWeDo.tsx (MUITO CUIDADOSO)

### Localização:
- Final da página: antes do fechamento do componente

**Código a adicionar:**
```tsx
{/* CTAs de Navegação */}
<PageNavigationCTAs
  lang={lang}
  primary={{
    label: lang === 'pt' ? 'Ver Projetos' : lang === 'es' ? 'Ver Proyectos' : lang === 'fr' ? 'Voir Projets' : 'View Projects',
    href: `/${lang}/work`,
    icon: '🎬'
  }}
  secondary={{
    label: lang === 'pt' ? 'Conhecer Estúdio' : lang === 'es' ? 'Conocer Estudio' : lang === 'fr' ? 'Découvrir Studio' : 'Meet Studio',
    href: `/${lang}/studio`,
    icon: '🏛️'
  }}
/>
```

**Checklist:**
- [ ] Adicionar import
- [ ] Localizar final de WhatWeDo.tsx
- [ ] Adicionar CTAs no final
- [ ] Verificar que não modifiquei nada existente

---

## TAREFA 4: Adicionar CTAs em Work.tsx (EXTRA CUIDADO)

### ⚠️ ATENÇÃO ESPECIAL:
- Work.tsx tem integração complexa com backoffice
- NÃO modificar: `useAzimutContent`, `cmsContent`, `defaultCases`, lógica de filtros
- Localização: após linha 969 (`</section>`) e antes de linha 971 (`</main>`)

**Código a adicionar:**
```tsx
{/* CTAs de Navegação */}
<PageNavigationCTAs
  lang={lang}
  primary={{
    label: lang === 'pt' ? 'Conhecer Estúdio' : lang === 'es' ? 'Conocer Estudio' : lang === 'fr' ? 'Découvrir Studio' : 'Meet Studio',
    href: `/${lang}/studio`,
    icon: '🏛️'
  }}
  secondary={{
    label: lang === 'pt' ? 'Ver Soluções' : lang === 'es' ? 'Ver Soluciones' : lang === 'fr' ? 'Voir Solutions' : 'View Solutions',
    href: `/${lang}/what`,
    icon: '✨'
  }}
/>
```

**Checklist:**
- [ ] Adicionar import
- [ ] Localizar final de Work.tsx (linha ~969)
- [ ] Adicionar CTAs antes de `</main>`
- [ ] VERIFICAR que não modifiquei NADA relacionado a backoffice
- [ ] Testar que projetos continuam funcionando (backoffice + fallback)

---

## TAREFA 5: Adicionar CTAs em Studio.tsx (MUITO CUIDADOSO)

### Localização:
- Final da página: antes do fechamento do componente

**Código a adicionar:**
```tsx
{/* CTAs de Navegação */}
<PageNavigationCTAs
  lang={lang}
  primary={{
    label: lang === 'pt' ? 'Iniciar Projeto' : lang === 'es' ? 'Iniciar Proyecto' : lang === 'fr' ? 'Démarrer Projet' : 'Start Project',
    href: `/${lang}/contact`,
    icon: '🚀'
  }}
  secondary={{
    label: lang === 'pt' ? 'Ver Projetos' : lang === 'es' ? 'Ver Proyectos' : lang === 'fr' ? 'Voir Projets' : 'View Projects',
    href: `/${lang}/work`,
    icon: '🎬'
  }}
/>
```

**Checklist:**
- [ ] Adicionar import
- [ ] Localizar final de Studio.tsx
- [ ] Adicionar CTAs no final
- [ ] Verificar que não modifiquei nada existente

---

## REGRAS DE SEGURANÇA

### ✅ SEMPRE FAZER:
1. ✅ Ler o arquivo completo antes de editar
2. ✅ Localizar exatamente onde adicionar (final da página)
3. ✅ Adicionar apenas o componente novo
4. ✅ Testar que backoffice continua funcionando
5. ✅ Verificar console por erros
6. ✅ Testar fallback (se backoffice offline)

### ❌ NUNCA FAZER:
1. ❌ Modificar `useAzimutContent` ou qualquer hook de backoffice
2. ❌ Modificar fallbacks (`defaultCases`, `defaultProjects`)
3. ❌ Modificar lógica de prioridade (Backoffice → IA → Estático)
4. ❌ Modificar qualquer código relacionado a CMS
5. ❌ Remover ou comentar código existente
6. ❌ Modificar imports existentes (apenas adicionar novo)

---

## ORDEM DE IMPLEMENTAÇÃO (Step by Step)

### Passo 1: Criar Componente (Isolado)
1. Criar `PageNavigationCTAs.tsx`
2. Testar componente sozinho
3. Verificar que não depende de backoffice

### Passo 2: Adicionar em Home.tsx (Testar)
1. Localizar final da página (linha ~1378)
2. Adicionar import no topo
3. Adicionar CTAs antes de `</main>`
4. Testar que backoffice continua funcionando
5. Verificar console (sem erros)

### Passo 3: Adicionar em WhatWeDo.tsx (Testar)
1. Mesmo processo
2. Testar após cada adição

### Passo 4: Adicionar em Work.tsx (EXTRA CUIDADO)
1. Work.tsx é mais complexo
2. Verificar 2x que não modifiquei nada
3. Testar que projetos aparecem (backoffice + fallback)

### Passo 5: Adicionar em Studio.tsx (Testar)
1. Mesmo processo
2. Testar tudo junto

---

## CHECKLIST DE SEGURANÇA (Antes de cada mudança)

- [ ] Li o arquivo completo
- [ ] Identifiquei exatamente onde adicionar (final)
- [ ] Verifiquei que não vou modificar código existente
- [ ] Vou apenas ADICIONAR, não MODIFICAR
- [ ] Testei mentalmente que não quebra backoffice
- [ ] Vou testar após adicionar

---

## TESTES APÓS CADA MUDANÇA

### Teste 1: Backoffice Funcionando
1. Abrir console (F12)
2. Recarregar página
3. Verificar: `✅ Usando ... do backoffice` (se backoffice tiver conteúdo)
4. Verificar: Sem erros no console

### Teste 2: Backoffice Offline (Fallback)
1. Simular backoffice offline (ou se já estiver offline)
2. Recarregar página
3. Verificar: `⚠️ Usando ... estáticos (fallback)`
4. Verificar: Site funciona normalmente
5. Verificar: CTAs aparecem e funcionam

### Teste 3: Navegação
1. Clicar em CTAs
2. Verificar que navega corretamente
3. Verificar que não quebra nada

---

## RESULTADO ESPERADO

### Antes:
- ❌ Usuário fica "preso" em uma página
- ❌ Mobile não navega facilmente

### Depois:
- ✅ CTAs claros no final de cada página
- ✅ Navegação natural entre páginas
- ✅ Mobile-friendly
- ✅ **Backoffice continua funcionando 100%**
- ✅ **Fallbacks continuam funcionando 100%**

---

**Status:** 🟢 Pronto para começar (com MUITO cuidado)  
**Prioridade:** Alta  
**Estimativa:** 2-3 horas (com testes cuidadosos)
