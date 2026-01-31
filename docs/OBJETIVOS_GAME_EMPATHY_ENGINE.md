# Objetivos do Empathy Engine (game)

O jogo **não** é um “case Rio Museu Olímpico” nem uma quest inspirada em um projeto específico para vincular a Studio/Work.

## Objetivos internos (não expor ao cliente)

1. **Captação de leads** — Quem joga pode salvar progresso, receber NFT ou pedir consultoria; os dados vão para o mesmo CRM (origem `empathy_engine`). Objetivo: captar novos leads.
2. **Mostrar o que podemos fazer / ativação de marca** — O game é uma **provinha** do que a Azimut faz. Objetivo: o cliente ver na prática que sabemos fazer.
3. **Tempo no site e entendimento** — Quem está no site fica mais tempo jogando e, pelo jogo, entende melhor o que fazemos. Objetivo: engajamento e clareza da oferta.

**Importante:** O cliente **não** deve ver que queremos “captá-lo”, “mantê-lo mais tempo” ou “pegar contato”. Isso é objetivo nosso; o copy público não pode “dar o ouro ao bandido”.

## Copy para o cliente (o que aparece no site)

Falar só em **benefício para ele**: provinha de **ativação de marcas e ações que podemos implementar no projeto dele** — no seu evento, estande em feira comercial, centro cultural, lançamento de produto, evento de divulgação, evento interno ou exposição; quiosque com game, tecnologia e audiovisual integrados; na página dele ou no evento. Nada de “capte leads”, “entenda melhor a Azimut” no sentido de nos dar contato.

## Cenários de uso (onde o game pode atuar)

- **Feira comercial** — estande com quiosque: game atrai e envolve visitantes no stand.
- **Evento** — corporativo, de divulgação ou interno: quiosque com game + tecnologia + audiovisual integrados.
- **Centro cultural** — exposição ou programação: experiência interativa na página ou no espaço.
- **Lançamento de produto** — ativação de marca com game, audiovisual e integração tecnológica.
- **Exposição** — quiosque ou link na página: visitantes jogam e conhecem o tipo de solução que a Azimut entrega.

Em todos os casos: **chamada para o jogo** com link direto (ex.: “Jogue o Empathy Engine →”) leva ao jogo no site (`/{lang}/game`). No evento presencial, o mesmo jogo pode rodar em quiosque; na página do cliente, o link integra tecnologia, audiovisual e game.

## Chamada para o jogo e link

- **Link direto:** `/{lang}/game` (ex.: `/pt/game`, `/en/game`). Usar em botões e textos de CTA.
- **Texto da chamada (i18n):** `gamePlayCta` — “Jogue o Empathy Engine” (pt), “Play Empathy Engine” (en), “Juega el Empathy Engine” (es), “Jouez à l’Empathy Engine” (fr).
- **Onde aparece:** Home (linha abaixo do botão Jogar, com link); What we do (bloco ativação de marca, link “Jogue o Empathy Engine →” para `/game`); Experience Preview (card e botão Jogar → `/game`); página do Game (meta e título).

## Onde isso aparece

- **Home:** CTA “Jogar” + linha com copy “Ativação de marca no seu evento…” + link “Jogue o Empathy Engine →” para `/{lang}/game`.
- **Soluções (What we do):** bloco “Ativação de marca no seu evento…” com link “Jogue o Empathy Engine →” para `/game`.
- **Experience Preview e página do Game:** meta description e card — mesma linha (evento, feira, estande, quiosque, tecnologia, audiovisual, centro cultural, lançamento, divulgação, interno, exposição), sem menção a captação de leads ou tempo no site.

Não criar seção “Case Rio Museu Olímpico” em Studio/Work com link “Jogue uma quest inspirada neste projeto”. O game é genérico e serve aos 3 objetivos internos acima; para o cliente é “provinha de ativação de marcas e ações”.
