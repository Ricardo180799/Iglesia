"use client";
import { updateHome } from "../../Service/Service"
import { useUsers } from "../../Hooks/HomeConfigureHook"; 
import { useState, useEffect } from "react";

export default function ConfigHome() {
  const { info, loading, error, refresh } = useUsers();
  const [message, setMessage] = useState("");
  
  // Estados para el Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingField, setEditingField] = useState({ campo: "", valor: "" });
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Función para abrir el modal
  const openModal = (campo, valor) => {
    setEditingField({ campo, valor });
    setNewValue(valor || "");
    setIsModalOpen(true);
  };

  const handleConfirmar = async () => {
    try {
      
      const response = await updateHome(editingField.campo, newValue);
      setMessage(response || "Actualizado con éxito");
      setIsModalOpen(false);
      refresh();
    } catch (err) {
      setMessage("No se ha podido actualizar");
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-zinc-400 animate-pulse">Cargando configuración...</div>;
  if (error) return <div className="p-8 text-red-400">Error al cargar la configuración.</div>;

  const infoArray = info 
    ? Object.entries(info)
        .filter(([key]) => key !== "ID") 
        .map(([key, value]) => ({ campo: key, valor: value }))
    : [];

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 p-6 relative">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">Configuración</h1>
        </header>

        {message && (
          <div className={`mb-6 p-4 rounded-xl border ${message.includes("No") ? "bg-red-500/10 border-red-500/50 text-red-400" : "bg-green-500/10 border-green-500/50 text-green-400"}`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          {infoArray.map((e, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="flex-1 pr-4">
                <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">{e.campo}</p>
                <p className="text-zinc-200 text-sm">{e.valor || <span className="text-zinc-700 italic">Vacío</span>}</p>
              </div>
              <button
                onClick={() => openModal(e.campo, e.valor)}
                className="mt-3 sm:mt-0 px-4 py-2 bg-zinc-800 text-zinc-300 text-xs rounded-lg hover:bg-zinc-100 hover:text-black transition-all"
              >
                Actualizar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Editar Campo</h2>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-6">{editingField.campo}</p>

            <div className="mb-8">
              <label className="block text-zinc-400 text-xs mb-2">Nuevo Valor</label>
              <input
                autoFocus
                type={typeof editingField.valor === 'number' ? 'number' : 'text'}
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:border-zinc-500 transition-colors"
                placeholder="Escribe el nuevo contenido..."
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 text-sm font-bold text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                CANCELAR
              </button>
              <button
                onClick={()=>handleConfirmar()}
                className="flex-1 py-3 bg-zinc-100 text-black text-sm font-bold rounded-xl hover:bg-white transition-all shadow-lg"
              >
                CONFIRMAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}