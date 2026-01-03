# 📋 GUIA: POPULAR BACKOFFICE POR PARTES
## Passo a Passo para Adicionar Material do Museu Olímpico

---

## 🎯 ESTRATÉGIA: POPULAR GRADUALMENTE

Você pode adicionar o material em partes, conforme for organizando as imagens. Cada parte pode ser adicionada independentemente.

---

## 📦 PARTE 1: TIER 1 - MÁXIMO IMPACTO (5 imagens)

### **Imagens Prioritárias:**
1. `jornal-o-globo-capa.jpg` - Capa do jornal
2. `velodromo-exterior.jpg` - Vista exterior
3. `semi-esfera-verde.jpg` - Semi-esfera interativa
4. `bicicleta-interativa.jpg` - Bicicleta interativa
5. `tela-interativa-mapa.jpg` - Tela interativa

### **Como Adicionar:**
1. Coloque essas 5 imagens na pasta: `azimut-cms/public/uploads/museu-olimpico/`
2. Execute o script (vai adicionar apenas as que encontrar):
   ```bash
   cd azimut-cms
   npx tsx scripts/add-olympic-media-curated.ts
   ```
3. Verifique no site: `/work/museu-olimpico-rio`
4. Teste o filtro "⭐ Destaques"

**Resultado:** As 5 imagens principais aparecem destacadas na galeria!

---

## 📦 PARTE 2: JORNAL (2 imagens)

### **Imagens:**
1. `jornal-o-globo-capa.jpg` (já adicionada na Parte 1)
2. `jornal-o-globo-materia.jpg` - Matéria completa

### **Como Adicionar:**
1. Adicione `jornal-o-globo-materia.jpg` na pasta
2. Execute o script novamente (só adiciona o que falta)
3. Verifique a seção "📰 Na Mídia" na página do projeto

**Resultado:** Seção "Na Mídia" aparece com as 2 imagens do jornal!

---

## 📦 PARTE 3: INSTALAÇÕES INTERATIVAS (4-5 imagens)

### **Imagens:**
1. `velodromo-exterior.jpg` (já adicionada)
2. `semi-esfera-verde.jpg` (já adicionada)
3. `bicicleta-interativa.jpg` (já adicionada)
4. `tela-interativa-mapa.jpg` (já adicionada)
5. `estruturas-arquitetonicas.jpg` - Estruturas coloridas

### **Como Adicionar:**
1. Adicione `estruturas-arquitetonicas.jpg` na pasta
2. Execute o script
3. Verifique a seção "🎮 Instalações Interativas"

**Resultado:** Seção de instalações completa!

---

## 📦 PARTE 4: GINÁSTICA ARTÍSTICA (5 imagens)

### **Imagens:**
1. `ginastica-barras-assimetricas.jpg`
2. `ginastica-argolas.jpg`
3. `ginastica-cavalo-alca.jpg`
4. `ginastica-salto.jpg`
5. `ginastica-trave-equilibrio.jpg`

### **Como Adicionar:**
1. Adicione todas as 5 imagens de ginástica na pasta
2. Execute o script
3. Verifique a seção "🤸 Ginástica Artística"

**Resultado:** Seção de ginástica completa com 5 áreas temáticas!

---

## 📦 PARTE 5: EVENTOS (2 imagens)

### **Imagens:**
1. `inauguracao-1.jpg` - Inauguração oficial
2. `crowd-verde.jpg` - Público no evento

### **Como Adicionar:**
1. Adicione as 2 imagens de eventos na pasta
2. Execute o script
3. Filtre por "Eventos" na galeria

**Resultado:** Imagens de eventos disponíveis!

---

## 📦 PARTE 6: MAKING-OF (1+ imagens)

### **Imagens:**
1. `construcao-1.jpg` - Processo de construção
2. (Adicione mais conforme disponível)

