"use client";

import { useState, useMemo } from "react";
import { useMostrar } from "../../../Hooks/AllTestimonies";
import Link from "next/link";
import TestimonyModal from "./TestimonyModal"
import { FaPlayCircle, FaSearch, FaArrowLeft, FaChevronRight } from "react-icons/fa";

export default function TestimoniesPage() {
  const { loading, error, info } = useMostrar();
  const [active, setActive] = useState(false);
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredTestimonies = useMemo(() => {
    return info.filter(t => {
      const matchType = typeFilter === "ALL" || t.Type === typeFilter;
      const matchSearch =
        t.Title.toLowerCase().includes(search.toLowerCase()) ||
        t.Author.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [info, typeFilter, search]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <p className="text-zinc-500 tracking-[0.3em] uppercase text-[10px] animate-pulse">Sincronizando historias...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <p className="text-red-400 bg-red-400/10 px-6 py-3 rounded-full border border-red-400/20 text-xs uppercase tracking-widest">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 pb-32 pt-20 relative overflow-hidden">
      
      {/* Fondo con resplandores */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-500/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Volver */}
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 text-zinc-600 hover:text-indigo-400 transition-colors mb-12 text-[10px] font-bold uppercase tracking-[0.4em]"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Volver al Inicio
        </Link>

        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tighter mb-6 leading-tight">
            Historias de <span className="font-serif italic text-indigo-500">Transformación</span>
          </h1>
          <p className="text-zinc-500 max-w-xl mx-auto font-light leading-relaxed text-balance">
            Testimonios reales de fe y esperanza que inspiran nuestra comunidad.
          </p>
        </header>

        {/* Barra de Filtros */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white/[0.01] border border-white/[0.04] backdrop-blur-md p-2 rounded-[2.5rem] mb-16">
          <div className="flex p-1 gap-1">
            {["ALL", "Video", "Article"].map(type => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500
                  ${typeFilter === type 
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"}`}
              >
                {type === "ALL" ? "Todos" : type}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group mr-2">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" size={14}/>
            <input
              type="text"
              placeholder="Buscar por título o autor..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-black/40 border border-white/[0.05] rounded-full py-3 pl-12 pr-6 text-sm text-zinc-300 focus:outline-none focus:border-indigo-500/30 transition-all"
            />
          </div>
        </div>

        {/* LISTADO DE TESTIMONIOS */}
        <div className="grid grid-cols-1 gap-12">
          {filteredTestimonies.map((t) => (
            <article 
              key={t.ID}
              className="group relative bg-white/[0.01] border border-white/[0.04] hover:border-indigo-500/30 hover:bg-white/[0.02] backdrop-blur-sm rounded-[2.5rem] p-8 md:p-12 transition-all duration-700"
            >
              <div className="absolute inset-0 bg-indigo-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />

              <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                
                {/* Lado Izquierdo: Autor */}
                <div className="w-full md:w-40 flex-shrink-0 pt-2">
                  <span className="block text-indigo-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                    {t.Type}
                  </span>
                  <p className="text-zinc-100 font-serif italic text-xl leading-none">
                    {t.Author}
                  </p>
                  <div className="mt-6 h-px w-8 bg-zinc-800 group-hover:w-16 group-hover:bg-indigo-500 transition-all duration-700" />
                </div>

                {/* Lado Derecho: Contenido */}
                <div className="flex-1 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-light text-zinc-100 tracking-tighter leading-tight transition-colors duration-500 group-hover:text-white">
                    {t.Title}
                  </h2>

                  <div className="relative">
                    {t.Type === "Article" && (
                      <p className="text-zinc-500 text-lg leading-relaxed font-light line-clamp-3 group-hover:text-zinc-400 transition-colors duration-700">
                        {t.Text}
                      </p>
                    )}

                    {t.Type === "Video" && (
                      <div className="inline-flex items-center gap-4 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                        <FaPlayCircle size={32} className="opacity-80 group-hover:scale-110 transition-transform duration-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Contenido Multimedia</span>
                      </div>
                    )}
                  </div>

                  {/* NUEVO LINK: VER COMPLETO */}
                  <div className="pt-4">
                    <Link 
                      href={`/especificTestimonie/${t.ID}`}
                      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-indigo-400 transition-all duration-300 group/link"
                    >
                      Ver completo 
                      <FaChevronRight className="text-[8px] group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {filteredTestimonies.length === 0 && (
            <div className="text-center py-20 bg-white/[0.01] rounded-[2.5rem] border border-dashed border-white/10">
              <p className="text-zinc-600 font-light italic">No se encontraron historias bajo estos criterios.</p>
            </div>
          )}
        </div>

        {/* CTA Compartir */}
        <div 
          onClick={() => setActive(true)}
          className="mt-24 cursor-pointer group relative overflow-hidden rounded-[3rem] p-12 text-center border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-700 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-white text-2xl font-light tracking-tight relative z-10">
            ¿Tienes una <span className="font-serif italic text-indigo-400">historia</span> que contar?
          </p>
          <button className="mt-8 px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-500">
            Compartir mi testimonio
          </button>
        </div>

        <TestimonyModal active={active} onClose={() => setActive(false)} />
      </div>
    </div>
  );
}