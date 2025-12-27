/**
 * PÁGINA DE PÁGINAS - VERSÃO ULTRA SIMPLIFICADA
 * Para debug do erro 1798066378
 */

export const revalidate = 0;

export default async function PagesPage() {
  return (
    <div style={{ padding: 40, color: '#fff' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 20 }}>
        Páginas - Debug Version
      </h1>
      
      <div style={{ background: 'rgba(201,35,55,0.1)', padding: 20, borderRadius: 10, marginBottom: 20 }}>
        <p style={{ margin: 0 }}>
          ✅ Componente carregado com sucesso!
        </p>
        <p style={{ margin: 0, marginTop: 10, fontSize: 14, opacity: 0.7 }}>
          Se você está vendo essa mensagem, o Next.js conseguiu renderizar o Server Component.
        </p>
      </div>
      
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: 20, borderRadius: 10 }}>
        <p style={{ margin: 0, fontWeight: 600, marginBottom: 10 }}>Próximos passos:</p>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li>Adicionar import do Prisma</li>
          <li>Fazer query simples</li>
          <li>Renderizar dados</li>
        </ol>
      </div>
    </div>
  );
}

