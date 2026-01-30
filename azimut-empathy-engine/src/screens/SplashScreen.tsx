import { Button } from '../components/ui'

// Logo inline SVG para evitar problemas de path no build
const AzimutLogo = () => (
  <svg viewBox="0 0 415.503 136.051" className="h-10 md:h-12 w-auto">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C92337" />
        <stop offset="100%" stopColor="#E84858" />
      </linearGradient>
    </defs>
    <g>
      <path fill="#d3cec3" d="M150.241,81.427c.551-.906.452-1.973.728-2.952,1.432-5.097,5.333-6.911,10.059-7.508,5.805-.733,11.647-.254,17.471-.305,1.379-.012,1.66-.368,1.498-1.681-.446-3.622-1.979-5.09-6.014-5.496-4.027-.405-8.067-.186-12.102-.228-2.542-.026-5.085-.06-7.623.021-1.087.035-1.338-.338-1.296-1.352.078-1.891.065-3.789.003-5.681-.028-.871.144-1.212,1.123-1.205,7.375.053,14.751.026,22.126.067,1.95.011,3.871.367,5.725.972,5.582,1.821,8.692,5.983,8.856,12.616.209,8.369.067,16.747.103,25.12.003.726-.236.948-.94.943-9.716-.084-19.438.231-29.148-.161-5.83-.235-9.139-3.352-10.271-9.133-.04-.203-.069-.385-.3-.445v-3.591h0ZM171.778,86.798c2.645,0,4.84-.051,7.03.023,1.005.034,1.403-.184,1.347-1.284-.096-1.89-.084-3.789-.004-5.68.044-1.03-.24-1.363-1.309-1.343-3.587.067-7.176.005-10.764.036-1.491.012-2.998.043-4.433.524-1.807.607-2.572,2.153-2.352,4.635.154,1.736.945,2.525,2.879,2.857,2.675.458,5.373.115,7.605.232h0Z"/>
      <path fill="#d3cec3" d="M225.351,63.648h-2.012c-6.68,0-13.361-.023-20.04.024-1.065.008-1.507-.177-1.444-1.367.107-2.039.059-4.088.015-6.131-.017-.782.114-1.134,1.035-1.132,11.715.032,23.43.03,35.145.003.857-.002,1.182.25,1.047,1.083-.008.048,0,.099-.001.149-.014,2.442.637,5.159-.229,7.249-.841,2.028-3.228,3.42-4.95,5.077-5.673,5.465-11.35,10.926-17.033,16.381-.347.333-.752.605-1.13.905.054.114.107.228.16.341h1.571c6.78,0,13.559.026,20.339-.027,1.068-.008,1.343.286,1.296,1.322-.087,1.891-.104,3.793.004,5.682.07,1.22-.241,1.586-1.523,1.574-7.228-.069-14.457-.034-21.685-.034-4.287,0-8.574-.024-12.862.019-.893.009-1.336-.199-1.172-1.151.008-.048,0-.099.001-.149.019-2.39-.603-5.045.242-7.095.821-1.99,3.134-3.372,4.815-4.995,6.02-5.81,12.052-11.609,18.408-17.728h0Z"/>
      <path fill="url(#logoGradient)" d="M255.557,40.689c1.441,0,2.887.061,4.324-.022.959-.056,1.163.301,1.144,1.187-.054,2.535-.048,5.072-.003,7.607.015.835-.23,1.121-1.09,1.108-2.932-.047-5.866-.039-8.799-.004-.784.009-1.176-.136-1.158-1.047.052-2.635.038-5.271.006-7.906-.009-.723.25-.952.954-.934,1.54.039,3.082.012,4.623.012h0Z"/>
      <path fill="#d3cec3" d="M261.007,74.892c0,6.177-.022,12.355.022,18.533.007,1.012-.214,1.379-1.299,1.349-2.837-.077-5.678-.051-8.516-.011-.841.012-1.24-.119-1.237-1.118.033-12.505.03-25.01.005-37.514-.002-.853.248-1.099,1.093-1.085,2.938.048,5.878.061,8.815-.006.95-.022,1.144.273,1.138,1.17-.039,6.227-.021,12.455-.021,18.683h0Z"/>
      <path fill="#d3cec3" d="M295.175,55.086c6.48,0,12.96-.006,19.44.004,2.001.003,3.976.262,5.91.775,5.489,1.458,8.381,4.932,8.96,10.581.327,3.186.196,6.375.211,9.563.028,5.833-.017,11.667.032,17.499.008.99-.267,1.281-1.245,1.259-2.64-.059-5.285-.079-7.924.006-1.166.037-1.505-.276-1.498-1.477.04-7.827-.006-15.654-.025-23.482,0-.099-.006-.199-.01-.299-.177-4.15-1.365-5.415-5.489-5.654-1.888-.109-3.79.006-5.68-.085-1.03-.05-1.354.243-1.34,1.309.059,4.586.025,9.173.025,13.76,0,4.886-.024,9.772.021,14.658.008.955-.212,1.295-1.23,1.268-2.74-.073-5.483-.073-8.223,0-1.051.028-1.334-.281-1.329-1.33.041-9.373,0-18.746.053-28.119.007-1.241-.309-1.592-1.556-1.554-3.088.095-6.181.085-9.27.003-1.113-.03-1.407.252-1.401,1.385.05,9.323.001,18.646.06,27.97.008,1.289-.259,1.719-1.618,1.657-2.636-.12-5.283-.061-7.924-.02-.822.013-1.123-.206-1.121-1.083.026-12.514.031-25.028-.007-37.542-.003-1.037.432-1.09,1.245-1.088,6.979.024,13.957.014,20.935.014v.023h-.001Z"/>
      <path fill="#d3cec3" d="M378.099,74.981c0,6.183-.012,12.365.014,18.548.004.836-.114,1.254-1.115,1.239-7.177-.11-14.355.13-21.531-.153-1.551-.061-3.074-.325-4.562-.724-5.436-1.46-8.501-5.21-8.872-11-.421-6.573-.103-13.159-.179-19.739-.027-2.343.033-4.687-.023-7.03-.021-.87.273-1.091,1.105-1.077,2.741.046,5.485.076,8.224-.012,1.072-.034,1.2.383,1.196,1.287-.028,7.329-.023,14.659-.01,21.988.003,1.443.033,2.885.353,4.31.383,1.708,1.427,2.7,3.115,2.999,3.711.657,7.459.199,11.189.328.865.03.592-.641.594-1.067.019-3.341.01-6.681.01-10.022,0-6.183.017-12.366-.018-18.548-.005-.924.162-1.307,1.21-1.274,2.689.083,5.384.074,8.074.004.992-.026,1.252.265,1.245,1.244-.043,6.232-.022,12.465-.022,18.697h.002Z"/>
      <path fill="#d3cec3" d="M393.861,74.341c0-3.828-.035-7.019.022-10.209.017-.937-.274-1.195-1.181-1.159-1.692.068-3.389-.011-5.083.032-.782.02-1.176-.123-1.145-1.046.067-1.992.049-3.988.006-5.981-.015-.713.193-.95.919-.93,1.743.048,3.491-.039,5.232.037.967.042,1.268-.228,1.253-1.229-.059-3.987.01-7.976-.048-11.964-.015-1.036.259-1.372,1.32-1.342,2.64.073,5.284.081,7.923-.003,1.114-.036,1.296.387,1.283,1.372-.05,3.888.019,7.777-.045,11.664-.018,1.123.205,1.558,1.449,1.513,2.837-.104,5.682.021,8.52-.061,1.05-.03,1.241.35,1.21,1.276-.06,1.842-.068,3.69.003,5.532.036.93-.253,1.188-1.175,1.17-2.939-.057-5.88-.005-8.821-.033-.762-.007-1.197.094-1.179,1.035.105,5.531-.185,11.069.156,16.594.28,4.518,1.964,6.05,6.513,6.175,1.145.032,2.296.068,3.438-.007.893-.059,1.084.295,1.063,1.11-.05,1.943-.014,3.888-.018,5.832-.001.486.114,1.051-.686,1.026-4.078-.123-8.192.412-12.229-.365-4.954-.955-7.946-4.429-8.495-9.472-.405-3.731-.092-7.472-.207-10.569l.002.002Z"/>
      <path fill="#d3cec3" d="M104.356,71.369c.452-.255.602-.048.756.059,8.951,6.219,16.845,13.48,22.445,22.967,2.38,4.032,4.125,8.317,4.737,13.004.998,7.645-1.381,14.021-7.222,19.061-4.184,3.61-9.147,5.713-14.366,7.318-6.781,2.085-13.723,2.577-20.751,2.112-17.375-1.149-33.464-6.632-48.766-14.667-9.892-5.193-19.008-11.496-26.893-19.47-5.188-5.247-9.566-11.064-12.263-18.017-1.81-4.666-2.491-10.071-1.72-14.289.246,2.121.5,3.985,1.018,5.802,1.648,5.784,4.757,10.746,8.631,15.263,5.534,6.451,12.13,11.65,19.295,16.15,12.386,7.778,25.743,13.252,39.96,16.62,7.842,1.858,15.792,2.924,23.871,2.743,6.595-.148,13.035-1.143,19.105-3.887,4.583-2.072,8.475-4.967,10.973-9.462,2.033-3.658,2.597-7.59,2.055-11.693-.805-6.104-3.602-11.346-7.199-16.211-3.674-4.97-8.104-9.205-12.91-13.061-.18-.145-.332-.332-.756-.342h0Z"/>
      <path fill="#d3cec3" d="M90.777.002c7.754.434,15.189,2.038,21.931,6.085,7.826,4.696,12.756,11.599,15.211,20.317,1.709,6.069,1.997,12.257,1.355,18.508-1.227,11.934-5.423,22.84-11.401,33.14-.386.665-.587.579-1.039.119-.623-.633-1.284-1.236-1.985-1.779-.512-.397-.566-.712-.255-1.297,2.826-5.318,5.066-10.873,6.65-16.69,1.82-6.685,2.71-13.478,2.243-20.403-.596-8.816-3.235-16.888-9.033-23.73-4.339-5.12-9.797-8.608-16.076-10.862-5.801-2.082-11.813-2.958-18.159-3.091,1.117-.24,2.049-.272,2.981-.319"/>
      <path fill="#d3cec3" d="M111.644,80.35c.866.97,1.655,1.887,2.484,2.766.314.333.168.546-.031.834-3.458,5.016-7.33,9.691-11.6,14.034-2.372,2.412-4.87,4.688-7.45,6.876-.409.346-.621.41-.935-.09-.425-.675-1.293-1.294-1.302-1.946-.009-.676,1.014-1.128,1.596-1.664,6.355-5.858,11.888-12.403,16.512-19.711.218-.345.45-.681.726-1.099h0Z"/>
      <path fill="#d3cec3" d="M90.144,108.698c-5.795,4.248-11.661,7.716-17.888,10.572-.376.172-.76.33-1.123.525-1.94,1.044-3.909,1.678-5.996.368.072-.207.405-.225.653-.334,7.638-3.362,14.786-7.554,21.403-12.64.535-.411.83-.413,1.283.095.449.504,1.033.887,1.668,1.414Z"/>
      <path fill="#d3cec3" d="M48.227,126.803c-3.568.602-6.904,1.125-10.294,1.181,2.826-.517,5.645-1.045,8.431-1.73.655-.161,1.135.146,1.862.549h0Z"/>
      <path fill="url(#logoGradient)" d="M87.171,24.309c-1.14,3.07-2.309,6.13-3.413,9.213-2.516,7.031-4.697,14.159-6.067,21.513-1.119,6.003-1.651,12.043-.967,18.141.658,5.87,2.536,11.363,5.217,16.6,3.365,6.575,7.738,12.483,12.185,18.338,2.385,3.14,4.806,6.254,7.199,9.388.218.285.61.521.423,1.053-1.643-1.781-3.254-3.542-4.881-5.289-5.742-6.166-11.5-12.315-17.886-17.835-6.66-5.757-13.971-10.371-22.477-12.915-4.839-1.448-9.782-2.362-14.793-2.934-10.837-1.237-21.722-1.237-32.606-1.275-.722-.003-1.441-.039-2.158-.126.418.348.828.03,1.234,0,6.594-.473,13.199-.815,19.779-1.465,7.344-.726,14.652-1.649,21.749-3.832,8.674-2.669,15.419-7.892,20.609-15.251,4.152-5.886,7.341-12.299,10.31-18.829,2.057-4.525,4.035-9.087,6.048-13.633.131-.295.267-.587.401-.881.032.006.064.011.096.017l-.002.002Z"/>
      <path fill="url(#logoGradient)" d="M51.28,115.805c2.234-7.333,4.384-14.524,5.586-21.955.427-2.635.725-5.286.773-7.955.014-.793.213-.847.893-.59,2.718,1.025,5.361,2.204,7.895,3.626.344.193.595.292.186.731-4.401,4.717-7.355,10.359-10.181,16.075-1.521,3.076-2.979,6.184-4.475,9.272-.129.267-.177.623-.676.795h0Z"/>
      <path fill="url(#logoGradient)" d="M104.761,75.455c-3.047.302-6.107.602-9.146,1.075-4.861.757-9.648,1.8-14.271,3.526-1.216.454-.994.559-1.359-.724-.634-2.224-1.023-4.499-1.306-6.794-.086-.7.043-.929.809-.731,7.254,1.874,14.663,2.687,22.119,3.161.857.054,1.715.11,2.572.163.236.015.496-.028.582.324h0Z"/>
      <path fill="url(#logoGradient)" d="M45.504,50.787c2.707,2.7,5.409,5.403,8.356,7.849,2.26,1.876,4.589,3.655,7.074,5.219.567.357.51.544.034.915-1.686,1.315-3.459,2.489-5.347,3.494-.379.202-.578.262-.754-.236-2.167-6.116-5.484-11.592-9.348-16.763-.069-.092-.111-.205-.166-.308.05-.057.101-.113.151-.17Z"/>
    </g>
  </svg>
)

