# 📹 COMO TROCAR VÍDEOS NO BACKOFFICE

## 🎯 SISTEMA DINÂMICO IMPLEMENTADO

Os vídeos agora são gerenciados pelo **hook `useAcademyVideos`** que:
- ✅ Busca vídeos do backoffice (quando API estiver pronta)
- ✅ Usa vídeos padrão como fallback
- ✅ Permite trocar facilmente no backoffice

---

## 📋 VÍDEOS ATUAIS (11 Total)

### ✅ JÁ IMPLEMENTADOS (2):
```
1. VanArts Institucional
   URL: https://www.youtube.com/watch?v=Vm1s2cwHI-M
   Onde: /academy/vancouver (VanArts card)
   Status: ✅ ATIVO

2. Depoimentos Brasileiros VanArts
   URL: https://www.youtube.com/watch?v=y3uhoRpQPYY
   Onde: /academy/vancouver (Testimonials)
   Status: ✅ ATIVO
```

### ⏳ PLACEHOLDERS (9):
```
3. VFS Institucional
   URL: [VAZIO - ADICIONAR NO BACKOFFICE]
   Onde: /academy/vancouver (VFS card)
   Buscar: "Vancouver Film School about" no YouTube

4. VanArts Showreel 2024
   URL: [VAZIO - ADICIONAR NO BACKOFFICE]
   Onde: /academy/vancouver (Student Work)
   Buscar: "VanArts student showreel" no canal @vanarts

5. VFS Showreel 2025
   URL: [VAZIO - ADICIONAR NO BACKOFFICE]
   Onde: /academy/vancouver (Student Work)
   Buscar: "VFS showreel 2025" no YouTube

6. VanArts Animation Showcase
   URL: https://vimeo.com/groups/38001/videos/23613221
   Onde: /academy/vancouver (Student Work)
   Status: ✅ URL PRONTA (Vimeo)

7. VFS Campus Tour
   URL: [VAZIO - ADICIONAR NO BACKOFFICE]
   Onde: /academy/vancouver (Campus section - futuro)
   Buscar: "VFS campus tour" no YouTube

8. VanArts Campus Tour
   URL: [VAZIO - ADICIONAR NO BACKOFFICE]
   Onde: /academy/vancouver (Campus section - futuro)
   Buscar: "VanArts facilities tour" no YouTube

9. Azimut História (14 anos)
   URL: [VAZIO - CRIAR VÍDEO]
   Onde: /academy (Hero ou seção história)
   Ação: CRIAR vídeo institucional Azimut School

10. Azimut Aula Demo VR
    URL: [VAZIO - GRAVAR]
    Onde: /academy/courses (Class Demos)
    Ação: GRAVAR trecho de aula VR

11. Azimut Aula Demo IA
    URL: [VAZIO - GRAVAR]
    Onde: /academy/courses (Class Demos)
    Ação: GRAVAR trecho de aula IA
```

---

## 🔧 COMO TROCAR NO BACKOFFICE (PASSO A PASSO)

### OPÇÃO 1: DIRETAMENTE NO CÓDIGO (Rápido) ⚡
**Arquivo:** `src/hooks/useAcademyVideos.ts`

1. **Abrir arquivo:**
   ```bash
   code src/hooks/useAcademyVideos.ts
   ```

2. **Localizar o vídeo:**
   Busque pelo `id` do vídeo (ex: `vfs-institutional`)

3. **Trocar a URL:**
   ```typescript
   {
     id: 'vfs-institutional',
     title: 'Vancouver Film School - About',
     description: 'Conheça a Vancouver Film School',
     videoUrl: 'COLE_A_URL_AQUI', // <-- TROCAR AQUI
     category: 'institutional',
     school: 'vfs',
     featured: true,
     priority: 3
   }
   ```

4. **Salvar e recarregar:**
   - Salve o arquivo (Ctrl+S)
   - Localhost recarrega automaticamente (HMR)

---

### OPÇÃO 2: VIA BACKOFFICE (Quando API estiver pronta) 🎯

