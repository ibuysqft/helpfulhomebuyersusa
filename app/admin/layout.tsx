export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <header className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <h1 className="text-white font-bold text-lg">
          <span className="text-amber-400">HHBUSA</span> Admin
        </h1>
        <nav className="flex gap-4 text-sm">
          <a href="/admin" className="text-slate-300 hover:text-white">
            Drafts
          </a>
        </nav>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}
