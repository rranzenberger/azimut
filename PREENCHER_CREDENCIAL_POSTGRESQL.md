# 🔑 PREENCHER CREDENCIAL POSTGRESQL - Passo a Passo Visual

## 📋 O QUE PREENCHER EM CADA CAMPO:

Você está vendo a tela "Postgres account". Veja o que preencher:

---

## 🎯 CAMPOS PARA PREENCHER:

### 1. **Host** (Campo com "localhost")

**Apague "localhost" e digite:**
```
ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech
```

**OU copie e cole:**
```
ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech
```

---

### 2. **Database** (Campo com "postgres")

**Apague "postgres" e digite:**
```
neondb
```

---

### 3. **User** (Campo com "postgres")

**Apague "postgres" e digite:**
```
neondb_owner
```

---

### 4. **Password** (Campo vazio)

**Digite ou cole:**
```
npg_W8VkhFvGTHj2
```

---

### 5. **Port** (Se houver campo)

**Digite:**
```
5432
```

---

### 6. **SSL** (Se houver dropdown)

**Selecione:**
```
require
```

⚠️ **IMPORTANTE:** Neon sempre requer SSL!

---

## ✅ EXEMPLO VISUAL:

```
┌─────────────────────────────────────┐
│ Postgres account                   │
│ Postgres                           │
├─────────────────────────────────────┤
│ Host:                              │
│ [ep-crimson-firefly-ac8akobs-...]  │ ← Cole aqui
│                                     │
│ Database:                           │
│ [neondb                          ]  │ ← Digite aqui
│                                     │
│ User:                               │
│ [neondb_owner                    ]  │ ← Digite aqui
│                                     │
│ Password:                           │
│ [npg_W8VkhFvGTHj2                ]  │ ← Cole aqui
│                                     │
│ Port:                               │
│ [5432                            ]  │ ← Digite aqui
│                                     │
│ SSL:                                │
│ [require                        ▼]  │ ← Selecione
│                                     │
│              [Save]                 │
└─────────────────────────────────────┘
```

---

## 📋 CHECKLIST:

- [ ] Host: `ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech`
- [ ] Database: `neondb`
- [ ] User: `neondb_owner`
- [ ] Password: `npg_W8VkhFvGTHj2`
- [ ] Port: `5432` (se houver campo)
- [ ] SSL: `require` (se houver dropdown)
- [ ] Clicou em "Save"

---

## 🧪 DEPOIS DE SALVAR:

1. **Volte para o nó PostgreSQL**
2. **Clique em "Select Credential"**
3. **Selecione a credencial que você criou**
4. **O triângulo vermelho deve desaparecer!** ✅

---

## 💡 DICAS:

- **Copie e cole:** É mais fácil copiar os valores
- **SSL obrigatório:** Sempre selecione "require" para Neon
- **Teste:** Se houver botão "Test", use antes de salvar

---

**Preencha os campos e clique em "Save"! Depois me avise se funcionou!** 🚀
