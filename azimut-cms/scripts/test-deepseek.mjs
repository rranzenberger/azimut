/**
 * SCRIPT DE TESTE - IA DeepSeek
 * Verificar se dados estão sendo salvos no banco
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testDeepSeekData() {
  console.log('\n🔍 TESTE 1: Verificando sessões de visitantes...\n');
  
  // 1. Buscar últimas 10 sessões
  const sessions = await prisma.visitorSession.findMany({
    take: 10,
    orderBy: { lastActivityAt: 'desc' },
    select: {
      sessionId: true,
      country: true,
      language: true,
      createdAt: true,
      lastActivityAt: true,
    },
  });
  
  console.log(`✅ Total de sessões encontradas: ${sessions.length}`);
  console.log('\n📊 Últimas sessões:');
  sessions.forEach((s, i) => {
    console.log(`${i + 1}. ${s.sessionId.slice(0, 8)}... | ${s.country || 'N/A'} | ${s.language || 'N/A'} | ${s.lastActivityAt.toLocaleString()}`);
  });

  console.log('\n🔍 TESTE 2: Verificando páginas visualizadas...\n');
  
  // 2. Buscar últimas 20 page views
  const pageViews = await prisma.pageView.findMany({
    take: 20,
    orderBy: { viewedAt: 'desc' },
    select: {
      pageSlug: true,
      timeSpent: true,
      scrollDepth: true,
      viewedAt: true,
      sessionId: true,
    },
  });
  
  console.log(`✅ Total de page views: ${pageViews.length}`);
  console.log('\n📄 Últimas páginas vistas:');
  pageViews.forEach((pv, i) => {
    console.log(`${i + 1}. ${pv.pageSlug || 'unknown'} | ${pv.timeSpent}s | scroll ${pv.scrollDepth}% | ${pv.viewedAt.toLocaleString()}`);
  });

  console.log('\n🔍 TESTE 3: Verificando interações com projetos...\n');
  
  // 3. Buscar interações com projetos
  const interactions = await prisma.projectInteraction.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      project: {
        select: { title: true, type: true }
      }
    },
  });
  
  console.log(`✅ Total de interações: ${interactions.length}`);
  console.log('\n🎯 Últimos projetos clicados:');
  interactions.forEach((int, i) => {
    console.log(`${i + 1}. ${int.project?.title || 'N/A'} | ${int.type} | ${int.createdAt.toLocaleString()}`);
  });

  console.log('\n🔍 TESTE 4: Verificando SCORES da IA (PRINCIPAL!)...\n');
  
  // 4. Buscar interest scores (análise da IA)
  const scores = await prisma.interestScore.findMany({
    take: 5,
    orderBy: { updatedAt: 'desc' },
  });
  
  console.log(`✅ Total de scores calculados: ${scores.length}`);
  
  if (scores.length === 0) {
    console.log('\n⚠️ ATENÇÃO: Nenhum score encontrado!');
    console.log('Possíveis causas:');
    console.log('1. IA ainda não processou as sessões');
    console.log('2. DeepSeek API Key não está funcionando');
    console.log('3. Erro no processamento (ver logs do Vercel)');
  } else {
    console.log('\n🤖 Scores da IA:');
    scores.forEach((score, i) => {
      console.log(`\n${i + 1}. Session: ${score.sessionId.slice(0, 8)}...`);
      console.log(`   Visitor Type: ${score.visitorType || 'N/A'}`);
      console.log(`   Scores:`);
      console.log(`     - Museus: ${score.museumScore}`);
      console.log(`     - Marcas: ${score.brandScore}`);
      console.log(`     - Festivais: ${score.festivalScore}`);
      console.log(`     - VR/XR: ${score.vrScore}`);
      console.log(`     - IA: ${score.aiScore}`);
      console.log(`     - Conversão: ${score.conversionScore}`);
      console.log(`   Ação sugerida: ${score.suggestedAction || 'N/A'}`);
      console.log(`   Página sugerida: ${score.suggestedPage || 'N/A'}`);
      
      // Parse seguro de recommendedProjects (pode estar vazio/null)
      if (score.recommendedProjects && score.recommendedProjects !== '') {
        try {
          const recommended = JSON.parse(score.recommendedProjects);
          console.log(`   Projetos recomendados: ${recommended.length || 0}`);
        } catch (e) {
          console.log(`   Projetos recomendados: 0 (dados inválidos)`);
        }
      } else {
        console.log(`   Projetos recomendados: 0`);
      }
    });
  }

  console.log('\n\n📊 RESUMO DO TESTE:\n');
  console.log(`✅ Sessões: ${sessions.length}`);
  console.log(`✅ Page Views: ${pageViews.length}`);
  console.log(`✅ Interações: ${interactions.length}`);
  console.log(`✅ Scores IA: ${scores.length}`);
  
  if (sessions.length > 0 && pageViews.length > 0 && scores.length > 0) {
    console.log('\n🎉 SUCESSO! IA DeepSeek está funcionando perfeitamente!\n');
  } else if (sessions.length > 0 && pageViews.length > 0 && scores.length === 0) {
    console.log('\n⚠️ PARCIAL: Tracking funciona, mas IA não calculou scores ainda.\n');
    console.log('Aguarde alguns minutos ou verifique logs do Vercel.\n');
  } else {
    console.log('\n❌ PROBLEMA: Tracking não está funcionando corretamente.\n');
  }

  await prisma.$disconnect();
}

testDeepSeekData().catch((error) => {
  console.error('❌ Erro ao executar teste:', error);
  process.exit(1);
});

