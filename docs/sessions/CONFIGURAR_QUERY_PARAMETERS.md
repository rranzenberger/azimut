# ✅ CONFIGURAR QUERY PARAMETERS - SerpAPI

## 🎉 PARABÉNS!

Você já tem:
- ✅ Credencial "Query Auth account" criada e selecionada
- ✅ Query Parameter "q" configurado

---

## 🎯 AGORA: Adicionar os Outros Parâmetros

### Você já tem:
- ✅ **q** = `{{ $json.name }} {{ $json.company }}`

### Faltam 3 parâmetros:

#### Parâmetro 2: `engine`

1. **Clique em "Add Parameter"** (ou "+ Add Parameter")
2. **Name:** `engine`
3. **Value:** `google`
4. **Salve**

#### Parâmetro 3: `gl`

1. **Clique em "Add Parameter"** novamente
2. **Name:** `gl`
3. **Value:** `{{ $json.lang === 'en' ? 'ca' : $json.lang === 'pt' ? 'br' : $json.lang === 'es' ? 'es' : 'fr' }}`
4. **Salve**

#### Parâmetro 4: `api_key`

**IMPORTANTE:** Este parâmetro pode não ser necessário se você já configurou a credencial Query Auth!

**Mas se precisar:**
1. **Clique em "Add Parameter"**
2. **Name:** `api_key`
3. **Value:** Deixe vazio OU use a credencial criada
4. **Salve**

---

## ✅ CHECKLIST:

- [x] Credencial Query Auth criada e selecionada
- [x] Parâmetro "q" configurado
- [ ] Parâmetro "engine" adicionado (valor: `google`)
- [ ] Parâmetro "gl" adicionado (valor: expressão condicional)
- [ ] Nó SerpAPI salvo
- [ ] Testar nó (Execute step)

---

## 🧪 TESTAR:

1. **Clique em "Execute step"** (botão vermelho)
2. **Veja o resultado** na aba "OUTPUT"
3. **Se der erro, verifique os parâmetros**

---

**Adicione os 3 parâmetros faltantes e me avise quando terminar!** 🚀
