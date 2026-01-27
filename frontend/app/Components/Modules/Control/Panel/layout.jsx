// src/app/admin/layout.jsx
import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar Izquierdo */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col p-6">
        <h2 className="text-white text-xl font-bold mb-8">Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <Link 
            href="/" 
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Home
          </Link>
           <Link 
            href="/Ministery" 
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Panel Administrativo
          </Link>
          
          <Link 
            href="/Components/Modules/Control/Panel/Components/AdminUsuarios" 
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Gestionar usuarios
          </Link>
          <Link 
            href="/Components/Modules/Control/Panel/Components/Testimonies" 
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Gestionar testimonios
          </Link>
          <Link 
            href="/Components/Modules/Control/Panel/Components/ConfigureHome" 
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Configuración inicial
          </Link>
        </nav>
      </aside>

      {/* Área de Contenido Derecha */}
      <main className="flex-1 overflow-y-auto p-10 text-white">
        {children}
      </main>
    </div>
  );
}