import './globals.css'

export const metadata = {
  title: 'Azimut CMS',
  description: 'Sistema de gerenciamento de conteúdo Azimut',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-gray-900 text-gray-100 min-h-screen">{children}</body>
    </html>
  )
}
