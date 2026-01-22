import fs from 'fs';
import path from 'path';

interface PDFSection {
  startChar: number;
  endChar: number;
  content: string;
  mentions: {
    ranz: string[];
    azimut: string[];
    keywords: string[];
  };
}

const CHUNK_SIZE = 90000; // Caracteres por bloco (seguro para leitura)
const PDF_PATH = 'C:\\Users\\ranz\\Downloads\\Ranz-6A-Bio.pdf';
const OUTPUT_PATH = 'C:\\Users\\ranz\\Documents\\azimut-site-vite-tailwind\\ANALISE_PDF_RANZ_BIO.md';

// Palavras-chave para identificar contexto importante
const KEYWORDS = [
  // Sobre a empresa/carreira
  'founder', 'ceo', 'director', 'executive', 'proprietário', 'owner',
  'empresa', 'company', 'business', 'consultoria', 'consulting',
  
  // Experiência e conquistas
  'experiência', 'experience', 'projeto', 'project', 'achievement',
  'conquista', 'sucesso', 'success', 'liderança', 'leadership',
  
  // Áreas de atuação
  'estratégia', 'strategy', 'transformação', 'transformation',
  'inovação', 'innovation', 'gestão', 'management',
  
  // Formação
  'educação', 'education', 'mba', 'mestrado', 'doutorado',
  'universidade', 'university', 'certificação', 'certification',
  
  // Timeline
  'ano', 'year', 'desde', 'since', '20', '19'
];

function extractMentions(text: string): { ranz: string[]; azimut: string[]; keywords: string[] } {
  const lines = text.split('\n');
  const mentions = { ranz: [] as string[], azimut: [] as string[], keywords: [] as string[] };
  
  lines.forEach((line, index) => {
    const lowerLine = line.toLowerCase();
    
    // Procura por "Ranz" ou variações (incluindo nome completo)
    if (lowerLine.includes('ranz') || lowerLine.includes('francisco')) {
      // Filtra caracteres inválidos e mantém apenas texto legível
      const cleanedLine = line.replace(/[^\x20-\x7E\u00C0-\u00FF]/g, ' ').trim();
      if (cleanedLine.length > 5 && cleanedLine.length < 200) {
        mentions.ranz.push(`Linha ${index + 1}: ${cleanedLine}`);
      }
    }
    
    // Procura por "Azimut"
    if (lowerLine.includes('azimut')) {
      const cleanedLine = line.replace(/[^\x20-\x7E\u00C0-\u00FF]/g, ' ').trim();
      if (cleanedLine.length > 5 && cleanedLine.length < 200) {
        mentions.azimut.push(`Linha ${index + 1}: ${cleanedLine}`);
      }
    }
    
    // Procura por palavras-chave importantes
    KEYWORDS.forEach(keyword => {
      if (lowerLine.includes(keyword.toLowerCase())) {
        const cleanedLine = line.replace(/[^\x20-\x7E\u00C0-\u00FF]/g, ' ').trim();
        // Filtra linhas muito curtas ou muito longas (provavelmente lixo)
        if (cleanedLine.length > 10 && cleanedLine.length < 200) {
          const existingEntry = mentions.keywords.find(k => k.includes(cleanedLine));
          if (!existingEntry) {
            mentions.keywords.push(`[${keyword}] Linha ${index + 1}: ${cleanedLine}`);
          }
        }
      }
    });
  });
  
  return mentions;
}

