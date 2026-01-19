# 🔍 COMO VERIFICAR SE API KEYS JÁ ESTÃO CONFIGURADAS

## 📋 MÉTODO 1: VERIFICAR NO VERCEL (Online)

### **SITE PRINCIPAL:**

1. **Acessar:**
   ```
   https://vercel.com/rranzenberger/azimut
   ```

2. **Navegar:**
   - Clicar em **Settings** (⚙️)
   - Clicar em **Environment Variables**

3. **Procurar por:**
   ```
   VITE_CLAUDE_API_KEY
   VITE_DEEPSEEK_API_KEY
   ```

4. **Resultado:**
   - ✅ **SE APARECER:** Já está configurado! (valor oculto com ***)
   - ❌ **SE NÃO APARECER:** Precisa adicionar

---

### **BACKOFFICE:**

1. **Acessar:**
   ```
   https://vercel.com/rranzenberger/azimut-backoffice
   ```

2. **Navegar:**
   - Settings → Environment Variables

3. **Procurar por:**
   ```
   DEEPSEEK_API_KEY
   CLAUDE_API_KEY (opcional, se tiver)
   ```

---

## 📋 MÉTODO 2: VERIFICAR LOCALMENTE (No seu PC)

### **1. Verificar arquivo `.env`:**

**Localização:**
```
C:\Users\ranz\Documents\azimut-site-vite-tailwind\.env
```

**Como ver:**
1. Abrir VS Code ou editor de texto
2. Abrir o arquivo `.env` (na raiz do projeto)
3. Procurar linhas:
   ```
   VITE_CLAUDE_API_KEY=sk-ant-api03-...
   VITE_DEEPSEEK_API_KEY=sk-...
   ```

**Se o arquivo NÃO EXISTIR:**
- Precisa criar!
- Ver: `CONFIGURAR_API_KEYS_PASSO_A_PASSO.md`

---

### **2. Verificar via Terminal:**

```bash
# Ver se arquivo .env existe:
dir .env

# Ver conteúdo do .env (SEM mostrar valores completos):
type .env | findstr "API_KEY"
```

---

## 📋 MÉTODO 3: TESTAR SE ESTÁ FUNCIONANDO

### **Teste Rápido (Recomendado!):**

1. **Acessar site em produção:**
   ```
   https://azmt.com.br
   ```

2. **Abrir Console (F12)**

3. **Aguardar 15 segundos → Chatbot aparece?**
   - ✅ **SIM:** Aparecer = pode estar OK
   - ❌ **NÃO:** Não aparecer = verificar console

4. **Clicar no chatbot (se aparecer)**

5. **Enviar mensagem:** "Olá"

6. **Ver resultado:**
   - ✅ **Responde em 2-3s:** API keys funcionando!
   - ❌ **Erro "Invalid API Key":** Precisa configurar
   - ❌ **Não responde nada:** Precisa configurar

7. **Ver logs no console:**
   ```
   ⚡ Routing to DEEPSEEK
   💬 AI Used: deepseek
   ```
   - ✅ **Ver esses logs:** FUNCIONANDO!
   - ❌ **Erro vermelho:** Precisa configurar

---

## 📋 MÉTODO 4: VER NO CÓDIGO (Backoffice)

### **Verificar se arquivo de configuração existe:**

```bash
# No terminal:
cd azimut-cms
type .env | findstr "API"
```

**Procurar por:**
```
DEEPSEEK_API_KEY=sk-...
DATABASE_URL=postgresql://...
JWT_SECRET=...
```

---

## 🤔 O QUE ME PASSAR?

### **SE QUISER QUE EU AJUDE, ME DIGA:**

**1. Screenshot do Vercel:**
- Settings → Environment Variables
- (Pode deixar valores ocultos com ***)

**2. OU responda:**
```
□ Arquivo .env existe na raiz do projeto?
□ Arquivo .env tem linha VITE_CLAUDE_API_KEY=...?
□ Arquivo .env tem linha VITE_DEEPSEEK_API_KEY=...?
□ Vercel mostra essas variáveis?
□ Chatbot aparece no site https://azmt.com.br?
□ Chatbot responde mensagens?
□ Console mostra algum erro?
```

**3. OU copie os logs do console:**
```
F12 → Console → Copiar mensagens (pode ocultar partes sensíveis)
```

---

## ✅ CHECKLIST RÁPIDO

### **Para saber se já está configurado:**

```
□ Acessei Vercel do site principal
□ Vi Settings → Environment Variables
□ Procurei por VITE_CLAUDE_API_KEY
□ Procurei por VITE_DEEPSEEK_API_KEY

Resultado:
[ ] Ambas aparecem = ✅ JÁ ESTÁ CONFIGURADO!
[ ] Nenhuma aparece = ❌ PRECISA CONFIGURAR
[ ] Só uma aparece = ⚠️ FALTA A OUTRA
```

---

## 🎯 RESPOSTA RÁPIDA PARA MIM:

**Me responda uma dessas:**

**A)** "Olhei no Vercel, as duas API keys JÁ ESTÃO lá!"
→ Então só precisamos testar! 🎉

**B)** "Olhei no Vercel, NÃO TEM nenhuma API key"
→ Então preciso configurar! Sigo o guia.

**C)** "Não consigo acessar o Vercel"
→ Te ajudo a acessar!

**D)** "Arquivo .env já existe e tem as chaves"
→ Ótimo! Só falta adicionar no Vercel.

**E)** "Não sei onde olhar"
→ Te guio passo a passo agora!

---

## 💡 DICA MAIS RÁPIDA:

**Faça isso AGORA (2 minutos):**

1. Abrir: https://azmt.com.br
2. F12 (abrir console)
3. Aguardar chatbot aparecer
4. Enviar "Olá"
5. Ver o que acontece

**Me diga:**
- Chatbot apareceu?
- Respondeu algo?
- Tem erro no console?

**Com isso já sei se está funcionando ou não!** 🎯
