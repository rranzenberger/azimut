# Bandeiras SVG – Referência e backup

Documentação das bandeiras usadas no site (comparativo Vancouver, seletor de idioma, etc.).  
**Checkpoint:** 001 | **Commit:** `129535f`

---

## Resumo por bandeira

| Código | Arquivo       | Origem        | ViewBox  | Uso                          |
|--------|---------------|---------------|----------|------------------------------|
| **BR** | `flag-br.svg` | SVG Repo      | 36×36    | Brasil (originais)           |
| **CA** | `flag-ca.svg` | SVG Repo      | 36×36    | Canadá (originais)           |
| **US** | `flag-us.svg` | SVGs atuais   | 512×512  | EUA (guardados neste doc)    |
| **GB** | `flag-gb.svg` | SVGs atuais   | 512×512  | Reino Unido (guardados)      |

---

## BR e CA – Originais (SVG Repo)

- **Fonte:** [SVG Repo](https://www.svgrepo.com), Generator: SVG Repo Mixer Tools  
- **Estilo:** Twemoji-style (`iconify--twemoji`)  
- **Arquivos:** `public/flag-br.svg`, `public/flag-ca.svg`  
- Manter estes arquivos como estão; não substituir por outras versões sem documentar.

---

## US e GB – SVGs atuais (guardados)

Versões geométricas simplificadas em uso no checkpoint 001. Código completo guardado abaixo para referência/rollback.

### `flag-us.svg` (EUA)

- **ViewBox:** `0 0 512 512`  
- **Estrutura:** Retângulos vermelho/branco/azul (listras + canton)  
- **Cores:** `#bf0a30` (vermelho), `#fff`, `#002868` (azul)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect fill="#bf0a30" width="512" height="512"/>
  <rect fill="#fff" y="39.4" width="512" height="39.4"/>
  <rect fill="#fff" y="118.2" width="512" height="39.4"/>
  <rect fill="#fff" y="197" width="512" height="39.4"/>
  <rect fill="#fff" y="275.8" width="512" height="39.4"/>
  <rect fill="#fff" y="354.6" width="512" height="39.4"/>
  <rect fill="#fff" y="433.4" width="512" height="39.4"/>
  <rect fill="#002868" width="256" height="275.8"/>
</svg>
```

### `flag-gb.svg` (Reino Unido – Union Jack)

- **ViewBox:** `0 0 512 512`  
- **Estrutura:** Base azul + cruzes brancas e vermelhas (diagonais + horizontais/verticais)  
- **Cores:** `#012169` (azul), `#fff`, `#c8102e` (vermelho)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect fill="#012169" width="512" height="512"/>
  <path fill="#fff" d="M0 0l512 512M512 0L0 512" stroke="#fff" stroke-width="80"/>
  <path fill="#c8102e" d="M0 0l512 512M512 0L0 512" stroke="#c8102e" stroke-width="50"/>
  <path fill="#fff" d="M256 0v512M0 256h512" stroke="#fff" stroke-width="130"/>
  <path fill="#c8102e" d="M256 0v512M0 256h512" stroke="#c8102e" stroke-width="80"/>
</svg>
```

---

## Onde são usadas

- **`WhyVancouverConvincing.tsx`:** `countryFlagSrc` (CA, US, GB, BR) no comparativo de cidades.  
- **`Layout.tsx`:** Seletor de idioma e blocos CA/BR (bandeiras ao lado dos links).

---

## Checkpoint

- **Checkpoint 001** registrado em `docs/checkpoints/CHECKPOINT-001.md`.  
- Estado das bandeiras referido ao commit `129535f`.
