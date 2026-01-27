"use client";

import Link from "next/link";
import { useMostrar } from "../../../Hooks/About"; 
import { motion } from "framer-motion";
import { FaHistory, FaEye, FaRocket, FaHandsHelping, FaUsers, FaChurch, FaBook, FaHeart } from "react-icons/fa";

// Configuración de animación para reutilizar
const fadeInScroll = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function AboutUsPage() {
  const { loading, error, info } = useMostrar();

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-[#050505]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500"></div>
    </div>
  );

  const data = Array.isArray(info) ? info[0] : info;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* ===== DECORACIÓN DE FONDO ===== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"></div>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        
        {/* ===== HERO SECTION ===== */}
        <motion.header 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="mb-48"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-indigo-500"></div>
            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.5em]">Nuestra Identidad</span>
          </div>
          <h1 className="text-7xl md:text-[9rem] font-light text-white tracking-tighter leading-[0.8] mb-12">
            Raíces de <br />
            <span className="font-serif italic text-indigo-400">Esperanza</span>
          </h1>
          <p className="max-w-xl text-zinc-500 text-lg font-light leading-relaxed italic border-l border-white/10 pl-8">
            "Un viaje a través del tiempo, guiados por la fe y el propósito de transformar comunidades."
          </p>
        </motion.header>

        {/* ===== GRID DE CONTENIDO DINÁMICO ===== */}
        <div className="flex flex-col gap-40">

          {/* 01: ORIGEN Y TRAYECTORIA (Aparición Lateral) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <motion.div {...fadeInScroll}>
                <HistoryCard 
                    icon={<FaHistory />} 
                    title="Nuestro Origen" 
                    content={data.origen} 
                    category="Génesis"
                />
             </motion.div>
             <motion.div {...fadeInScroll} transition={{ delay: 0.2, duration: 0.8 }}>
                <HistoryCard 
                    icon={<FaChurch />} 
                    title="Nuestra Trayectoria" 
                    content={data.historia} 
                    category="Legado"
                />
             </motion.div>
          </section>

          {/* 02: MISIÓN Y VISIÓN (Destacados Centrales) */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
             <motion.div {...fadeInScroll} className="md:col-span-7">
                <div className="p-12 rounded-[3rem] bg-indigo-600/10 border border-indigo-500/30 backdrop-blur-md relative overflow-hidden group">
                    <FaRocket className="absolute -right-8 -bottom-8 text-9xl text-indigo-500/5 group-hover:rotate-12 transition-transform duration-700" />
                    <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6 block">Estrategia</span>
                    <h2 className="text-4xl font-serif italic text-white mb-6">Misión</h2>
                    <p className="text-xl text-zinc-300 leading-relaxed font-light">{data.mision}</p>
                </div>
             </motion.div>
             <motion.div {...fadeInScroll} transition={{ delay: 0.3 }} className="md:col-span-5">
                <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-sm">
                    <FaEye className="text-indigo-500 mb-6 text-2xl" />
                    <h2 className="text-2xl font-light text-white uppercase tracking-tighter mb-4">Visión</h2>
                    <p className="text-lg text-zinc-400 leading-relaxed font-light">{data.vision}</p>
                </div>
             </motion.div>
          </section>

          {/* 03: DOCTRINA Y VALORES (Nuevos Marcos Sobresalientes) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <motion.div {...fadeInScroll} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />
                <div className="p-12 rounded-[3rem] bg-white/[0.03] border border-white/10 hover:border-indigo-400/50 transition-all duration-500 h-full">
                    <FaBook className="text-indigo-400 mb-8 text-3xl" />
                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 mb-6">Fundamento Teológico</h3>
                    <h2 className="text-3xl font-light text-white mb-6 tracking-tight">Doctrina</h2>
                    <p className="text-zinc-400 leading-relaxed text-lg font-light">{data.doctrina}</p>
                </div>
             </motion.div>

             <motion.div {...fadeInScroll} transition={{ delay: 0.2 }} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />
                <div className="p-12 rounded-[3rem] bg-white/[0.03] border border-white/10 hover:border-blue-400/50 transition-all duration-500 h-full">
                    <FaHeart className="text-red-400/70 mb-8 text-3xl" />
                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 mb-6">Cultura Organizacional</h3>
                    <h2 className="text-3xl font-light text-white mb-6 tracking-tight">Valores</h2>
                    <p className="text-zinc-400 leading-relaxed text-lg font-light">{data.valores}</p>
                </div>
             </motion.div>
          </section>

          {/* 04: COMUNIDAD */}
          <motion.section {...fadeInScroll} className="mt-12">
            <div className="group p-16 rounded-[4rem] border border-dashed border-white/10 hover:border-indigo-500/40 transition-all duration-700 text-center bg-white/[0.01]">
                <FaUsers className="mx-auto text-4xl text-zinc-700 group-hover:text-indigo-500 transition-colors mb-6" />
                <h3 className="text-xs font-black uppercase tracking-[0.5em] text-zinc-500 mb-8">Liderazgo y Servicio</h3>
                <p className="text-3xl font-light text-zinc-400 max-w-3xl mx-auto leading-relaxed group-hover:text-zinc-100 transition-colors font-serif italic">
                    {data.equipo_pastoral}
                </p>
            </div>
          </motion.section>

        </div>

        {/* ===== FOOTER NAV ===== */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-64 flex flex-col items-center"
        >
          <Link href="/" className="group flex flex-col items-center gap-6">
            <div className="relative">
                <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center group-hover:border-indigo-500/50 transition-all duration-700">
                    <span className="text-xl group-hover:-translate-y-1 transition-transform duration-500 text-zinc-600 group-hover:text-white">↑</span>
                </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-indigo-400 transition-colors">Regresar al Inicio</span>
          </Link>
        </motion.footer>

      </main>
    </div>
  );
}

function HistoryCard({ icon, title, content, category }) {
    return (
        <div className="group p-10 rounded-[3rem] bg-white/[0.01] border border-white/[0.05] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-700 h-full">
            <div className="flex items-center justify-between mb-8">
                <div className="p-3 rounded-2xl bg-white/5 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                    {icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">{category}</span>
            </div>
            <h3 className="text-xl font-light text-white mb-6 uppercase tracking-tighter">{title}</h3>
            <p className="text-zinc-500 leading-relaxed font-light group-hover:text-zinc-400 transition-colors">
                {content}
            </p>
        </div>
    );
}