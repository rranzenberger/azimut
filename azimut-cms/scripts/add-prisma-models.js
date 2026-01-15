// ═══════════════════════════════════════════════════════════════
// SCRIPT AUTOMÁTICO - ADICIONAR MODELS AO PRISMA SCHEMA
// ═══════════════════════════════════════════════════════════════
// Execute: node azimut-cms/scripts/add-prisma-models.js
// ═══════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '../prisma/schema.prisma');

// Models para adicionar
const newModels = `
model FieldMetadata {
  id                  String   @id @default(uuid())
  pageSlug            String   @map("page_slug")
  sectionKey          String   @map("section_key")
  fieldKey            String   @map("field_key")
  
  fieldLabel          String   @map("field_label")
  fieldDescription    String?  @map("field_description")
  fieldType          String   @map("field_type")
  
  maxLength           Int?     @map("max_length")
  minLength           Int?     @map("min_length")
  required            Boolean  @default(false)
  allowedFormats      String[] @map("allowed_formats")
  
  imageWidth          Int?     @map("image_width")
  imageHeight         Int?     @map("image_height")
  imageAspectRatio    String?  @map("image_aspect_ratio")
  videoMaxDuration    Int?     @map("video_max_duration")
  videoMaxSizeMb      Int?     @map("video_max_size_mb")
  
  textFormat          String?  @map("text_format")
  lineBreaksAllowed   Boolean  @default(false) @map("line_breaks_allowed")
  
  whereAppears        String?  @map("where_appears")
  visualGuideUrl      String?  @map("visual_guide_url")
  cardPosition        Int?     @map("card_position")
  
  exampleValue        String?  @map("example_value")
  exampleImageUrl     String?  @map("example_image_url")
  
  createdAt           DateTime @default(now()) @map("created_at")
  updatedAt           DateTime @updatedAt @map("updated_at")

  @@unique([pageSlug, sectionKey, fieldKey])
  @@index([pageSlug, sectionKey])
  @@map("field_metadata")
}

model ImageSpecification {
  id                  String   @id @default(uuid())
  pageSlug            String   @map("page_slug")
  sectionKey          String   @map("section_key")
  fieldKey            String   @map("field_key")
  
  recommendedWidth    Int      @map("recommended_width")
  recommendedHeight   Int      @map("recommended_height")
  minWidth            Int?     @map("min_width")
  minHeight           Int?     @map("min_height")
  maxWidth            Int?     @map("max_width")
  maxHeight           Int?     @map("max_height")
  aspectRatio         String?  @map("aspect_ratio")
  maxFileSizeMb       Int      @default(5) @map("max_file_size_mb")
  allowedFormats      String[] @default(["jpg", "jpeg", "png", "webp", "avif"]) @map("allowed_formats")
  
  description         String?  @map("description")
  whereAppears        String?  @map("where_appears")
  visualGuideUrl      String?  @map("visual_guide_url")
  
  autoCompress        Boolean  @default(true) @map("auto_compress")
  autoConvertWebp     Boolean  @default(true) @map("auto_convert_webp")
  generateThumbnails  Boolean  @default(false) @map("generate_thumbnails")
  
  createdAt           DateTime @default(now()) @map("created_at")
  updatedAt           DateTime @updatedAt @map("updated_at")

  @@unique([pageSlug, sectionKey, fieldKey])
  @@index([pageSlug, sectionKey])
  @@map("image_specifications")
}
`;

try {
  // Ler schema atual
  let schema = fs.readFileSync(schemaPath, 'utf8');
  
  // Verificar se models já existem
  if (schema.includes('model FieldMetadata')) {
    console.log('⚠️  Models já existem no schema.prisma');
    process.exit(0);
  }
  
  // Adicionar models ao final do arquivo
  schema += newModels;
  
  // Salvar
  fs.writeFileSync(schemaPath, schema, 'utf8');
  
  console.log('✅ Models adicionados ao schema.prisma com sucesso!');
  console.log('📋 Próximo passo: npx prisma migrate dev --name add_field_metadata_and_image_specs');
  
} catch (error) {
  console.error('❌ Erro ao adicionar models:', error.message);
  process.exit(1);
}
