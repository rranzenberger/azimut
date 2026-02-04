import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAuthToken } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'
import { PublicationEditForm } from '../PublicationEditForm'

export const revalidate = 0

export default async function EditPublicationPage({ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('azimut_admin_token')?.value
  const session = token ? verifyAuthToken(token) : null
  if (!session) redirect('/login')

  const { id } = await params
  const item = await prisma.publication.findUnique({ where: { id } })
  if (!item) redirect('/admin/publications')

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <h1 style={{ marginBottom: 24 }}>Editar publicação</h1>
      <PublicationEditForm item={item} />
    </div>
  )
}
