import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { verifyAuthToken } from '@/src/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const tokenMatch = cookieHeader.match(/(?:^|;\s*)azimut_admin_token=([^;]+)/);
    const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : null;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return new Response(JSON.stringify({ error: 'Não autenticado' }), { status: 401 });
    }

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        return {
          allowedContentTypes: [
            'video/mp4',
            'video/webm',
            'video/quicktime',
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp',
            'image/gif',
          ],
          addRandomSuffix: true,
          tokenPayload: clientPayload || '',
        };
      },
      onUploadCompleted: async () => {
        // O cadastro no banco é feito pelo client logo após o upload.
      },
    });

    return new Response(JSON.stringify(jsonResponse));
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error?.message || 'Erro ao preparar upload' }),
      { status: 400 }
    );
  }
}

