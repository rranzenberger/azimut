# 🔍 COMO VERIFICAR SE A VARIÁVEL ESTÁ CONFIGURADA

## Verificação Rápida

### 1. No Site (azmt.com.br)

1. Acesse: https://azmt.com.br
2. Abra o **Console** (F12)
3. Digite no console:
   ```javascript
   console.log(import.meta.env.VITE_CMS_API_URL)
   ```
4. Deve aparecer:
   - ✅ `https://backoffice.azmt.com.br/api` → **Correto!**
   - ❌ `undefined` ou `http://localhost:3001/api` → **Variável não configurada!**

### 2. No Network Tab

1. Abra **DevTools** → **Network**
2. Recarregue a página
3. Filtre por **"content"**
4. Deve aparecer uma requisição para:
   ```
   https://backoffice.azmt.com.br/api/public/content?lang=pt&country=DEFAULT&page=home&sessionId=...
   ```
5. Status deve ser **200 OK**

### 3. No Vercel Dashboard

1. Acesse: https://vercel.com/dashboard
2. Selecione projeto **azimut**
3. Vá em **Settings** → **Environment Variables**
4. Deve aparecer:
   ```
   VITE_CMS_API_URL = https://backoffice.azmt.com.br/api
   ```

---

## ❌ Se Não Estiver Funcionando

1. **Verifique se fez redeploy:**
   - Variáveis `VITE_*` precisam de redeploy
   - Vá em **Deployments** → **Redeploy** do último deploy

2. **Verifique a URL:**
   - Deve ser: `https://backoffice.azmt.com.br/api`
   - ❌ Não: `https://backoffice.azmt.com.br/api/` (com barra no final)
   - ❌ Não: `http://localhost:3001/api`

3. **Verifique os ambientes:**
   - A variável deve estar marcada para **Production**
   - E também para **Preview** e **Development** (recomendado)

4. **Teste se o backoffice está funcionando:**
   - Acesse: https://backoffice.azmt.com.br/api/public/content?lang=pt&page=home
   - Deve retornar JSON (não erro 404)




















