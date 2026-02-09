import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { PastEventsGalleryClient } from './PastEventsGalleryClient';

export const revalidate = 0;

/**
 * Galeria Past Events — 8 slots (como no site).
 * Backoffice visual: trocar imagem em cada slot.
 */
export default async function AcademyEventsGalleryPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  return <PastEventsGalleryClient />;
}
