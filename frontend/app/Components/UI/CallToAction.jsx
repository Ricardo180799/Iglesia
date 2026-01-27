"use client";

import { Button } from "../UI/Button";
import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaArrowRight, FaChevronLeft } from "react-icons/fa";

export default function CallToAction() {
  const [showSocials, setShowSocials] = useState(false);

  const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61571811928129";
  const INSTAGRAM_URL = "https://www.instagram.com/mov.iglesiadelacalle70x7?igsh=MWhtZnJsYzVzZTLYAW==";

  return (
    <section className="relative my-24 mx-4">
      {/* Resplandor de fondo (Glow effect) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      
      <div className="relative bg-zinc-950 rounded-[2rem] overflow-hidden border border-white/10">
        {/* Capas de diseño abstracto */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 py-16 px-8 md:py-24 md:px-16 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
            Comunidad & Propósito
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            Únete a nuestra <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              gran familia.
            </span>
          </h2>

          <p className="mb-12 text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            No camines solo. Descubre un lugar donde tu fe crece y tus dones encuentran un propósito real. Te esperamos con los brazos abiertos.
          </p>

          {/* ===== VISTA PRINCIPAL ===== */}
          {!showSocials ? (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
              <Link
                href="/Formulary?mode=register"
                className="group relative flex items-center justify-center gap-3 rounded-2xl font-bold bg-white text-zinc-950 hover:bg-zinc-200 px-10 py-5 text-lg w-full sm:w-auto transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Registrarme ahora
                <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => setShowSocials(true)}
                className="w-full sm:w-auto px-10 py-5 rounded-2xl font-bold text-white border border-white/20 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
              >
                Ver Redes Sociales
              </button>
            </div>
          ) : (
            /* ===== VISTA REDES SOCIALES ===== */
            <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-zinc-900 border border-white/10 text-white hover:border-blue-500/50 px-8 py-4 rounded-2xl text-lg font-bold transition-all hover:bg-zinc-800"
                >
                  <FaFacebook size={24} className="text-blue-500" /> Facebook
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-zinc-900 border border-white/10 text-white hover:border-pink-500/50 px-8 py-4 rounded-2xl text-lg font-bold transition-all hover:bg-zinc-800"
                >
                  <FaInstagram size={24} className="text-pink-500" /> Instagram
                </a>
              </div>

              <button
                onClick={() => setShowSocials(false)}
                className="mt-4 flex items-center gap-2 text-zinc-500 hover:text-white text-sm font-bold transition-colors"
              >
                <FaChevronLeft size={10} /> VOLVER
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}