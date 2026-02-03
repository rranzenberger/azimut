# Lighthouse: Reduce unused JavaScript + LCP request discovery

Resumo do que os diagnósticos indicam e o que foi feito / o que ainda pode ser feito.

---

## 1. Reduce unused JavaScript (Est. savings 120 KiB)

### O que o Lighthouse aponta

- **vendor-Dlxd6GG3.js** (1st party, ~79 KiB transfer, ~65 KiB “não utilizado”): chunk de dependências (React, libs). Parte do código não é usada na primeira carga.
- **gtag/js (Google Tag Manager)** (3rd party, ~141 KiB, ~55 KiB “não utilizado”): script do GA carregado pelo site.

### O que já está feito

- **Analytics adiado:** Google Analytics e Plausible são carregados via `DeferredAnalytics` (após `requestIdleCallback` com timeout 3 s, ou fallback 1,5 s), para não competir com LCP no carregamento inicial.
- **Chunks separados no Vite:** `vite.config.ts` já faz `manualChunks` para React, router, Framer Motion, Three.js, ícones, markdown, etc.
- **Lazy de rotas pesadas:** Studio, StudioTeam, StudioCredentials, StudioDiferenciais, AcademyNew, WhatWeDo, Work, ServiceDetail e ProjectDetail são carregados sob demanda (lazy). Na carga inicial só entram Home e Contact; o resto baixa ao navegar.

### O que ainda pode ser feito

- **Vendor (vendor-*.js):**  
  - Manter rotas pesadas (ex.: Vancouver, Blog, páginas com Three/Web3) em **lazy** (`React.lazy`) para que o JS delas (e de libs como Framer Motion / Three) só baixe ao acessar a rota.  
  - Revisar dependências: remover libs não usadas e preferir alternativas mais leves onde fizer sentido.
- **GTM/gtag:**  
  - O script já é carregado depois do first paint. Se quiser ir além, dá para atrasar ainda mais (ex.: após primeiro clique ou após 3 s), sabendo que isso pode atrasar eventos de analytics no início da sessão.

---

## 2. LCP request discovery (“Request is discoverable in initial document”)

### O que o Lighthouse aponta

- O **elemento LCP** na home é uma **imagem** (hero de fundo), em geral do Unsplash (ex.: `photo-1541961017774...` ou o fallback `photo-1451187580459...`).
- A verificação **“Request is discoverable in initial document”** falha porque o `<img>` (ou `<picture>`) do hero é **inserido pelo React** depois que o JS executa. No HTML inicial não existe nenhum `src` dessa imagem, então o navegador só descobre o recurso tardiamente.

### Por que acontece

- A URL do hero vem de **dados dinâmicos**: backoffice (`heroBackgroundImage`) ou projeto em destaque (`featured`). Só após o React hidratar e, se for o caso, após o fetch do CMS, o `src` é definido.
- Em SPA sem SSR, tudo que é renderizado pela árvore React só entra no DOM após o primeiro JS; por isso o Lighthouse considera que a requisição da imagem LCP **não** é “discoverable” no documento inicial.

### O que foi feito

- **Preload da imagem de fallback do hero** no `index.html`:
  - URL usada quando não há imagem do backoffice/featured:  
    `https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072`
  - Com isso, quando a home **usa exatamente essa URL** como hero, o navegador já descobre e pode começar a baixar a imagem a partir do HTML inicial, melhorando a métrica “discoverable in initial document” nesse cenário.

### Limitações e próximos passos

- Se o **backoffice** (ou projeto em destaque) mandar **outra** URL (ex.: `photo-1541961017774...`), essa URL continua **não** estar no HTML inicial; o preload atual não cobre esse caso.
- **Se a imagem LCP em produção for sempre a mesma** (ex.: uma URL fixa do backoffice), vale adicionar um **segundo** `<link rel="preload" as="image" href="URL_FIXA">` no `index.html` para essa URL.
- **Melhor solução de longo prazo:** ter o hero (ou pelo menos o `src` da imagem LCP) no HTML inicial, por exemplo via:
  - SSR (React no servidor), ou
  - HTML estático gerado no build com a URL do hero (ex.: da env ou do CMS no build time).

---

## Resumo rápido

| Diagnóstico              | Ação feita                                      | Ação opcional / futura                          |
|--------------------------|-------------------------------------------------|-------------------------------------------------|
| Reduce unused JavaScript | Analytics já adiados; chunks separados no Vite  | Mais lazy de rotas; atrasar mais o gtag se OK   |
| LCP request discovery    | Preload da imagem de fallback do hero no HTML  | Preload da URL fixa do CMS ou SSR para o hero  |
