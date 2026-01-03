/**
 * Análise Automática de Imagens com DeepSeek
 * 
 * Detecta automaticamente:
 * - Categorias (jornal, instalações, ginástica, eventos, making-of)
 * - TIER de impacto (1, 2, 3)
 * - Tags relevantes
 * - Público-alvo
 * - Descrição melhorada
 * 
 * Integrado com sistema de curadoria e recomendação
 */

import { getAIProvider } from '../src/lib/ai-provider';

export interface ImageAnalysisResult {
  category: 'jornal' | 'instalacoes' | 'ginastica' | 'eventos' | 'making-of' | 'tecnologia' | 'outros';
  tier: 1 | 2 | 3;
  tags: string[];
  targetAudience: string[];
  description: {
    pt: string;
    en: string;
    es: string;
    fr: string;
  };
  relevance: number; // 0-100
  shouldHighlight: boolean;
}

/**
 * Analisa uma imagem usando DeepSeek
 */
export async function analyzeImageWithAI(
  imageUrl: string,
  filename: string,
  existingAlt?: string
): Promise<ImageAnalysisResult> {
  const aiService = getAIProvider();

  const prompt = `Você é um especialista em curadoria de conteúdo para projetos culturais e tecnológicos.

Analise esta imagem do projeto Museu Olímpico do Rio e forneça uma análise estruturada em JSON.

CONTEXTO DO PROJETO:
- Projeto oficial da Prefeitura do Rio de Janeiro
- Direção Geral de Tecnologia: Azimut (Ranz Ranzenberger)
- Direção Audiovisual: Azimut (Alberto Moura)
- 13 núcleos temáticos, 80+ experiências interativas
- Tecnologia inovadora: semi-esfera, games interativos, sala imersiva

INFORMAÇÕES DA IMAGEM:
- URL: ${imageUrl}
- Nome do arquivo: ${filename}
- Alt text existente: ${existingAlt || 'Nenhum'}

TAREFAS (SEJA PRECISO E ESTRATÉGICO):
1. Identifique a CATEGORIA (uma única): jornal, instalacoes, ginastica, eventos, making-of, tecnologia, outros
   - jornal: Imagens de matérias, capas, reconhecimento público
   - instalacoes: Tecnologia, interatividade, inovação
   - ginastica: Áreas temáticas, curadoria, detalhamento
   - eventos: Inauguração, autoridades, público
   - making-of: Processo, construção, backstage
   - tecnologia: Sistemas, backoffice, arquitetura técnica

2. Determine o TIER de impacto (1=máximo, 2=alto, 3=complementar):
   - TIER 1: Impressiona governantes, credibilidade oficial, tecnologia inovadora, reconhecimento público
   - TIER 2: Impressiona centros culturais, produtoras, mostra curadoria e qualidade
   - TIER 3: Complementa e enriquece o conteúdo

3. Sugira TAGS relevantes (máximo 5, seja específico):
   - Use palavras-chave que ajudam na busca e recomendação
   - Exemplos: "tecnologia-interativa", "instalacao-imersiva", "reconhecimento-publico"
   - Evite tags genéricas demais

4. Identifique PÚBLICO-ALVO (múltiplos): governantes, centros-culturais, produtoras, empresas, publico-geral, parceiros
   - Baseado em quem essa imagem mais impressiona

5. Crie DESCRIÇÕES melhoradas em 4 idiomas (PT, EN, ES, FR):
   - Máximo 200 caracteres cada
   - Seja descritivo mas conciso
   - Mencione tecnologia/innovacao quando relevante
   - Destaque papel da Azimut quando apropriado

6. Calcule RELEVÂNCIA (0-100):
   - 90-100: Essencial, mostra credibilidade ou tecnologia única
   - 70-89: Muito importante, demonstra expertise
   - 50-69: Importante, enriquece o conteúdo
   - 0-49: Complementar

7. Determine se deve DESTACAR (shouldHighlight):
   - true: TIER 1 OU relevância > 85
   - false: Caso contrário

RESPONDA APENAS COM JSON VÁLIDO NO SEGUINTE FORMATO:
{
  "category": "jornal|instalacoes|ginastica|eventos|making-of|tecnologia|outros",
  "tier": 1|2|3,
  "tags": ["tag1", "tag2", "tag3"],
  "targetAudience": ["governantes", "centros-culturais", ...],
  "description": {
    "pt": "Descrição em português",
    "en": "Description in English",
    "es": "Descripción en español",
    "fr": "Description en français"
  },
  "relevance": 85,
  "shouldHighlight": true
}`;

  try {
    const response = await aiService.chat([
      {
        role: 'user',
        content: prompt
      }
    ], {
      temperature: 0.3, // Mais determinístico para análise
      maxTokens: 1000
    });

    // Parse JSON da resposta
    const jsonMatch = response.content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Resposta da IA não contém JSON válido');
    }

    const analysis = JSON.parse(jsonMatch[0]) as ImageAnalysisResult;

    // Validação e fallback
    return {
      category: analysis.category || detectCategoryFromFilename(filename),
      tier: analysis.tier || detectTierFromFilename(filename),
      tags: analysis.tags || [],
      targetAudience: analysis.targetAudience || [],
      description: analysis.description || {
        pt: existingAlt || `Imagem do Museu Olímpico do Rio - ${filename}`,
        en: existingAlt || `Rio Olympic Museum image - ${filename}`,
        es: existingAlt || `Imagen del Museo Olímpico de Río - ${filename}`,
        fr: existingAlt || `Image du Musée Olympique de Rio - ${filename}`
      },
      relevance: analysis.relevance || 50,
      shouldHighlight: analysis.shouldHighlight || false
    };

  } catch (error: any) {
    console.error('Erro ao analisar imagem com IA:', error);
    
    // Fallback: análise baseada em nome do arquivo
    return {
      category: detectCategoryFromFilename(filename),
      tier: detectTierFromFilename(filename),
      tags: extractTagsFromFilename(filename),
      targetAudience: detectAudienceFromFilename(filename),
      description: {
        pt: existingAlt || `Imagem do Museu Olímpico do Rio - ${filename}`,
        en: existingAlt || `Rio Olympic Museum image - ${filename}`,
        es: existingAlt || `Imagen del Museo Olímpico de Río - ${filename}`,
        fr: existingAlt || `Image du Musée Olympique de Rio - ${filename}`
      },
      relevance: 50,
      shouldHighlight: detectTierFromFilename(filename) === 1
    };
  }
}

