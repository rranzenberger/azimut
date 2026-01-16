'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewMakingOfPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    makingOfType: 'PERSONAL',
    source: 'INTERNAL',
    collaboratorName: '',
    clientName: '',
    clientEmail: '',
    projectId: '',
    projectName: '',
    mediaType: 'IMAGE',
    location: '',
    eventDate: '',
    tags: '',
    creditText: '',
    canPublishNow: true,
    publishAfterDate: '',
    publishToBlog: false,
    publishToNewsletter: false,
    publishToSocial: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/making-of', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
          eventDate: formData.eventDate || null,
          publishAfterDate: formData.publishAfterDate || null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/admin/making-of/${data.id}`);
      } else {
        const error = await res.json();
        alert(`Erro: ${error.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao criar making-of:', error);
      alert('Erro ao criar making-of');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">➕ Novo Making-of</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Informações Básicas</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Making-of Rio Museu Olímpico - Montagem"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descreva o making-of..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo *
              </label>
              <select
                required
                value={formData.makingOfType}
                onChange={(e) => setFormData({ ...formData, makingOfType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="PERSONAL">👤 Pessoal</option>
                <option value="PARTNERSHIP">🤝 Parceria</option>
                <option value="HIRED">💼 Contratado</option>
                <option value="CLIENT">👥 Cliente</option>
                <option value="EVENT">🎬 Evento</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Origem *
              </label>
              <select
                required
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="INTERNAL">🏠 Equipe Azimut</option>
                <option value="COLLABORATOR">👤 Colaborador</option>
                <option value="CLIENT">👥 Cliente</option>
                <option value="PARTNER">🤝 Parceiro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Mídia *
            </label>
            <select
              required
              value={formData.mediaType}
              onChange={(e) => setFormData({ ...formData, mediaType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="IMAGE">📸 Apenas Imagens</option>
              <option value="VIDEO">🎥 Apenas Vídeos</option>
              <option value="MIXED">📸🎥 Imagens + Vídeos</option>
            </select>
          </div>
        </div>

        {/* Colaborador/Cliente */}
        {(formData.source === 'COLLABORATOR' || formData.makingOfType === 'CLIENT') && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {formData.makingOfType === 'CLIENT' ? 'Informações do Cliente' : 'Colaborador'}
            </h2>
            
            {formData.makingOfType === 'CLIENT' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Cliente
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Ex: João Silva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email do Cliente
                  </label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="cliente@email.com"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Colaborador
                </label>
                <input
                  type="text"
                  value={formData.collaboratorName}
                  onChange={(e) => setFormData({ ...formData, collaboratorName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Ex: Eduardo Nartino"
                />
              </div>
            )}
          </div>
        )}

        {/* Projeto */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Projeto</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Projeto
            </label>
            <input
              type="text"
              value={formData.projectName}
              onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Ex: Rio Museu Olímpico"
            />
            <p className="text-xs text-gray-500 mt-1">
              Ou selecione um projeto cadastrado abaixo
            </p>
          </div>
        </div>

        {/* Metadados */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Metadados</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Ex: Rio de Janeiro, RJ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data do Evento
              </label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (separadas por vírgula)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="making-of, instalação, led, imersivo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Créditos
            </label>
            <input
              type="text"
              value={formData.creditText}
              onChange={(e) => setFormData({ ...formData, creditText: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Ex: Making-of por Eduardo Nartino"
            />
          </div>
        </div>

        {/* Publicação */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Publicação</h2>
          
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.canPublishNow}
                onChange={(e) => setFormData({ ...formData, canPublishNow: e.target.checked })}
              />
              <span>Pode publicar imediatamente</span>
            </label>

            {!formData.canPublishNow && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publicar após (data)
                </label>
                <input
                  type="date"
                  value={formData.publishAfterDate}
                  onChange={(e) => setFormData({ ...formData, publishAfterDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.publishToBlog}
                  onChange={(e) => setFormData({ ...formData, publishToBlog: e.target.checked })}
                />
                <span>📝 Publicar no Blog</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.publishToNewsletter}
                  onChange={(e) => setFormData({ ...formData, publishToNewsletter: e.target.checked })}
                />
                <span>📧 Incluir na Newsletter</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.publishToSocial}
                  onChange={(e) => setFormData({ ...formData, publishToSocial: e.target.checked })}
                />
                <span>📱 Publicar nas Redes Sociais</span>
              </label>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
          >
            {loading ? 'Salvando...' : '💾 Salvar Making-of'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
