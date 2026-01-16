'use client';

import { useState } from 'react';

interface SQLTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  sql: string;
}

const templates: SQLTemplate[] = [
  {
    id: 'personal-basic',
    name: 'Making-of Pessoal Básico',
    description: 'Template para making-of pessoal da equipe Azimut',
    category: 'Pessoal',
    sql: `-- Template: Making-of Pessoal Básico
-- Use este template para criar making-ofs pessoais da equipe Azimut

INSERT INTO "MakingOf" (
  id,
  title,
  description,
  "makingOfType",
  source,
  "mediaType",
  "projectId",
  "projectName",
  location,
  "eventDate",
  tags,
  "creditText",
  "canPublishNow",
  "publishToBlog",
  "publishToNewsletter",
  "publishToSocial",
  featured,
  status,
  "uploadedBy",
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Título do Making-of',  -- Ex: "Making-of Montagem Rio Museu Olímpico"
  'Descrição do making-of...',  -- Descrição detalhada
  'PERSONAL',  -- PERSONAL, PARTNERSHIP, HIRED, CLIENT, EVENT
  'INTERNAL',  -- INTERNAL, COLLABORATOR, CLIENT, PARTNER
  'IMAGE',  -- IMAGE, VIDEO, MIXED
  NULL,  -- projectId (UUID do projeto, ou NULL)
  'Nome do Projeto',  -- Ex: "Rio Museu Olímpico"
  'Rio de Janeiro, RJ',  -- Local
  '2026-01-15'::date,  -- Data do evento (ou NULL)
  ARRAY['making-of', 'instalação', 'led'],  -- Tags
  'Making-of Azimut',  -- Créditos
  true,  -- Pode publicar agora?
  true,  -- Publicar no Blog?
  false,  -- Incluir na Newsletter?
  true,  -- Publicar nas Redes Sociais?
  false,  -- Destacado (aparece na Home se for vídeo)?
  'DRAFT',  -- DRAFT, REVIEW, APPROVED, PUBLISHED
  'USER_ID_AQUI',  -- ID do usuário que está criando
  NOW(),
  NOW()
);`,
  },
  {
    id: 'collaborator-eduardo',
    name: 'Making-of Colaborador (Eduardo Nartino)',
    description: 'Template para making-ofs feitos por colaboradores',
    category: 'Colaborador',
    sql: `-- Template: Making-of Colaborador
-- Use este template para making-ofs feitos por colaboradores (ex: Eduardo Nartino)

INSERT INTO "MakingOf" (
  id,
  title,
  description,
  "makingOfType",
  source,
  "mediaType",
  "collaboratorId",
  "collaboratorName",
  "projectId",
  "projectName",
  location,
  "eventDate",
  tags,
  "creditText",
  "canPublishNow",
  "publishToBlog",
  "publishToNewsletter",
  "publishToSocial",
  featured,
  status,
  "uploadedBy",
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Título do Making-of',
  'Descrição...',
  'HIRED',  -- ou PARTNERSHIP se for parceria
  'COLLABORATOR',
  'VIDEO',  -- ou IMAGE, MIXED
  NULL,  -- collaboratorId (UUID do colaborador, ou NULL)
  'Eduardo Nartino',  -- Nome do colaborador
  NULL,  -- projectId
  'Nome do Projeto',
  'Local',
  '2026-01-15'::date,
  ARRAY['making-of', 'colaborador'],
  'Making-of por Eduardo Nartino',  -- Créditos
  true,
  true,
  false,
  true,
  false,
  'DRAFT',
  'USER_ID_AQUI',
  NOW(),
  NOW()
);`,
  },
  {
    id: 'client-material',
    name: 'Material do Cliente',
    description: 'Template para vídeos/fotos/depoimentos enviados por clientes',
    category: 'Cliente',
    sql: `-- Template: Material do Cliente
-- Use este template para materiais enviados por clientes (vídeos, fotos, depoimentos)

INSERT INTO "MakingOf" (
  id,
  title,
  description,
  "makingOfType",
  source,
  "mediaType",
  "clientName",
  "clientEmail",
  "projectId",
  "projectName",
  location,
  "eventDate",
  tags,
  "creditText",
  "canPublishNow",
  "publishToBlog",
  "publishToNewsletter",
  "publishToSocial",
  featured,
  status,
  "uploadedBy",
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Título do Material',
  'Descrição do material enviado pelo cliente...',
  'CLIENT',
  'CLIENT',
  'VIDEO',  -- ou IMAGE, MIXED
  'Nome do Cliente',  -- Nome do cliente
  'cliente@email.com',  -- Email do cliente
  NULL,  -- projectId
  'Nome do Projeto',
  NULL,  -- Local (se conhecido)
  NULL,  -- Data (se conhecida)
  ARRAY['cliente', 'depoimento'],
  'Material enviado por [Nome do Cliente]',  -- Créditos
  false,  -- Geralmente precisa aprovação antes de publicar
  false,  -- Aguardar aprovação do cliente
  false,
  false,
  false,
  'REVIEW',  -- Status REVIEW para aguardar curadoria
  'USER_ID_AQUI',
  NOW(),
  NOW()
);`,
  },
  {
    id: 'event-festival',
    name: 'Evento (Festival VR, etc.)',
    description: 'Template para making-ofs de eventos',
    category: 'Evento',
    sql: `-- Template: Evento
-- Use este template para making-ofs de eventos (Festival VR, workshops, etc.)

INSERT INTO "MakingOf" (
  id,
  title,
  description,
  "makingOfType",
  source,
  "mediaType",
  "projectId",
  "projectName",
  location,
  "eventDate",
  tags,
  "creditText",
  "canPublishNow",
  "publishToBlog",
  "publishToNewsletter",
  "publishToSocial",
  featured,
  status,
  "uploadedBy",
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Making-of Festival VR 2026',  -- Título do evento
  'Descrição do evento...',
  'EVENT',
  'INTERNAL',  -- ou COLLABORATOR se feito por colaborador
  'MIXED',  -- Geralmente eventos têm imagens e vídeos
  NULL,  -- projectId
  'Festival VR 2026',  -- Nome do evento
  'Vancouver, BC',  -- Local do evento
  '2026-03-15'::date,  -- Data do evento
  ARRAY['evento', 'festival', 'vr', 'academy'],  -- Tags incluem academy se for relacionado
  'Making-of Azimut',  -- Créditos
  true,
  true,
  true,  -- Eventos geralmente vão na newsletter
  true,
  true,  -- Eventos podem ser destacados
  'DRAFT',
  'USER_ID_AQUI',
  NOW(),
  NOW()
);`,
  },
  {
    id: 'featured-video-home',
    name: 'Vídeo Destacado (Home)',
    description: 'Template para vídeos que aparecem na Home',
    category: 'Destaque',
    sql: `-- Template: Vídeo Destacado para Home
-- Use este template para vídeos que devem aparecer na Home

INSERT INTO "MakingOf" (
  id,
  title,
  description,
  "makingOfType",
  source,
  "mediaType",
  "projectId",
  "projectName",
  location,
  "eventDate",
  tags,
  "creditText",
  "canPublishNow",
  "publishToBlog",
  "publishToNewsletter",
  "publishToSocial",
  featured,
  status,
  "uploadedBy",
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Título do Vídeo Destacado',
  'Descrição do vídeo...',
  'PERSONAL',  -- ou outro tipo
  'INTERNAL',
  'VIDEO',  -- IMPORTANTE: Deve ser VIDEO ou MIXED
  NULL,  -- projectId (deve ter projeto do portfólio)
  'Nome do Projeto do Portfólio',  -- IMPORTANTE: Deve ter projeto
  'Local',
  '2026-01-15'::date,
  ARRAY['destaque', 'vídeo'],
  'Créditos',
  true,
  true,
  true,
  true,
  true,  -- IMPORTANTE: featured = true para aparecer na Home
  'DRAFT',
  'USER_ID_AQUI',
  NOW(),
  NOW()
);`,
  },
];

export default function MakingOfTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<SQLTemplate | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (sql: string) => {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">📋 Templates SQL para Making-of</h1>
        <p className="text-gray-600 mt-1">Use estes templates para criar making-ofs via SQL</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
            onClick={() => setSelectedTemplate(template)}
          >
            <div className="font-semibold text-gray-900 mb-1">{template.name}</div>
            <div className="text-sm text-gray-600 mb-2">{template.description}</div>
            <div className="text-xs text-blue-600 font-medium">{template.category}</div>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="bg-white rounded-lg border-2 border-blue-400 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{selectedTemplate.name}</h2>
              <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
            </div>
            <button
              onClick={() => handleCopy(selectedTemplate.sql)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {copied ? '✅ Copiado!' : '📋 Copiar SQL'}
            </button>
          </div>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{selectedTemplate.sql}</code>
          </pre>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Importante:</strong> Substitua os valores de exemplo pelos dados reais antes de executar no SQL Editor.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
