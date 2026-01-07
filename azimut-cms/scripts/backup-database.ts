/**
 * Script de BACKUP do banco de dados
 * Exporta todos os dados em JSON para restauração futura
 * Execução: npx tsx scripts/backup-database.ts
 */

import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function backupDatabase() {
  console.log('🛡️ INICIANDO BACKUP DO BANCO DE DADOS\n')

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
  const backupDir = path.join(__dirname, '..', 'backups')
  const backupFile = path.join(backupDir, `backup-${timestamp}.json`)

  // Criar diretório de backups se não existir
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true })
  }

  try {
    // Buscar todos os dados
    const [
      pages,
      services,
      tags,
      projects,
      markets,
      users,
      leads,
      settings,
    ] = await Promise.all([
      prisma.page.findMany(),
      prisma.service.findMany(),
      prisma.tag.findMany(),
      prisma.project.findMany({
        include: {
          tags: true,
          services: true,
          market: true,
        },
      }),
      prisma.market.findMany(),
      prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          // NÃO incluir password por segurança
        },
      }),
      prisma.lead.findMany(),
      prisma.settings.findMany(),
    ])

    const backup = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      data: {
        pages,
        services,
        tags,
        projects,
        markets,
        users,
        leads,
        settings,
      },
      counts: {
        pages: pages.length,
        services: services.length,
        tags: tags.length,
        projects: projects.length,
        markets: markets.length,
        users: users.length,
        leads: leads.length,
        settings: settings.length,
      },
    }

    // Salvar backup
    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2))

    console.log('✅ BACKUP CONCLUÍDO COM SUCESSO!\n')
    console.log(`📁 Arquivo: ${backupFile}\n`)
    console.log('📊 DADOS SALVOS:')
    console.log(`   - Pages: ${backup.counts.pages}`)
    console.log(`   - Services: ${backup.counts.services}`)
    console.log(`   - Tags: ${backup.counts.tags}`)
    console.log(`   - Projects: ${backup.counts.projects}`)
    console.log(`   - Markets: ${backup.counts.markets}`)
    console.log(`   - Users: ${backup.counts.users}`)
    console.log(`   - Leads: ${backup.counts.leads}`)
    console.log(`   - Settings: ${backup.counts.settings}`)
    console.log('\n🛡️ Para restaurar: npx tsx scripts/restore-database.ts ' + path.basename(backupFile))

  } catch (error) {
    console.error('❌ ERRO AO FAZER BACKUP:', error)
    process.exit(1)
  }
}

backupDatabase()
  .then(() => {
    console.log('\n✨ Backup finalizado!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 ERRO FATAL:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

