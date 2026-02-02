"use client";
import { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import { updateAbout } from "../../../Servicios/homeService"
export default function AboutForm({ setFormulario, name, dato, refresh }) {
  // 'content' almacenará lo que el usuario teclee
  const [content, setContent] = useState(dato || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      
      await updateAbout(name, content);
      
      refresh(); // Refresca la información en la pantalla principal
      setFormulario(false); // Cierra el modal
    } catch (err) {
      setError("No se pudo actualizar la información. Intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm px-6">
      <div className="w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 shadow-2xl">
        
        {/* Encabezado dinámico según el 'name' */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-400">
            Actualizar {name.replace(/_/g, " ")}
          </h2>
          <button onClick={() => setFormulario(false)} className="text-zinc-600 hover:text-white transition-colors">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full min-h-[200px] bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-zinc-300 focus:outline-none focus:border-indigo-500/50 transition-all resize-none mb-6 font-light leading-relaxed"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Escribe el nuevo contenido para ${name}...`}
            required
          />

          {error && <p className="text-red-400 text-xs uppercase tracking-widest mb-4 text-center">{error}</p>}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setFormulario(false)}
              className="flex-1 px-6 py-3 rounded-xl border border-white/5 text-zinc-500 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FaSave /> {loading ? "Guardando..." : "Confirmar Cambio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}