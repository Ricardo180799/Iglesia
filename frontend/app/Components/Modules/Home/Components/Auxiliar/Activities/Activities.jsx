"use client";
import { useUsers } from "../../../Hooks/useActivities"; 
import { FaCalendarAlt, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import { deleteActivities, updateActivities, addActivities } from "../../../Servicios/activitiesService";
import ActivityForm from "./ActivitiesForm";

export default function ActivitiesList() {
  const { info, loading, error, refresh } = useUsers();

  // Estados de Gestión
  const [dato, setDato] = useState(null);
  const [functions, setFunctions] = useState(null);
  const [show, setShow] = useState(false); 
  const [form, setForm] = useState(false); 
  const [message, setMessage] = useState(""); 

  const Rol = useSelector((state) => state.token.Rol);
  const allowedRols = ["Pastor", "Dev", "Admin"];
  const isAllowed = Array.isArray(Rol) && Rol.some((r) => allowedRols.includes(r));

  const handleAdd = () => {
    setFunctions(() => addActivities);
    setDato(null);
    setMessage("");
    setForm(true);
  };

  const handleUpdate = (activity) => {
    setFunctions(() => updateActivities); 
    setDato(activity);
    setMessage("");
    setForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta actividad?")) {
      try {
        await deleteActivities(id);
        refresh(); // Refrescar la lista tras borrar
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar la actividad");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Fecha no definida";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 bg-red-500/10 border border-red-500/20 rounded-[2.5rem]">
        <p className="text-red-400 font-bold uppercase tracking-widest text-xs">Error al cargar actividades</p>
        <button onClick={refresh} className="mt-4 text-zinc-400 underline text-sm hover:text-white transition-colors"> Reintentar </button>
      </div>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* HEADER */}
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter leading-tight">
            Próximas <span className="font-serif italic text-indigo-400">Actividades</span>
          </h2>
        </div>

        {isAllowed && (
          <button 
            onClick={() => setShow(!show)} 
            className="group flex items-center gap-3 self-start md:self-auto"
          >
            <div className="flex flex-col items-end">
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${show ? "text-red-400" : "text-indigo-400 group-hover:text-white"}`}>
                {show ? "Cerrar Gestión" : "Gestionar Actividades"}
              </span>
              <div className={`h-[1px] w-12 mt-1 transition-all duration-500 ${show ? "bg-red-500 w-full" : "bg-indigo-500/40 group-hover:w-full group-hover:bg-indigo-400"}`}></div>
            </div>
            
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${show ? "border-red-500/50 rotate-45" : "border-indigo-500/20 group-hover:border-indigo-400"}`}>
              <span className={`text-lg font-light ${show ? "text-red-400" : "text-indigo-400 group-hover:text-white"}`}>+</span>
            </div>
          </button>
        )}
      </header>
      
      {/* GRID DE ACTIVIDADES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* MAPEO DE ACTIVIDADES */}
        {info?.map((activity, index) => (
          <article 
            key={index}
            className="group relative bg-[#0d0d0d] border border-white/[0.08] rounded-[2rem] overflow-hidden hover:border-indigo-500/40 transition-all duration-500 shadow-2xl flex flex-col h-full"
          >
            {/* Visualización (Imagen o Fallback) */}
            {activity.Visual || activity.Image ? (
              <div className="h-56 w-full overflow-hidden relative">
                <img 
                  src={activity.Visual || activity.Image} 
                  alt={activity.Title} 
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
              </div>
            ) : (
              <div className="h-56 w-full bg-white/[0.02] flex items-center justify-center">
                <span className="text-zinc-700 font-serif italic text-4xl uppercase tracking-tighter">Evento</span>
              </div>
            )}

            <div className="p-8 flex-grow">
              <div className="flex items-center gap-2 mb-4">
                <FaCalendarAlt className="text-indigo-400 text-xs" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  {formatDate(activity.Activity_Date)}
                </span>
              </div>

              <h3 className="text-2xl font-light text-zinc-100 mb-4 tracking-tight group-hover:text-indigo-300 transition-colors">
                {activity.Title}
              </h3>

              <p className="text-zinc-400 font-light leading-relaxed text-sm line-clamp-3">
                {activity.Text}
              </p>
            </div>

            {/* BOTONES DE GESTIÓN */}
            {show && (
              <div className="px-8 pb-8 pt-0 flex gap-4 mt-auto">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleUpdate(activity); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.05] hover:bg-indigo-500 hover:text-white transition-all text-xs uppercase tracking-wider font-bold text-zinc-300"
                >
                  <FaEdit /> Editar
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDelete(activity.ID); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.05] hover:bg-red-500 hover:text-white transition-all text-xs uppercase tracking-wider font-bold text-zinc-300"
                >
                  <FaTrash /> Borrar
                </button>
              </div>
            )}
            
            {!show && <div className="h-6"></div>}
          </article>
        ))}

        {/* BOTÓN AÑADIR (Integrado como tarjeta en el grid) */}
        {show && (
          <div 
            onClick={handleAdd}
            className="group relative flex flex-col items-center justify-center h-full min-h-[400px] bg-indigo-500/[0.02] border-2 border-dashed border-indigo-500/20 rounded-[2rem] cursor-pointer hover:bg-indigo-500/[0.05] hover:border-indigo-500/50 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-500">
              <FaPlus className="text-indigo-400 text-2xl" />
            </div>
            <div className="text-center">
              <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300/60 group-hover:text-indigo-300 transition-colors">
                Nueva Actividad
              </span>
            </div>
          </div>
        )}
      </div>

      {/* MODAL FORMULARIO */}
      {form && (
        <ActivityForm 
          setFormulario={setForm}
          functions={functions}
          dato={dato}
          refresh={refresh}
          message={message}
          setMessage={setMessage}
        />
      )}
    </section>
  );
}