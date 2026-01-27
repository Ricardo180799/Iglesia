"use client";
import { useState } from "react";
import { ChangeStatus } from "../../Service/Service";

export default function Form({ Status, ID, setShow,setActive }) {
  const [status, setStatus] = useState(Status);
  const availableStatus = ["Pending", "Approved", "Rejected"];

  const handleActualizarEstado = async () => {
    try {
      await ChangeStatus(ID, status);
      setActive(true)
      setShow(false);
      
    } catch (err) {
      console.error("Error al actualizar:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Fondo oscuro con desenfoque para cerrar al hacer clic fuera */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setShow(false)}
      />

      {/* Contenedor del Formulario */}
      <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-zinc-800 bg-zinc-900/50">
          <h3 className="text-lg font-bold text-white">Actualizar Estado</h3>
          <p className="text-xs text-zinc-500 mt-1">ID del Testimonio: {ID}</p>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-zinc-400 font-medium mb-2">Seleccione el nuevo estado:</p>
          
          <div className="space-y-2">
            {availableStatus.map((e) => (
              <label 
                key={e} 
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  status === e 
                    ? "bg-blue-600/10 border-blue-500 text-blue-400" 
                    : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700"
                }`}
              >
                <span className="text-sm font-semibold">{e}</span>
                <input
                  type="radio" // Usamos radio en lugar de checkbox porque solo puede haber un estado
                  name="status-group"
                  className="w-4 h-4 accent-blue-500 cursor-pointer"
                  checked={status === e}
                  onChange={() => setStatus(e)}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="p-4 bg-zinc-900/50 border-t border-zinc-800 flex gap-3">
          <button 
            onClick={() => setShow(false)}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-bold text-zinc-400 hover:bg-zinc-800 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleActualizarEstado}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-bold bg-zinc-100 text-black hover:bg-white transition-all shadow-lg active:scale-95"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}