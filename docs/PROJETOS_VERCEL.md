# Projetos no Vercel

**Repositório:** `rranzenberger/azimut` (origin). Pastas e checklist: [REPOSITORIO_E_PASTAS_VERCEL.md](REPOSITORIO_E_PASTAS_VERCEL.md).

**O que usamos:**

| Projeto Vercel       | Domínio                 | Pasta no repo | O que é                          |
|----------------------|-------------------------|---------------|-----------------------------------|
| **azimut-backoffice** | backoffice.azmt.com.br | `azimut-cms/` | Backoffice (Neon, leads, admin)   |
| **azimut**           | architecad.com / azmt.com.br | raiz + game | Site principal + jogo             |

- O **backoffice** é deployado no projeto **azimut-backoffice** (não existe projeto “azimut-cms” no Vercel).
- O código do backoffice fica na **pasta** `azimut-cms` do repositório; no Vercel o **projeto** se chama **azimut-backoffice**.
- Ao configurar variáveis, deploy ou integrações, use sempre o projeto **azimut-backoffice** para o backoffice.
