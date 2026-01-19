# 📋 ORDEM DE EXECUÇÃO DOS SCRIPTS SQL

## ✅ **PASSO 1: Adicionar Campos no Banco**

Execute no **Neon Console** (Vercel → Storage → Neon → SQL Editor):

```
azimut-cms/scripts/01_ADICIONAR_CAMPOS_MOBILE_DESKTOP.sql
```

**O que faz:** Adiciona 8 novos campos na tabela `Page`:
- `heroDescriptionMobilePt`, `heroDescriptionMobileEn`, `heroDescriptionMobileEs`, `heroDescriptionMobileFr`
- `heroDescriptionDesktopPt`, `heroDescriptionDesktopEn`, `heroDescriptionDesktopEs`, `heroDescriptionDesktopFr`

**Resultado esperado:** Query de verificação mostra 8 colunas criadas.

---

## ✅ **PASSO 2: Popular Dados da Vancouver**

Execute no **Neon Console**:

```
azimut-cms/scripts/02_POPULAR_VANCOUVER_MOBILE_DESKTOP.sql
```

**O que faz:** 
- Atualiza página Vancouver com textos mobile e desktop
- Se a página não existir, cria ela
- 4 idiomas: PT, EN, ES, FR

**Resultado esperado:** Query de verificação mostra página Vancouver com todos os campos preenchidos.

---

## 🎯 **PRÓXIMOS PASSOS (Após executar SQL)**

1. ✅ Atualizar Prisma schema (`azimut-cms/prisma/schema.prisma`)
2. ✅ Executar migração: `npx prisma migrate dev`
3. ✅ Atualizar backoffice para editar campos mobile/desktop
4. ✅ Atualizar código do site para usar campos mobile/desktop

---

## 📝 **NOTAS**

- Scripts são **idempotentes** (podem executar várias vezes)
- Campos são **opcionais** (NULL permitido) para compatibilidade
- Se der erro "bad request", verifique se executou o script 1 primeiro

---

**Data:** 19 de Janeiro de 2026