export interface SplashScreenProps {
  onStart?: () => void
  onExperiences?: () => void
  onAbout?: () => void
  onBack?: () => void
}

export default function SplashScreen({ onStart, onExperiences, onAbout }: SplashScreenProps) {
  const handleBackToSite = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const lang = urlParams.get('lang') || 'pt'
    window.top?.location.assign(`/${lang}/experience-preview`)
  }

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 100% 80% at 50% -20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse 80% 60% at 80% 100%, rgba(201, 35, 55, 0.12) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 10% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
          linear-gradient(180deg, #050508 0%, #0A0D12 30%, #0D1015 70%, #050508 100%)
        `,
      }}
    >
      {/* Partículas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-purple-500/30 animate-pulse" />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 rounded-full bg-cyan-400/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-1/4 w-1 h-1 rounded-full bg-gold-main/50 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-azimut-red/30 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
      
      {/* Header fixo */}
      <header 
        className="relative z-20 flex items-center justify-between px-4 md:px-8 py-4"
        style={{ 
          background: 'rgba(5, 5, 8, 0.8)', 
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        }}
      >
        <button
          onClick={handleBackToSite}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#9CA3AF',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(168, 85, 247, 0.15)'
            e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)'
            e.currentTarget.style.color = '#C084FC'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
            e.currentTarget.style.color = '#9CA3AF'
          }}
        >
          <span>←</span>
          <span>Voltar ao Site</span>
        </button>
        
        <div className="flex items-center gap-3">
          <AzimutLogo />
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-2xl mx-auto text-center space-y-8">
          
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
            style={{
              background: 'linear-gradient(135deg, rgba(201, 35, 55, 0.2) 0%, rgba(201, 35, 55, 0.08) 100%)',
              border: '1px solid rgba(201, 35, 55, 0.35)',
              color: '#E84858',
              boxShadow: '0 0 30px rgba(201, 35, 55, 0.15)',
            }}
          >
            <span style={{ fontSize: 18 }}>🎮</span>
            <span>Jogo Interativo</span>
          </div>
          
          {/* Título */}
          <h1 
            className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 40%, #FF6B35 70%, #C92337 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 40px rgba(255, 215, 0, 0.3))',
            }}
          >
            EMPATHY ENGINE
          </h1>
          
          <p 
            className="text-lg md:text-xl font-body max-w-md mx-auto"
            style={{ color: '#9CA3AF', lineHeight: 1.6 }}
          >
            Monte propostas criativas e veja o cliente reagir em tempo real
          </p>

          {/* Card de informações premium */}
          <div 
            className="rounded-2xl p-6 md:p-8 text-left space-y-6"
            style={{
              background: 'linear-gradient(145deg, rgba(20, 23, 31, 0.9) 0%, rgba(10, 13, 18, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
            }}
          >
            {/* Tópicos */}
            <div>
              <h3 
                className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: '#C92337' }}
              >
                <span>📚</span> Tópicos Disponíveis
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: '🥽', name: 'XR/VR', color: '#00F5FF' },
                  { icon: '🎬', name: 'Audiovisual', color: '#A855F7' },
                  { icon: '🎪', name: 'Eventos', color: '#F97316' },
                  { icon: '🏛️', name: 'Cultura', color: '#3B82F6' },
                  { icon: '🍁', name: 'Canadá', color: '#22C55E' },
                ].map((topic) => (
                  <span 
                    key={topic.name} 
                    className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                    style={{
                      background: `${topic.color}10`,
                      border: `1px solid ${topic.color}30`,
                      color: topic.color,
                    }}
                  >
                    <span>{topic.icon}</span>
                    <span>{topic.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Divisor */}
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

            {/* Como jogar */}
            <div>
              <h3 
                className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: '#FFD700' }}
              >
                <span>🎯</span> Como Jogar
              </h3>
              <div className="grid gap-3">
                {[
                  { num: '1', text: 'Receba um brief com tema e objetivo', highlight: 'brief', color: '#C92337' },
                  { num: '2', text: 'Arraste cartas para a zona de composição', highlight: 'cartas', color: '#A855F7' },
                  { num: '3', text: 'Forme combos para ganhar bônus', highlight: 'combos', color: '#FFD700' },
                  { num: '4', text: 'Atinja a meta de pontos antes do tempo', highlight: 'meta de pontos', color: '#00F5FF' },
                ].map((step) => (
                  <div 
                    key={step.num}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                  >
                    <span 
                      className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ 
                        background: `${step.color}20`,
                        color: step.color,
                        border: `1px solid ${step.color}40`,
                      }}
                    >
                      {step.num}
                    </span>
                    <span style={{ color: '#B8B4A8', fontSize: 14 }}>
                      {step.text.split(step.highlight)[0]}
                      <strong style={{ color: step.color }}>{step.highlight}</strong>
                      {step.text.split(step.highlight)[1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {onStart && (
              <button
                onClick={onStart}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #C92337 0%, #9B1B2A 100%)',
                  color: '#fff',
                  boxShadow: '0 8px 32px rgba(201, 35, 55, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(201, 35, 55, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(201, 35, 55, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                }}
              >
                <span>▶</span>
                <span>Começar a Jogar</span>
              </button>
            )}
            
            {onExperiences && (
              <button
                onClick={onExperiences}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: '#B8B4A8',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 215, 0, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.3)'
                  e.currentTarget.style.color = '#FFD700'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.color = '#B8B4A8'
                }}
              >
                <span>🏆</span>
                <span>Ver Ranking</span>
              </button>
            )}
          </div>

          {onAbout && (
            <button
              onClick={onAbout}
              className="text-sm transition-all duration-300"
              style={{ color: '#6B7280' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#A855F7'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
            >
              Ver tutorial completo →
            </button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <p className="text-xs" style={{ color: '#4B5563' }}>
          © 2026 Azimut • Immersive Experiences
        </p>
      </footer>
    </div>
  )
}
