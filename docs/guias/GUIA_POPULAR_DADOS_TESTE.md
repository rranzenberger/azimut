# 📊 GUIA: POPULAR DADOS DE TESTE PARA ANALYTICS

**Data:** 11/01/2026  
**Propósito:** Popular banco de dados com dados fictícios para testes do dashboard

---

## ✅ O QUE FOI CRIADO:

### **1. Scripts Criados:**
- ✅ `azimut-cms/scripts/populate-test-data.ts` - Popular dados de teste
- ✅ `azimut-cms/scripts/delete-test-data.ts` - Apagar dados de teste
- ✅ `azimut-cms/scripts/README_TEST_DATA.md` - Documentação

### **2. Prefixo de Teste:**
- ✅ **`TESTE_`** - Usado para identificar todos os dados de teste
- ✅ Fácil de identificar e apagar depois

---

## 🚀 COMO USAR:

### **1. Popular Dados de Teste**

```bash
cd azimut-cms
npx tsx scripts/populate-test-data.ts
```

**O que faz:**
- ✅ Cria **80 visitantes** variados
- ✅ Gera dados realistas (países, cidades, dispositivos, browsers, etc)
- ✅ Usa prefixo **`TESTE_`** em todos os dados
- ✅ Demora ~1-2 minutos (cria muitos dados)

**Dados gerados:**
- ✅ VisitorSession (80 sessões)
- ✅ PageView (1-10 páginas por sessão = ~400 page views)
- ✅ VisitorBehavior (0-5 comportamentos por sessão = ~200 comportamentos)
- ✅ PWAInstall (20% das sessões = ~16 installs)
- ✅ InterestScore (para sessões com alta conversão = ~40 scores)

---

### **2. Apagar Dados de Teste**

```bash
cd azimut-cms
npx tsx scripts/delete-test-data.ts
```

**O que faz:**
- ✅ Apaga **TODOS** os dados que começam com `TESTE_`
- ✅ Remove em ordem correta (respeitando foreign keys)
- ✅ Mostra quantos registros foram apagados

**⚠️ ATENÇÃO:**
- Este script apaga **TODOS** os dados de teste
- Dados reais (sem prefixo `TESTE_`) **NÃO** são afetados
- Execute apenas quando quiser limpar os dados de teste

---

## 📊 DADOS GERADOS:

### **Visitantes (80 total):**
- ✅ **Países:** BR, CA, US, FR, ES, PT, AR, MX, CL, CO
- ✅ **Cidades:** variadas por país (São Paulo, Toronto, New York, etc)
- ✅ **Dispositivos:** desktop, mobile, tablet
- ✅ **Browsers:** Chrome, Firefox, Safari, Edge, Opera
- ✅ **OS:** Windows, macOS, Linux, iOS, Android
- ✅ **Fingerprints únicos:** TESTE_fingerprint_000001, etc
- ✅ **IPs aleatórios:** 192.168.x.x format
- ✅ **Visitas:** 1-5 por visitante (isReturning se > 1)
- ✅ **Engagement scores:** 0-100
- ✅ **Conversion probabilities:** 0-100
- ✅ **Bounce rates:** 0-100%
- ✅ **Datas:** distribuídas nos últimos 30 dias

### **Page Views (~400 total):**
- ✅ **Páginas:** /, /en, /work, /contact, /academy, etc
- ✅ **Tempo gasto:** 10-310 segundos por página
- ✅ **Datas:** distribuídas ao longo da sessão

### **Comportamentos (~200 total):**
- ✅ **Tipos:** page_view, click, scroll, form_start, form_submit, download, video_play
- ✅ **Páginas:** variadas
- ✅ **0-5 comportamentos por sessão**

### **PWA Installs (~16 total):**
- ✅ **20% das sessões** têm PWA instalado
- ✅ **Type:** 'installed'
- ✅ **Outcome:** 'accepted'
- ✅ **Device/Browser:** variados

### **Interest Scores (~40 total):**
- ✅ **Criados para sessões com alta conversão (>50%) ou alto engagement (>60%)**
- ✅ **Scores:** 0-100 para cada categoria
- ✅ **Visitor types:** client (score > 75), lead (score > 60), general
- ✅ **Conversion scores:** 50-100

---

## 🎯 RESULTADO ESPERADO:

**Após executar o script:**

