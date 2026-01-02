// ═══════════════════════════════════════════════════════════════
// EXEMPLO DE USO - Componentes Button e Card
// ═══════════════════════════════════════════════════════════════
// Este arquivo mostra como usar os novos componentes do Design System

import React from 'react'
import Button from './components/Button'
import Card from './components/Card'

const ExemploComponentes = () => {
  return (
    <div className="container mx-auto p-8 space-y-8">
      
      {/* ═══════════════════════════════════════════════════════════════
          EXEMPLOS DE BOTÕES
          ═══════════════════════════════════════════════════════════════ */}
      
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--theme-text)' }}>
          Botões
        </h2>
        
        <div className="flex flex-wrap gap-4">
          {/* Primary Button */}
          <Button variant="primary" size="md">
            Primary Button
          </Button>
          
          {/* Secondary Button */}
          <Button variant="secondary" size="md">
            Secondary Button
          </Button>
          
          {/* Ghost Button */}
          <Button variant="ghost" size="md">
            Ghost Button
          </Button>
          
          {/* Button com ícone */}
          <Button 
            variant="primary" 
            size="lg"
            iconBefore={<span>🚀</span>}
          >
            Enviar Projeto
          </Button>
          
          {/* Button full width */}
          <Button variant="secondary" fullWidth>
            Botão Largura Total
          </Button>
          
          {/* Button disabled */}
          <Button variant="primary" disabled>
            Desabilitado
          </Button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          EXEMPLOS DE CARDS
          ═══════════════════════════════════════════════════════════════ */}
      
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--theme-text)' }}>
          Cards
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card Default */}
          <Card variant="default" padding="md">
            <h3 className="text-lg font-semibold mb-2">Card Default</h3>
            <p style={{ color: 'var(--theme-text-secondary)' }}>
              Card padrão com padding médio e estilo adaptativo.
            </p>
          </Card>
          
          {/* Card Elevated */}
          <Card variant="elevated" padding="lg">
            <h3 className="text-lg font-semibold mb-2">Card Elevated</h3>
            <p style={{ color: 'var(--theme-text-secondary)' }}>
              Card com sombra e efeito hover.
            </p>
          </Card>
          
          {/* Card Glass */}
          <Card variant="glass" padding="md">
            <h3 className="text-lg font-semibold mb-2">Card Glass</h3>
            <p style={{ color: 'var(--theme-text-secondary)' }}>
              Card com efeito glassmorphism.
            </p>
          </Card>
          
          {/* Card Clickable */}
          <Card 
            variant="elevated" 
            padding="md"
            clickable
            onClick={() => alert('Card clicado!')}
          >
            <h3 className="text-lg font-semibold mb-2">Card Clicável</h3>
            <p style={{ color: 'var(--theme-text-secondary)' }}>
              Clique aqui para testar!
            </p>
          </Card>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          EXEMPLO COMBINADO
          ═══════════════════════════════════════════════════════════════ */}
      
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--theme-text)' }}>
          Combinado (Card + Botões)
        </h2>
        
        <Card variant="elevated" padding="lg" rounded="xl">
          <h3 className="text-xl font-semibold mb-3">Projeto em Destaque</h3>
          <p className="mb-4" style={{ color: 'var(--theme-text-secondary)' }}>
            Experiência imersiva utilizando VR, AR e IA generativa. Desenvolvido
            para museus e exposições culturais.
          </p>
          <div className="flex gap-3">
            <Button variant="primary" size="md">
              Ver Detalhes
            </Button>
            <Button variant="ghost" size="md">
              Contato
            </Button>
          </div>
        </Card>
      </section>

    </div>
  )
}

export default ExemploComponentes

