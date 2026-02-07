# Projetos realizados – Subpágina e UX (curadoria e valores)

## Objetivo

- Dar sentido real ao “ALL” / “TODOS”: levar à **subpágina de todos os projetos** com filtros.
- Oferecer na página Work uma **CTA clara**: “Veja todo nosso portfólio” → subpágina.
- Menu superior e **menu inferior (pills)** levarem à mesma subpágina, com filtro pré-aplicado quando for o caso.
- Títulos e copy alinhados a **projetos realizados** / **portfólio**, como estúdios e usuários entendem.

---

## Análise curatorial e de valores

### Como estúdios e usuários entendem

- **“Work”** = área do site sobre o que o estúdio faz (trabalhos, cases).
- **“Projetos realizados” / “Portfólio”** = lista completa de projetos, com possibilidade de filtrar (por tipo, tecnologia, ano).
- **“Ver todo o portfólio”** = CTA clara para quem quer ver a lista completa, não só destaques.
- **“ALL” / “TODOS”** = espera-se ver *todos* os projetos, não só os em destaque da landing. Se “ALL” ficar na mesma landing com poucos itens, gera ruído (“all não reflete a realidade”).

### Valores a comunicar

- Transparência: “todos os projetos” acessíveis em um lugar só.
- Organização: filtros correspondentes (Vídeo, VR & XR, Museus, Festivais, Design, Educação) na subpágina.
- Entrada múltipla: menu superior, pills e CTA na própria página Work levam à mesma experiência (subpágina + filtros).

### Onde colocar a entrada na página Work (UI/UX)

1. **Menu secundário (pills)**  
   - **+ TODOS** → vai para a subpágina de todos os projetos (sem filtro).  
   - **Vídeo, VR & XR, Museus, etc.** → mesma subpágina com filtro já aplicado (ex.: `?type=museum`).  
   - Assim o “ALL” passa a refletir a realidade (lista completa) e os pills viram atalhos para a mesma página com filtro.

2. **Bloco CTA na própria Work**  
   - Colocar **abaixo do hero** (título + parágrafo) um bloco curto:  
     - Título: “Projetos realizados” / “Our portfolio”.  
     - Texto: “Uma seleção do nosso trabalho.”  
     - Botão: **“Veja todo nosso portfólio”** → `/[lang]/work/projects`.  
   - Alternativa ou complemento: na seção “Want to Work With Us?” incluir o mesmo botão (“Veja nossos projetos realizados” / “Veja todo nosso portfólio”).

3. **Menu superior (WORK)**  
   - Item principal: “Todos os projetos” / “All projects” → `/[lang]/work/projects`.  
   - Subitens: Museus, Festivais, VR, etc. → `/[lang]/work/projects?type=...`.  
   - Quem entra pelo menu já cai na subpágina com ou sem filtro.

4. **Contador “X projetos”**  
   - Na subpágina, mostrar “X projetos” (total ou filtrado) para reforçar que é a lista completa/coerente com o filtro.

---

## Estrutura técnica

- **Rota:** `/:lang/work/projects` (subpágina de todos os projetos).
- **Query:** `?type=...` e `?tag=...` para filtro vindo do menu/pills (e possivelmente `?category=...` se usar IDs de categoria).
- **Dados:** mesmo endpoint do backoffice que já devolve todos os projetos para a página `work` (hoje em `highlightProjects` para `page=work`). A subpágina usa os mesmos dados (todos) e aplica filtros no cliente ou mantém a mesma lógica de filtro que a Work.
- **Filtros na subpágina:** mesma barra de pills (ALL, Vídeo, VR & XR, Museus, Festivais, Design, Educação) no topo; ao clicar, atualiza URL e lista.
- **Títulos (i18n):**
  - PT: “Projetos realizados” / “Veja todo nosso portfólio”.
  - EN: “Our portfolio” / “View full portfolio”.
  - ES: “Proyectos realizados” / “Ver todo nuestro portafolio”.
  - FR: “Projets réalisés” / “Voir tout notre portfolio”.

---

## Resumo das mudanças

| Onde | O quê |
|------|--------|
| **Work (landing)** | CTA “Projetos realizados” + botão “Veja todo nosso portfólio” → `/work/projects`. |
| **Pills (menu secundário)** | + TODOS → `/work/projects`; Vídeo, Museus, etc. → `/work/projects?type=...`. |
| **Menu superior (WORK)** | “Todos os projetos” → `/work/projects`; subitens → `/work/projects?type=...`. |
| **Nova página** | `/:lang/work/projects`: título “Projetos realizados”/“Our portfolio”, pills, contador, grid com todos os projetos e filtros correspondentes. |

Com isso, “ALL” reflete a realidade, a CTA fica clara e a entrada na subpágina é única (menu + pills + CTA), com filtros consistentes.
