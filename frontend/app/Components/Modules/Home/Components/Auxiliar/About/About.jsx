"use client";

import { useState } from "react";
import Link from "next/link";
import { useMostrar } from "../../../Hooks/About"; 
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { FaHistory, FaEye, FaRocket, FaUsers, FaChurch, FaBook, FaHeart, FaEdit, FaTools, FaCheck } from "react-icons/fa";
import AboutForm from "./AboutForm"; 

const fadeInScroll = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function AboutUsPage() {
  const { loading, error, info, refresh } = useMostrar();
  const [showEdit, setShowEdit] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [campoNombre, setCampoNombre] = useState(""); 
  const [campoValor, setCampoValor] = useState("");

  const Rol = useSelector((state) => state.token.Rol);
  const isAllowed = Array.isArray(Rol) && Rol.some((r) => ["Pastor", "Dev", "Admin"].includes(r));

  const handlePrepareEdit = (nombreColumna, valorActual) => {
    setCampoNombre(nombreColumna);
    setCampoValor(valorActual);
    setFormOpen(true);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-[#050505]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500"></div>
    </div>
  );

  const data = Array.isArray(info) ? info[0] : info;
  if (!data && !formOpen) return null;

  
  const EditableSection = ({ children, name, value, className = "" }) => (
    <div className={`relative group/edit ${className}`}>
      <AnimatePresence>
        {showEdit && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute -inset-2 z-30 border-2 border-indigo-500/50 rounded-[3.2rem] pointer-events-none bg-indigo-500/[0.02]"
          >
            <button 
              onClick={() => handlePrepareEdit(name, value)}
              className="absolute -top-4 right-8 pointer-events-auto bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaEdit size={12}/>
              <span className="text-[10px] font-black uppercase tracking-tighter">Editar bloque</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-indigo-500/30 overflow-x-hidden">
      
      
      {isAllowed && (
        <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-3">
            <AnimatePresence>
              {showEdit && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-emerald-500/10 border border-emerald-500/50 backdrop-blur-xl px-4 py-2 rounded-2xl mb-2"
                >
                  <p className="text-emerald-400 text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                    <FaCheck /> Modo editor activo
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <button 
                onClick={() => setShowEdit(!showEdit)}
                className={`group px-6 py-4 rounded-full border backdrop-blur-md transition-all flex items-center gap-3 shadow-2xl ${showEdit ? "bg-indigo-600 border-indigo-400 text-white" : "bg-white/5 border-white/10 text-zinc-400 hover:border-indigo-500/50"}`}
            >
                <FaTools className={`transition-transform duration-500 ${showEdit ? "rotate-180" : ""}`} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                    {showEdit ? "Finalizar Cambios" : "Configurar Página"}
                </span>
            </button>
        </div>
      )}

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        <div className="flex flex-col gap-40 mt-20">
          
         
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <EditableSection name="origen" value={data.origen}>
                <motion.div {...fadeInScroll}>
                  <HistoryCard icon={<FaHistory />} title="Nuestro Origen" content={data?.origen} category="Génesis" />
                </motion.div>
             </EditableSection>

             <EditableSection name="historia" value={data.historia}>
                <motion.div {...fadeInScroll} transition={{ delay: 0.2 }}>
                  <HistoryCard icon={<FaChurch />} title="Nuestra Trayectoria" content={data?.historia} category="Legado" />
                </motion.div>
             </EditableSection>
          </section>

          
          <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
             <EditableSection name="mision" value={data.mision} className="md:col-span-7">
                <motion.div {...fadeInScroll}>
                  <div className="p-12 rounded-[3rem] bg-indigo-600/10 border border-indigo-500/30 backdrop-blur-md">
                      <h2 className="text-4xl font-serif italic text-white mb-6">Misión</h2>
                      <p className="text-xl text-zinc-300 leading-relaxed font-light">{data?.mision}</p>
                  </div>
                </motion.div>
             </EditableSection>

             <EditableSection name="vision" value={data.vision} className="md:col-span-5">
                <motion.div {...fadeInScroll} transition={{ delay: 0.3 }}>
                  <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-sm text-center">
                      <FaEye className="text-indigo-500 mx-auto mb-6 text-2xl" />
                      <h2 className="text-2xl font-light text-white uppercase mb-4 tracking-tighter">Visión</h2>
                      <p className="text-lg text-zinc-400 leading-relaxed font-light">{data?.vision}</p>
                  </div>
                </motion.div>
             </EditableSection>
          </section>

          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <EditableSection name="doctrina" value={data.doctrina}>
                <motion.div {...fadeInScroll}>
                  <div className="p-12 rounded-[3rem] bg-white/[0.03] border border-white/10 h-full">
                      <FaBook className="text-indigo-400 mb-8 text-3xl" />
                      <h2 className="text-3xl font-light text-white mb-6 tracking-tight">Doctrina</h2>
                      <p className="text-zinc-400 leading-relaxed text-lg font-light">{data?.doctrina}</p>
                  </div>
                </motion.div>
             </EditableSection>

             <EditableSection name="valores" value={data.valores}>
                <motion.div {...fadeInScroll} transition={{ delay: 0.2 }}>
                  <div className="p-12 rounded-[3rem] bg-white/[0.03] border border-white/10 h-full">
                      <FaHeart className="text-red-400/70 mb-8 text-3xl" />
                      <h2 className="text-3xl font-light text-white mb-6 tracking-tight">Valores</h2>
                      <p className="text-zinc-400 leading-relaxed text-lg font-light">{data?.valores}</p>
                  </div>
                </motion.div>
             </EditableSection>
          </section>

          
          <EditableSection name="equipo_pastoral" value={data.equipo_pastoral}>
            <motion.section {...fadeInScroll}>
              <div className="p-16 rounded-[4rem] border border-dashed border-white/10 text-center bg-white/[0.01]">
                  <FaUsers className="mx-auto text-4xl text-zinc-700 mb-6" />
                  <p className="text-3xl font-light text-zinc-400 max-w-3xl mx-auto leading-relaxed font-serif italic">
                      {data?.equipo_pastoral}
                  </p>
              </div>
            </motion.section>
          </EditableSection>
        </div>
      </main>

      {formOpen && (
        <AboutForm 
          setFormulario={setFormOpen}
          name={campoNombre} 
          dato={campoValor} 
          refresh={refresh} 
        />
      )}
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
            <p className="text-zinc-500 leading-relaxed font-light group-hover:text-zinc-400 transition-colors whitespace-pre-wrap">
                {content}
            </p>
        </div>
    );
}