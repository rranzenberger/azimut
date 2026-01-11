# 🛡️ PLANO B - ServiceDetail.tsx
**Estratégias alternativas para resolver o bug**

---

## 🎯 ESTRATÉGIA 1: Workaround Temporário (RÁPIDO - 5 min)

### Desabilitar a rota problemática

**Objetivo:** Evitar que usuários vejam página quebrada

**Implementação:**
```tsx
// Em src/App.tsx, localizar as rotas:

// COMENTAR estas linhas (2 lugares - protected e unprotected):
// <Route path="/:lang/what/:slug" element={
//   <LangRouteWrapper setLang={setLang}>
//     {(routeLang) => <ServiceDetail lang={routeLang} />}
//   </LangRouteWrapper>
// } />

// ADICIONAR redirect para /what:
<Route path="/:lang/what/:slug" element={
  <Navigate to={`/${lang}/what`} replace />
} />
```

**Impacto:**
- ✅ Usuários não veem página quebrada
- ✅ Redirecionados para listagem de serviços
- ❌ Detalhes dos serviços não acessíveis

---

## 🎯 ESTRATÉGIA 2: Página Estática Temporária (MÉDIO - 30 min)

### Criar versão hardcoded apenas para "Cinema & Audiovisual"

**Objetivo:** Ter pelo menos UMA página de serviço funcional

**Implementação:**
```tsx
// Criar: src/pages/ServiceDetailCinema.tsx

const ServiceDetailCinema: React.FC<{ lang: Lang }> = ({ lang }) => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-5xl font-bold mb-8">
        🎬 Cinema & Audiovisual
      </h1>
      
      <p className="text-lg mb-6">
        Com três décadas de experiência em produção audiovisual...
      </p>
      
      {/* Conteúdo hardcoded completo */}
    </div>
  )
}
```

**Benefício:**
- ✅ Usuários veem conteúdo completo
- ✅ Solução rápida para serviço principal
- ❌ Precisa criar página separada para cada serviço

---

## 🎯 ESTRATÉGIA 3: Investigação Profunda (LONGO - 2-4 horas)

### Debugar usando React DevTools

**Ferramentas:**
1. React Developer Tools (Chrome Extension)
2. Inspecionar árvore de componentes
3. Ver props e state em tempo real

**Passos:**
1. Instalar React DevTools
2. Abrir página `/pt/what/cinema-audiovisual`
3. Inspecionar componente `ServiceDetail`
4. Ver se todos os elementos estão na árvore
5. Verificar se há `display: none` ou CSS oculto

**Se elementos estão na árvore mas não aparecem:**
- Problema é CSS
- Procurar classes Tailwind não processadas
- Ver conflitos de z-index ou overflow

**Se elementos NÃO estão na árvore:**
- Problema é no render do React
- Bug no React Router ou Layout
- Possível short-circuit em algum ternário

---

## 🎯 ESTRATÉGIA 4: Rollback Git (RÁPIDO - 10 min)

### Voltar para versão anterior que funcionava

**Se havia uma versão funcional antes:**

```bash
# Ver histórico do arquivo:
git log --oneline --all -- src/pages/ServiceDetail.tsx

# Ver mudanças em um commit específico:
git show <commit-hash> -- src/pages/ServiceDetail.tsx

# Restaurar versão anterior:
git checkout <commit-hash> -- src/pages/ServiceDetail.tsx
```

**Se nunca funcionou:**
- Pular para Estratégia 5

---

## 🎯 ESTRATÉGIA 5: Copiar de Componente Funcional (MÉDIO - 1 hora)

### Usar estrutura de página que FUNCIONA

**Páginas que funcionam:**
- `WhatWeDo.tsx` ✅
- `Work.tsx` ✅
- `ProjectDetail.tsx` ✅ (similar a ServiceDetail)

**Abordagem:**
1. Copiar estrutura de `ProjectDetail.tsx`
2. Adaptar para serviços em vez de projetos
3. Manter EXATAMENTE a mesma estrutura HTML
4. Mudar apenas os dados

**Exemplo:**
```tsx
// Base: ProjectDetail.tsx (FUNCIONA)
// Copiar estrutura e adaptar:

const ServiceDetail: React.FC<ServiceDetailProps> = ({ lang }) => {
  // MESMA LÓGICA de ProjectDetail
  const { slug } = useParams()
  const service = getServiceBySlug(slug)
  
  // MESMA ESTRUTURA JSX
  return (
    <div className="relative min-h-screen pt-24 pb-12">
      {/* Copiar containers e wrappers de ProjectDetail */}
      <div className="container mx-auto px-4">
        {/* Adaptar conteúdo */}
      </div>
    </div>
  )
}
```

---

## 🎯 ESTRATÉGIA 6: Build de Produção (RÁPIDO - 15 min)

### Testar se bug existe em build otimizado

