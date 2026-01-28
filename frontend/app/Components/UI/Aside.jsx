"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCalendarAlt, FaInfoCircle, FaGlobeAmericas, FaEnvelope } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Actividades", href: "/Activities", icon: <FaCalendarAlt size={18} /> },
    { name: "Sobre Nosotros", href: "/About_us", icon: <FaInfoCircle size={20} /> },
    { name: "Misiones", href: "/Missions", icon: <FaGlobeAmericas size={18} /> },
    { name: "Contacto", href: "/Contact", icon: <FaEnvelope size={18} /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-56 h-screen bg-white dark:bg-zinc-950 border-r border-zinc-200/60 dark:border-zinc-800/60 fixed left-0 top-0 pt-28 transition-all duration-300 z-[90]">
      
      <div className="px-4 flex flex-col gap-3">
        {/* Etiqueta de sección más elegante */}
        <p className="px-4 text-[11px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-2">
          Menu Principal
        </p>

        <nav className="flex flex-col gap-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[15px] font-bold transition-all duration-300 ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]" 
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                {/* Icono con contenedor para alineación perfecta */}
                <span className={`flex items-center justify-center w-6 transition-colors duration-300 ${
                  isActive ? "text-white" : "text-zinc-400 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                }`}>
                  {link.icon}
                </span>
                
                <span className="tracking-tight">
                  {link.name}
                </span>

                {/* Indicador visual activo (opcional) */}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-200 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer del Sidebar: Más limpio y profesional */}
      <div className="mt-auto p-6">
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50">
          <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase text-center tracking-tighter">
            © 2026 Iglesia De La Calle
          </p>
        </div>
      </div>
    </aside>
  );
}