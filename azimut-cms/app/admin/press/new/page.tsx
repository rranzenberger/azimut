import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAuthToken } from '@/src/lib/auth'
import { PressEditForm } from '../PressEditForm'

export const revalidate = 0

export default async function NewPressPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('azimut_admin_token')?.value
  const session = token ? verifyAuthToken(token) : null
  if (!session) redirect('/login')
  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <h1 style={{ marginBottom: 24 }}>Nova notícia / release</h1>
      <PressEditForm />
    </div>
  )
}