**Quando implementarmos a API no backoffice:**

#### 1. ACESSAR BACKOFFICE
```
https://backoffice.azmt.com.br/admin/academy/videos
```

#### 2. TELA DE GESTÃO DE VÍDEOS
```
┌────────────────────────────────────────────────────┐
│  Academy Videos                          [+ Add]   │
├────────────────────────────────────────────────────┤
│  ID                      | Title          | Status │
├────────────────────────────────────────────────────┤
│  vanarts-institutional   | VanArts About  | ✅     │
│  vfs-institutional       | VFS About      | ⏳     │
│  vanarts-showreel-2024   | Student Reel   | ⏳     │
└────────────────────────────────────────────────────┘
```

#### 3. CLICAR NO VÍDEO
```
┌────────────────────────────────────────────────────┐
│  Edit Video: vfs-institutional                     │
├────────────────────────────────────────────────────┤
│  Title:                                            │
│  [Vancouver Film School - About          ]         │
│                                                    │
│  Description:                                      │
│  [Conheça a Vancouver Film School        ]         │
│                                                    │
│  Video URL: (YouTube ou Vimeo)                    │
│  [https://www.youtube.com/watch?v=XXXXX  ]  <-- AQUI
│                                                    │
│  Category:                                         │
│  ○ Institutional  ○ Showreel  ○ Testimonial       │
│                                                    │
│  School:                                           │
│  ○ VFS  ○ VanArts  ○ Azimut                      │
│                                                    │
│  Featured: [✓]   Priority: [3]                    │
│                                                    │
│  [Cancel]  [Save Changes]                         │
└────────────────────────────────────────────────────┘
```

#### 4. SALVAR
- Clicar em "Save Changes"
- Vídeo atualiza automaticamente no site
- Sem necessidade de redeploy

---

## 📝 COMO BUSCAR VÍDEOS NO YOUTUBE

### CANAL VANARTS:
1. Ir em: https://www.youtube.com/@vanarts/videos
2. Clicar em "VÍDEOS"
3. Ordenar por: "Mais recentes"
4. Procurar:
   - "Showreel"
   - "Student Reel"
   - "Demo Reel"
   - "Facilities"
5. Clicar no vídeo
6. Copiar URL da barra de endereço

**Exemplo de URL:**
```
https://www.youtube.com/watch?v=Vm1s2cwHI-M
```

### CANAL VFS:
1. Buscar no YouTube: "Vancouver Film School"
2. Clicar no canal oficial
3. Ir em "VÍDEOS"
4. Procurar:
   - "Showreel 2024" ou "2025"
   - "Campus Tour"
   - "About VFS"
5. Copiar URL

---

## 🎯 PRIORIDADES DE TROCA

### PRIORIDADE 1 (Fazer Primeiro):
```
✅ VanArts Institucional  - JÁ FEITO
✅ Depoimentos Brasileiros - JÁ FEITO
⏳ VFS Institucional      - BUSCAR NO YOUTUBE
✅ VanArts Animation      - URL PRONTA (Vimeo)
```

### PRIORIDADE 2 (Depois):
```
⏳ VanArts Showreel 2024  - BUSCAR NO YOUTUBE
⏳ VFS Showreel 2025      - BUSCAR NO YOUTUBE
⏳ VFS Campus Tour        - BUSCAR NO YOUTUBE
⏳ VanArts Campus Tour    - BUSCAR NO YOUTUBE
```

### PRIORIDADE 3 (Quando Tiver Tempo):
```
⏳ Azimut História        - CRIAR VÍDEO
⏳ Azimut Aula Demo VR    - GRAVAR
⏳ Azimut Aula Demo IA    - GRAVAR
```

---

## 🔍 URLS SUGERIDAS (Para Buscar)

### VFS:
```bash
# Buscar no YouTube:
"VFS 2025 showreel"
"Vancouver Film School campus tour"
"VFS about the school"
"VFS student work 2024"
```

### VanArts:
```bash
# Buscar no YouTube:
"VanArts showreel 2024"
"VanArts student reel"
"VanArts demo reel"
"VanArts facilities tour"
```

