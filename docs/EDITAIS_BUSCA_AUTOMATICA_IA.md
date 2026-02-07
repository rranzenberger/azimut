# Editais: saber o que está em aberto e atualizar automaticamente com IA

## Objetivo

- Saber **quais editais estão em aberto** sem procurar manualmente.
- Usar **DeepSeek** e/ou **Claude** para fazer **buscas contínuas** e **pesquisa** por editais/chamadas (cultura, XR, cinema, inovação BR/CA).
- **Atualizar automaticamente** o backoffice com sugestões da IA; um humano revisa e marca como "Aberto" para aparecer no site.

---

## Como funciona hoje (manual)

1. Alguém entra em **Backoffice → Editais** e cadastra/edita cada edital (nome, link, prazo, status).
2. Só editais com status **Aberto** aparecem na seção "Oportunidades Ativas" do site.
3. Para não ficar defasado, é preciso **procurar** periodicamente (sites do governo, Creative BC, PROAC, etc.) e atualizar na mão.

---

## Como funciona com IA (automático + revisão)

### Fluxo geral

1. **Cron (agendado)**  
   Um job roda em horário fixo (ex.: 2x por semana) e chama a API de refresh de editais.

2. **Pesquisa com IA**  
   A API envia um prompt para **DeepSeek** ou **Claude** pedindo:
   - **Áreas:** arte, cultura, cinema, audiovisual, XR/VR, **festivais**, música, teatro, dança, museus, patrimônio, inovação criativa, educação cultural — **todos os setores** (público e privado).
   - **Brasil:** todo o país (federal, estadual, municipal, qualquer região).
   - **Canadá:** nacional e provincial (todas as províncias).
   - **Tipos de fonte:** públicos (federal, estadual, municipal, national, provincial), privados, ONGs, institutos, e **festivais** (mostras, laboratórios, residências, coprodução).
   - Resposta em **JSON**: nome, link, país, prazo, área, tipo.

3. **Salvar como sugestão**  
   Cada item retornado pela IA é salvo no banco com status **ENVIADO** (sugestão).  
   - Se já existir um edital com o mesmo nome/URL, apenas atualizamos o campo **lastChecked** (e opcionalmente prazo/status se a IA indicar).

4. **Revisão humana**  
   No backoffice, em **Editais**, aparecem:
   - Editais **Aberto** (já aprovados, visíveis no site).
   - Editais **Enviado** (sugestões da IA).  
   O usuário abre cada sugestão, confere o link e os dados, e:
   - **Aprova** → muda status para **Aberto** (passa a aparecer no site), ou
   - **Descarta** → muda para **Fechado** ou remove.

Assim você **não precisa ficar procurando** manualmente: a IA faz a pesquisa contínua; vocês só revisam e ativam o que for relevante.

---

## Por que usar IA (DeepSeek / Claude)

- **DeepSeek:** bom custo-benefício, já usado no projeto (análise de leads, SEO, etc.). Configuração: `DEEPSEEK_API_KEY` nas variáveis de ambiente.
- **Claude (Anthropic):** boa qualidade e segurança. Configuração: `ANTHROPIC_API_KEY`.

O sistema tenta **Claude primeiro**; se não houver chave ou der erro, usa **DeepSeek**. Assim dá para usar um ou outro, ou os dois (fallback).

---

## O que a IA faz (pesquisa contínua)

A IA é usada para:

1. **Pesquisar** mentalmente (com base no treinamento) editais e programas conhecidos (Lei Rouanet, PROAC, Creative BC, Canada Media Fund, etc.).
2. **Listar** nome, link oficial, país, prazo (se souber), área e tipo.
3. **Retornar** isso em JSON para o backend criar/atualizar registros.

**Limitações:**

- A IA pode **alucinar** links ou prazos. Por isso tudo entra como **ENVIADO** e só vai para **Aberto** depois de **revisão humana**.
- Para dados sempre 100% precisos, o ideal seria integrar com **APIs oficiais** ou **scraping** das páginas dos programas (trabalho maior por fonte). A IA acelera a **descoberta**; a revisão garante a **qualidade**.

---

## Como ativar a atualização automática

### 1. Variáveis de ambiente (Vercel / backoffice)

- **DeepSeek:** `DEEPSEEK_API_KEY` (já usado em outras partes do backoffice).
- **Claude (opcional):** `ANTHROPIC_API_KEY`.
- **Cron (segurança):** `CRON_SECRET` – token que o Vercel Cron envia no header para autorizar a chamada à API de refresh.

### 2. Cron no Vercel (1x ou 2x por semana)

No `vercel.json` foi adicionado:

- **Path:** `/api/cron/refresh-editais`
- **Schedule:** `0 8 * * 1,4` — **2x por semana**: segunda e quinta às 08:00.  
  Para **1x por semana** (só segunda às 08:00), use: `0 8 * * 1`.

Assim a pesquisa roda sozinha 1x ou 2x por semana e o backoffice é atualizado; se quiser que o **site já mostre** os novos editais sem revisão, veja o item abaixo.

### 2.1 Atualizar o site automaticamente (opcional)

Por padrão, os editais sugeridos pela IA são criados com status **Enviado** (só aparecem no site depois que alguém aprova no backoffice).  

Se quiser que **novos editais já entrem no site** quando o cron rodar (sem passar pelo “Aprovar”):

- No Vercel, em **Environment Variables**, crie:
  - Nome: `EDITAIS_AUTO_APPROVE`
  - Valor: `true`
- Novos editais passam a ser criados já com status **Aberto** e a seção “Oportunidades Ativas” do site é atualizada na próxima vez que a página for aberta (os dados vêm da API pública).

**Atenção:** a IA pode errar link ou prazo. Use `EDITAIS_AUTO_APPROVE=true` se confiar nas fontes ou se preferir revisar depois (editar/fechar no backoffice).

**Testar manualmente:**  
Chame `GET https://seu-backoffice.vercel.app/api/cron/refresh-editais` com header `Authorization: Bearer SEU_CRON_SECRET`. No Vercel, defina a variável `CRON_SECRET` (o próprio Vercel Cron já envia esse header quando o job dispara).

### 3. Revisar no backoffice

- **Editais →** filtrar ou olhar os com status **Enviado**.
- Abrir cada um, abrir o link, conferir se está aberto e se os dados batem.
- Aprovar (status **Aberto**) ou descartar (ex.: **Fechado**).

---

## Resumo

| Pergunta | Resposta |
|----------|----------|
| Como saber quais estão em aberto? | A IA sugere; vocês revisam no backoffice e deixam só os corretos como **Aberto**. |
| Dá para entrar automático? | Sim: o **cron** chama a API que usa **DeepSeek/Claude** para pesquisar e gravar sugestões (status **ENVIADO**). |
| Precisamos de DeepSeek/Claude? | Sim. Pelo menos uma chave (DeepSeek ou Anthropic) configurada para a pesquisa automática. |
| Como fica a pesquisa contínua? | O cron roda no horário definido (ex.: 2x por semana), faz a pesquisa via IA e atualiza o banco com novas sugestões e lastChecked. |
| E a atualização automática no site? | Os itens só aparecem no site quando estiverem com status **Aberto**. A “atualização automática” é: IA sugere → humano aprova → site mostra. |

Se quiser, no próximo passo podemos detalhar o prompt exato usado na IA e os campos do JSON que a API espera (para ajustar país, tipo, prazo, etc.).
