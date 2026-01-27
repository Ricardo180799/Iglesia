"use client";
import { useState } from "react";
import Image from "next/image";
import { useEspecific } from "../../../Hooks/useEspecificTest";
import TestimonyModal from "./TestimonyModal";
import Link from "next/link";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";

export default function TestimonyDetail({ ID }) {
  const { especific, loading, error } = useEspecific(ID);
  const [active, setActive] = useState(false);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <p className="text-zinc-500 tracking-[0.3em] uppercase text-[10px] animate-pulse">Sincronizando historia...</p>
    </div>
  );

  if (error || !especific) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <p className="text-red-400 bg-red-400/10 px-6 py-3 rounded-full border border-red-400/20 text-xs tracking-widest uppercase">
        {error || "No se pudo cargar el testimonio"}
      </p>
    </div>
  );

  const { Type, Title, Text, Video_Url, Thumbnail, Author, Created_By } = especific;

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 pb-32 pt-20 relative overflow-hidden">
      
    
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-indigo-500/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* ===== BOTÓN VOLVER ===== */}
        <Link 
          href="/testimonies" 
          className="group inline-flex items-center gap-3 text-zinc-600 hover:text-indigo-400 transition-all duration-500 mb-12 text-[10px] font-bold uppercase tracking-[0.4em]"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Volver a la Comunidad
        </Link>

        {/* ===== CONTENEDOR PRINCIPAL TIPO PANEL ===== */}
        <div className="bg-white/[0.01] border border-white/[0.04] backdrop-blur-sm rounded-[3.5rem] p-8 md:p-20">
          
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            
            {/* COLUMNA IZQUIERDA: META INFO */}
            <div className="w-full md:w-48 flex-shrink-0">
              <div className="md:sticky md:top-24">
                <span className="block text-indigo-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                  {Type}
                </span>
                <p className="text-zinc-100 font-serif italic text-3xl leading-none">
                  {Author}
                </p>
                <div className="mt-8 h-px w-12 bg-indigo-500/30" />
                <div className="mt-10 flex items-center gap-2 text-zinc-600 uppercase text-[9px] tracking-[0.2em] font-bold">
                  <FaUserCircle size={12} className="opacity-40" />
                  <span>Vía: {Created_By}</span>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: CUERPO */}
            <div className="flex-1 space-y-16">
              
              <header>
                <h1 className="text-4xl md:text-7xl font-light text-white tracking-tighter leading-[0.95]">
                  {Title}
                </h1>
              </header>

              {/* Multimedia */}
              <div className="relative group">
                {Type === "Article" && Thumbnail && (
                  <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden border border-white/[0.08] bg-black">
                    <Image
                      src={Thumbnail}
                      alt={Title}
                      fill
                      className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
                  </div>
                )}

                {Type === "Video" && Video_Url && (
                  <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden border border-white/[0.08] bg-black">
                    <video src={Video_Url} controls className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Texto */}
              {Text && (
                <div className="max-w-2xl">
                  <p className="text-zinc-400 text-lg md:text-xl leading-[1.8] font-light font-sans text-pretty whitespace-pre-line">
                    {Text}
                  </p>
                </div>
              )}

              {/* ===== CTA REFINADO ===== */}
              <div 
                onClick={() => setActive(true)}
                className="cursor-pointer group relative overflow-hidden rounded-[2.5rem] p-10 text-center border border-white/[0.08] bg-black/20 hover:border-indigo-500/40 transition-all duration-700"
              >
                <div className="absolute inset-0 bg-indigo-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-white text-xl font-light tracking-tight relative z-10">
                  ¿Dios ha hecho algo en tu <span className="font-serif italic text-indigo-400">camino</span>?
                </p>
                <button className="mt-8 px-8 py-3 bg-zinc-100 text-black text-[9px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-500">
                  Contar mi historia
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TestimonyModal active={active} onClose={() => setActive(false)} />
    </div>
  );
}