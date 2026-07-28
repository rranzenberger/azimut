# 🤖 MILA — Sequência de Follow-up (3 e-mails)
**Para plugar no n8n workflow da Mila (id H4cV8R4ky7RsIzSO)**
**Trigger:** lead entra pelo formulário do site (contact, partner ou game)

---

## E-MAIL 1 — Dia 1 (envio imediato após o formulário)
**Assunto:** Recebemos sua mensagem — próximo passo

Olá {{nome}},

Recebi sua mensagem e já estou analisando o que você precisa.

Sou a Mila, assistente da Azimut. Ranz vai entrar em contato pessoalmente em até 24h úteis.

Enquanto isso, dois links que podem te ajudar:
→ Nosso portfólio completo: https://azimutimmersive.com/pt/work
→ O case do Rio Museu Olímpico: https://azimutimmersive.com/pt/work/museu-olimpico-rio

Se tiver urgência, fale direto pelo WhatsApp: https://wa.me/5548999701301

Até breve,
Mila — Azimut

---

## E-MAIL 2 — Dia 3 (se não houve resposta)
**Assunto:** Uma referência que pode ser útil para você

Olá {{nome}},

Só passando para garantir que recebeu minha mensagem anterior.

Enquanto aguarda o retorno do Ranz, preparei algo específico para o seu perfil:

{{#if tipo == "museu"}}
→ Guia: Como criar uma exposição imersiva para museus
https://azimutimmersive.com/pt/blog/como-criar-exposicao-imersiva-museus
{{/if}}
{{#if tipo == "marca/evento"}}
→ Referência: Ativações imersivas para eventos corporativos
https://azimutimmersive.com/pt/blog/custo-instalacao-vr-evento-corporativo
{{/if}}
{{#if tipo == "parceiro"}}
→ Nossa página de parcerias e co-produção:
https://azimutimmersive.com/pt/partner
{{/if}}

A Azimut entregou o Rio Museu Olímpico — 1.700 m², 80 experiências, +20 mil visitantes. Posso mostrar como faríamos algo para você.

Mila — Azimut
WhatsApp: https://wa.me/5548999701301

---

## E-MAIL 3 — Dia 7 (último follow-up)
**Assunto:** Última mensagem da Azimut — fica o convite aberto

Olá {{nome}},

Esta é minha última mensagem automática. Não quero encher sua caixa de entrada.

Se o momento não for agora, tudo bem. Guarda nosso contato — quando tiver um projeto imersivo, a Azimut está aqui com 30 anos de entrega e o time do Rio Museu Olímpico.

Quando quiser retomar:
→ Site: https://azimutimmersive.com
→ WhatsApp direto com o Ranz: https://wa.me/5548999701301
→ E-mail: contact@azimutimmersive.com

Foi um prazer,
Mila — Azimut

---

## Configuração no n8n (nós a atualizar)

- **Nó 1 (trigger):** Webhook do formulário do site → captura nome, email, tipo
- **Nó 2 (email 1):** Send Email, delay = 0min
- **Nó 3 (wait):** 3 dias
- **Nó 4 (check):** verificar se houve resposta/reunião agendada (se sim, para)
- **Nó 5 (email 2):** Send Email com conteúdo condicional por tipo
- **Nó 6 (wait):** 4 dias
- **Nó 7 (check):** verificar novamente
- **Nó 8 (email 3):** Send Email final
- **Nó 9 (tag CRM):** marcar lead como "Follow-up completo"

**Variáveis:** {{nome}}, {{email}}, {{tipo}} (museu / marca / parceiro / outro)