**Hipótese:** Pode ser problema apenas em dev mode (HMR do Vite)

**Teste:**
```bash
cd C:\Users\ranz\Documents\azimut-site-vite-tailwind
npm run build
npm run preview
```

**Acessar:** http://localhost:4173/pt/what/cinema-audiovisual

**Se funcionar em produção mas não em dev:**
- Bug é do Vite HMR
- Solução: Sempre testar em build de produção
- Ou configurar Vite para não usar HMR nesta página

**Se NÃO funcionar em produção:**
- Bug é real, não é do HMR
- Continuar para Estratégia 7

---

## 🎯 ESTRATÉGIA 7: Remover Dependências (MÉDIO - 1 hora)

### Isolar o bug removendo imports

**Abordagem:**
1. Comentar TUDO exceto estrutura básica
2. Ver se renderiza
3. Adicionar de volta um por um

**Passo a passo:**
```tsx
// VERSÃO MÍNIMA - Testar se renderiza:
const ServiceDetail: React.FC<ServiceDetailProps> = ({ lang }) => {
  return <div>TESTE BÁSICO</div>
}

// Se funcionar, adicionar:
const ServiceDetail: React.FC<ServiceDetailProps> = ({ lang }) => {
  const { slug } = useParams()
  return <div>TESTE COM PARAMS: {slug}</div>
}

// Se funcionar, adicionar:
const ServiceDetail: React.FC<ServiceDetailProps> = ({ lang }) => {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)
  return <div>TESTE COM SERVICE: {service?.icon}</div>
}

// Continuar adicionando até encontrar o que quebra
```

---

## 🎯 ESTRATÉGIA 8: Criar Issue no GitHub (LONGO - tracking)

### Documentar bug e pedir ajuda da comunidade

**Se nada funcionar:**
1. Criar repositório minimal reproduzível
2. Postar issue no React Router
3. Ou pedir ajuda no Stack Overflow

**Template:**
```markdown
# ServiceDetail Component Renders Only 3 Elements

## Environment
- React 18.x
- React Router 6.x
- Vite 5.x
- Tailwind CSS

## Bug Description
Component renders only breadcrumbs, related projects, and CTAs.
All content between breadcrumbs and related projects disappears.

## Code
[Link to minimal reproduction]

## Expected Behavior
Should render hero, description, deliverables, process, and technologies.

## Actual Behavior
Only 3 sections appear in DOM.
```

---

## 📊 MATRIZ DE DECISÃO

| Estratégia | Tempo | Dificuldade | Eficácia | Recomendação |
|------------|-------|-------------|----------|--------------|
| 1. Workaround | 5 min | Fácil | Média | ⭐⭐⭐⭐⭐ FAZER AGORA |
| 2. Página Estática | 30 min | Fácil | Alta | ⭐⭐⭐⭐ Boa temporária |
| 3. React DevTools | 2-4h | Difícil | Muito Alta | ⭐⭐⭐⭐⭐ Fazer quando tiver tempo |
| 4. Rollback Git | 10 min | Fácil | Depende | ⭐⭐⭐ Se existir versão antiga |
| 5. Copiar Funcional | 1h | Médio | Alta | ⭐⭐⭐⭐ Solução prática |
| 6. Build Produção | 15 min | Fácil | Média | ⭐⭐⭐⭐ Teste rápido |
| 7. Remover Deps | 1h | Médio | Alta | ⭐⭐⭐⭐ Debug sistemático |
| 8. GitHub Issue | Variável | Difícil | Baixa | ⭐⭐ Última opção |

---

## 🎯 PLANO RECOMENDADO

### AGORA (próximos 30 minutos):
1. ✅ **Estratégia 1** (Workaround) - 5 min
2. ✅ **Estratégia 6** (Build produção) - 15 min
3. ✅ Commit e push para Vercel

### AMANHÃ (com cabeça fresca):
1. ✅ **Estratégia 3** (React DevTools) - 2h
2. ✅ **Estratégia 5** (Copiar funcional) - 1h
3. ✅ Testar e validar

### SE NADA FUNCIONAR:
1. ✅ **Estratégia 2** (Página estática) - temporária
2. ✅ **Estratégia 8** (GitHub issue) - ajuda da comunidade

---

## 📌 ARQUIVOS DE REFERÊNCIA

- **Checkpoint:** `CHECKPOINT_SERVICEDETAIL_2026-01-11.md`
- **Backup código atual:** `src/pages/ServiceDetail.tsx` (commit antes de mudar)
- **Páginas que funcionam:**
  - `src/pages/ProjectDetail.tsx` (similar)
  - `src/pages/WhatWeDo.tsx` (listagem)
  - `src/pages/Work.tsx` (listagem)

---

**Criado:** 2026-01-11 03:10 AM  
**Última atualização:** 2026-01-11 03:10 AM
