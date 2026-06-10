# ⚠️ CORRIGIR SSL - Erro Comum!

## ❌ ERRO:

Você colocou **`5432`** no campo SSL, mas:
- **5432** = **Porta** (já está correto no campo Port)
- **SSL** = Precisa ser **`require`** ou **`required`**

---

## ✅ CORREÇÃO:

### Campo SSL:

**Apague `5432` e digite:**
```
require
```

**OU selecione no dropdown:**
- `require`
- `required`
- `yes`

**NÃO use `5432` no campo SSL!**

---

## ✅ RESUMO DOS CAMPOS:

### Campos corretos:

1. **Host:** `ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech`
2. **Database:** `neondb`
3. **User:** `neondb_owner`
4. **Password:** `npg_W8VkhFvGTHj2`
5. **Port:** `5432` ✅ (este está correto!)
6. **SSL:** `require` ⚠️ (NÃO 5432!)

---

## 🎯 CORREÇÃO RÁPIDA:

1. **Vá no campo SSL**
2. **Apague `5432`**
3. **Digite:** `require`
4. **OU selecione no dropdown:** `require`
5. **Salve**

---

## ✅ CHECKLIST CORRIGIDO:

- [ ] Host: `ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech`
- [ ] Database: `neondb`
- [ ] User: `neondb_owner`
- [ ] Password: `npg_W8VkhFvGTHj2`
- [ ] Port: `5432` ✅
- [ ] SSL: `require` ⚠️ (NÃO 5432!)
- [ ] Salvou credencial

---

**Corrija o campo SSL para `require` e salve!** 🚀
