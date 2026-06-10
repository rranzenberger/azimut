# 📊 PLANO: IMPLEMENTAÇÃO DASHBOARD ATUALIZADO

**Status:** ✅ API testada e funcionando!
**Próximo:** Implementar dashboard

---

## 🎯 O QUE VOU IMPLEMENTAR:

### **1. Componente TimelineChart (NOVO)**
- ✅ Criado: `components/TimelineChart.tsx`
- ✅ Usa Recharts (já instalado)
- ✅ Gráfico de linha com visitantes por dia

### **2. Atualizar page.tsx**

**Mudanças:**
1. ✅ Trocar API: `/api/admin/analytics` → `/api/admin/analytics/overview`
2. ✅ Adicionar interface para dados novos
3. ✅ Criar adaptador para compatibilidade (manter dados antigos funcionando)
4. ✅ Adicionar gráfico de linha timeline
5. ✅ Adicionar cards novos (Visitantes Únicos, Retornantes, PWA)
6. ✅ Adicionar tabela visitantes com fingerprint
7. ✅ Adicionar tabela lead candidates

---

## ⚠️ ESTRATÉGIA DE IMPLEMENTAÇÃO:

### **Opção A: Troca Completa (Risco: Médio)**
- Trocar API completamente
- Remover código antigo
- Depende 100% da nova API

### **Opção B: Híbrida (Recomendado - Risco: Baixo)**
- Usar nova API para dados novos
- Manter compatibilidade com dados antigos
- Migração gradual

**Vou usar Opção B** para garantir que tudo continue funcionando!

---

## 📋 CHECKLIST:

- [x] Criar componente TimelineChart
- [ ] Atualizar page.tsx:
  - [ ] Trocar API (com adaptador)
  - [ ] Adicionar gráfico linha
  - [ ] Adicionar cards novos
  - [ ] Adicionar tabela visitantes
  - [ ] Adicionar tabela leads
- [ ] Testar localmente
- [ ] Commit e push

---

**🚀 Vou começar a implementação agora!**
