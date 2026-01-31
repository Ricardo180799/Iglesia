"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FaCalendarAlt, 
  FaInfoCircle, 
  FaGlobeAmericas, 
  FaEnvelope, 
  FaQuoteLeft, 
  FaNewspaper 
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  // Organizados por categorías para mayor claridad
  const navLinks = [
    { name: "Actividades", href: "/Activities", icon: <FaCalendarAlt size={18} /> },
    { name: "Misiones", href: "/Missions", icon: <FaGlobeAmericas size={18} /> },
    { name: "Publicaciones", href: "/Posts", icon: <FaNewspaper size={18} /> },
    { name: "Testimonios", href: "/AllTestimonies", icon: <FaQuoteLeft size={16} /> },
    { name: "Sobre Nosotros", href: "/About_us", icon: <FaInfoCircle size={20} /> },
    { name: "Contacto", href: "/Contact", icon: <FaEnvelope size={18} /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white dark:bg-zinc-950 border-r border-zinc-200/60 dark:border-zinc-800/60 fixed left-0 top-0 pt-28 transition-all duration-300 z-[90]">
      
      <div className="px-4 flex flex-col gap-3">
        <p className="px-4 text-[11px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-2">
          Menu Principal
        </p>

        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group flex items-center gap-4 px-4 py-3 rounded-xl text-[14px] font-bold transition-all duration-300 ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.01]" 
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <span className={`flex items-center justify-center w-6 transition-colors duration-300 ${
                  isActive ? "text-white" : "text-zinc-400 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                }`}>
                  {link.icon}
                </span>
                
                <span className="tracking-tight">
                  {link.name}
                </span>

                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-200 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

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