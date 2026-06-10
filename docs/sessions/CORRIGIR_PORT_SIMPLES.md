# 🔧 Corrigir Campo Port - Remover {{ }}

## ❌ PROBLEMA:

Você está usando `{{ 5432 }}` no campo Port.

Isso é uma **expressão JavaScript**, mas Port aceita **número direto**!

---

## ✅ SOLUÇÃO:

### **Remova as chaves `{{ }}`**

**ERRO:**
```
{{ 5432 }}
```

**CORRETO:**
```
5432
```

---

## 📝 PASSOS:

1. **Clique no campo Port**
2. **Apague tudo** (`{{ 5432 }}`)
3. **Digite apenas:** `5432`
4. **Salve**

---

## 💡 DICA:

- **Port** = Número direto (sem `{{ }}`)
- **Expressões `{{ }}`** = Só use quando precisar de variável ou cálculo
- **Exemplo de expressão:** `{{ $json.port }}` (se vier de outro node)

---

## ✅ CHECKLIST:

- [ ] Campo Port: `5432` (sem chaves)
- [ ] Host: Preenchido
- [ ] Database: Preenchido
- [ ] User: Preenchido
- [ ] Password: Preenchido
- [ ] SSL: Deixar como está (ou procurar em Advanced)
- [ ] Salvar e testar conexão

---

**Remova `{{ }}` e deixe apenas `5432`!** 🚀
