# Onde publicar o jogo Empathy Engine no site Azimut

## Sugestão de URL (página do jogo)

| Opção | URL | Observação |
|-------|-----|------------|
| **Recomendada** | `/:lang/game` | Curta, clara, funciona em pt/en/es/fr (ex.: `/pt/game`, `/en/game`) |
| Alternativa 1 | `/:lang/empathy-engine` | Nome do produto, boa para SEO |
| Alternativa 2 | `/:lang/experimente` | Foco em “experimentar” a experiência |

**Exemplos:**  
- `https://seusite.com/pt/game`  
- `https://seusite.com/en/empathy-engine`

---

## Onde a página do jogo deve “viver”

- A **página** do jogo é essa URL única (ex.: `/:lang/game`).
- O jogo em si pode ser:
  1. **Iframe:** build do Empathy Engine (ex.: Vite build) hospedado em um subpath ou subdomínio, e a rota `/:lang/game` do site principal apenas embute o iframe com esse build.
  2. **Integrado:** o próprio site (React) carrega o app do Empathy Engine na mesma rota (lazy load / micro-frontend).  
- Ou seja: **publicar o jogo** = ter essa rota no site e nela exibir o jogo (iframe ou integrado).

---

## Onde colocar links para o jogo (para as pessoas acharem)

| Página / Área | Ação sugerida |
|---------------|----------------|
| **Experience Preview** (`/experience-preview`) | CTA em destaque: “Jogue o Empathy Engine” / “Experimente o jogo” → link para `/:lang/game`. Faz sentido porque a página já é “degustação” de VR, Web3 e experiências. |
| **Studio** (`/studio`) | Na seção “A Máquina de Empatia”, botão “Experimente” / “Jogue o jogo” → `/:lang/game`. O conceito de empatia e o nome “Empathy Engine” se reforçam. |
| **Home** | Opcional: um card ou botão “Experimente nosso jogo” / “Play the Empathy Engine” na área de experiências ou CTAs. |
| **Menu (Projetos / Work)** | Opcional: item “Empathy Engine” ou “Jogo” no dropdown de Projetos, ao lado de “Web3 / Experiências”, apontando para `/:lang/game`. |

---

## Resumo

1. **Criar a rota** `/:lang/game` (ou `/:lang/empathy-engine`) no site e nela exibir o jogo (iframe do build ou app integrado).
2. **Principal link:** Experience Preview — CTA “Jogue o Empathy Engine” → `/:lang/game`.
3. **Segundo link:** Studio — seção “A Máquina de Empatia” — “Experimente” → `/:lang/game`.
4. **Opcional:** Home e menu Projetos com link para a mesma página.

Assim o jogo fica publicado em **uma página dedicada** e descoberto a partir de **Degustação/Experiências** e **Estúdio**.
