# 🗂️ ÍNDICE DE CHECKPOINTS E DOCUMENTAÇÃO

**Última atualização:** 2026-01-11 03:30 AM

---

## 📚 DOCUMENTOS PRINCIPAIS

### 🔴 BUG CRÍTICO
| Documento | Descrição | Quando Ler |
|-----------|-----------|------------|
| **[CHECKPOINT_SERVICEDETAIL_2026-01-11.md](CHECKPOINT_SERVICEDETAIL_2026-01-11.md)** | Diagnóstico completo do bug em ServiceDetail.tsx | Se quiser entender o bug |
| **[PLANO_B_SERVICEDETAIL.md](PLANO_B_SERVICEDETAIL.md)** | 8 estratégias para resolver o bug | Se quiser resolver o bug |

### ✅ TAREFAS E RESUMOS
| Documento | Descrição | Quando Ler |
|-----------|-----------|------------|
| **[TODO_AMANHA.md](TODO_AMANHA.md)** | Lista de tarefas e testes | Todo dia de manhã |
| **[RESUMO_SESSAO_2026-01-11.md](RESUMO_SESSAO_2026-01-11.md)** | O que foi feito durante a noite | Para overview rápido |

---

## 🎯 DECISÕES RÁPIDAS

### "Preciso resolver o bug AGORA!"
1. Leia **PLANO_B_SERVICEDETAIL.md** → Estratégia 1 (Workaround - 5 min)
2. Implemente redirect temporário
3. Commit e deploy

### "Quero entender o bug primeiro"
1. Leia **CHECKPOINT_SERVICEDETAIL_2026-01-11.md**
2. Veja seções "Investigação" e "Evidências"
3. Depois leia **PLANO_B_SERVICEDETAIL.md** para soluções

### "O que fazer hoje?"
1. Leia **TODO_AMANHA.md**
2. Siga checklist de testes
3. Configure Google Analytics

### "Resumo de tudo"
1. Leia **RESUMO_SESSAO_2026-01-11.md**
2. Veja "O que foi implementado"
3. Veja "Próximas ações"

---

## 🔍 BUSCA RÁPIDA

### Por Tipo de Conteúdo

**Diagnóstico de Bugs:**
- `CHECKPOINT_SERVICEDETAIL_2026-01-11.md` - Bug do ServiceDetail

**Soluções e Workarounds:**
- `PLANO_B_SERVICEDETAIL.md` - 8 estratégias alternativas

**Tarefas:**
- `TODO_AMANHA.md` - O que fazer hoje/amanhã

**Histórico:**
- `RESUMO_SESSAO_2026-01-11.md` - O que foi feito

---

## 📊 STATUS ATUAL DO PROJETO

### ✅ Funcional
- ✅ Homepage
- ✅ Menu de navegação
- ✅ Seletor de idiomas
- ✅ Rota `/academy/research`
- ✅ Chatbot IA
- ✅ Google Analytics (falta configurar ID)
- ✅ Formulários
- ✅ Backoffice

### 🔴 Com Problemas
- 🔴 ServiceDetail.tsx (`/what/:slug`)
  - Renderiza apenas 3 seções
  - Conteúdo principal desaparece
  - Causa desconhecida

### 🟡 Pendentes
- 🟡 Verificar todas as subpáginas
- 🟡 Melhorar visual das páginas
- 🟡 Implementar melhorias premium

---

## 🛠️ FERRAMENTAS E COMANDOS

### Desenvolvimento Local
```bash
# Iniciar servidor dev
npm run dev

# Build de produção (testar se bug existe)
npm run build
npm run preview

# Ver logs do Git
git log --oneline -5

# Restaurar arquivo (se der merda)
git restore src/pages/ServiceDetail.tsx
```

### Debug
```bash
# Abrir React DevTools no browser
# Chrome → Extensões → React Developer Tools

# Ver console do browser
# F12 → Console

# Ver árvore de componentes
# F12 → React → Components
```

### Commits Importantes
```bash
# Checkpoint principal (último estado seguro)
git show a4169c2

# Ver mudanças em ServiceDetail
git log --oneline -- src/pages/ServiceDetail.tsx

# Diff de um commit específico
git diff a4169c2 HEAD
```

---

## 🚨 TROUBLESHOOTING RÁPIDO

### "Site não carrega"
1. Ver console (F12)
2. Copiar erro
3. Buscar no Google ou me enviar

### "ServiceDetail vazio"
1. **CONHECIDO!** Leia `CHECKPOINT_SERVICEDETAIL_2026-01-11.md`
2. Considere workaround temporário
3. Ou tente Plano B

### "Mudei algo e quebrou"
1. Ver últimas mudanças: `git diff`
2. Restaurar: `git restore arquivo.tsx`
3. Ou voltar commit: `git reset --hard a4169c2`

### "Perdi o rumo"
1. Leia `TODO_AMANHA.md` (tarefas prioritárias)
2. Leia `RESUMO_SESSAO_2026-01-11.md` (contexto)
3. Ou me pergunte!

---

## 📞 CONTATOS E RECURSOS

### Documentação Online
- React: https://react.dev
- React Router: https://reactrouter.com
- Tailwind CSS: https://tailwindcss.com
- Vite: https://vitejs.dev

### APIs e Serviços
- Google Analytics: https://analytics.google.com
- Claude API: https://console.anthropic.com
- DeepSeek API: https://platform.deepseek.com
- Vercel: https://vercel.com

### Comunidade
- Stack Overflow (pesquisar bugs)
- GitHub Issues (React Router)
- Discord (Vite, React)

---

## 📌 ATALHOS PARA IA (Claude/DeepSeek)

### Comandos Úteis
- **"continuar do checkpoint"** → Lê `CHECKPOINT_SERVICEDETAIL_2026-01-11.md`
- **"como resolver bug"** → Lê `PLANO_B_SERVICEDETAIL.md`
- **"o que fazer agora"** → Lê `TODO_AMANHA.md`
- **"resumo da sessão"** → Lê `RESUMO_SESSAO_2026-01-11.md`

### Contexto Rápido
```markdown
Há um bug crítico em ServiceDetail.tsx:
- Página renderiza apenas 3 seções (breadcrumbs, projetos, CTAs)
- Todo o conteúdo principal desaparece
- 8 tentativas de correção falharam
- Bug está PAUSADO até próxima sessão
- Workaround disponível em PLANO_B (Estratégia 1)
```

---

## 🎯 FLUXOGRAMA DE DECISÃO

```
Você está aqui
    ↓
Precisa resolver algo?
    ├─ SIM → Que tipo?
    │   ├─ Bug crítico → CHECKPOINT_SERVICEDETAIL_2026-01-11.md
    │   ├─ Tarefas hoje → TODO_AMANHA.md
    │   └─ Entender projeto → RESUMO_SESSAO_2026-01-11.md
    │
    └─ NÃO → Apenas explorar?
        ├─ Ver mudanças → git log
        ├─ Testar local → npm run dev
        └─ Ver deploy → https://azmt.com.br
```

---

**Criado:** 2026-01-11 03:35 AM  
**Versão:** 1.0  
**Próxima atualização:** Quando resolver bug ou adicionar novos checkpoints
