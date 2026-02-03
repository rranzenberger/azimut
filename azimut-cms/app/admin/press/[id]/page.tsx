import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAuthToken } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'
import { PressEditForm } from '../PressEditForm'

export const revalidate = 0

export default async function EditPressPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const token = cookieStore.get('azimut_admin_token')?.value
  const session = token ? verifyAuthToken(token) : null
  if (!session) redirect('/login')

  const item = await prisma.press.findUnique({ where: { id: params.id } })
  if (!item) redirect('/admin/press')

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <h1 style={{ marginBottom: 24 }}>Editar imprensa</h1>
      <PressEditForm item={item} />
    </div>
  )
}
