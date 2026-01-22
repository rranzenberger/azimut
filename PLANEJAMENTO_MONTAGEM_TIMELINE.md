# 🎯 PLANEJAMENTO E MONTAGEM - CORREÇÃO TIMELINE

## ✅ CHECKLIST DE EXECUÇÃO

### FASE 1: VERIFICAÇÃO PRÉ-DEPLOY ✓
- [x] Fallback atualizado em `CompanyTimeline.tsx`
- [x] Período correto: 1996-2026 (30 anos)
- [x] ArchiCAD 1996 (não oficial)
- [x] AZMT 2000-2018 (oficial)
- [x] Museu Olímpico 2023-2025
- [x] Número "46" → "30" em todos idiomas
- [x] SQL de limpeza criado
- [x] SQL de correção Museu criado

---

## 📝 FASE 2: EXECUÇÃO SQL NO NEON

### Passo 1: Limpar e Popular Dados Corretos
**Arquivo:** `sql/LIMPAR_E_POPULAR_TIMELINE_CORRETO.sql`

**O que faz:**
1. Remove todos eventos < 1996 (1980, 1990, 1995)
2. Remove duplicatas de 1996
3. Remove dados incorretos de 2000
4. Insere 1996: ArchiCAD Brasil (milestone)
5. Insere 2000-2018: AZMT Centro Autodesk (partnership)

**Executar em:** https://console.neon.tech
```sql
-- Copiar TODO o conteúdo de sql/LIMPAR_E_POPULAR_TIMELINE_CORRETO.sql
-- Colar no Neon SQL Editor
-- Executar
```

**Resultado esperado:**
- `ano_mais_antigo = 1996`
- Eventos de 1996 e 2000 criados corretamente

---

### Passo 2: Corrigir Museu Olímpico
**Arquivo:** `sql/corrigir_museu_olimpico.sql`

**O que faz:**
1. Localiza registro do Museu Olímpico
2. Atualiza `year = 2023`, `yearEnd = 2025`
3. Atualiza descrição para "pós Olimpíadas 2016"

**Executar em:** https://console.neon.tech
```sql
-- Copiar TODO o conteúdo de sql/corrigir_museu_olimpico.sql
-- Colar no Neon SQL Editor
-- Executar
```

**Resultado esperado:**
- Museu Olímpico: 2023-2025 ✓

---

## 🚀 FASE 3: COMMIT E DEPLOY

### Arquivos Modificados:
```
✓ src/components/CompanyTimeline.tsx
✓ src/pages/StudioCredentials.tsx
✓ sql/LIMPAR_E_POPULAR_TIMELINE_CORRETO.sql
✓ sql/corrigir_museu_olimpico.sql
✓ sql/corrigir_timeline_1996.sql
✓ TIMELINE_CORRIGIDA_RESUMO.md
```

### Comandos Git:
```bash
# 1. Adicionar todos os arquivos
git add .

# 2. Commit com mensagem descritiva
git commit -m "fix: timeline correta - 30 anos (1996-2026), ArchiCAD início, AZMT 2000 oficial, Museu 2023-2025"

# 3. Push para produção
git push origin main
```

---

## 🔍 FASE 4: VALIDAÇÃO PÓS-DEPLOY

### Checklist de Testes:
- [ ] Acessar: https://azmt.com.br/studio/credibilidade
- [ ] Verificar número "30 anos" aparece (não 46)
- [ ] Timeline começa em 1996 (não 1980/1990)
- [ ] 1996: ArchiCAD Brasil
- [ ] 2000-2018: AZMT Centro Autodesk
- [ ] 2023-2025: Museu Olímpico
- [ ] Testar em PT/EN/ES/FR

### Se aparecer erro 404 na API:
- Aguardar 2-3 minutos (deploy do backoffice)
- Limpar cache do navegador (Ctrl+Shift+R)
- Verificar console do navegador

---

## 📊 RESUMO DAS CORREÇÕES

| Item | Antes | Depois | Status |
|------|-------|--------|--------|
| Início | 1980 | 1996 | ✅ |
| Anos | 46 | 30 | ✅ |
| Autodesk | 1996-2018 "oficial" | 2000-2018 "oficial" | ✅ |
| Museu | 2015-2017 | 2023-2025 | ✅ |
| 1996 | "Fundação" | "ArchiCAD Brasil" | ✅ |

---

## 🎯 ORDEM DE EXECUÇÃO:

1. ✅ **CÓDIGO ATUALIZADO** (já feito)
2. ⏳ **SQL PASSO 1** → Execute no Neon
3. ⏳ **SQL PASSO 2** → Execute no Neon
4. ⏳ **GIT COMMIT** → Execute comandos acima
5. ⏳ **GIT PUSH** → Deploy automático
6. ⏳ **VALIDAR** → Testar site em produção

---

## ⚠️ IMPORTANTE:
- Execute os SQLs **ANTES** do push (para dados já estarem corretos)
- Ou execute **DEPOIS** (fallback garante que site funcione)
- Recomendado: SQL primeiro, depois push
