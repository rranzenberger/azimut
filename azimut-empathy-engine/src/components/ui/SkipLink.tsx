export interface SkipLinkProps {
  targetId?: string
}

export default function SkipLink({ targetId = 'main-content' }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-azimut-red focus:text-white focus:rounded-lg font-display font-semibold"
    >
      Pular para o conteúdo
    </a>
  )
}
