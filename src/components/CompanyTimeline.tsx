// ════════════════════════════════════════════════════════════
// COMPONENTE: CompanyTimeline
// ════════════════════════════════════════════════════════════
// Timeline completa da empresa usando dados reais da API
// - Busca dados de /api/public/history
// - FALLBACK: Usa dados estáticos se API falhar (404, etc)
// - Lista sequencial completa sempre visível (formato tabela)
// - Suporta multilíngue
// - Filtros por tipo, featured, período
// - Layout: Ano fixo à esquerda + Conteúdo à direita
// ════════════════════════════════════════════════════════════

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { Lang } from '../i18n'

// ════════════════════════════════════════════════════════════
// CHECKPOINT: Backup criado em CompanyTimeline.tsx.bak
// Para restaurar: copie CompanyTimeline.tsx.bak para CompanyTimeline.tsx
// ════════════════════════════════════════════════════════════

interface CompanyHistoryItem {
  id: string
  year: number
  yearEnd: number | null
  period: string
  type: string
  title: string
  description: string | null
  bullets: string[]
  icon: string | null
  logoUrl: string | null
  externalLink: string | null
  isFeatured: boolean
}

interface CompanyTimelineProps {
  lang: Lang
  type?: string // Filtrar por tipo
  featured?: boolean // Mostrar apenas featured
  yearStart?: number
  yearEnd?: number
  layout?: 'vertical' | 'horizontal'
  className?: string
}