/**
 * Detecta categoria baseado no nome do arquivo (fallback)
 */
function detectCategoryFromFilename(filename: string): ImageAnalysisResult['category'] {
  const lower = filename.toLowerCase();
  
  if (lower.includes('jornal')) return 'jornal';
  if (lower.includes('ginastica')) return 'ginastica';
  if (lower.includes('inauguracao') || lower.includes('evento') || lower.includes('crowd')) return 'eventos';
  if (lower.includes('construcao') || lower.includes('making')) return 'making-of';
  if (lower.includes('semi-esfera') || lower.includes('bicicleta') || lower.includes('tela') || lower.includes('velodromo')) return 'instalacoes';
  if (lower.includes('tecnologia') || lower.includes('sistema')) return 'tecnologia';
  
  return 'outros';
}

/**
 * Detecta TIER baseado no nome do arquivo (fallback)
 */
function detectTierFromFilename(filename: string): 1 | 2 | 3 {
  const tier1Files = [
    'jornal-o-globo-capa',
    'velodromo-exterior',
    'semi-esfera-verde',
    'bicicleta-interativa',
    'tela-interativa-mapa'
  ];
  
  const lower = filename.toLowerCase();
  if (tier1Files.some(file => lower.includes(file))) return 1;
  
  const tier2Files = [
    'ginastica-barras',
    'ginastica-argolas',
    'inauguracao',
    'construcao'
  ];
  
  if (tier2Files.some(file => lower.includes(file))) return 2;
  
  return 3;
}

/**
 * Extrai tags do nome do arquivo (fallback)
 */
function extractTagsFromFilename(filename: string): string[] {
  const tags: string[] = [];
  const lower = filename.toLowerCase();
  
  if (lower.includes('jornal')) tags.push('jornal', 'imprensa', 'mídia');
  if (lower.includes('velodromo')) tags.push('velódromo', 'parque-olímpico');
  if (lower.includes('semi-esfera')) tags.push('semi-esfera', 'instalação-interativa');
  if (lower.includes('bicicleta')) tags.push('bicicleta-interativa', 'games');
  if (lower.includes('ginastica')) tags.push('ginástica-artística', 'esportes');
  if (lower.includes('inauguracao')) tags.push('inauguração', 'evento-oficial');
  if (lower.includes('construcao')) tags.push('making-of', 'processo');
  
  return tags;
}

/**
 * Detecta público-alvo baseado no nome do arquivo (fallback)
 */
function detectAudienceFromFilename(filename: string): string[] {
  const audience: string[] = [];
  const lower = filename.toLowerCase();
  
  if (lower.includes('jornal') || lower.includes('inauguracao')) {
    audience.push('governantes', 'publico-geral');
  }
  if (lower.includes('ginastica') || lower.includes('instalacoes')) {
    audience.push('centros-culturais', 'produtoras');
  }
  if (lower.includes('semi-esfera') || lower.includes('bicicleta') || lower.includes('tela')) {
    audience.push('empresas', 'parceiros', 'publico-geral');
  }
  
  return audience.length > 0 ? audience : ['publico-geral'];
}

/**
 * Analisa múltiplas imagens em lote
 */
export async function analyzeImagesBatch(
  images: Array<{ url: string; filename: string; alt?: string }>
): Promise<ImageAnalysisResult[]> {
  const results: ImageAnalysisResult[] = [];
  
  // Processar em paralelo (máximo 5 por vez para não sobrecarregar API)
  const batchSize = 5;
  for (let i = 0; i < images.length; i += batchSize) {
    const batch = images.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(img => analyzeImageWithAI(img.url, img.filename, img.alt))
    );
    results.push(...batchResults);
    
    // Pequeno delay entre batches
    if (i + batchSize < images.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return results;
}