async function analyzePDF() {
  console.log('🔍 Iniciando análise do PDF...');
  console.log(`📄 Arquivo: ${PDF_PATH}\n`);
  
  try {
    // Lê o arquivo completo
    const fullContent = fs.readFileSync(PDF_PATH, 'utf-8');
    const totalChars = fullContent.length;
    const totalChunks = Math.ceil(totalChars / CHUNK_SIZE);
    
    console.log(`📊 Tamanho total: ${totalChars.toLocaleString()} caracteres`);
    console.log(`📦 Dividido em: ${totalChunks} blocos\n`);
    
    const sections: PDFSection[] = [];
    let allMentionsRanz: string[] = [];
    let allMentionsAzimut: string[] = [];
    let allKeywords: string[] = [];
    
    // Processa cada bloco
    for (let i = 0; i < totalChunks; i++) {
      const startChar = i * CHUNK_SIZE;
      const endChar = Math.min(startChar + CHUNK_SIZE, totalChars);
      const chunk = fullContent.substring(startChar, endChar);
      
      console.log(`⚙️  Processando bloco ${i + 1}/${totalChunks} (${startChar}-${endChar})...`);
      
      const mentions = extractMentions(chunk);
      
      allMentionsRanz.push(...mentions.ranz);
      allMentionsAzimut.push(...mentions.azimut);
      allKeywords.push(...mentions.keywords);
      
      sections.push({
        startChar,
        endChar,
        content: chunk.substring(0, 500) + '...', // Preview
        mentions
      });
    }
    
    console.log('\n✅ Análise concluída!\n');
    console.log(`📌 Menções a "Ranz": ${allMentionsRanz.length}`);
    console.log(`📌 Menções a "Azimut": ${allMentionsAzimut.length}`);
    console.log(`📌 Palavras-chave encontradas: ${allKeywords.length}\n`);
    
    // Gera relatório em Markdown
    const report = generateReport(sections, allMentionsRanz, allMentionsAzimut, allKeywords, totalChars);
    
    // Salva relatório
    fs.writeFileSync(OUTPUT_PATH, report, 'utf-8');
    console.log(`💾 Relatório salvo em: ${OUTPUT_PATH}`);
    
    return { sections, allMentionsRanz, allMentionsAzimut, allKeywords };
    
  } catch (error) {
    console.error('❌ Erro ao analisar PDF:', error);
    throw error;
  }
}

function generateReport(
  sections: PDFSection[],
  ranzMentions: string[],
  azimutMentions: string[],
  keywords: string[],
  totalChars: number
): string {
  const date = new Date().toISOString().split('T')[0];
  
  return `# 📄 ANÁLISE COMPLETA: Ranz-6A-Bio.pdf
*Gerado automaticamente em ${date}*

---

## 📊 RESUMO EXECUTIVO

- **Total de caracteres**: ${totalChars.toLocaleString()}
- **Blocos processados**: ${sections.length}
- **Menções "Ranz"**: ${ranzMentions.length}
- **Menções "Azimut"**: ${azimutMentions.length}
- **Palavras-chave relevantes**: ${keywords.length}

---

## 🎯 MENÇÕES A "RANZ"

${ranzMentions.length > 0 ? ranzMentions.slice(0, 50).map(m => `- ${m}`).join('\n') : '_Nenhuma menção direta encontrada_'}

${ranzMentions.length > 50 ? `\n_... e mais ${ranzMentions.length - 50} menções_` : ''}

---

## 🏢 MENÇÕES A "AZIMUT"

${azimutMentions.length > 0 ? azimutMentions.slice(0, 50).map(m => `- ${m}`).join('\n') : '_Nenhuma menção direta encontrada_'}

${azimutMentions.length > 50 ? `\n_... e mais ${azimutMentions.length - 50} menções_` : ''}

---

## 🔑 PALAVRAS-CHAVE IMPORTANTES

${keywords.length > 0 ? keywords.slice(0, 100).map(k => `- ${k}`).join('\n') : '_Nenhuma palavra-chave encontrada_'}

${keywords.length > 100 ? `\n_... e mais ${keywords.length - 100} ocorrências_` : ''}

---

## 📑 ESTRUTURA DO DOCUMENTO

${sections.map((section, index) => `
### Bloco ${index + 1}
- **Posição**: caracteres ${section.startChar.toLocaleString()} - ${section.endChar.toLocaleString()}
- **Menções Ranz**: ${section.mentions.ranz.length}
- **Menções Azimut**: ${section.mentions.azimut.length}
- **Palavras-chave**: ${section.mentions.keywords.length}
`).join('\n')}

---

## 💡 PRÓXIMOS PASSOS

1. Revisar as menções encontradas acima
2. Identificar seções mais relevantes para extração detalhada
3. Extrair informações específicas conforme necessário
4. Integrar conteúdo relevante ao site da Azimut

---

*Análise automática gerada por script TypeScript*
`;
}

// Executa análise
analyzePDF()
  .then(() => {
    console.log('\n🎉 Processo concluído com sucesso!');
  })
  .catch((error) => {
    console.error('\n💥 Erro fatal:', error);
    process.exit(1);
  });
