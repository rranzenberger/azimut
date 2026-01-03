/**
 * Script para atualizar projeto Museu Olímpico com CRÉDITOS CORRETOS
 * Baseado no caso real e papel da Azimut
 * 
 * Direção Geral e Tecnologia: Azimut (Ranz Ranzenberger)
 * Direção Audiovisual: Alberto Barreto
 * Parceiro: YDreams Global
 * Cliente: Prefeitura do Rio de Janeiro
 * 
 * Execução: npx tsx scripts/update-olympic-credits.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateOlympicCredits() {
  console.log('🏆 ATUALIZANDO CRÉDITOS: MUSEU OLÍMPICO DO RIO\n')
  console.log('📋 Baseado em documentação e papel real da Azimut\n')

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

    // 2. ATUALIZAR COM CRÉDITOS CORRETOS
    console.log('✏️  Atualizando informações e créditos...\n')

    await prisma.project.update({
      where: { slug: 'museu-olimpico-rio' },
      data: {
        // TÍTULO CORRETO
        title: 'Direção Geral - Museu Olímpico do Rio',
        shortTitle: 'Museu Olímpico',

        // RESUMOS ATUALIZADOS (4 idiomas)
        summaryPt:
          'Direção Geral, Tecnologia e Coordenação do Museu Olímpico do Rio. A Azimut foi convidada pela YDreams para assumir a gestão completa do projeto: cronograma, prazos, interface institucional, direção de tecnologia e audiovisual. Um projeto emblemático celebrando o legado olímpico do Rio 2016.',
        
        summaryEn:
          'General Direction, Technology and Coordination of Rio Olympic Museum. Azimut was invited by YDreams to assume complete project management: schedule, deadlines, institutional interface, technology and audiovisual direction. An emblematic project celebrating the Olympic legacy of Rio 2016.',
        
        summaryEs:
          'Dirección General, Tecnología y Coordinación del Museo Olímpico de Río. Azimut fue invitado por YDreams para asumir la gestión completa del proyecto: cronograma, plazos, interface institucional, dirección de tecnología y audiovisual. Un proyecto emblemático celebrando el legado olímpico de Río 2016.',
        
        summaryFr:
          'Direction Générale, Technologie et Coordination du Musée Olympique de Rio. Azimut a été invité par YDreams pour assumer la gestion complète du projet: calendrier, délais, interface institutionnelle, direction de technologie et audiovisuelle. Un projet emblématique célébrant l\'héritage olympique de Rio 2016.',

        // DESCRIÇÕES COMPLETAS (4 idiomas)
        descriptionPt: `# Direção Geral do Museu Olímpico do Rio

## O Projeto

O Museu Olímpico do Rio representa um marco na preservação da memória olímpica brasileira. Em 2023, a **Azimut foi convidada pela YDreams Global** para assumir a **direção geral do projeto**, coordenando todas as frentes de tecnologia, audiovisual, arte e interface institucional.

## Papel da Azimut

### Direção Geral e Tecnologia
**Ranz Ranzenberger** (Azimut) assumiu a direção geral do projeto, incluindo:

- ✅ **Gestão de Cronograma**: Coordenação de 9 meses de projeto
- ✅ **Interface Institucional**: Relacionamento direto com Prefeitura do Rio
- ✅ **Direção de Tecnologia**: Coordenação técnica de todas as instalações
- ✅ **Gestão de Prazos**: Garantia de entregas dentro do cronograma
- ✅ **Coordenação Multidisciplinar**: Gestão de múltiplas equipes e fornecedores

### Direção Audiovisual
**Alberto Barreto** (Azimut) liderou a direção audiovisual, incluindo:

- 🎬 Curadoria de conteúdo narrativo
- 🎨 Direção de arte das instalações
- 📹 Coordenação de produção audiovisual
- 🎞️ Finalização e integração de conteúdos

## Escopo do Projeto

### Instalações Desenvolvidas
- Sinalização digital interativa
- Instalações audiovisuais imersivas
- Narrativas cinematográficas sobre história olímpica
- Integração de múltiplas tecnologias (projeção, touchscreens, sistemas imersivos)
- Experiências interativas para visitantes

### Gestão e Coordenação
- Coordenação de equipes multidisciplinares
- Interface entre cliente (Prefeitura) e parceiros tecnológicos
- Gestão de fornecedores e prestadores de serviço
- Controle de qualidade e entregas
- Acompanhamento de montagem e inauguração

## Resultado

✅ **Inauguração bem-sucedida dentro do prazo**
✅ **Todas as entregas conforme planejado**
✅ **Reconhecimento público e institucional**
✅ **Experiência imersiva celebrando legado olímpico**

---

## Ficha Técnica

**Cliente**: Prefeitura do Rio de Janeiro  
**Parceiro Tecnológico**: YDreams Global  
**Direção Geral e Tecnologia**: Ranz Ranzenberger (Azimut)  
**Direção Audiovisual**: Alberto Barreto (Azimut)  
**Duração**: 9 meses  
**Ano**: 2016  
**Localização**: Rio de Janeiro, Brasil  

---

*Documentação do projeto disponível mediante solicitação para clientes e parceiros.*`,

        descriptionEn: `# General Direction of Rio Olympic Museum

## The Project

The Rio Olympic Museum represents a milestone in preserving Brazilian Olympic memory. In 2023, **Azimut was invited by YDreams Global** to assume **general direction of the project**, coordinating all fronts of technology, audiovisual, art and institutional interface.

## Azimut's Role

### General Direction and Technology
**Ranz Ranzenberger** (Azimut) assumed general direction of the project, including:

- ✅ **Schedule Management**: Coordination of 9-month project
- ✅ **Institutional Interface**: Direct relationship with Rio City Hall
- ✅ **Technology Direction**: Technical coordination of all installations
- ✅ **Deadline Management**: Ensuring deliveries within schedule
- ✅ **Multidisciplinary Coordination**: Management of multiple teams and suppliers

### Audiovisual Direction
**Alberto Barreto** (Azimut) led audiovisual direction, including:

- 🎬 Narrative content curation
- 🎨 Art direction of installations
- 📹 Audiovisual production coordination
- 🎞️ Content finishing and integration

## Project Scope

### Developed Installations
- Interactive digital signage
- Immersive audiovisual installations
- Cinematic narratives about Olympic history
- Integration of multiple technologies (projection, touchscreens, immersive systems)
- Interactive visitor experiences

### Management and Coordination
- Coordination of multidisciplinary teams
- Interface between client (City Hall) and technology partners
- Supplier and service provider management
- Quality control and deliveries
- Assembly and inauguration follow-up

## Result

✅ **Successful inauguration on schedule**
✅ **All deliveries as planned**
✅ **Public and institutional recognition**
✅ **Immersive experience celebrating Olympic legacy**

---

## Credits

**Client**: Rio de Janeiro City Hall  
**Technology Partner**: YDreams Global  
**General Direction and Technology**: Ranz Ranzenberger (Azimut)  
**Audiovisual Direction**: Alberto Barreto (Azimut)  
**Duration**: 9 months  
**Year**: 2016  
**Location**: Rio de Janeiro, Brazil  

---

*Project documentation available upon request for clients and partners.*`,

        descriptionEs: `# Dirección General del Museo Olímpico de Río

## El Proyecto

El Museo Olímpico de Río representa un hito en la preservación de la memoria olímpica brasileña. En 2023, **Azimut fue invitado por YDreams Global** para asumir la **dirección general del proyecto**, coordinando todos los frentes de tecnología, audiovisual, arte e interface institucional.

## Papel de Azimut

### Dirección General y Tecnología
**Ranz Ranzenberger** (Azimut) asumió la dirección general del proyecto, incluyendo:

- ✅ **Gestión de Cronograma**: Coordinación de proyecto de 9 meses
- ✅ **Interface Institucional**: Relación directa con Prefectura de Río
- ✅ **Dirección de Tecnología**: Coordinación técnica de todas las instalaciones
- ✅ **Gestión de Plazos**: Garantía de entregas dentro del cronograma
- ✅ **Coordinación Multidisciplinar**: Gestión de múltiples equipos y proveedores

### Dirección Audiovisual
**Alberto Barreto** (Azimut) lideró la dirección audiovisual, incluyendo:

- 🎬 Curaduría de contenido narrativo
- 🎨 Dirección de arte de las instalaciones
- 📹 Coordinación de producción audiovisual
- 🎞️ Finalización e integración de contenidos

## Alcance del Proyecto

### Instalaciones Desarrolladas
- Señalización digital interactiva
- Instalaciones audiovisuales inmersivas
- Narrativas cinematográficas sobre historia olímpica
- Integración de múltiples tecnologías (proyección, pantallas táctiles, sistemas inmersivos)
- Experiencias interactivas para visitantes

### Gestión y Coordinación
- Coordinación de equipos multidisciplinares
- Interface entre cliente (Prefectura) y socios tecnológicos
- Gestión de proveedores y prestadores de servicio
- Control de calidad y entregas
- Acompañamiento de montaje e inauguración

## Resultado

✅ **Inauguración exitosa dentro del plazo**
✅ **Todas las entregas según lo planificado**
✅ **Reconocimiento público e institucional**
✅ **Experiencia inmersiva celebrando legado olímpico**

---

## Ficha Técnica

**Cliente**: Prefectura de Río de Janeiro  
**Socio Tecnológico**: YDreams Global  
**Dirección General y Tecnología**: Ranz Ranzenberger (Azimut)  
**Dirección Audiovisual**: Alberto Barreto (Azimut)  
**Duración**: 9 meses  
**Año**: 2016  
**Localización**: Río de Janeiro, Brasil  

---

*Documentación del proyecto disponible bajo solicitud para clientes y socios.*`,

        descriptionFr: `# Direction Générale du Musée Olympique de Rio

## Le Projet

Le Musée Olympique de Rio représente une étape importante dans la préservation de la mémoire olympique brésilienne. En 2023, **Azimut a été invité par YDreams Global** pour assumer la **direction générale du projet**, coordonnant tous les fronts de technologie, audiovisuel, art et interface institutionnelle.

## Rôle d'Azimut

### Direction Générale et Technologie
**Ranz Ranzenberger** (Azimut) a assumé la direction générale du projet, incluant:

- ✅ **Gestion de Calendrier**: Coordination d'un projet de 9 mois
- ✅ **Interface Institutionnelle**: Relation directe avec la Mairie de Rio
- ✅ **Direction de Technologie**: Coordination technique de toutes les installations
- ✅ **Gestion des Délais**: Garantie de livraisons dans les délais
- ✅ **Coordination Multidisciplinaire**: Gestion de multiples équipes et fournisseurs

### Direction Audiovisuelle
**Alberto Barreto** (Azimut) a dirigé la direction audiovisuelle, incluant:

- 🎬 Curation de contenu narratif
- 🎨 Direction artistique des installations
- 📹 Coordination de production audiovisuelle
- 🎞️ Finalisation et intégration de contenus

## Portée du Projet

### Installations Développées
- Signalisation numérique interactive
- Installations audiovisuelles immersives
- Récits cinématographiques sur l'histoire olympique
- Intégration de multiples technologies (projection, écrans tactiles, systèmes immersifs)
- Expériences interactives pour visiteurs

### Gestion et Coordination
- Coordination d'équipes multidisciplinaires
- Interface entre client (Mairie) et partenaires technologiques
- Gestion de fournisseurs et prestataires de services
- Contrôle qualité et livraisons
- Suivi d'assemblage et inauguration

## Résultat

✅ **Inauguration réussie dans les délais**
✅ **Toutes les livraisons comme prévu**
✅ **Reconnaissance publique et institutionnelle**
✅ **Expérience immersive célébrant l'héritage olympique**

---

## Crédits

**Client**: Mairie de Rio de Janeiro  
**Partenaire Technologique**: YDreams Global  
**Direction Générale et Technologie**: Ranz Ranzenberger (Azimut)  
**Direction Audiovisuelle**: Alberto Barreto (Azimut)  
**Durée**: 9 mois  
**Année**: 2016  
**Localisation**: Rio de Janeiro, Brésil  

---

*Documentation du projet disponible sur demande pour clients et partenaires.*`,

        // OUTROS CAMPOS
        client: 'Prefeitura do Rio de Janeiro',
        type: 'MUSEUM_DIRECTION',
        
        // CTAs atualizados
        ctaLabelPt: 'Ver Detalhes do Projeto',
        ctaLabelEn: 'View Project Details',
      },
    })

    console.log('✅ Projeto atualizado com créditos corretos!\n')

    // RESUMO
    console.log('═══════════════════════════════════════════════════════════════')
    console.log('✅ ATUALIZAÇÃO COMPLETA REALIZADA!')
    console.log('═══════════════════════════════════════════════════════════════\n')

    console.log('📋 CRÉDITOS OFICIAIS:\n')
    console.log('   🏆 Cliente: Prefeitura do Rio de Janeiro')
    console.log('   🤝 Parceiro Tecnológico: YDreams Global')
    console.log('   👨‍💼 Direção Geral e Tecnologia: Ranz Ranzenberger (Azimut)')
    console.log('   🎬 Direção Audiovisual: Alberto Barreto (Azimut)')
    console.log('   ⏱️  Duração: 9 meses')
    console.log('   📅 Ano: 2016\n')

    console.log('📝 PAPEL DA AZIMUT:\n')
    console.log('   ✅ Direção Geral do Projeto')
    console.log('   ✅ Direção de Tecnologia')
    console.log('   ✅ Direção Audiovisual')
    console.log('   ✅ Gestão de Cronograma e Prazos')
    console.log('   ✅ Interface com Instituições')
    console.log('   ✅ Coordenação de Equipes Multidisciplinares\n')

    console.log('🎯 DESTAQUE:\n')
    console.log('   ⭐ Convidados pela YDreams para assumir direção')
    console.log('   ⭐ Responsáveis por gestão completa do projeto')
    console.log('   ⭐ Inauguração bem-sucedida no prazo')
    console.log('   ⭐ Créditos claros e profissionais\n')

    console.log('═══════════════════════════════════════════════════════════════\n')

    console.log('🌐 ONDE VISUALIZAR:\n')
    console.log('1. Site: https://azmt.com.br')
    console.log('   • Hero da Home: Vídeo oficial Eduardo Paes')
    console.log('   • Título: "Direção Geral - Museu Olímpico do Rio"')
    console.log('   • Resumo: Destaca papel da Azimut\n')

    console.log('2. Página do Projeto: https://azmt.com.br/work/museu-olimpico-rio')
    console.log('   • Descrição completa com créditos')
    console.log('   • Seção "Papel da Azimut"')
    console.log('   • Ficha técnica detalhada')
    console.log('   • Galeria de vídeos\n')

    console.log('3. Backoffice: https://backoffice.azmt.com.br/admin/projects')
    console.log('   • Editável e atualizável')
    console.log('   • Adicione mais fotos/vídeos')
    console.log('   • Personalize conforme necessário\n')

    console.log('═══════════════════════════════════════════════════════════════\n')

    console.log('💡 PRÓXIMAS AÇÕES RECOMENDADAS:\n')
    console.log('1. ✅ Acesse o site e veja as atualizações')
    console.log('2. 📸 Adicione fotos dos bastidores no backoffice')
    console.log('3. 🎬 Adicione mais vídeos do projeto na galeria')
    console.log('4. 💼 Use nas propostas comerciais futuras')
    console.log('5. 📄 Mantenha documentação (email YDreams) arquivada\n')

    console.log('⚖️  LEMBRETE LEGAL:\n')
    console.log('   • Créditos profissionais e éticos ✅')
    console.log('   • Menciona parceiros (YDreams) ✅')
    console.log('   • Destaca papel real da Azimut ✅')
    console.log('   • Não cria conflitos públicos ✅')
    console.log('   • Baseado em convite documentado ✅\n')

  } catch (error) {
    console.error('❌ ERRO ao atualizar projeto:', error)
    throw error
  }
}

// Executar
updateOlympicCredits()
  .then(() => {
    console.log('✨ CRÉDITOS ATUALIZADOS COM SUCESSO!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 ERRO FATAL:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

