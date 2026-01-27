"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMissions } from "../Hooks/MisionsHooks";
import { useSelector } from "react-redux";
import ProjectForm from "./FormMissions";
import { addMisions, updateMisions, deleteMissions } from "../../Service/Service";
import { FaMapMarkerAlt, FaEdit, FaTrash, FaPlus, FaArrowRight, FaUserAlt, FaUsers, FaCalendarAlt } from "react-icons/fa";

export default function MissionsGrid() {
  const [formulario, setFormulario] = useState(false);
  const [dato, setDato] = useState(null);
  const [functions, setFunctions] = useState(null);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  const Rol = useSelector((state) => state.token.Rol) || "";
  const rolesPermitidos = ["Pastor", "Administrador", "Misionero"];
  const paso = rolesPermitidos.some((r) => Rol.includes(r));

  const { info, loading, error, refresh } = useMissions();

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  const headerData = info && info.length > 0 ? info[0] : null;
  const missionsList = info && info.length > 1 ? info.slice(1) : [];

  const formatDate = (date) => {
    if (!date) return "Pendiente";
    return new Date(date).toLocaleDateString("es-ES", { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-20 selection:bg-indigo-500/30">
      
     
      {headerData && (
        <header className="mb-32 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-2xl">
            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.5em] block mb-4">Nuestra Labor Global</span>
            <h1 className="text-6xl md:text-8xl font-light text-white tracking-tighter leading-[0.85] mb-8">
              {headerData.Name.split(' ')[0]} <br />
              <span className="font-serif italic text-indigo-400">{headerData.Name.split(' ').slice(1).join(' ') || "Misión"}</span>
            </h1>
            <p className="text-zinc-400 text-xl font-light leading-relaxed border-l-2 border-indigo-500/40 pl-8">
              {headerData.Description || headerData.Locations}
            </p>
          </div>

          {paso && (
            <button onClick={() => setEditMode(!editMode)} className="group flex items-center gap-4 text-zinc-500 hover:text-white transition-all">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">{editMode ? "Cerrar" : "Gestionar"}</span>
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${editMode ? 'border-red-500/50 rotate-45 text-red-400' : 'border-white/20 group-hover:border-indigo-500 text-indigo-400'}`}>
                <FaPlus />
              </div>
            </button>
          )}
        </header>
      )}

     
      <div className="flex flex-col gap-16">
        
        {editMode && (
          <div onClick={() => { setDato(null); setFormulario(true); setFunctions(() => addMisions); }}
            className="group border-2 border-dashed border-indigo-500/40 rounded-[3rem] p-16 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-500/5 transition-all">
            <FaPlus className="text-indigo-400 text-3xl mb-4 group-hover:scale-125 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-300">Nueva Ficha de Misión</span>
          </div>
        )}

        {missionsList.map((mission) => (
          <article key={mission.ID} className="group relative bg-zinc-900/40 border-2 border-white/10 rounded-[3.5rem] overflow-hidden hover:border-indigo-500/50 transition-all duration-500">
            
            <div className="flex flex-col lg:flex-row">
             
              <div className="relative w-full lg:w-[40%] h-80 lg:h-auto overflow-hidden">
                {mission.Imagens ? (
                  <Image src={mission.Imagens} alt={mission.Name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center font-serif italic text-zinc-600 text-2xl">Sin Imagen</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-transparent to-transparent hidden lg:block"></div>
              </div>

             
              <div className="flex-1 p-10 lg:p-14 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1 rounded-full border border-indigo-500/30 text-[10px] font-black uppercase tracking-widest text-indigo-400">Activa</span>
                    <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                      <FaMapMarkerAlt /> {mission.Locations}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-light text-white tracking-tighter mb-6 group-hover:text-indigo-300 transition-colors">
                    {mission.Name}
                  </h3>

                  <p className="text-zinc-400 font-light leading-relaxed text-lg mb-10 line-clamp-3">
                    {mission.Description || "Sin descripción detallada disponible actualmente para este campo misionero."}
                  </p>

                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 border-y border-white/5">
                    <DataPoint icon={<FaUserAlt />} label="Responsable" value={mission.Manager || "No asignado"} />
                    <DataPoint icon={<FaUsers />} label="Miembros" value={mission.Members || "0"} />
                    <DataPoint icon={<FaCalendarAlt />} label="Inicio" value={formatDate(mission.Start_Date)} />
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                  <Link href={`/EspecificMissions/${mission.ID}`} className="group/link flex items-center gap-4 text-white font-medium tracking-tight">
                    Ver bitácora completa <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-black transition-all"><FaArrowRight /></div>
                  </Link>

                  {editMode && (
                    <div className="flex gap-3">
                      <button onClick={() => { setDato(mission); setFormulario(true); setFunctions(() => updateMisions); }} className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all"><FaEdit /></button>
                      <button onClick={async () => { if(confirm("¿Eliminar ficha?")) { await deleteMissions(mission.ID); refresh(); } }} className="p-4 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"><FaTrash /></button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {formulario && (
        <ProjectForm functions={functions} dato={dato} setFormulario={setFormulario} refresh={refresh} message={message} setMessage={setMessage} />
      )}
    </section>
  );
}


function DataPoint({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-indigo-400/60 text-xs uppercase tracking-widest font-bold">
        {icon} <span>{label}</span>
      </div>
      <span className="text-zinc-200 font-light text-base">{value}</span>
    </div>
  );
}