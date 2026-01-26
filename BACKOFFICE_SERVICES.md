# Integração Backoffice - Serviços

Sistema completo para gerenciar cards de serviços através do backoffice.

## 📋 O que foi criado

### 1. SQL para Popular Banco de Dados
**Arquivo:** `sql/POPULAR_SERVICES.sql`

Popula 10 serviços com:
- Textos em 4 idiomas (PT, EN, ES, FR)
- Ícones
- Categorias de filtro (`segments`)
- Status e prioridade

**Como rodar:**
```bash
psql -U postgres -d azimut_db -f sql/POPULAR_SERVICES.sql
```

### 2. Hook React para Consumir Dados
**Arquivo:** `src/hooks/useBackofficeService.ts`

**Uso individual:**
```typescript
const { service, loading } = useBackofficeService('cinema-audiovisual', 'pt')
const title = service?.title || 'Fallback local'
```

**Uso em lista/filtro:**
```typescript
const { services, loading } = useBackofficeServices('pt', ['education', 'training'])
// Retorna apenas serviços com segments 'education' OU 'training'
```

### 3. APIs Públicas no Backoffice
**Criados:**
- `/api/public/service/[slug]` - Buscar um serviço
- `/api/public/services` - Listar todos (com filtro opcional)

**Exemplos:**
```
GET https://backoffice.azmt.com.br/api/public/service/consultoria-estrategia
GET https://backoffice.azmt.com.br/api/public/services
GET https://backoffice.azmt.com.br/api/public/services?segments=education,training
```

## 🎯 Sistema de Filtros (Segments)

Os `segments` são categorias de filtro. Exemplos:

**Consultoria & Estratégia:**
```typescript
segments: ['consulting', 'strategy', 'funding', 'management', 'education', 'training', 'corporate']
```
- Aparece em: Consultoria, Estratégia, **E Educação** (por ter 'education' e 'training')

**Educação & Treinamento:**
```typescript
segments: ['education', 'training', 'workshop', 'course', 'corporate', 'academy']
```
- Aparece em: Educação, Treinamento, Corporativo

**Cinema & Audiovisual:**
```typescript
segments: ['cinema', 'audiovisual', 'production', 'narrative']
```
- Aparece em: Cinema, Audiovisual, Produção

## 🔄 Como Integrar no Frontend

### Opção 1: Modificar `ServiceDetail.tsx` para usar Backoffice

```typescript
// Em src/pages/ServiceDetail.tsx
import { useBackofficeService } from '../hooks/useBackofficeService'
import { getServiceBySlug } from '../data/servicesData' // fallback

const ServiceDetail: React.FC<ServiceDetailProps> = ({ lang }) => {
  const { slug } = useParams()
  
  // Tentar buscar do backoffice
  const { service: backofficeService, loading } = useBackofficeService(slug, lang)
  
  // Fallback para dados locais se backoffice falhar
  const localService = getServiceBySlug(slug)
  
  // Usar backoffice se disponível, senão usar local
  const title = backofficeService?.title || getServiceTitle(localService, lang)
  const description = backofficeService?.description || getServiceShortDesc(localService, lang)
  
  // ... resto do código
}
```

### Opção 2: Criar página de listagem com filtros

```typescript
// Nova página: src/pages/Services.tsx
import { useBackofficeServices } from '../hooks/useBackofficeService'

const Services: React.FC = ({ lang }) => {
  const [selectedSegments, setSelectedSegments] = useState<string[]>([])
  
  const { services, loading } = useBackofficeServices(lang, selectedSegments)
  
  return (
    <div>
      <button onClick={() => setSelectedSegments(['education', 'training'])}>
        Educação
      </button>
      <button onClick={() => setSelectedSegments(['consulting', 'strategy'])}>
        Consultoria
      </button>
      
      {loading ? 'Carregando...' : services.map(service => (
        <ServiceCard key={service.slug} {...service} />
      ))}
    </div>
  )
}
```

## 📝 Próximos Passos

1. **Rodar SQL:**
   ```bash
   psql -U postgres -d azimut_db -f sql/POPULAR_SERVICES.sql
   ```

2. **Deploy Backoffice APIs:**
   - As APIs já estão criadas em `azimut-cms/app/api/public/service[s]`
   - Fazer commit e push do backoffice

3. **Integrar Frontend:**
   - Modificar `ServiceDetail.tsx` para usar `useBackofficeService`
   - Ou criar nova página de listagem com filtros
   - Manter `servicesData.ts` como fallback

4. **Admin no Backoffice:**
   - Criar página de gerenciamento de serviços
   - Permitir editar título, descrição, ícone, segments
   - Interface para adicionar/remover categorias de filtro

## 🎨 Editando no Backoffice (Futuro)

Quando o admin estiver pronto, será possível:

1. **Editar textos** em todos os idiomas
2. **Adicionar/remover categorias** (segments) para aparecer em filtros
3. **Mudar ícones** dos cards
4. **Reordenar** por prioridade
5. **Publicar/Despublicar** serviços

**Exemplo de edição:**
- Card "Consultoria" não aparece em "Educação"?
- Adicionar `'education'` e `'training'` nos segments
- Salvar → Aparece automaticamente no filtro!

## 🔍 Verificar Dados

```sql
-- Ver todos os serviços e suas categorias
SELECT 
  slug,
  "titlePt",
  segments,
  status,
  priority
FROM "Service"
ORDER BY priority, slug;

-- Ver quais serviços têm categoria 'education'
SELECT slug, "titlePt", segments
FROM "Service"
WHERE 'education' = ANY(segments);
```

## 🚀 Status Atual

✅ SQL criado (`POPULAR_SERVICES.sql`)  
✅ Hook React criado (`useBackofficeService.ts`)  
✅ APIs públicas criadas (`/api/public/service[s]`)  
⏳ Frontend ainda usa `servicesData.ts` (precisa integrar)  
⏳ Admin do backoffice (precisa criar)  

---

**Documentação criada em:** 2026-01-26  
**Deploy do ajuste consultoria+educação:** ✅ Concluído (commit 4ce0f25)
