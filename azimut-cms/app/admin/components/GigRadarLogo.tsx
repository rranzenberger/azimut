/**
 * Logo do GigRadar para o menu lateral — mesmo desenho do ícone do app Android
 * (`app/src/main/res/drawable/ic_launcher_foreground.xml`): carro + varredura de radar
 * em roxo + ponto-alvo verde (a corrida boa detectada).
 *
 * É SVG inline de propósito: não depende de arquivo em /public, acompanha o tema
 * e continua nítido em qualquer tamanho.
 */
export function GigRadarLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 108 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0, display: 'block' }}
    >
      {/* Arcos da varredura — saem do carro em direção ao alvo */}
      <path d="M44,64 A20,20 0 0 1 64,44" stroke="#CBB8FF" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M40,50 A30,30 0 0 1 58,32" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
      <path d="M38,40 A40,40 0 0 1 52,26" stroke="#8B6CF6" strokeWidth="2.6" strokeLinecap="round" opacity="0.5" />

      {/* Ponto-alvo: a corrida que vale a pena */}
      <circle cx="70" cy="36" r="4.5" fill="#34D399" />

      {/* Carro */}
      <g transform="translate(24,46) scale(1.5)">
        <path
          fill="#FFFFFF"
          d="M18.92,6.01C18.72,5.42 18.16,5 17.5,5h-11c-0.66,0 -1.21,0.42 -1.42,1.01L3,12v8c0,0.55 0.45,1 1,1h1c0.55,0 1,-0.45 1,-1v-1h12v1c0,0.55 0.45,1 1,1h1c0.55,0 1,-0.45 1,-1v-8l-2.08,-5.99zM6.5,16c-0.83,0 -1.5,-0.67 -1.5,-1.5S5.67,13 6.5,13s1.5,0.67 1.5,1.5S7.33,16 6.5,16zM17.5,16c-0.83,0 -1.5,-0.67 -1.5,-1.5s0.67,-1.5 1.5,-1.5 1.5,0.67 1.5,1.5 -0.67,1.5 -1.5,1.5zM5,11l1.5,-4.5h11L19,11L5,11z"
        />
      </g>
    </svg>
  );
}
