# 🔍 Como Encontrar os Slugs dos Projetos

## ⚠️ IMPORTANTE: `[slug-do-projeto]` é um EXEMPLO!

Quando você vê `[slug-do-projeto]` na documentação, isso é um **placeholder** (exemplo). Você precisa substituir pelo **slug real** de um projeto.

## 🚀 Métodos para Encontrar Slugs:

### Método 1: Script Automático (Mais Fácil) ✅

1. **Execute:**
   ```bash
   LISTAR_PROJETOS.bat
   ```

2. **O script mostrará:**
   - Lista de todos os projetos
   - Slug de cada projeto
   - URL completa para testar
   - Status do SEO (otimizado ou não)

3. **Copie um slug e use na URL:**
   ```
   https://azmt.com.br/pt/work/[cole-o-slug-aqui]
   ```

### Método 2: Via Backoffice

1. **Acesse:**
   ```
   https://backoffice.azmt.com.br/admin/projects
   ```

2. **Abra qualquer projeto**

3. **Veja o campo "Slug"** (ex: `museu-olimpico-rio`)

4. **Use na URL:**
   ```
   https://azmt.com.br/pt/work/museu-olimpico-rio
   ```

### Método 3: Via API

1. **Acesse no navegador:**
   ```
   https://backoffice.azmt.com.br/api/public/content?page=work&lang=pt
   ```

2. **Procure por `"slug"` no JSON**

3. **Copie um slug e use na URL**

## 📝 Exemplos de Slugs Reais:

Alguns slugs comuns que podem existir:
- `museu-olimpico-rio`
- `exposicao-itinerante-tmnt`
- `paisagens-vangogh`
- `curadoria-festival-gramado-vr`
- `filme-vr-360-zen`
- `curso-producao-cinematicvr-ufrj`

⚠️ **Mas não assuma que esses existem!** Sempre use o script `LISTAR_PROJETOS.bat` para ver os slugs reais.

## ✅ Como Testar Corretamente:

1. **Execute:** `LISTAR_PROJETOS.bat`
2. **Copie um slug** (ex: `museu-olimpico-rio`)
3. **Acesse:** `https://azmt.com.br/pt/work/museu-olimpico-rio`
4. **Verifique o SEO:** Pressione `Ctrl+U` e veja as meta tags

## 🚨 Erro Comum:

❌ **ERRADO:**
```
https://azmt.com.br/pt/work/[slug-do-projeto]
```

✅ **CORRETO:**
```
https://azmt.com.br/pt/work/museu-olimpico-rio
```