1. ✅ Dashboard mostra dados reais (não mais zeros)
2. ✅ Cards mostram números variados:
   - Total de Sessões: ~80
   - Visitantes Únicos: ~80
   - Retornantes: ~20-30
   - PWA Installs: ~16
   - Page Views: ~400
   - Leads Quentes/Mornos: variados
3. ✅ Gráficos aparecem com dados:
   - Timeline mostra pontos nos últimos 30 dias
   - Distribuição de scores mostra fatias
   - Tipos de visitantes mostra barras
   - Visitantes por país mostra distribuição
4. ✅ Tabelas mostram visitantes:
   - Visitantes com fingerprint: ~80
   - Lead candidates: ~20-40

---

## 🔍 COMO VERIFICAR:

### **1. Executar Script:**
```bash
cd azimut-cms
npx tsx scripts/populate-test-data.ts
```

**Aguardar:**
- ✅ Ver mensagens "✅ Criados X/80 visitantes..."
- ✅ Ver "✅ Dados de teste criados com sucesso!"

### **2. Verificar Dashboard:**
- ✅ Acessar: `https://backoffice.azmt.com.br/admin/analytics`
- ✅ Fazer hard refresh (Ctrl+Shift+R)
- ✅ Verificar se dados aparecem
- ✅ Verificar se gráficos aparecem
- ✅ Verificar se tabelas aparecem

### **3. Verificar Banco (Opcional):**
```bash
npx prisma studio
```
- ✅ Abrir VisitorSession
- ✅ Verificar se há dados com prefixo `TESTE_`
- ✅ Verificar se há ~80 registros

---

## 🗑️ COMO APAGAR:

### **1. Apagar Dados de Teste:**

```bash
cd azimut-cms
npx tsx scripts/delete-test-data.ts
```

**Aguardar:**
- ✅ Ver mensagens de remoção
- ✅ Ver "✅ Todos os dados de teste foram apagados!"

### **2. Verificar Remoção:**
```bash
npx prisma studio
```
- ✅ Abrir VisitorSession
- ✅ Verificar se não há dados com prefixo `TESTE_`
- ✅ Dados reais (sem prefixo) devem estar intactos

---

## ⚠️ IMPORTANTE:

**Antes de fazer deploy em produção:**
- ✅ Execute `delete-test-data.ts` para apagar dados de teste
- ✅ Verifique se não há dados com prefixo `TESTE_` no banco
- ✅ Certifique-se de que apenas dados reais estão no banco

**Em produção:**
- ❌ **NÃO** execute `populate-test-data.ts`
- ✅ Use apenas dados reais de visitantes

---

## 🛠️ TROUBLESHOOTING:

**Erro: "Cannot find module 'tsx'"**
```bash
npm install -D tsx
```
✅ **Solução:** tsx já está instalado (verificado)

**Erro: "Prisma Client not generated"**
```bash
npx prisma generate
```

**Erro: "Database connection failed"**
- Verificar variável `DATABASE_URL` no `.env`
- Verificar se banco está acessível

**Script demora muito?**
- ✅ Normal! Está criando muitos dados
- ✅ Aguardar até ver mensagem "✅ Dados de teste criados com sucesso!"
- ✅ Pode demorar 1-2 minutos

**Não aparecem dados no dashboard?**
- ✅ Fazer hard refresh (Ctrl+Shift+R)
- ✅ Verificar se script executou com sucesso
- ✅ Verificar se há dados no banco (prisma studio)

---

## 📝 NOTAS:

- **Prefixo:** `TESTE_` (facilita identificar e apagar)
- **Total:** ~80 visitantes (pode ajustar no código)
- **Dados:** Realistas mas fictícios
- **Segurança:** Prefixo garante que dados reais não são afetados
- **Performance:** Script pode demorar 1-2 minutos (cria muitos dados)

---

## 🎯 PRÓXIMOS PASSOS:

1. ✅ **Executar script de popular:**
   ```bash
   cd azimut-cms
   npx tsx scripts/populate-test-data.ts
   ```

2. ✅ **Verificar dashboard:**
   - Acessar: `https://backoffice.azmt.com.br/admin/analytics`
   - Fazer hard refresh (Ctrl+Shift+R)
   - Verificar se dados aparecem

3. ✅ **Testar funcionalidades:**
   - Verificar cards
   - Verificar gráficos
   - Verificar tabelas

4. ✅ **Quando terminar testes:**
   ```bash
   npx tsx scripts/delete-test-data.ts
   ```

---

**✅ Pronto para usar!**
