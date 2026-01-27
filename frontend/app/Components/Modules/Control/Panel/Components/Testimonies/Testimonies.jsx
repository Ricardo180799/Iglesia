"use client";
import { useTestimonies } from "../../Hooks/TestimoniesHook";
import { useState } from "react";
import { deleteTestimonies } from "../../Service/Service"
import Form from "./StatusForm"

export default function TestimoniosDashboard() {
  const { info, loading, error, refresh } = useTestimonies();
 const[active,setActive] =useState(false)
  const [show,setShow] =useState(false)
   const [ID,setID] =useState("")
   const [status,setStatus] = useState("")
  
  const [verTexto, setVerTexto] = useState(null);

  const handleEliminar = async(ID) => {
    await deleteTestimonies(ID); refresh()

  };
  
  if(active){refresh();setActive(false)}
 
  const getStatusBadge = (status) => {
    const styles = {
      Approved: "bg-green-500/10 text-green-400 border-green-500/20",
      Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
    };
    return styles[status] || "bg-zinc-800 text-zinc-400";
  };

  if (loading) return <div className="p-8 text-zinc-400 animate-pulse">Cargando...</div>;

  return (
    <div className="relative w-full min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <h1 className="text-2xl font-bold mb-8 text-white">Gestión de Testimonios</h1>
       
            
          {show && <Form Status={status} ID={ID} setShow={setShow} setActive={setActive}/> }

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {info?.map((item) => (
          <div key={item.ID} className="flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all shadow-lg">
           
            
            {/* Cabecera Visual */}
            <div className="h-48 w-full bg-zinc-950 relative overflow-hidden group">
                
              {item.Type === "Article" ? (
                <img src={item.Thumbnail || "/api/placeholder/400/320"} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                  <span className="text-xs font-mono border border-zinc-700 px-3 py-1 rounded-full">🎥 VIDEO</span>
                </div>
              )}
              <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md text-[10px] uppercase font-bold rounded">
                {item.Type}
              </div>
            </div>

            {/* Contenido */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg leading-tight line-clamp-2">{item.Title}</h3>
                <span className={`px-2 py-0.5 text-[10px] uppercase font-bold border rounded-full ${getStatusBadge(item.Status)}`}>
                  {item.Status}
                </span>
              </div>

              <p className="text-xs text-blue-400 mb-4 font-medium">Por: {item.Author}</p>

              <div className="space-y-3 mb-6 flex-1">
                <div>
                  <p className="text-xs text-zinc-500 font-semibold uppercase mb-1">Resumen:</p>
                  <p className="text-sm text-zinc-300 line-clamp-3">{item.Content}</p>
                </div>

                {/* SECCIÓN MODIFICADA: EXTRACTO + BOTÓN VER COMPLETO */}
                {item.Type === "Article" && item.Text && (
                  <div className="pt-2 border-t border-zinc-800">
                    <p className="text-xs text-zinc-500 font-semibold uppercase mb-1">Extracto:</p>
                    <p className="text-xs text-zinc-400 line-clamp-2 italic mb-2">"{item.Text}"</p>
                    <button 
                      onClick={() => setVerTexto(item)} // Guardamos todo el objeto en el estado
                      className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 transition-colors"
                    >
                      Ver Completo 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                )}
                
                {item.Type === "Video" && (
                  <div className="pt-2 border-t border-zinc-800">
                    <p className="text-xs text-zinc-500 font-semibold uppercase mb-1">URL:</p>
                    <a href={item.Video_Url} target="_blank" className="text-xs text-blue-500 truncate block">{item.Video_Url}</a>
                  </div>
                )}
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 mt-auto">
                <button onClick={() =>{setShow(true); setStatus(item.Status);setID(item.ID)} } className="flex-1 bg-zinc-100 text-black py-2 rounded-lg text-xs font-bold hover:bg-white">Cambiar Estado</button>
                <button onClick={() => handleEliminar(item.ID)} className="flex-1 border border-red-900/30 text-red-400 py-2 rounded-lg text-xs font-bold hover:bg-red-950/30">Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL ABSOLUTO PARA EL TEXTO COMPLETO */}
      {verTexto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Fondo desenfocado */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setVerTexto(null)} // Cerrar al hacer click fuera
          />
          
          {/* Contenedor del Texto */}
          <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in duration-200">
            
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
              <div>
                <h2 className="text-xl font-bold text-white leading-tight">{verTexto.Title}</h2>
                <p className="text-xs text-blue-400 mt-1">Autor: {verTexto.Author}</p>
              </div>
              <button 
                onClick={() => setVerTexto(null)}
                className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

           
            <div className="p-8 overflow-y-auto custom-scrollbar">
               <div className="mb-6 bg-zinc-950 p-4 rounded-lg border border-zinc-800/50">
                  <p className="text-xs text-zinc-500 font-bold uppercase mb-2">Resumen inicial:</p>
                  <p className="text-sm text-zinc-400 italic">{verTexto.Content}</p>
               </div>
               
               <p className="text-xs text-zinc-500 font-bold uppercase mb-4">Contenido Completo del Artículo:</p>
               <div className="text-zinc-200 leading-relaxed whitespace-pre-wrap text-base">
                 {verTexto.Text}
               </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-zinc-900/50 border-t border-zinc-800 text-center">
              <button 
                onClick={() => setVerTexto(null)}
                className="px-6 py-2 bg-zinc-100 text-black text-sm font-bold rounded-full hover:bg-white transition-all shadow-lg"
              >
                Cerrar Lectura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}