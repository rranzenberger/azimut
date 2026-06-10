# Script para rodar seed do backoffice Azimut via API

## Opção 1: Via curl (terminal)
```bash
curl -X POST https://backoffice.azmt.com.br/api/admin/setup \
  -H "Content-Type: application/json"
```

## Opção 2: Via navegador (console do DevTools)
```javascript
fetch('https://backoffice.azmt.com.br/api/admin/setup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error('Erro:', err));
```

## O que vai fazer:
- Criar páginas faltantes (studio/about, studio/team, academy/*, etc.)
- Criar mercados (BR, CA, DEFAULT) se não existirem
- Não vai deletar dados existentes (apenas cria o que falta)

## Depois de rodar:
As páginas vão aparecer no backoffice e não vão mais dar 404!


















