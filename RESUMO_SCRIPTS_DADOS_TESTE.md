# ✅ RESUMO: SCRIPTS PARA DADOS DE TESTE

**Data:** 11/01/2026  
**Status:** ✅ Scripts criados e prontos para usar!

---

## ✅ O QUE FOI CRIADO:

### **1. Scripts:**
- ✅ `azimut-cms/scripts/populate-test-data.ts` - Popular dados de teste
- ✅ `azimut-cms/scripts/delete-test-data.ts` - Apagar dados de teste
- ✅ `azimut-cms/scripts/README_TEST_DATA.md` - Documentação

### **2. Prefixo de Teste:**
- ✅ **`TESTE_`** - Usado para identificar todos os dados de teste
- ✅ Fácil de identificar e apagar depois

---

## 🚀 COMO USAR:

### **1. Popular Dados de Teste (80 visitantes)**

```bash
cd azimut-cms
npx tsx scripts/populate-test-data.ts
```

**O que faz:**
- ✅ Cria **80 visitantes** variados
- ✅ Gera ~400 page views
- ✅ Gera ~200 comportamentos
- ✅ Gera ~16 PWA installs
- ✅ Gera ~40 interest scores
- ✅ Usa prefixo **`TESTE_`** em todos os dados
- ⏱️ Demora ~1-2 minutos

### **2. Apagar Dados de Teste**

```bash
cd azimut-cms
npx tsx scripts/delete-test-data.ts
```

**O que faz:**
- ✅ Apaga **TODOS** os dados com prefixo `TESTE_`
- ✅ Remove em ordem correta (respeitando foreign keys)
- ✅ Dados reais **NÃO** são afetados

---

## 📊 DADOS GERADOS:

### **Visitantes (80 total):**
- ✅ Países: BR, CA, US, FR, ES, PT, AR, MX, CL, CO
- ✅ Cidades: variadas por país
- ✅ Dispositivos: desktop, mobile, tablet
- ✅ Browsers: Chrome, Firefox, Safari, Edge, Opera
- ✅ OS: Windows, macOS, Linux, iOS, Android
- ✅ Fingerprints: TESTE_fingerprint_000001, etc
- ✅ Visitas: 1-5 por visitante
- ✅ Engagement scores: 0-100
- ✅ Conversion probabilities: 0-100
- ✅ Datas: distribuídas nos últimos 30 dias

### **Outros Dados:**
- ✅ Page Views: ~400 (1-10 por sessão)
- ✅ Comportamentos: ~200 (0-5 por sessão)
- ✅ PWA Installs: ~16 (20% das sessões)
- ✅ Interest Scores: ~40 (sessões com alta conversão)

---

## 🎯 RESULTADO ESPERADO:

**Após executar o script:**

1. ✅ Dashboard mostra dados reais (não mais zeros)
2. ✅ Cards mostram números variados (~80 sessões, ~16 PWA installs, etc)
3. ✅ Gráficos aparecem com dados
4. ✅ Tabelas mostram visitantes
5. ✅ Timeline mostra pontos nos últimos 30 dias

---

## ⚠️ IMPORTANTE:

**Antes de fazer deploy em produção:**
- ✅ Execute `delete-test-data.ts` para apagar dados de teste
- ✅ Verifique se não há dados com prefixo `TESTE_` no banco

**Em produção:**
- ❌ **NÃO** execute `populate-test-data.ts`
- ✅ Use apenas dados reais

---

## 📝 PREFIXO:

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

## 🛠️ TROUBLESHOOTING:

**Erro: "Cannot find module 'tsx'"**
- ✅ **tsx já está instalado** (verificado)

**Erro: "Prisma Client not generated"**
```bash
npx prisma generate
```

**Erro: "Database connection failed"**
- Verificar `DATABASE_URL` no `.env`
- Verificar se banco está acessível

**Script demora muito?**
- ✅ Normal! Está criando muitos dados
- ✅ Aguardar 1-2 minutos

---

**✅ Pronto para usar!**

**Próximo passo:** Executar `npx tsx scripts/populate-test-data.ts`