---

## ⚠️ FORMATOS ACEITOS

### YouTube:
```
✅ https://www.youtube.com/watch?v=Vm1s2cwHI-M
✅ https://youtu.be/Vm1s2cwHI-M
✅ https://www.youtube.com/embed/Vm1s2cwHI-M
✅ Vm1s2cwHI-M (apenas o ID)
```

### Vimeo:
```
✅ https://vimeo.com/23613221
✅ https://vimeo.com/groups/38001/videos/23613221
✅ 23613221 (apenas o ID)
```

### MP4 (Upload direto):
```
✅ /uploads/videos/meu-video.mp4
✅ https://cdn.azmt.com.br/videos/meu-video.mp4
```

---

## 🎨 ONDE OS VÍDEOS APARECEM

### `/academy` (Hub):
```
- Hero section: Video de fundo (Azimut História)
- Seção História: VideoCard com Azimut School
```

### `/academy/vancouver`:
```
- VFS Card: VFS Institucional
- VanArts Card: VanArts Institucional ✅
- Student Work: Showreels (3-6 vídeos)
- Testimonials: Depoimentos ✅
- Campus Tour: (futuro) Tour virtual
```

### `/academy/courses`:
```
- Student Work: Projetos dos alunos (imagens)
- Class Demos: Aulas demo (4 vídeos Azimut)
```

### `/academy/workshops`:
```
- Video Recaps: Highlights de workshops
```

### `/academy/corporate`:
```
- Cases: Vídeos de cases de sucesso
- Testimonials: Depoimentos corporativos
```

---

## 🚀 TESTANDO AS TROCAS

### 1. TROCAR URL NO CÓDIGO:
```typescript
videoUrl: 'https://www.youtube.com/watch?v=SUA_URL_AQUI'
```

### 2. SALVAR ARQUIVO:
```
Ctrl+S (Windows/Linux)
Cmd+S (Mac)
```

### 3. VER NO LOCALHOST:
```bash
# Abrir navegador:
http://localhost:1756/pt/academy/vancouver

# Verificar se vídeo apareceu
# Testar lightbox (clicar no vídeo)
# Testar responsividade
```

### 4. SE ESTIVER OK:
```bash
# Commitar
git add src/hooks/useAcademyVideos.ts
git commit -m "feat: atualizar videos Academy"
git push

# Deploy automático no Vercel
```

---

## 📊 STATUS ATUAL DOS VÍDEOS

```
TOTAL: 11 vídeos
✅ Com URL: 3 (27%)
⏳ Sem URL: 8 (73%)

POR CATEGORIA:
├── Institucional: 3 (1 OK, 2 pendentes)
├── Showreel: 3 (1 OK, 2 pendentes)
├── Testimonial: 1 (OK)
├── Campus: 2 (ambos pendentes)
└── Class Demo: 2 (ambos pendentes)

POR ESCOLA:
├── VanArts: 5 (2 OK, 3 pendentes)
├── VFS: 3 (0 OK, 3 pendentes)
└── Azimut: 3 (0 OK, 3 pendentes)
```

---

## ✅ CHECKLIST RÁPIDO

**Para completar 100% dos vídeos:**

- [x] VanArts Institucional (FEITO)
- [x] Depoimentos Brasileiros (FEITO)
- [x] VanArts Animation Showcase (URL pronta)
- [ ] VFS Institucional (BUSCAR)
- [ ] VanArts Showreel 2024 (BUSCAR)
- [ ] VFS Showreel 2025 (BUSCAR)
- [ ] VFS Campus Tour (BUSCAR)
- [ ] VanArts Campus Tour (BUSCAR)
- [ ] Azimut História (CRIAR)
- [ ] Azimut Demo VR (GRAVAR)
- [ ] Azimut Demo IA (GRAVAR)

**Tempo estimado para buscar os 5 vídeos faltantes:** 30 minutos

---

**SISTEMA PRONTO! VOCÊ SÓ PRECISA BUSCAR AS URLS E COLAR! 🎯**
