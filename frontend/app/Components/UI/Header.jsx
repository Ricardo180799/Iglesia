"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearToken } from "../Redux/TokenSlice";
import { Logout } from "../Modules/Home/Servicios/homeService";

export default function Header() {
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await Logout();
      dispatch(clearToken());
      setMensaje({ texto: "Sesión finalizada", tipo: "success" });
      setTimeout(() => setMensaje({ texto: "", tipo: "" }), 2500);
    } catch (err) {
      setMensaje({ texto: "Error al cerrar sesión", tipo: "error" });
      setTimeout(() => setMensaje({ texto: "", tipo: "" }), 3000);
    }
  };

  return (
    <header className="w-full h-20 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50 fixed top-0 left-0 z-[100] transition-all duration-300">
      
      {/* TOAST NOTIFICATION: Ahora más elegante y centrada */}
      {mensaje.texto && (
        <div className={`fixed top-24 right-8 px-6 py-3 rounded-2xl shadow-2xl text-white font-semibold text-sm transition-all animate-in fade-in slide-in-from-right-4 z-[110] ${
          mensaje.tipo === "success" ? "bg-emerald-600" : "bg-rose-600"
        }`}>
          {mensaje.tipo === "success" ? "✓ " : "✕ "} {mensaje.texto}
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-full flex justify-between items-center">
        
        {/* SECCIÓN IZQUIERDA: Branding */}
        <div className="flex items-center gap-10">
          <Link href="/" className="group flex items-center gap-1">
            <span className="text-2xl font-black text-blue-600 tracking-tighter transition-transform group-hover:scale-105">
              IGLESIA
            </span>
            <span className="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter transition-transform group-hover:scale-105">
              DELACALLE
            </span>
          </Link>

          <div className="hidden lg:block h-6 w-[1.5px] bg-zinc-200 dark:bg-zinc-800" />

          <Link 
            href="/Ministery" 
            className="hidden md:flex items-center gap-2 text-[14px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all uppercase tracking-[0.1em]"
          >
            <span className="opacity-70 text-lg">🔒</span> 
            Área Ministerial
          </Link>
        </div>

        {/* SECCIÓN DERECHA: Autenticación */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link 
              href="/Formulary?mode=sesion" 
              className="text-[15px] font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors relative group"
            >
              Iniciar Sesión
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>

            <Link 
              href="/Formulary?mode=register" 
              className="hidden sm:block text-[15px] font-bold text-white bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-full transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95"
            >
              Registrarse
            </Link>
          </div>

          <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />

          <button 
            onClick={handleLogout}
            className="group flex items-center gap-2 text-[15px] font-bold text-rose-500 hover:text-rose-600 transition-all"
          >
            <span className="hidden md:inline">Cerrar Sesión</span>
            <svg 
              className="w-5 h-5 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
}