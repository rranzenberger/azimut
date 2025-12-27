/**
 * Script para testar conexão com API do backoffice
 * Usage: npx tsx azimut-cms/scripts/test-pages-api.ts
 */

async function testPagesAPI() {
  const baseURL = 'https://backoffice.azmt.com.br';
  
  console.log('🧪 Testando API de Páginas...\n');
  
  // Teste 1: GET /api/admin/me (verificar autenticação)
  try {
    console.log('1️⃣ Testando GET /api/admin/me (auth check)...');
    const meResponse = await fetch(`${baseURL}/api/admin/me`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    console.log(`Status: ${meResponse.status}`);
    console.log(`Body: ${await meResponse.text()}\n`);
  } catch (error: any) {
    console.error(`❌ Erro: ${error.message}\n`);
  }
  
  // Teste 2: GET /api/admin/pages
  try {
    console.log('2️⃣ Testando GET /api/admin/pages (listar páginas)...');
    const pagesResponse = await fetch(`${baseURL}/api/admin/pages`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    console.log(`Status: ${pagesResponse.status}`);
    const body = await pagesResponse.text();
    console.log(`Body: ${body.substring(0, 500)}...\n`);
  } catch (error: any) {
    console.error(`❌ Erro: ${error.message}\n`);
  }
  
  // Teste 3: Página direta /admin/pages
  try {
    console.log('3️⃣ Testando página /admin/pages...');
    const pageResponse = await fetch(`${baseURL}/admin/pages`, {
      headers: {
        'Content-Type': 'text/html',
      },
      credentials: 'include',
    });
    
    console.log(`Status: ${pageResponse.status}`);
    const html = await pageResponse.text();
    
    if (html.includes('Application error')) {
      console.log('❌ Erro encontrado na página!');
      console.log(`Trecho: ${html.substring(0, 1000)}`);
    } else {
      console.log('✅ Página carregada sem erro aparente');
    }
  } catch (error: any) {
    console.error(`❌ Erro: ${error.message}\n`);
  }
}

testPagesAPI();

