# 📊 SCRIPTS: DADOS DE TESTE PARA ANALYTICS

**Data:** 11/01/2026  
**Propósito:** Popular banco de dados com dados fictícios para testes do dashboard

---

## 🚀 COMO USAR:

### **1. Popular Dados de Teste**

```bash
cd azimut-cms
npx tsx scripts/populate-test-data.ts
```

**O que faz:**
- ✅ Cria **80 visitantes** variados
- ✅ Gera **sessões**, **page views**, **comportamentos**, **PWA installs**
- ✅ Usa prefixo **`TESTE_`** para identificar dados de teste
- ✅ Dados realistas (países, cidades, dispositivos, browsers, etc)

**Dados gerados:**
- ✅ VisitorSession (80 sessões)
- ✅ PageView (1-10 páginas por sessão)
- ✅ VisitorBehavior (0-5 comportamentos por sessão)
- ✅ PWAInstall (20% das sessões)
- ✅ InterestScore (para sessões com alta probabilidade de conversão)

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

## 📋 PREFIXO DE TESTE:

**Prefixo usado:** `TESTE_`

**Exemplos:**
- `TESTE_session_000001`
- `TESTE_fingerprint_000001`
- `TESTE_user1@example.com`
- `TESTE_campaign_1`

**Por que usar prefixo?**
- ✅ Fácil identificar dados de teste
- ✅ Fácil apagar todos de uma vez
- ✅ Não mistura com dados reais
- ✅ Seguro para produção

---

## 📊 DADOS GERADOS:

### **Visitantes (80 total):**
- ✅ Países: BR, CA, US, FR, ES, PT, AR, MX, CL, CO
- ✅ Cidades: variadas por país
- ✅ Dispositivos: desktop, mobile, tablet
- ✅ Browsers: Chrome, Firefox, Safari, Edge, Opera
- ✅ OS: Windows, macOS, Linux, iOS, Android
- ✅ Fingerprints únicos
- ✅ IPs aleatórios
- ✅ Visitas: 1-5 por visitante
- ✅ Engagement scores: 0-100
- ✅ Conversion probabilities: 0-100

### **Page Views:**
- ✅ 1-10 páginas por sessão
- ✅ Páginas variadas (/home, /work, /contact, etc)
- ✅ Tempo gasto: 10-310 segundos

### **Comportamentos:**
- ✅ 0-5 comportamentos por sessão
- ✅ Tipos: page_view, click, scroll, form_start, form_submit, download, video_play

### **PWA Installs:**
- ✅ 20% das sessões têm PWA instalado

### **Interest Scores:**
- ✅ Criados para sessões com alta probabilidade de conversão (>50%) ou alto engagement (>60%)
- ✅ Scores: 50-100
- ✅ Visitor types: client, lead, general

---

## 🎯 RESULTADO ESPERADO:

**Após executar o script:**

1. ✅ Dashboard mostra dados reais (não mais zeros)
2. ✅ Cards mostram números variados
3. ✅ Gráficos aparecem com dados
4. ✅ Tabelas mostram visitantes
5. ✅ Timeline mostra dados nos últimos 30 dias

**Para ver os dados:**
- Acessar: `https://backoffice.azmt.com.br/admin/analytics`
- Fazer hard refresh (Ctrl+Shift+R)
- Verificar se dados aparecem

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

**Erro: "Prisma Client not generated"**
```bash
npx prisma generate
```

**Erro: "Database connection failed"**
- Verificar variável `DATABASE_URL` no `.env`
- Verificar se banco está acessível

**Script demora muito?**
- Normal! Está criando muitos dados
- Aguardar até ver mensagem "✅ Dados de teste criados com sucesso!"

---

## 📝 NOTAS:

- **Prefixo:** `TESTE_` (facilita identificar e apagar)
- **Total:** ~80 visitantes (pode ajustar no código)
- **Dados:** Realistas mas fictícios
- **Segurança:** Prefixo garante que dados reais não são afetados

---

**✅ Pronto para usar!**