### **Como Adicionar:**
1. Adicione imagens de making-of na pasta
2. Execute o script
3. Filtre por "Making-of" na galeria

**Resultado:** Material de making-of disponível!

---

## 🔧 SCRIPT FLEXÍVEL

O script `add-olympic-media-curated.ts` é inteligente:
- ✅ **Só adiciona o que não existe** (não duplica)
- ✅ **Ignora arquivos que não encontrou** (continua funcionando)
- ✅ **Pode executar várias vezes** (idempotente)
- ✅ **Mostra resumo** do que foi adicionado/ignorado

---

## 📝 CHECKLIST DE PROGRESSO

Marque conforme for adicionando:

- [ ] **Parte 1 - TIER 1:** 5 imagens principais
- [ ] **Parte 2 - Jornal:** Matéria completa
- [ ] **Parte 3 - Instalações:** Estruturas arquitetônicas
- [ ] **Parte 4 - Ginástica:** 5 áreas temáticas
- [ ] **Parte 5 - Eventos:** Inauguração e crowd
- [ ] **Parte 6 - Making-of:** Processo de construção

---

## 🎯 ORDEM RECOMENDADA

**Sugestão de ordem para máximo impacto:**

1. **Primeiro:** Parte 1 (TIER 1) - 5 imagens principais
   - Impacto imediato no site
   - Filtro "Destaques" funciona
   - Visual profissional

2. **Segundo:** Parte 2 (Jornal) - Matéria completa
   - Seção "Na Mídia" aparece
   - Credibilidade máxima

3. **Terceiro:** Parte 4 (Ginástica) - 5 áreas
   - Seção temática completa
   - Mostra curadoria

4. **Depois:** Partes 3, 5, 6 conforme disponível
   - Enriquecer o conteúdo
   - Completar a experiência

---

## 💡 DICAS

### **Organização de Arquivos:**
```
azimut-cms/public/uploads/museu-olimpico/
├── jornal-o-globo-capa.jpg          ✅ (Parte 1)
├── jornal-o-globo-materia.jpg       ⏳ (Parte 2)
├── velodromo-exterior.jpg           ✅ (Parte 1)
├── semi-esfera-verde.jpg            ✅ (Parte 1)
├── bicicleta-interativa.jpg         ✅ (Parte 1)
├── tela-interativa-mapa.jpg         ✅ (Parte 1)
├── estruturas-arquitetonicas.jpg    ⏳ (Parte 3)
├── ginastica-barras-assimetricas.jpg ⏳ (Parte 4)
├── ginastica-argolas.jpg            ⏳ (Parte 4)
├── ginastica-cavalo-alca.jpg        ⏳ (Parte 4)
├── ginastica-salto.jpg              ⏳ (Parte 4)
├── ginastica-trave-equilibrio.jpg   ⏳ (Parte 4)
├── inauguracao-1.jpg                ⏳ (Parte 5)
├── crowd-verde.jpg                  ⏳ (Parte 5)
└── construcao-1.jpg                 ⏳ (Parte 6)
```

### **Verificação Após Cada Parte:**
1. Execute o script
2. Verifique o console (mostra o que foi adicionado)
3. Acesse o site: `/work/museu-olimpico-rio`
4. Teste os filtros
5. Verifique as seções temáticas

---

## 🚀 COMANDO RÁPIDO

Sempre o mesmo comando, pode executar quantas vezes quiser:

```bash
cd azimut-cms
npx tsx scripts/add-olympic-media-curated.ts
```

O script é inteligente e só adiciona o que falta!

---

## ✅ VANTAGENS DESTA ABORDAGEM

1. **Flexível:** Adicione conforme organizar
2. **Sem pressa:** Pode fazer em vários dias
3. **Testável:** Veja resultado após cada parte
4. **Seguro:** Não duplica, não quebra
5. **Progressivo:** Site melhora gradualmente

---

**Pronto para começar! Qual parte você quer adicionar primeiro?** 🎯

