"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useMissionsById } from "../../Hooks/especificMissionsHooks";
import MissionPosts from "./data2";
import { DeletePostmissions, UpdatePostmissions, AddPostmissions } from "../../../Service/Service";
import PostMissionForm from "./especificForm";
import { useSelector } from "react-redux";
import { FaChevronLeft, FaPlus, FaPenNib, FaShieldAlt, FaQuoteLeft } from "react-icons/fa";

export default function MissionPage({ ID }) {
  const Rol = useSelector((state) => state.token.Rol) || ["Desconocido"];
  const { info2, loading, error, refresh } = useMissionsById(ID);
  
  const [act, setAct] = useState(false);
  const [onClose, setOnclose] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [messageEditMode, setMessageEditMode] = useState(false);
  const [dato, setDato] = useState(null);
  const [functions, setFunctions] = useState(null);

  const allowed = ["Pastor", "Misionero", "Admin", "Dev"];
  const paso = Rol.some((e) => allowed.includes(e));

  useEffect(() => {
    if (act) {
      refresh();
      setAct(false);
    }
  }, [act, refresh]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* DECORACIÓN DE FONDO */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-[40%] -right-[10%] w-[30%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-24">
        
        {/* NAVEGACIÓN SUPERIOR */}
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-32">
          <Link
            href="/Missions"
            className="group flex items-center gap-4 text-zinc-500 hover:text-white transition-all duration-500"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/5 transition-all">
              <FaChevronLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Regresar</span>
              <span className="text-xs font-serif italic text-zinc-600 group-hover:text-indigo-400 transition-colors">Explorar otras misiones</span>
            </div>
          </Link>

          <div className="flex flex-col items-end">
            <button
              onClick={() => {
                if (paso) {
                  setEditMode(!editMode);
                  setMessageEditMode(false);
                } else {
                  setMessageEditMode("Acceso restringido a responsables");
                  setTimeout(() => setMessageEditMode(false), 3000);
                }
              }}
              className={`group flex items-center gap-4 px-6 py-3 rounded-full border transition-all duration-500 ${
                editMode 
                ? "border-red-500/50 bg-red-500/5 text-red-400" 
                : "border-white/5 bg-white/[0.02] text-zinc-500 hover:border-indigo-500/40 hover:text-white"
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                {editMode ? "Cerrar Edición" : "Modo Corresponsal"}
              </span>
              <FaShieldAlt className={`text-sm ${editMode ? "animate-pulse" : "opacity-30 group-hover:opacity-100"}`} />
            </button>
            {messageEditMode && (
              <span className="text-[9px] text-red-500/60 mt-2 font-bold uppercase tracking-widest animate-bounce">
                {messageEditMode}
              </span>
            )}
          </div>
        </nav>

        {/* HEADER DE LA BITÁCORA */}
        <header className="mb-40 relative">
          <div className="absolute -left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 to-transparent opacity-50"></div>
          <div className="pl-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-indigo-500/50"></div>
              <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.5em]">
                Crónicas de Campo
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-light text-white tracking-tighter leading-[0.85] mb-10">
              Diario de <br />
              <span className="font-serif italic text-indigo-400">Victorias</span>
            </h1>
            <p className="max-w-xl text-zinc-500 text-lg font-light leading-relaxed italic">
              "Cada palabra escrita es un testimonio del alcance de Su gracia en lugares donde la esperanza está floreciendo."
            </p>
          </div>
        </header>

        {/* LISTADO DE POSTS */}
        <div className="relative pl-0 md:pl-16">
          <div className="absolute left-0 md:left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent"></div>
          
          <div className="flex flex-col gap-40"> 
            <div className="flex items-center gap-6 mb-4">
               <FaQuoteLeft className="text-indigo-500/20 text-4xl" />
               <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">
                 Registros Históricos
               </h2>
            </div>

            <MissionPosts 
              DeletePostmissions={DeletePostmissions} 
              UpdatePostmissions={UpdatePostmissions} 
              posts={info2} 
              setAct={setAct} 
              editMode={editMode} 
              setOnclose={setOnclose} 
              setDato={setDato}
              setFunctions={setFunctions}
            />

            {/* ===== ÁREA DE PUBLICACIÓN (AHORA AL FINAL DE LA LISTA) ===== */}
            {editMode && (
              <div 
                onClick={() => { setFunctions(() => AddPostmissions); setOnclose(true); setDato(null); }}
                className="group p-12 border-2 border-dashed border-indigo-500/20 rounded-[3rem] cursor-pointer hover:bg-indigo-500/[0.03] hover:border-indigo-500/50 transition-all duration-700 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-500">
                  <FaPlus className="text-indigo-400 text-xl" />
                </div>
                <h3 className="text-white font-serif italic text-xl mb-2">Redactar Nueva Entrada</h3>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-indigo-300 transition-colors">
                  Añadir testimonio al final de la bitácora
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FORMULARIO MODAL (FUERA DEL FLUJO PARA NO ROMPER EL LAYOUT) */}
        {onClose && (
          <PostMissionForm 
            dato={dato} 
            functions={functions} 
            setOnclose={setOnclose} 
            setAct={setAct} 
            missionIdFromProps={ID} 
          />
        )}

        {/* MENSAJE VACÍO */}
        {(!info2 || info2.length === 0) && !editMode && (
          <div className="mt-20 text-center py-40 border-t border-white/5">
             <div className="inline-block p-6 rounded-full bg-white/[0.02] border border-white/5 mb-8">
                <FaPenNib className="text-zinc-800 text-3xl" />
             </div>
            <p className="font-serif italic text-3xl text-zinc-700 max-w-sm mx-auto leading-tight">
              Aún no se han redactado crónicas para esta misión.
            </p>
          </div>
        )}

        {/* FOOTER */}
        <footer className="mt-60 flex justify-center">
            <Link href="/Missions" className="group flex flex-col items-center gap-6">
                <div className="w-[1px] h-20 bg-gradient-to-b from-indigo-500 to-transparent group-hover:h-32 transition-all duration-700"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-white transition-colors">Volver a los campos</span>
            </Link>
        </footer>
      </div>
    </div>
  );
}