/**
 * Script para ATUALIZAR DURAÇÃO E EQUIPE COMPLETA
 * 
 * - Duração: 22 meses (não 9 meses)
 * - Equipe Azimut completa:
 *   - Ranz Ranzenberger (Direção Geral e Tecnologia)
 *   - Alberto Barreto (Direção Audiovisual)
 *   - Aickm (Designer, Diretora de Arte)
 *   - [Outros nomes serão adicionados]
 * 
 * Execução: npx tsx scripts/update-olympic-team-duration.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Equipe Azimut - pode ser expandida
const azimutTeam = [
  {
    name: 'Ranz Enberger',
    role: 'Direção Geral e Tecnologia',
    roleEn: 'General Direction and Technology',
    roleEs: 'Dirección General y Tecnología',
    roleFr: 'Direction Générale et Technologie'
  },
  {
    name: 'Alberto Moura',
    role: 'Direção Audiovisual',
    roleEn: 'Audiovisual Direction',
    roleEs: 'Dirección Audiovisual',
    roleFr: 'Direction Audiovisuelle'
  },
  {
    name: 'Aick Couto Pereira',
    role: 'Diretora de Arte da Azimut',
    roleEn: 'Azimut Art Director',
    roleEs: 'Directora de Arte de Azimut',
    roleFr: 'Directrice Artistique d\'Azimut'
  }
  // Outros membros serão adicionados aqui
]

async function updateOlympicTeamAndDuration() {
  console.log('👥 ATUALIZANDO EQUIPE E DURAÇÃO: RIO MUSEU OLÍMPICO\n')
  console.log('⏱️  Duração: 22 meses\n')

  try {
    // 1. Buscar o projeto
    console.log('🔍 Buscando projeto...')
    const project = await prisma.project.findUnique({
      where: { slug: 'museu-olimpico-rio' },
    })

    if (!project) {
      console.error('❌ Projeto não encontrado!')
      process.exit(1)
    }

    console.log('✅ Projeto encontrado\n')

    // 2. Construir seção de equipe em markdown
    const teamSectionPt = `
## Equipe Azimut

${azimutTeam.map(member => {
      if (member.name === 'Aick Couto Pereira') {
        return `- **${member.name}** - ${member.role} (16 meses de produção)`
      }
      return `- **${member.name}** - ${member.role}`
    }).join('\n')}
`

    const teamSectionEn = `
## Azimut Team

${azimutTeam.map(member => {
      if (member.name === 'Aick Couto Pereira') {
        return `- **${member.name}** - ${member.roleEn} (16 months of production)`
      }
      return `- **${member.name}** - ${member.roleEn}`
    }).join('\n')}
`

    const teamSectionEs = `
## Equipo Azimut

${azimutTeam.map(member => {
      if (member.name === 'Aick Couto Pereira') {
        return `- **${member.name}** - ${member.roleEs} (16 meses de producción)`
      }
      return `- **${member.name}** - ${member.roleEs}`
    }).join('\n')}
`

    const teamSectionFr = `
## Équipe Azimut

${azimutTeam.map(member => {
      if (member.name === 'Aick Couto Pereira') {
        return `- **${member.name}** - ${member.roleFr} (16 mois de production)`
      }
      return `- **${member.name}** - ${member.roleFr}`
    }).join('\n')}
`

    // 3. ATUALIZAR DESCRIÇÕES COM DURAÇÃO E EQUIPE
    console.log('✏️  Atualizando descrições...\n')

    // Função para atualizar descrição mantendo estrutura existente
    const updateDescription = (currentDesc: string | null, teamSection: string, lang: 'pt' | 'en' | 'es' | 'fr') => {
      if (!currentDesc) return null

      // Substituir duração de 9 meses para 22 meses
      let updated = currentDesc.replace(/9 meses/g, '22 meses')
      updated = updated.replace(/9 months/g, '22 months')
      updated = updated.replace(/9 meses/g, '22 meses')
      updated = updated.replace(/9 meses/g, '22 meses')

      // Substituir "Coordenação de 9 meses" por "Coordenação de 22 meses"
      updated = updated.replace(/Coordenação de 9 meses/g, 'Coordenação de 22 meses')
      updated = updated.replace(/Coordination of 9-month/g, 'Coordination of 22-month')
      updated = updated.replace(/Coordinación de proyecto de 9 meses/g, 'Coordinación de proyecto de 22 meses')
      updated = updated.replace(/Coordination de projet de 9 mois/g, 'Coordination de projet de 22 mois')

      // Adicionar seção de equipe antes da Ficha Técnica
      if (updated.includes('## Ficha Técnica') || updated.includes('## Technical Specifications')) {
        // Inserir seção de equipe antes da ficha técnica
        const fichaIndex = updated.indexOf('## Ficha Técnica') !== -1 
          ? updated.indexOf('## Ficha Técnica')
          : updated.indexOf('## Technical Specifications')
        
        if (fichaIndex !== -1) {
          updated = updated.slice(0, fichaIndex) + teamSection + '\n\n' + updated.slice(fichaIndex)
        }
      } else {
        // Se não houver ficha técnica, adicionar no final
        updated = updated + '\n\n' + teamSection
      }

      // Atualizar duração na ficha técnica
      updated = updated.replace(/\*\*Duração\*\*: 9 meses/g, '**Duração**: 22 meses')
      updated = updated.replace(/\*\*Duration\*\*: 9 months/g, '**Duration**: 22 months')
      updated = updated.replace(/\*\*Duración\*\*: 9 meses/g, '**Duración**: 22 meses')
      updated = updated.replace(/\*\*Durée\*\*: 9 mois/g, '**Durée**: 22 mois')

      return updated
    }

    await prisma.project.update({
      where: { slug: 'museu-olimpico-rio' },
      data: {
        descriptionPt: updateDescription(project.descriptionPt, teamSectionPt, 'pt'),
        descriptionEn: updateDescription(project.descriptionEn, teamSectionEn, 'en'),
        descriptionEs: updateDescription(project.descriptionEs, teamSectionEs, 'es'),
        descriptionFr: updateDescription(project.descriptionFr, teamSectionFr, 'fr'),
      }
    })

    console.log('✅ Descrições atualizadas!\n')
    console.log('📋 Equipe adicionada:')
    azimutTeam.forEach(member => {
      console.log(`   • ${member.name} - ${member.role}`)
    })
    console.log('\n⏱️  Duração atualizada: 22 meses\n')

    // 4. Verificar resultado
    const updated = await prisma.project.findUnique({
      where: { slug: 'museu-olimpico-rio' },
      select: {
        descriptionPt: true,
      }
    })

    if (updated?.descriptionPt?.includes('22 meses')) {
      console.log('✅ Verificação: Duração atualizada corretamente')
    }

    if (updated?.descriptionPt?.includes('Aickm')) {
      console.log('✅ Verificação: Equipe adicionada corretamente')
    }

    console.log('\n💡 Próximos passos:')
    console.log('   1. Verifique no backoffice: /admin/projects/museu-olimpico-rio')
    console.log('   2. Verifique no site: /work/museu-olimpico-rio')
    console.log('   3. Para adicionar mais membros da equipe, edite o array "azimutTeam" neste script\n')

    console.log('📝 Para adicionar mais membros:')
    console.log('   Edite o arquivo: azimut-cms/scripts/update-olympic-team-duration.ts')
    console.log('   Adicione no array "azimutTeam" e execute novamente\n')

  } catch (error: any) {
    console.error('❌ Erro ao atualizar:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar
updateOlympicTeamAndDuration()
  .then(() => {
    console.log('✅ Script concluído!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro:', error)
    process.exit(1)
  })

