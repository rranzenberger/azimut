/**
 * API de Migração - Adiciona colunas faltantes no banco
 * ⚠️ TEMPORÁRIO - remover após execução em produção
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (body.token !== 'azimut-migrate-2026') {
      return NextResponse.json({ error: 'Token inválido' }, { status: 403 });
    }

    const results: string[] = [];

    // =============================================
    // Service - colunas de conteúdo da subpágina
    // =============================================
    const serviceColumns = [
      { name: 'faqsPt', type: 'JSONB' },
      { name: 'faqsEn', type: 'JSONB' },
      { name: 'faqsEs', type: 'JSONB' },
      { name: 'faqsFr', type: 'JSONB' },
      { name: 'longDescPt', type: 'JSONB' },
      { name: 'longDescEn', type: 'JSONB' },
      { name: 'longDescEs', type: 'JSONB' },
      { name: 'longDescFr', type: 'JSONB' },
      { name: 'deliverablesPt', type: 'JSONB' },
      { name: 'deliverablesEn', type: 'JSONB' },
      { name: 'deliverablesEs', type: 'JSONB' },
      { name: 'deliverablesFr', type: 'JSONB' },
      { name: 'processPt', type: 'JSONB' },
      { name: 'processEn', type: 'JSONB' },
      { name: 'processEs', type: 'JSONB' },
      { name: 'processFr', type: 'JSONB' },
      { name: 'technologies', type: "TEXT[] DEFAULT '{}'" },
    ];

    for (const col of serviceColumns) {
      try {
        await prisma.$executeRawUnsafe(
          `ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "${col.name}" ${col.type}`
        );
        results.push(`✅ Service.${col.name}`);
      } catch (e: any) {
        results.push(`⚠️ Service.${col.name}: ${e.message}`);
      }
    }

    // =============================================
    // FooterSettings - tabela isolada do rodapé
    // =============================================
    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "FooterSettings" (
          "id" TEXT NOT NULL DEFAULT 'singleton',
          "contactEmail" TEXT,
          "contactPhone" TEXT,
          "whatsappNumber" TEXT,
          "instagramUrl" TEXT,
          "youtubeUrl" TEXT,
          "linkedinUrl" TEXT,
          "vimeoUrl" TEXT,
          "behanceUrl" TEXT,
          "facebookUrl" TEXT,
          "twitterUrl" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "FooterSettings_pkey" PRIMARY KEY ("id")
        )
      `);
      results.push('✅ FooterSettings table');
    } catch (e: any) {
      results.push(`⚠️ FooterSettings: ${e.message}`);
    }

    // =============================================
    // Verificação final - testar queries
    // =============================================
    try {
      const projectCount = await prisma.project.count();
      results.push(`✅ Projects: ${projectCount} no banco`);
    } catch (e: any) {
      results.push(`❌ Projects count: ${e.message}`);
    }

    try {
      const serviceCount = await prisma.service.count();
      results.push(`✅ Services: ${serviceCount} no banco`);
    } catch (e: any) {
      results.push(`❌ Services count: ${e.message}`);
    }

    try {
      const projects = await prisma.project.findMany({
        take: 1,
        include: { heroImage: true, market: true, tags: true, services: true },
      });
      results.push(`✅ Project query with includes: OK (${projects.length} returned)`);
    } catch (e: any) {
      results.push(`❌ Project query with includes: ${e.message}`);
    }

    return NextResponse.json({ 
      success: true, 
      results,
      timestamp: new Date().toISOString() 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
