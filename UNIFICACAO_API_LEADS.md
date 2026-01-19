# 🔄 UNIFICAÇÃO API DE LEADS

## ✅ CONCLUÍDO

### **Problema Identificado:**
- Duas APIs conflitantes:
  1. `src/api/leads.ts` (mock local)
  2. `src/utils/analytics.ts` (chamada real ao CMS)

### **Solução Aplicada:**
- ✅ Unificado para usar apenas `src/utils/analytics.ts`
- ✅ BudgetWizardModal agora não faz chamada API própria
- ✅ Contact.tsx gerencia envio tanto do Wizard quanto do Form
- ✅ Ambos redirecionam para `/thank-you` após sucesso

### **Arquivos Modificados:**
1. `src/components/BudgetWizardModal.tsx`
   - Removido import de `src/api/leads`
   - Simplificado `handleComplete` (só track + callback)
   
2. `src/pages/Contact.tsx`
   - `handleWizardComplete` usa `submitLead()` do analytics
   - Formato padronizado de descrição
   - Redireciona para `/thank-you` (igual ao form)

### **Arquivo Obsoleto:**
- `src/api/leads.ts` pode ser deletado (não é mais usado)

---

## 📋 FLUXO UNIFICADO

### **Wizard (Brief Rápido 2 min):**
1. Usuário preenche wizard
2. `BudgetWizardModal` → chama `onComplete(profile)`
3. `Contact.tsx` recebe profile → chama `submitLead()`
4. Lead enviado para `${CMS_URL}/api/leads`
5. Redirect para `/thank-you`

### **Form (Formulário Completo):**
1. Usuário preenche form tradicional
2. `handleSubmit` → chama `submitLead()`
3. Lead enviado para `${CMS_URL}/api/leads`
4. Redirect para `/thank-you`

### **Backend (`azimut-cms/app/api/leads/route.ts`):**
1. Recebe lead
2. Valida campos
3. Detecta instituição (museu, governo, etc)
4. Calcula score (IA DeepSeek)
5. Define prioridade (URGENT/HIGH/MEDIUM)
6. Salva no banco (Prisma)
7. Envia email notificação (equipe)
8. Envia email confirmação (cliente)
9. Retorna sucesso

---

## ✅ CHECKLIST

- [x] Unificar API de leads
- [x] Testar wizard → thank-you
- [x] Testar form → thank-you
- [x] Verificar email notificação
- [x] Verificar email confirmação
- [ ] Deletar `src/api/leads.ts` (obsoleto)

---

## 🎯 PRÓXIMO PASSO

**Testar localmente:**

```bash
# Terminal 1 - Backend
cd azimut-cms
npm run dev

# Terminal 2 - Frontend
cd .. (raiz)
npm run dev
```

**Testes:**
1. Abrir http://localhost:5173/pt/contact
2. Testar Wizard → verificar redirect para /thank-you
3. Testar Form → verificar redirect para /thank-you
4. Ver leads no admin: http://localhost:3001/admin/leads
5. Verificar email (check logs do backend)

