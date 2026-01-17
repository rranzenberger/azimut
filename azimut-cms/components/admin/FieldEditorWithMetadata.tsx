'use client';

import { useState, useEffect } from 'react';

interface FieldMetadata {
  id: string;
  fieldLabel: string;
  fieldDescription?: string;
  fieldType: string;
  maxLength?: number;
  minLength?: number;
  required: boolean;
  textFormat?: string;
  lineBreaksAllowed: boolean;
  whereAppears?: string;
  exampleValue?: string;
}

interface ImageSpecification {
  recommendedWidth: number;
  recommendedHeight: number;
  aspectRatio?: string;
  maxFileSizeMb: number;
  allowedFormats: string[];
  description?: string;
  whereAppears?: string;
}

interface FieldEditorWithMetadataProps {
  pageSlug: string;
  sectionKey: string;
  fieldKey: string;
  value: string;
  onChange: (value: string) => void;
  onError?: (error: string) => void;
}

export function FieldEditorWithMetadata({
  pageSlug,
  sectionKey,
  fieldKey,
  value,
  onChange,
  onError,
}: FieldEditorWithMetadataProps) {
  const [metadata, setMetadata] = useState<FieldMetadata | null>(null);
  const [imageSpec, setImageSpec] = useState<ImageSpecification | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetadata() {
      try {
        setLoading(true);

        // Buscar metadados
        const metaRes = await fetch(
          `/api/admin/metadata/${pageSlug}/${sectionKey}/${fieldKey}`
        );
        
        if (metaRes.ok) {
          const meta = await metaRes.json();
          setMetadata(meta);
          
          // Se for imagem, buscar especificações
          if (meta.fieldType === 'image') {
            const specRes = await fetch(
              `/api/admin/image-spec/${pageSlug}/${sectionKey}/${fieldKey}`
            );
            
            if (specRes.ok) {
              const spec = await specRes.json();
              setImageSpec(spec);
            }
          }
        }
      } catch (error) {
        console.error('Error loading metadata:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMetadata();
  }, [pageSlug, sectionKey, fieldKey]);

  const validate = (newValue: string): boolean => {
    const newErrors: string[] = [];

    if (!metadata) return true;

    // Validar comprimento
    if (metadata.maxLength && newValue.length > metadata.maxLength) {
      newErrors.push(`Máximo ${metadata.maxLength} caracteres. Atual: ${newValue.length}`);
    }
    if (metadata.minLength && newValue.length < metadata.minLength) {
      newErrors.push(`Mínimo ${metadata.minLength} caracteres. Atual: ${newValue.length}`);
    }

    // Validar formato
    if (metadata.textFormat === 'single_line' && newValue.includes('\n')) {
      newErrors.push('Este campo não permite quebras de linha');
    }

    // Validar obrigatório
    if (metadata.required && !newValue.trim()) {
      newErrors.push('Este campo é obrigatório');
    }

    setErrors(newErrors);
    
    if (newErrors.length > 0 && onError) {
      onError(newErrors[0]);
    }

    return newErrors.length === 0;
  };

  const handleChange = (newValue: string) => {
    if (validate(newValue)) {
      onChange(newValue);
    }
  };

  if (loading) {
    return <div className="text-gray-500">Carregando informações do campo...</div>;
  }

  return (
    <div className="field-editor-with-metadata space-y-2">
      {/* Cabeçalho */}
      <div className="field-header">
        <label className="block font-semibold text-gray-900">
          {metadata?.fieldLabel || fieldKey}
          {metadata?.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {metadata?.fieldDescription && (
          <p className="text-sm text-gray-600 mt-1">{metadata.fieldDescription}</p>
        )}
      </div>

      {/* Onde aparece */}
      {metadata?.whereAppears && (
        <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded">
          📍 <strong>Onde aparece:</strong> {metadata.whereAppears}
        </div>
      )}

      {/* Especificações de imagem */}
      {imageSpec && (
        <div className="bg-blue-50 p-3 rounded text-sm">
          <strong>Especificações:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Resolução recomendada: {imageSpec.recommendedWidth}x{imageSpec.recommendedHeight}px</li>
            {imageSpec.aspectRatio && <li>Proporção: {imageSpec.aspectRatio}</li>}
            <li>Tamanho máximo: {imageSpec.maxFileSizeMb}MB</li>
            <li>Formatos: {imageSpec.allowedFormats.join(', ')}</li>
          </ul>
        </div>
      )}

      {/* Editor */}
      <div className="editor">
        {metadata?.fieldType === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            maxLength={metadata?.maxLength ?? undefined}
            rows={metadata.textFormat === 'two_lines' ? 2 : 5}
            className={`w-full p-2 border rounded ${
              errors.length > 0 ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            maxLength={metadata?.maxLength ?? undefined}
            className={`w-full p-2 border rounded ${
              errors.length > 0 ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        )}
      </div>

      {/* Contador de caracteres */}
      {metadata?.maxLength && (
        <div className="text-sm text-gray-500">
          {value.length} / {metadata.maxLength} caracteres
          {value.length > metadata.maxLength * 0.9 && (
            <span className="text-yellow-600 ml-2">⚠️ Próximo do limite</span>
          )}
        </div>
      )}

      {/* Exemplo */}
      {metadata?.exampleValue && (
        <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
          💡 <strong>Exemplo:</strong> {metadata.exampleValue}
        </div>
      )}

      {/* Erros */}
      {errors.length > 0 && (
        <div className="text-sm text-red-600 space-y-1">
          {errors.map((err, i) => (
            <div key={i}>❌ {err}</div>
          ))}
        </div>
      )}
    </div>
  );
}
