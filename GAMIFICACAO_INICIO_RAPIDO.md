# 🎮 INÍCIO RÁPIDO - GAMIFICAÇÃO AZIMUT

## ✅ JÁ ESTÁ FUNCIONANDO!

O sistema de gamificação está **100% implementado e ativo**.

---

## 🚀 O QUE VOCÊ VAI VER AGORA

1. **Widget Flutuante** (canto inferior direito)
   - Emoji do seu nível atual
   - Seu número de nível
   - Click para expandir

2. **Pontos Automáticos** por:
   - ✅ Visitar cada página (+5pts)
   - ✅ Primeira visita ever (+50pts)
   - ✅ Rolar até o final (+10pts)
   - ✅ Ficar >2min numa página (+15pts)

3. **Badges Desbloqueáveis:**
   - 👋 Primeira Visita (automático)
   - 🗺️ Explorador (5 páginas visitadas)
   - 🤿 Mergulhador (10 scrolls profundos)
   - E mais 20+ badges!

---

## 📱 COMO TESTAR

### **Teste 1: Ver Pontos Básicos**
```
1. Abra o site
2. Veja widget flutuante (canto inf. direito)
3. Click no widget → veja seus pontos
4. Navegue para 3-4 páginas
5. Veja pontos aumentarem!
```

### **Teste 2: Ganhar Badge**
```
1. Visite 5 páginas diferentes
2. Widget mostra notificação: "Nova badge!"
3. Click no widget
4. Veja badge "🗺️ Explorador" desbloqueado
```

### **Teste 3: Level Up**
```
1. Acumule 200 pontos (40 páginas visitadas)
2. Widget mostra: "Level Up! 🎉"
3. Agora você é Level 2: Curioso 👀
```

---

## 🎯 PRÓXIMAS INTEGRAÇÕES

Para usar gamificação em componentes específicos:

### **Em Quizzes:**
```tsx
import { useGamification } from '../hooks/useGamification'

function Quiz() {
  const { awardPoints, updateStats } = useGamification()
  
  const handleComplete = () => {
    awardPoints('quizComplete')  // +100pts
    updateStats('quizzesCompleted')
  }
}
```

### **Em Vídeos:**
```tsx
const handleVideoPlay = () => {
  awardPoints('videoPlay')  // +20pts
  updateStats('videosWatched')
}

const handleVideoEnd = () => {
  awardPoints('videoComplete')  // +50pts
}
```

### **Em Formulários:**
```tsx
const handleFormStart = () => {
  awardPoints('formStart')  // +30pts
}

const handleFormSubmit = () => {
  awardPoints('formComplete')  // +150pts
  updateStats('formsSubmitted')
}
```

---

## 🐛 DEBUG

### **Ver progresso atual:**
```javascript
// No console do navegador (F12):
JSON.parse(localStorage.getItem('azimut_gamification'))
```

### **Reset completo:**
```javascript
localStorage.removeItem('azimut_gamification')
location.reload()
```

### **Ver todas as badges:**
```javascript
import { BADGES_DATABASE } from './src/utils/gamification'
console.table(BADGES_DATABASE)
```

---

## 📊 ANALYTICS

Todos os eventos de gamificação são automaticamente enviados para:

1. **Sistema Interno** (backoffice)
2. **Google Analytics** (se configurado)

Eventos trackeados:
- `gamification` - Pontos ganhos
- `gamification_achievement` - Badge desbloqueada
- `gamification_level_up` - Subiu de nível

---

## 🎨 CUSTOMIZAÇÃO

### **Mudar posição do widget:**
```tsx
<GamificationWidget 
  position="bottom-left"  // ou "top-right"
/>
```

### **Desabilitar notificações automáticas:**
```tsx
<GamificationWidget 
  showOnMount={false}
/>
```

---

## 🏆 SISTEMA DE NÍVEIS

| Nível | Nome | Pontos | Emoji |
|-------|------|--------|-------|
| 1 | Explorador | 0 | 🌱 |
| 2 | Curioso | 200 | 👀 |
| 3 | Interessado | 500 | 🔍 |
| 4 | Engajado | 1.000 | ⚡ |
| 5 | Entusiasta | 2.000 | 🎯 |
| 6 | Expert | 4.000 | 🏆 |
| 7 | Master | 8.000 | 👑 |
| 8 | Legend | 15.000 | ⭐ |
| 9 | Azimut Pro | 25.000 | 💎 |
| 10 | Azimut Elite | 50.000 | 🌟 |

---

## ✨ FEATURES ATIVAS

✅ Sistema de pontos (20+ ações)
✅ Levels 1-10 com progressão
✅ 25+ badges desbloqueáveis
✅ 10+ achievements rastreáveis
✅ Widget flutuante interativo
✅ Notificações toast animadas
✅ Confetti em level ups
✅ Persistência (localStorage)
✅ Analytics integrado
✅ Responsivo (mobile/desktop)

---

## 🚀 ATIVAÇÃO IMEDIATA

**O sistema JÁ ESTÁ RODANDO!**

Basta:
1. Iniciar o dev server: `npm run dev`
2. Abrir navegador: `http://localhost:5173`
3. Ver o widget no canto inferior direito
4. Navegar pelo site
5. Ganhar pontos e badges! 🎉

---

**PRONTO PARA DOMINAR! 🏆**

