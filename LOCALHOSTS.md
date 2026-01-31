# Localhosts — Azimut

Todos os servidores de desenvolvimento do repositório e como subir cada um.

| Projeto | Porta | URL | Comando |
|--------|-------|-----|--------|
| **Site principal** (Vite) | 5173 | http://localhost:5173 | Na raiz: `npm run dev` |
| **Empathy Engine (game)** | 5174 | http://localhost:5174 | Em `azimut-empathy-engine`: `npm run dev` |
| **CMS / Backoffice** (Next.js) | 3001 | http://localhost:3001 | Em `azimut-cms`: `npm run dev` |

## Resumo rápido

- **Site:** http://localhost:5173  
- **Game (Empathy Engine):** http://localhost:5174  
- **CMS:** http://localhost:3001  

## Rodar tudo

Abra um terminal por projeto:

1. **Terminal 1 – Site**
   ```bash
   cd c:\Users\ranz\Documents\azimut-site-vite-tailwind
   npm run dev
   ```
   → http://localhost:5173

2. **Terminal 2 – Game**
   ```bash
   cd c:\Users\ranz\Documents\azimut-site-vite-tailwind\azimut-empathy-engine
   npm run dev
   ```
   → http://localhost:5174

3. **Terminal 3 – CMS**
   ```bash
   cd c:\Users\ranz\Documents\azimut-site-vite-tailwind\azimut-cms
   npm run dev
   ```
   → http://localhost:3001
