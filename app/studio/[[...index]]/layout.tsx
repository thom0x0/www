export const metadata = {
  title: 'Sanity Studio',
  description: 'Painel de administracao de conteudo',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      {children}
    </div>
  )
}
