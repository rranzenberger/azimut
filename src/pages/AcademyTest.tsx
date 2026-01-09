// TESTE SIMPLES
import React from 'react'
import { type Lang } from '../i18n'

interface AcademyTestProps {
  lang: Lang
}

const AcademyTest: React.FC<AcademyTestProps> = ({ lang }) => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-6xl font-handel uppercase mb-8">
          AZIMUT ACADEMY
        </h1>
        <p className="text-2xl mb-12">
          Redesign Premium 2026 - Teste
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-adaptive p-8 rounded-xl border border-white/10 hover:border-azimut-red/50 transition-all">
            <div className="text-6xl mb-4">🍁</div>
            <h3 className="text-2xl font-bold mb-2">Vancouver</h3>
            <p className="text-white/70">Estudar no Canadá</p>
          </div>
          
          <div className="card-adaptive p-8 rounded-xl border border-white/10 hover:border-azimut-red/50 transition-all">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-2">Cursos</h3>
            <p className="text-white/70">Formação profissional</p>
          </div>
          
          <div className="card-adaptive p-8 rounded-xl border border-white/10 hover:border-azimut-red/50 transition-all">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold mb-2">Workshops</h3>
            <p className="text-white/70">Eventos e palestras</p>
          </div>
          
          <div className="card-adaptive p-8 rounded-xl border border-white/10 hover:border-azimut-red/50 transition-all">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold mb-2">Corporativo</h3>
            <p className="text-white/70">Treinamento B2B</p>
          </div>
        </div>
        
        <div className="mt-12 text-green-400">
          ✅ SE VOCÊ VÊ ISSO, O CÓDIGO FUNCIONA!
        </div>
      </div>
    </div>
  )
}

export default AcademyTest
