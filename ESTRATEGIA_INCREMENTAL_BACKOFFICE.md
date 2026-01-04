# 🎯 ESTRATÉGIA INCREMENTAL SEGURA - BACKOFFICE MULTILÍNGUE

**Data**: 03 de janeiro de 2025  
**Tempo estimado**: 20-30 minutos (com testes)  
**Abordagem**: Por etapas, com rollback em cada passo

---

## 🚨 **POR QUÊ ESSA ABORDAGEM?**

Aprendemos com a experiência anterior:
- ❌ **Antes**: Script completo de uma vez → quebrou tudo
- ✅ **Agora**: Etapas pequenas, testando cada uma

**Vantagens:**
1. Se quebrar, afeta só a etapa atual
2. Fácil reverter (rollback em cada script)
3. Validação constante (teste após cada etapa)
4. Confiança gradual (vê funcionando aos poucos)

---

## 📊 **PLANO COMPLETO - 5 ETAPAS:**

### **ETAPA 1: HOME - PORTUGUÊS** 🇧🇷
**Arquivo**: `azimut-cms/scripts/ETAPA-1-home-pt.sql`  
**Tempo**: 5 minutos  
**Risco**: ⭐⭐ Baixo

**O que faz:**
1. Verifica se página existe
2. Cria página (se não existir)
3. Popula hero + pillars em português
4. Query de verificação
5. Como testar (API + site)
6. Rollback se der problema

**Testar:**
- API: `curl ...?lang=pt&page=home`
- Site: `https://azimut.art/pt`

**✅ SÓ AVANÇAR SE FUNCIONAR!**

---

### **ETAPA 2: HOME - INGLÊS** 🇨🇦
**Arquivo**: `azimut-cms/scripts/ETAPA-2-home-en.sql`  
**Tempo**: 5 minutos  
**Risco**: ⭐⭐ Baixo (já validamos o fluxo)

**O que faz:**
1. Verifica se português está OK
2. Adiciona inglês
3. Query de verificação
4. Como testar
5. Rollback

**Testar:**
- API: `curl ...?lang=en&page=home`
- Site: `https://azimut.art/en`

---

### **ETAPA 3: HOME - FRANCÊS E ESPANHOL** 🇫🇷 🇪🇸
**Arquivo**: `azimut-cms/scripts/ETAPA-3-home-fr-es.sql`  
**Tempo**: 5 minutos  
**Risco**: ⭐ Muito baixo

**O que faz:**
1. Adiciona FR e ES juntos (já validamos o padrão)
2. Query de verificação
3. Como testar
4. Rollback

**Testar:**
- API: `curl ...?lang=fr&page=home` e `...?lang=es&page=home`
- Site: `https://azimut.art/fr` e `https://azimut.art/es`

---

### **✅ CHECKPOINT: HOME 100% COMPLETA!**

Agora você pode:
- Usar o site em 4 idiomas
- Ver que funciona perfeitamente
- Ter confiança para fazer outras páginas

---

### **ETAPA 4: OUTRAS PÁGINAS (ACADEMY, STUDIO, WORK, SOLUTIONS)** 📄
**Arquivos**: Scripts separados para cada uma  
**Tempo**: 5 minutos cada  
**Risco**: ⭐ Muito baixo (já sabemos que funciona)

**Ordem sugerida:**
1. **Academy** (mais simples, sem pillars)
2. **Studio**
3. **Work**
4. **Solutions**

**Posso criar scripts separados para cada uma se quiser!**

---

## 🎯 **COMO EXECUTAR:**

### **1. ABRIR NEON SQL EDITOR:**
https://console.neon.tech/ → Projeto → SQL Editor

### **2. EXECUTAR ETAPA 1:**
1. Copiar todo `ETAPA-1-home-pt.sql`
2. Colar no editor
3. Executar (Run ou Ctrl+Enter)
4. **VERIFICAR** query final (deve mostrar dados em português)
5. **TESTAR** API (curl)
6. **TESTAR** site (abrir no navegador)

### **3. SE FUNCIONAR:**
✅ Executar Etapa 2

### **4. SE NÃO FUNCIONAR:**
❌ Executar o ROLLBACK do final do script  
❌ Avisar aqui qual erro apareceu  
❌ Não avançar para próxima etapa

---

## 🔄 **ROLLBACK (REVERTER):**

Cada script tem um bloco de rollback no final:

```sql
-- ROLLBACK (copiar e executar se der problema)
UPDATE "Page"
SET 
  "heroSloganPt" = NULL,
  "heroSubtitlePt" = NULL,
  ...
WHERE slug = 'home';
```

**Isso remove o que foi inserido, voltando ao estado anterior!**

---

## 📊 **TABELA DE PROGRESSO:**

| Etapa | Página | Idiomas | Status | Tempo |
|-------|--------|---------|--------|-------|
| 1 | Home | PT | ⏳ Aguardando | ~5 min |
| 2 | Home | EN | ⏳ Aguardando | ~5 min |
| 3 | Home | FR/ES | ⏳ Aguardando | ~5 min |
| 4 | Academy | PT/EN/FR/ES | ⏳ Aguardando | ~5 min |
| 5 | Studio | PT/EN/FR/ES | ⏳ Aguardando | ~5 min |
| 6 | Work | PT/EN/FR/ES | ⏳ Aguardando | ~5 min |
| 7 | Solutions | PT/EN/FR/ES | ⏳ Aguardando | ~5 min |

**Total**: ~35 minutos (com testes e validação)

---

## ✅ **CHECKLIST DE SEGURANÇA:**

Antes de executar cada etapa:

- [ ] Li o script completo
- [ ] Entendi o que cada UPDATE faz
- [ ] Testei a etapa anterior com sucesso
- [ ] Tenho o rollback pronto (copiado)
- [ ] Sei como testar (API + site)
- [ ] Posso reverter se der problema

---

## 🚨 **SE DER PROBLEMA EM QUALQUER ETAPA:**

1. **NÃO PÂNICO!** 🧘
2. Executar o rollback do script
3. Verificar que voltou ao normal
4. Me avisar qual erro apareceu
5. Vamos investigar juntos
6. **NÃO AVANÇAR** para próxima etapa

---

## 🎯 **VANTAGENS DESSA ABORDAGEM:**

1. ✅ **Segura**: Cada etapa é testada antes de avançar
2. ✅ **Controlada**: Você decide quando avançar
3. ✅ **Reversível**: Rollback em cada etapa
4. ✅ **Validada**: Testa API e site após cada mudança
5. ✅ **Incremental**: Home primeiro, outras depois
6. ✅ **Confiante**: Vê funcionando aos poucos

---

## 🚀 **PRONTO PARA COMEÇAR?**

**Passo 1**: Abrir Neon SQL Editor  
**Passo 2**: Copiar `ETAPA-1-home-pt.sql`  
**Passo 3**: Executar e testar  
**Passo 4**: Me avisar se funcionou ou se deu problema

**Posso te guiar em cada etapa!** 👨‍💻

---

**Criado por**: Cursor AI + Ranz  
**Última atualização**: 03 de janeiro de 2025  
**Estratégia**: Incremental e segura