// ════════════════════════════════════════════════════════════
// DADOS ESTÁTICOS DE FALLBACK (quando API não está disponível)
// ════════════════════════════════════════════════════════════
const FALLBACK_HISTORY: Record<Lang, CompanyHistoryItem[]> = {
  pt: [
    { id: '1', year: 1996, yearEnd: null, period: '1996', type: 'milestone', title: 'ArchiCAD Brasil - Computação Gráfica', description: 'Início das atividades com ArchiCAD, computação gráfica, CAD e maquetes virtuais.', bullets: [], icon: '🏗️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '2', year: 2000, yearEnd: 2018, period: '2000-2018', type: 'partnership', title: 'AZMT - Centro de Treinamento Autodesk', description: 'AZMT Computação e Produções Cinematográficas (nome fantasia Azimut) torna-se Centro de Treinamento Autodesk oficial na América do Sul por 18 anos.', bullets: ['Centro de Treinamento Autodesk Oficial', 'Demo Artist Autodesk Discreet', 'Application Engineer América do Sul', 'Único Flame Trainer certificado no Brasil'], icon: '🎓', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '3', year: 1998, yearEnd: null, period: '1998', type: 'milestone', title: 'AZMT Computação e Produções Cinematográficas', description: 'Fundação oficial da empresa com foco em produções cinematográficas.', bullets: [], icon: '🎬', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '4', year: 1999, yearEnd: null, period: '1999', type: 'partnership', title: 'Discreet (Montreal, Canada)', description: 'Parceria com Discreet (adquirida pela Autodesk em 1999) - empresa canadense sediada em Montreal.', bullets: [], icon: '🇨🇦', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '5', year: 2002, yearEnd: null, period: '2002', type: 'award', title: '1 de 15 no mundo - Training Specialist', description: 'Training Specialist Discreet Montreal - elite mundial de especialistas certificados.', bullets: [], icon: '🌟', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '6', year: 2004, yearEnd: 2018, period: '2004-2018', type: 'milestone', title: 'Azimut Escola de Animação', description: 'Primeira escola de animação CG Autodesk na América Latina.', bullets: ['Cursos profissionalizantes 1-2 anos', 'CAD, 3ds Max, After Effects, Flame', 'Formamos centenas de profissionais', 'Filiais em Rio, Belém, Florianópolis'], icon: '🎓', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '7', year: 2005, yearEnd: null, period: '2005', type: 'award', title: 'Digital Designer - Pessoa do Ano', description: 'Pessoa do ano em computação gráfica no Brasil - MAC Niterói.', bullets: [], icon: '🏆', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '8', year: 2005, yearEnd: 2007, period: '2005-2007', type: 'project', title: 'Taikodom - Maior Game Brasileiro', description: 'Direção de arte do maior projeto de game desenvolvido no Brasil - MMORPG espacial.', bullets: [], icon: '🎮', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '10', year: 2017, yearEnd: null, period: '2017', type: 'milestone', title: 'Vancouver, Canadá', description: 'Expansão internacional com operações em Vancouver, British Columbia.', bullets: [], icon: '🍁', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '11', year: 2017, yearEnd: 2025, period: '2017-2025', type: 'partnership', title: 'Festival de Gramado - Curadoria VR', description: 'Curadoria oficial de Realidade Virtual do Festival de Cinema de Gramado por 8 anos consecutivos - único no Brasil.', bullets: [], icon: '🎬', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '12', year: 2018, yearEnd: null, period: '2018', type: 'partnership', title: 'XRBR - Membro Fundador', description: 'Membro fundador da Associação Brasileira de Realidade Estendida.', bullets: [], icon: '🏆', logoUrl: null, externalLink: null, isFeatured: false },
    { id: '17', year: 2018, yearEnd: 2026, period: '2018-2026', type: 'partnership', title: 'YDreams', description: 'Parceria estratégica em projetos de experiências imersivas, motion design e conteúdo audiovisual.', bullets: ['Experiências Imersivas', 'Motion Design', 'Conteúdo Audiovisual'], icon: '🤝', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '18', year: 2018, yearEnd: 2026, period: '2018-2026', type: 'partnership', title: 'Escola de Comunicação UFRJ (Pesquisadores)', description: 'Parceria acadêmica com pesquisadores da Escola de Comunicação da UFRJ em projetos de pesquisa e desenvolvimento.', bullets: ['Pesquisadores', 'Projetos de Pesquisa', 'Desenvolvimento'], icon: '🎓', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '13', year: 2018, yearEnd: 2026, period: '2018-2026', type: 'milestone', title: 'Workshops, Palestras e Curadorias', description: 'Workshops em eventos, Rio2C, palestras e curadorias em tecnologia e novas mídias.', bullets: ['Rio2C', 'Workshops em eventos', 'Palestras', 'Curadorias'], icon: '🎤', logoUrl: null, externalLink: null, isFeatured: false },
    { id: '14', year: 2019, yearEnd: 2026, period: '2019-2026', type: 'project', title: 'Motion Design para Exposições Imersivas', description: 'Motion design e conteúdo audiovisual para exposições imersivas. Parcerias: YDreams e outras produtoras.', bullets: ['Motion Design', 'Exposições Imersivas', 'Parcerias: YDreams e outras produtoras'], icon: '✨', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '15', year: 2023, yearEnd: 2025, period: '2023-2025', type: 'project', title: 'Rio Museu Olímpico - Direção Geral', description: 'Direção Geral de Tecnologia, Direção Audiovisual e Design. Fase de execução e montagem com gestão de inúmeros fornecedores: games, simuladores, programadores, compatibilidade de arte, cenografia, motion, edição, pós-produção e interatividade.', bullets: ['Direção Geral de Tecnologia (Ranz)', 'Direção Audiovisual (Alberto)', 'Liderança Equipe Arte: Design/UI/Motion/Grafismo/Sinalização (Anick)', 'Gestão múltiplos fornecedores', 'Execução e montagem'], icon: '🏛️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '16', year: 2024, yearEnd: 2026, period: '2024-2026', type: 'milestone', title: 'Arte Generativa IA e Tecnologias Imersivas', description: 'Arte generativa com IA, motion design, VR/AR, interatividades e color mapping para experiências imersivas.', bullets: ['Arte Generativa IA', 'Motion Design', 'VR/AR', 'Interatividades', 'Color Mapping'], icon: '🤖', logoUrl: null, externalLink: null, isFeatured: true },
  ],
  en: [
    { id: '1', year: 1996, yearEnd: null, period: '1996', type: 'milestone', title: 'ArchiCAD Brasil - Computer Graphics', description: 'Start of activities with ArchiCAD, computer graphics, CAD and virtual models.', bullets: [], icon: '🏗️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '2', year: 2000, yearEnd: 2018, period: '2000-2018', type: 'partnership', title: 'AZMT - Autodesk Training Center', description: 'AZMT Computing and Cinematographic Productions (trade name Azimut) becomes official Autodesk Training Center in South America for 18 years.', bullets: ['Official Autodesk Training Center', 'Demo Artist Autodesk Discreet', 'Application Engineer South America', 'Only certified Flame Trainer in Brazil'], icon: '🎓', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '3', year: 1998, yearEnd: null, period: '1998', type: 'milestone', title: 'AZMT Computing and Cinematographic Productions', description: 'Official company foundation focused on cinematographic productions.', bullets: [], icon: '🎬', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '4', year: 1999, yearEnd: null, period: '1999', type: 'partnership', title: 'Discreet (Montreal, Canada)', description: 'Partnership with Discreet (acquired by Autodesk in 1999) - Canadian company based in Montreal.', bullets: [], icon: '🇨🇦', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '5', year: 2002, yearEnd: null, period: '2002', type: 'award', title: '1 of 15 worldwide - Training Specialist', description: 'Discreet Montreal Training Specialist - global elite of certified specialists.', bullets: [], icon: '🌟', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '6', year: 2004, yearEnd: 2018, period: '2004-2018', type: 'milestone', title: 'Azimut Animation School', description: 'First CG animation school Autodesk in Latin America.', bullets: ['Professional courses 1-2 years', 'CAD, 3ds Max, After Effects, Flame', 'Trained hundreds of professionals', 'Branches in Rio, Belém, Florianópolis'], icon: '🎓', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '7', year: 2005, yearEnd: null, period: '2005', type: 'award', title: 'Digital Designer - Person of the Year', description: 'Person of the year in computer graphics in Brazil - MAC Niterói.', bullets: [], icon: '🏆', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '8', year: 2005, yearEnd: 2007, period: '2005-2007', type: 'project', title: 'Taikodom - Largest Brazilian Game', description: 'Art direction of the largest game project developed in Brazil - space MMORPG.', bullets: [], icon: '🎮', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '10', year: 2017, yearEnd: null, period: '2017', type: 'milestone', title: 'Vancouver, Canada', description: 'International expansion with operations in Vancouver, British Columbia.', bullets: [], icon: '🍁', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '11', year: 2017, yearEnd: 2025, period: '2017-2025', type: 'partnership', title: 'Gramado Festival - VR Curatorship', description: 'Official Virtual Reality curatorship of Gramado Film Festival for 8 consecutive years - unique in Brazil.', bullets: [], icon: '🎬', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '12', year: 2018, yearEnd: null, period: '2018', type: 'partnership', title: 'XRBR - Founding Member', description: 'Founding member of Brazilian Extended Reality Association.', bullets: [], icon: '🏆', logoUrl: null, externalLink: null, isFeatured: false },
    { id: '17', year: 2018, yearEnd: 2026, period: '2018-2026', type: 'partnership', title: 'YDreams', description: 'Strategic partnership in immersive experiences, motion design and audiovisual content projects.', bullets: ['Immersive Experiences', 'Motion Design', 'Audiovisual Content'], icon: '🤝', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '18', year: 2018, yearEnd: 2026, period: '2018-2026', type: 'partnership', title: 'School of Communication UFRJ (Researchers)', description: 'Academic partnership with researchers from UFRJ School of Communication in research and development projects.', bullets: ['Researchers', 'Research Projects', 'Development'], icon: '🎓', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '13', year: 2018, yearEnd: 2026, period: '2018-2026', type: 'milestone', title: 'Workshops, Lectures and Curatorships', description: 'Workshops at events, Rio2C, lectures and curatorships in technology and new media.', bullets: ['Rio2C', 'Workshops at events', 'Lectures', 'Curatorships'], icon: '🎤', logoUrl: null, externalLink: null, isFeatured: false },
    { id: '14', year: 2019, yearEnd: 2026, period: '2019-2026', type: 'project', title: 'Motion Design for Immersive Exhibitions', description: 'Motion design and audiovisual content for immersive exhibitions. Partnerships: YDreams and other producers.', bullets: ['Motion Design', 'Immersive Exhibitions', 'Partnerships: YDreams and other producers'], icon: '✨', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '15', year: 2023, yearEnd: 2025, period: '2023-2025', type: 'project', title: 'Rio Olympic Museum - General Direction', description: 'General Technology Direction, Audiovisual Direction and Design. Execution and assembly phase with management of numerous suppliers: games, simulators, programmers, art compatibility, scenography, motion, editing, post-production and interactivity.', bullets: ['General Technology Direction (Ranz)', 'Audiovisual Direction (Alberto)', 'Art Team Leadership: Design/UI/Motion/Graphics/Signage (Anick)', 'Multiple supplier management', 'Execution and assembly'], icon: '🏛️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '16', year: 2024, yearEnd: 2026, period: '2024-2026', type: 'milestone', title: 'Generative AI Art and Immersive Technologies', description: 'Generative AI art, motion design, VR/AR, interactivities and color mapping for immersive experiences.', bullets: ['Generative AI Art', 'Motion Design', 'VR/AR', 'Interactivities', 'Color Mapping'], icon: '🤖', logoUrl: null, externalLink: null, isFeatured: true },
  ],
  es: [
    { id: '1', year: 1996, yearEnd: null, period: '1996', type: 'milestone', title: 'ArchiCAD Brasil - Computación Gráfica', description: 'Inicio de actividades con ArchiCAD, computación gráfica, CAD y maquetas virtuales.', bullets: [], icon: '🏗️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '2', year: 2000, yearEnd: 2018, period: '2000-2018', type: 'partnership', title: 'AZMT - Centro de Capacitación Autodesk', description: 'AZMT Computación y Producciones Cinematográficas (nombre comercial Azimut) se convierte en Centro de Capacitación Autodesk oficial en América del Sur por 18 años.', bullets: ['Centro de Capacitación Autodesk Oficial', 'Demo Artist Autodesk Discreet', 'Application Engineer América del Sur', 'Único Flame Trainer certificado en Brasil'], icon: '🎓', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '3', year: 1998, yearEnd: null, period: '1998', type: 'milestone', title: 'AZMT Computación y Producciones Cinematográficas', description: 'Fundación oficial de la empresa con enfoque en producciones cinematográficas.', bullets: [], icon: '🎬', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '4', year: 2005, yearEnd: 2007, period: '2005-2007', type: 'project', title: 'Taikodom - Mayor Juego Brasileño', description: 'Dirección de arte del mayor proyecto de juego desarrollado en Brasil.', bullets: [], icon: '🎮', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '5', year: 2023, yearEnd: 2025, period: '2023-2025', type: 'project', title: 'Museo Olímpico de Río', description: 'Dirección General de Tecnología para el Museo Olímpico de Río de Janeiro - post Olimpíadas 2016.', bullets: [], icon: '🏛️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '6', year: 2017, yearEnd: 2025, period: '2017-2025', type: 'partnership', title: 'Festival de Gramado - Curaduría VR', description: 'Curaduría oficial de Realidad Virtual del Festival de Cine de Gramado por 8 años consecutivos.', bullets: [], icon: '🎬', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '7', year: 2018, yearEnd: 2026, period: '2018-2026', type: 'milestone', title: 'Talleres, Conferencias y Curadurías', description: 'Talleres en eventos, Rio2C, conferencias y curadurías en tecnología y nuevos medios.', bullets: ['Rio2C', 'Talleres en eventos', 'Conferencias', 'Curadurías'], icon: '🎤', logoUrl: null, externalLink: null, isFeatured: false },
    { id: '11', year: 2018, yearEnd: 2026, period: '2018-2026', type: 'partnership', title: 'YDreams', description: 'Asociación estratégica en proyectos de experiencias inmersivas, motion design y contenido audiovisual.', bullets: ['Experiencias Inmersivas', 'Motion Design', 'Contenido Audiovisual'], icon: '🤝', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '12', year: 2018, yearEnd: 2026, period: '2018-2026', type: 'partnership', title: 'Escuela de Comunicación UFRJ (Investigadores)', description: 'Asociación académica con investigadores de la Escuela de Comunicación de la UFRJ en proyectos de investigación y desarrollo.', bullets: ['Investigadores', 'Proyectos de Investigación', 'Desarrollo'], icon: '🎓', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '8', year: 2019, yearEnd: 2026, period: '2019-2026', type: 'project', title: 'Motion Design para Exposiciones Inmersivas', description: 'Motion design y contenido audiovisual para exposiciones inmersivas. Asociaciones: YDreams y otras productoras.', bullets: ['Motion Design', 'Exposiciones Inmersivas', 'Asociaciones: YDreams y otras productoras'], icon: '✨', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '9', year: 2023, yearEnd: 2025, period: '2023-2025', type: 'project', title: 'Rio Museo Olímpico - Dirección General', description: 'Dirección General de Tecnología, Dirección Audiovisual y Diseño. Fase de ejecución y montaje con gestión de numerosos proveedores: juegos, simuladores, programadores, compatibilidad de arte, escenografía, motion, edición, postproducción e interactividad.', bullets: ['Dirección General de Tecnología (Ranz)', 'Dirección Audiovisual (Alberto)', 'Liderazgo Equipo Arte: Diseño/UI/Motion/Gráficos/Señalización (Anick)', 'Gestión múltiples proveedores', 'Ejecución y montaje'], icon: '🏛️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '10', year: 2024, yearEnd: 2026, period: '2024-2026', type: 'milestone', title: 'Arte Generativa IA y Tecnologías Inmersivas', description: 'Arte generativa con IA, motion design, VR/AR, interactividades y color mapping para experiencias inmersivas.', bullets: ['Arte Generativa IA', 'Motion Design', 'VR/AR', 'Interactividades', 'Color Mapping'], icon: '🤖', logoUrl: null, externalLink: null, isFeatured: true },
  ],
  fr: [
    { id: '1', year: 1996, yearEnd: null, period: '1996', type: 'milestone', title: 'ArchiCAD Brasil - Infographie', description: 'Début des activités avec ArchiCAD, infographie, CAD et maquettes virtuelles.', bullets: [], icon: '🏗️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '2', year: 2000, yearEnd: 2018, period: '2000-2018', type: 'partnership', title: 'AZMT - Centre de Formation Autodesk', description: 'AZMT Informatique et Productions Cinématographiques (nom commercial Azimut) devient Centre de Formation Autodesk officiel en Amérique du Sud pendant 18 ans.', bullets: ['Centre de Formation Autodesk Officiel', 'Demo Artist Autodesk Discreet', 'Application Engineer Amérique du Sud', 'Seul Flame Trainer certifié au Brésil'], icon: '🎓', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '3', year: 1998, yearEnd: null, period: '1998', type: 'milestone', title: 'AZMT Informatique et Productions Cinématographiques', description: 'Fondation officielle de l\'entreprise axée sur les productions cinématographiques.', bullets: [], icon: '🎬', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '4', year: 2005, yearEnd: 2007, period: '2005-2007', type: 'project', title: 'Taikodom - Plus Grand Jeu Brésilien', description: 'Direction artistique du plus grand projet de jeu développé au Brésil.', bullets: [], icon: '🎮', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '5', year: 2023, yearEnd: 2025, period: '2023-2025', type: 'project', title: 'Musée Olympique de Rio', description: 'Direction Générale de la Technologie pour le Musée Olympique de Rio de Janeiro - post Jeux 2016.', bullets: [], icon: '🏛️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '6', year: 2017, yearEnd: 2025, period: '2017-2025', type: 'partnership', title: 'Festival de Gramado - Curation VR', description: 'Curation officielle de Réalité Virtuelle du Festival de Cinéma de Gramado pendant 8 années consécutives.', bullets: [], icon: '🎬', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '7', year: 2018, yearEnd: 2026, period: '2018-2026', type: 'milestone', title: 'Ateliers, Conférences et Curations', description: 'Ateliers lors d\'événements, Rio2C, conférences et curations en technologie et nouveaux médias.', bullets: ['Rio2C', 'Ateliers lors d\'événements', 'Conférences', 'Curations'], icon: '🎤', logoUrl: null, externalLink: null, isFeatured: false },
    { id: '11', year: 2018, yearEnd: 2026, period: '2018-2026', type: 'partnership', title: 'YDreams', description: 'Partenariat stratégique dans des projets d\'expériences immersives, motion design et contenu audiovisuel.', bullets: ['Expériences Immersives', 'Motion Design', 'Contenu Audiovisuel'], icon: '🤝', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '12', year: 2018, yearEnd: 2026, period: '2018-2026', type: 'partnership', title: 'École de Communication UFRJ (Chercheurs)', description: 'Partenariat académique avec des chercheurs de l\'École de Communication de l\'UFRJ dans des projets de recherche et développement.', bullets: ['Chercheurs', 'Projets de Recherche', 'Développement'], icon: '🎓', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '8', year: 2019, yearEnd: 2026, period: '2019-2026', type: 'project', title: 'Motion Design pour Expositions Immersives', description: 'Motion design et contenu audiovisuel pour expositions immersives. Partenariats: YDreams et autres producteurs.', bullets: ['Motion Design', 'Expositions Immersives', 'Partenariats: YDreams et autres producteurs'], icon: '✨', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '9', year: 2023, yearEnd: 2025, period: '2023-2025', type: 'project', title: 'Rio Musée Olympique - Direction Générale', description: 'Direction Générale de Technologie, Direction Audiovisuelle et Design. Phase d\'exécution et montage avec gestion de nombreux fournisseurs: jeux, simulateurs, programmeurs, compatibilité artistique, scénographie, motion, montage, post-production et interactivité.', bullets: ['Direction Générale de Technologie (Ranz)', 'Direction Audiovisuelle (Alberto)', 'Leadership Équipe Art: Design/UI/Motion/Graphisme/Signalisation (Anick)', 'Gestion multiples fournisseurs', 'Exécution et montage'], icon: '🏛️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '10', year: 2024, yearEnd: 2026, period: '2024-2026', type: 'milestone', title: 'Art Générative IA et Technologies Immersives', description: 'Art générative avec IA, motion design, VR/AR, interactivités et color mapping pour expériences immersives.', bullets: ['Art Générative IA', 'Motion Design', 'VR/AR', 'Interactivités', 'Color Mapping'], icon: '🤖', logoUrl: null, externalLink: null, isFeatured: true },
  ],
}

export const CompanyTimeline: React.FC<CompanyTimelineProps> = React.memo(({
  lang,
  type,
  featured,
  yearStart,
  yearEnd,
  layout = 'vertical',
  className = ''
}) => {
  const [history, setHistory] = useState<CompanyHistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)
  
  // Ref para AbortController (cancelar requisições anteriores)
  const abortControllerRef = useRef<AbortController | null>(null)
  
  // Refs para animações de scroll (fade-in)
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())

  // Função para aplicar filtros nos dados (API ou fallback) - MEMOIZADA
  const applyFilters = useCallback((data: CompanyHistoryItem[]): CompanyHistoryItem[] => {
    let filtered = [...data]
    
    // Filtrar por tipo
    if (type && type !== 'all') {
      filtered = filtered.filter(item => item.type === type)
    }
    
    // Filtrar por featured
    if (featured !== undefined) {
      filtered = filtered.filter(item => item.isFeatured === featured)
    }
    
    // Filtrar por período
    if (yearStart) {
      filtered = filtered.filter(item => item.year >= yearStart)
    }
    if (yearEnd) {
      filtered = filtered.filter(item => item.year <= yearEnd)
    }
    
    return filtered
  }, [type, featured, yearStart, yearEnd])

  // Função para usar dados de fallback - MEMOIZADA
  const useFallbackData = useCallback(() => {
    console.log('[CompanyTimeline] Using FALLBACK data for lang:', lang)
    const fallbackData = FALLBACK_HISTORY[lang] || FALLBACK_HISTORY.pt
    const filteredData = applyFilters(fallbackData)
    setHistory(filteredData)
    setUsingFallback(true)
    setError(null)
    setLoading(false)
  }, [lang, applyFilters])

  const fetchHistory = useCallback(async () => {
    // Cancelar requisição anterior se ainda estiver pendente
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    
    // Criar novo AbortController para esta requisição
    const abortController = new AbortController()
    abortControllerRef.current = abortController
    try {
      setLoading(true)
      setError(null)
      setUsingFallback(false)
      
      // Construir URL com query params
      const params = new URLSearchParams()
      params.set('lang', lang)
      if (type && type !== 'all') params.set('type', type)
      if (featured !== undefined) params.set('featured', featured.toString())
      if (yearStart) params.set('yearStart', yearStart.toString())
      if (yearEnd) params.set('yearEnd', yearEnd.toString())

      // Usar VITE_BACKOFFICE_URL (padrão) ou fallback
      const envBackofficeUrl = import.meta.env.VITE_BACKOFFICE_URL
      const envCmsApiUrl = import.meta.env.VITE_CMS_API_URL
      const apiUrl = envBackofficeUrl || envCmsApiUrl || 'https://backoffice.azmt.com.br'
      const url = `${apiUrl}/api/public/history?${params.toString()}`
      
      console.log('[CompanyTimeline] Fetching from API:', url)
      
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        signal: abortController.signal // Adicionar signal para cancelamento
      })
      
      // Se API retornar erro (404, 500, etc), usar fallback
      if (!response.ok) {
        console.warn('[CompanyTimeline] API returned error:', response.status, '- Using fallback data')
        useFallbackData()
        return
      }

      const data = await response.json()
      
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        // Remover duplicatas baseado em year + title + type
        const uniqueHistory = data.data.filter((item: CompanyHistoryItem, index: number, self: CompanyHistoryItem[]) => 
          index === self.findIndex((t: CompanyHistoryItem) => 
            t.year === item.year && 
            t.title === item.title && 
            t.type === item.type
          )
        )
        
        console.log('[CompanyTimeline] API data loaded:', uniqueHistory.length, 'items')
        setHistory(uniqueHistory)
        setError(null)
      } else {
        // API retornou vazio ou formato inválido - usar fallback
        console.warn('[CompanyTimeline] API returned empty/invalid data - Using fallback')
        useFallbackData()
      }
    } catch (err) {
      // Se foi cancelado (AbortError), não fazer nada
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('[CompanyTimeline] Request aborted')
        return
      }
      
      // Erro de rede ou outro - usar fallback
      console.warn('[CompanyTimeline] Network error - Using fallback data:', err)
      useFallbackData()
    } finally {
      // Só atualizar loading se não foi cancelado
      if (!abortController.signal.aborted) {
        setLoading(false)
      }
    }
  }, [lang, type, featured, yearStart, yearEnd, applyFilters, useFallbackData])

  // Effect com cleanup para cancelar requisições
  useEffect(() => {
    fetchHistory()
    
    // Cleanup: cancelar requisição quando componente desmonta ou props mudam
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchHistory])

  // Memoizar dados filtrados e ordenados por ano (cronológico)
  const filteredHistory = useMemo(() => {
    const filtered = applyFilters(history)
    // Ordenar por ano (crescente) - mais antigo primeiro
    return filtered.sort((a, b) => {
      // Se ambos têm yearEnd, ordenar por yearEnd também
      if (a.yearEnd && b.yearEnd) {
        if (a.year !== b.year) {
          return a.year - b.year
        }
        return a.yearEnd - b.yearEnd
      }
      // Ordenar por year (ano inicial)
      return a.year - b.year
    })
  }, [history, applyFilters])

  // Effect para animações de scroll (IntersectionObserver) - DEPOIS de filteredHistory
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute('data-item-id')
            if (itemId) {
              setVisibleItems((prev) => new Set([...prev, itemId]))
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    itemRefs.current.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => {
      itemRefs.current.forEach((element) => {
        if (element) observer.unobserve(element)
      })
    }
  }, [filteredHistory])

  // Função removida - não usamos mais AnimatedTimeline, sempre lista completa

  // Loading state - Skeleton Shimmer
  if (loading) {
    return (
      <div className="space-y-4 py-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative flex gap-4 md:gap-6">
            {/* Skeleton: Ícone */}
            <div className="flex-shrink-0 w-16 md:w-20">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 animate-pulse mx-auto mb-2" />
              <div className="h-6 bg-gradient-to-r from-white/10 via-white/5 to-white/10 animate-pulse rounded" />
            </div>
            {/* Skeleton: Card */}
            <div className="flex-1">
              <div className="card-adaptive rounded-xl p-4 md:p-6">
                <div className="space-y-3">
                  <div className="h-6 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded animate-pulse" />
                  <div className="h-4 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded animate-pulse w-2/3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="card-adaptive rounded-xl p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-white mb-2">
          {lang === 'pt' ? 'Erro ao carregar timeline' :
           lang === 'en' ? 'Error loading timeline' :
           lang === 'es' ? 'Error al cargar timeline' :
           'Erreur de chargement timeline'}
        </h3>
        <p className="text-white/60 mb-4">{error}</p>
        <button
          onClick={fetchHistory}
          className="px-6 py-2 bg-azimut-red text-white rounded-lg hover:bg-azimut-red/80 transition-colors"
        >
          {lang === 'pt' ? 'Tentar novamente' :
           lang === 'en' ? 'Try again' :
           lang === 'es' ? 'Intentar de nuevo' :
           'Réessayer'}
        </button>
      </div>
    )
  }

  // Empty state
  if (filteredHistory.length === 0) {
    return (
      <div className="card-adaptive rounded-xl p-8 text-center">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-bold text-white mb-2">
          {lang === 'pt' ? 'Nenhum evento encontrado' :
           lang === 'en' ? 'No events found' :
           lang === 'es' ? 'No se encontraron eventos' :
           'Aucun événement trouvé'}
        </h3>
        <p className="text-white/60">
          {lang === 'pt' ? 'Tente ajustar os filtros.' :
           lang === 'en' ? 'Try adjusting the filters.' :
           lang === 'es' ? 'Intente ajustar los filtros.' :
           'Essayez d\'ajuster les filtres.'}
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Estatísticas */}
      <div className="mb-8 text-center">
        <p className="text-white/60 text-lg mb-4">
          <span className="font-bold text-azimut-red">{filteredHistory.length}</span>{' '}
          {lang === 'pt' ? 'eventos históricos' : lang === 'en' ? 'historical events' : lang === 'es' ? 'eventos históricos' : 'événements historiques'}
          {' • '}
          <span className="font-mono">{filteredHistory[0]?.year}</span> - <span className="font-mono">{filteredHistory[filteredHistory.length - 1]?.year}</span>
        </p>
      </div>

      {/* Lista Sequencial Completa - Sempre Visível */}
      <div className="space-y-4">
        {filteredHistory.map((item, index) => {
          const isVisible = visibleItems.has(item.id)
          return (
          <div
            key={item.id}
            ref={(el) => {
              if (el) itemRefs.current.set(item.id, el)
            }}
            data-item-id={item.id}
            className={`relative flex gap-4 md:gap-6 group transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Linha conectora vertical (exceto último item) - MAIS LARGA */}
            {index < filteredHistory.length - 1 && (
              <div className="absolute left-5 md:left-6 top-14 bottom-0 w-1 bg-gradient-to-b from-azimut-red/70 via-azimut-red/50 to-azimut-red/20" />
            )}

            {/* Coluna do Ano (fixa) - ÍCONES MAIORES */}
            <div className="flex-shrink-0 w-16 md:w-20 text-center">
              <div className="sticky top-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-azimut-red via-azimut-red/90 to-orange-500 flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-xl shadow-azimut-red/40 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-azimut-red/60 transition-all duration-300 mx-auto mb-3 ring-2 ring-azimut-red/20 group-hover:ring-azimut-red/40">
                  {item.icon || '📌'}
                </div>
                <div className="text-xs md:text-sm font-mono font-bold text-azimut-red bg-white/10 rounded-lg px-2.5 py-1.5 border border-azimut-red/20">
                  {item.period}
                </div>
              </div>
            </div>

            {/* Conteúdo do evento (expansível) - HOVER PREMIUM */}
            <div className="flex-1 pb-6">
              <div className="card-adaptive rounded-xl p-4 md:p-6 hover:border-azimut-red/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-azimut-red/30 group-hover:-translate-y-1 group-hover:scale-[1.01] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-azimut-red/0 before:via-azimut-red/5 before:to-azimut-red/0 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500">
                {/* Header com título e badge */}
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      {item.isFeatured && (
                        <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-wider bg-azimut-red text-white rounded-full">
                          {lang === 'pt' ? '⭐ Destaque' : lang === 'en' ? '⭐ Featured' : lang === 'es' ? '⭐ Destacado' : '⭐ En vedette'}
                        </span>
                      )}
                      <span className="inline-block px-2 py-1 text-xs font-medium text-azimut-red/80 bg-azimut-red/10 rounded uppercase">
                        {item.type === 'milestone' ? (lang === 'pt' ? 'Marco' : lang === 'en' ? 'Milestone' : lang === 'es' ? 'Hito' : 'Jalon') :
                         item.type === 'partnership' ? (lang === 'pt' ? 'Parceria' : lang === 'en' ? 'Partnership' : lang === 'es' ? 'Asociación' : 'Partenariat') :
                         item.type === 'project' ? (lang === 'pt' ? 'Projeto' : lang === 'en' ? 'Project' : lang === 'es' ? 'Proyecto' : 'Projet') :
                         item.type === 'award' ? (lang === 'pt' ? 'Prêmio' : lang === 'en' ? 'Award' : lang === 'es' ? 'Premio' : 'Prix') :
                         item.type}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-azimut-red transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Descrição */}
                {item.description && (
                  <p className="text-white/70 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* Bullets (lista detalhada) */}
                {item.bullets && item.bullets.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/70">
                        <span className="text-azimut-red mt-1.5 text-lg">▸</span>
                        <span className="flex-1">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Logo/Imagem se existir */}
                {item.logoUrl && (
                  <div className="mt-4 mb-4">
                    <img
                      src={item.logoUrl}
                      alt={item.title}
                      className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                )}

                {/* Link externo se existir */}
                {item.externalLink && (
                  <a
                    href={item.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-azimut-red hover:text-azimut-red/80 transition-colors group/link"
                  >
                    {lang === 'pt' ? 'Saiba mais' : lang === 'en' ? 'Learn more' : lang === 'es' ? 'Saber más' : 'En savoir plus'}
                    <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
})

// Adicionar displayName para debugging
CompanyTimeline.displayName = 'CompanyTimeline'

export default CompanyTimeline
