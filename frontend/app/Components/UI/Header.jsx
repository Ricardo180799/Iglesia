"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Actividades", href: "/Activities" },
    { name: "Sobre Nosotros", href: "/About_us" },
    { name: "Misiones", href: "/Missions" },
    { name: "Contacto", href: "/Contact" },
  ];

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-zinc-100 sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-black text-blue-600 tracking-tight">
          IGLESIA<span className="text-zinc-900">DELACALLE</span>
        </Link>

        {/* NAVEGACIÓN DESKTOP */}
        <div className="hidden md:flex gap-8 text-zinc-600 font-semibold text-sm">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-blue-600 transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* BOTONES DERECHA (DESKTOP) */}
        <div className="hidden md:flex gap-4 items-center">
          <Link 
            href="/Ministery" 
            className="text-xs font-bold text-zinc-900 bg-zinc-100 px-4 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-200 transition-all flex items-center gap-2"
          >
            🔒 ÁREA MINISTERIAL
          </Link>
          <Link href="/Formulary?mode=sesion" className="text-sm font-bold text-blue-600 hover:opacity-80">
            Iniciar Sesión
          </Link>
        </div>

        {/* BOTÓN HAMBURGUESA (MÓVIL) */}
        <button 
          className="md:hidden text-zinc-900 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-100 p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-zinc-800 border-b border-zinc-50 pb-2"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col gap-4 pt-4">
            <Link 
              href="/Ministery" 
              onClick={() => setIsOpen(false)}
              className="w-full text-center font-bold text-zinc-900 bg-zinc-100 py-4 rounded-xl border border-zinc-200"
            >
              🔒 ÁREA MINISTERIAL
            </Link>
            <Link 
              href="/Formulary?mode=sesion" 
              onClick={() => setIsOpen(false)}
              className="w-full text-center font-bold text-white bg-blue-600 py-4 rounded-xl"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}