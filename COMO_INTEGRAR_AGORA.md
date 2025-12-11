# 🚀 COMO INTEGRAR O CMS NO SITE - RESUMO RÁPIDO

## ⚡ 3 Passos Simples

### **PASSO 1: Criar `.env.local`**

Na raiz do projeto (`azimut-site-vite-tailwind`), criar arquivo `.env.local`:

```bash
VITE_CMS_API_URL=http://localhost:3001/api
```

### **PASSO 2: Os arquivos já estão criados!**

Você já tem:
- ✅ `src/utils/analytics.ts` - Tracking
- ✅ `src/hooks/useAzimutContent.ts` - Hook do CMS

### **PASSO 3: Atualizar Home.tsx**

Copie o arquivo `src/pages/Home.example.tsx` para `src/pages/Home.tsx`

Ou adicione manualmente estas 3 linhas:

```typescript
// No topo do arquivo:
import { useAzimutContent } from '../hooks/useAzimutContent'
import { trackPageView } from '../utils/analytics'

// Dentro do componente:
const { content, loading } = useAzimutContent({ page: 'home', autoDetectGeo: true })

useEffect(() => {
  const cleanup = trackPageView('home')
  return cleanup
}, [])
```

---

## 🧪 Testar Agora

### Terminal 1 - CMS:
```bash
cd azimut-cms
npm install    # primeira vez
npm run dev    # inicia CMS na porta 3001
```

### Terminal 2 - Site:
```bash
# Na raiz (azimut-site-vite-tailwind)
npm run dev    # inicia site na porta 5173
```

### No navegador:

1. Abra: http://localhost:5173
2. Aperte F12 (console)
3. **Você deve ver:**
   ```
   🌍 País detectado: BR
   🎯 Projetos personalizados do CMS: X
   ```

**Se viu isso = FUNCIONOU!** ✅

---

## 🎯 O Que Está Acontecendo (Invisível para o Usuário)

1. **Site detecta país** via IP → "BR" ou "CA"
2. **CMS personaliza** conteúdo por geo
3. **Tracking silencioso** registra navegação
4. **IA analisa** (em background, assíncrono)
5. **Lead capturado** com contexto completo

**Tudo sem cookies invasivos!**

---

## 📝 Próximas Páginas (Opcional)

Adicione tracking nas outras páginas:

### Work.tsx
```typescript
import { trackPageView } from '../utils/analytics'

useEffect(() => {
  const cleanup = trackPageView('portfolio')
  return cleanup
}, [])
```

### Contact.tsx
```typescript
import { submitLead } from '../utils/analytics'

const handleSubmit = async (e) => {
  e.preventDefault()
  const result = await submitLead(formData)
  if (result.success) {
    alert('Enviado!')
  }
}
```

---

## ✅ Checklist Mínimo

- [ ] `.env.local` criado
- [ ] CMS rodando (3001)
- [ ] Site rodando (5173)
- [ ] Console mostra "🌍 País detectado"
- [ ] **PRONTO!**

---

## 🔥 Teste Completo

1. **Navegue pelo site** (Home, Portfolio, etc)
2. **Volte ao terminal do CMS**
3. **Você verá:**
   ```
   POST /api/track 200
   GET /api/public/content
   ```

4. **Abra Prisma Studio:**
   ```bash
   cd azimut-cms
   npm run prisma:studio
   ```
   
5. **Acesse:** http://localhost:5555
6. **Veja tabela:** `VisitorSession` → sua sessão!

---

## 🆘 Problemas?

### "Cannot find module '@/hooks/useAzimutContent'"

**Solução:** Verifique se o arquivo existe em `src/hooks/useAzimutContent.ts`

### "Failed to fetch"

**Solução:** 
1. CMS está rodando? `cd azimut-cms && npm run dev`
2. `.env.local` tem `VITE_CMS_API_URL=http://localhost:3001/api`?

### Não vejo logs no console

**Solução:** 
1. Recarregue a página (Ctrl+F5)
2. Verifique se tem erros no console

---

## 📚 Documentação Completa

- **Guia completo:** `INTEGRACAO_SITE_PASSO_A_PASSO.md`
- **Exemplo Home:** `src/pages/Home.example.tsx`
- **CMS README:** `azimut-cms/README.md`

---

**🎉 É isso! Site integrado com IA em 3 passos!**

**Qualquer dúvida, consulte `INTEGRACAO_SITE_PASSO_A_PASSO.md` para detalhes completos.**











