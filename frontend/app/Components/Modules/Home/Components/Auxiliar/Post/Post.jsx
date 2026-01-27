"use client";
import { useMostrar } from "../../../Hooks/AllPost";
import Link from "next/link";
import { FaUserCircle, FaArrowLeft, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import { addPost, updatePost, deletePost } from "./PostService/PostService"; 
import PostForm from "./PostForm";

export default function PostsPage() {
  const { loading, error, info, refresh } = useMostrar();
  const [dato, setDato] = useState(null);
  const [functions, setFunctions] = useState(null);
  const [showManage, setShowManage] = useState(false); 
  const [formOpen, setFormOpen] = useState(false); 

  const Rol = useSelector((state) => state.token.Rol);
  const allowedRols = ["Pastor", "Dev", "Admin"];
  const isAllowed = Array.isArray(Rol) && Rol.some((r) => allowedRols.includes(r));

  const handleAdd = () => {
    setFunctions(() => addPost);
    setDato(null);
    setFormOpen(true);
  };

  const handleUpdate = (post) => {
    setFunctions(() => updatePost); 
    setDato(post);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar esta reflexión permanentemente?")) {
      try {
        await deletePost(id);
        refresh();
      } catch (err) {
        alert("Error al eliminar");
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] animate-pulse">Sincronizando reflexiones...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 pb-32 pt-20">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="flex justify-between items-center mb-16">
          <Link href="/" className="group inline-flex items-center gap-2 text-zinc-600 hover:text-indigo-400 transition-colors text-[10px] font-bold uppercase tracking-[0.4em]">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Volver
          </Link>

          {isAllowed && (
            <button onClick={() => setShowManage(!showManage)} className="group flex items-center gap-3">
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${showManage ? "text-red-400" : "text-indigo-400 group-hover:text-white"}`}>
                {showManage ? "Cerrar Panel" : "Gestionar"}
              </span>
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${showManage ? "border-red-500/50 rotate-45" : "border-indigo-500/20 group-hover:border-indigo-400"}`}>
                <span className="text-lg font-light">+</span>
              </div>
            </button>
          )}
        </div>

        <header className="mb-32">
          <h1 className="text-6xl md:text-8xl font-light text-white tracking-tighter mb-8 leading-[0.85]">
            Reflexiones <br />
            <span className="font-serif italic text-indigo-500">y Mensajes</span>
          </h1>
        </header>

        <div className="flex flex-col gap-12">
          {info.map((post) => (
            <article key={post.ID} className="group relative p-8 md:p-12 rounded-[2.5rem] bg-white/[0.01] border border-white/[0.02] hover:bg-white/[0.02] transition-all duration-700">
              <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
                <div className="w-full md:w-40 flex-shrink-0 pt-2">
                  <span className="block text-indigo-500/50 text-[9px] font-black uppercase tracking-[0.4em] mb-4">Reflexión</span>
                  <div className="flex items-center gap-3 text-zinc-400 group-hover:text-indigo-400 transition-colors">
                    <FaUserCircle size={14} className="opacity-40" />
                    <p className="font-serif italic text-lg">Autor ID: {post.Created_by}</p>
                  </div>
                
                  {showManage && (
                    <div className="mt-8 flex flex-col gap-2">
                      <button onClick={() => handleUpdate(post)} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                        <FaEdit /> Editar
                      </button>
                      <button onClick={() => handleDelete(post.ID)} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-red-900 hover:text-red-500 transition-colors">
                        <FaTrash /> Eliminar
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-8">
                  <h2 className="text-3xl md:text-4xl font-light text-zinc-200 tracking-tighter group-hover:text-white transition-colors">{post.Title}</h2>
                  {post.Visual && (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.03] bg-[#080808]">
                      <img src={post.Visual} alt={post.Title} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-1000" />
                    </div>
                  )}
                  <p className="text-zinc-500 text-base md:text-lg leading-relaxed font-light line-clamp-4">{post.Content}</p>
                </div>
              </div>
            </article>
          ))}

          {/* OPCIÓN DE AÑADIR AL FINAL */}
          {showManage && (
            <div onClick={handleAdd} className="group border-2 border-dashed border-white/5 rounded-[2.5rem] p-12 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500/30 hover:bg-indigo-500/[0.01] transition-all">
              <FaPlus className="text-indigo-500/40 group-hover:text-indigo-500 mb-4 transition-colors" size={30} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-indigo-400 transition-colors">Redactar Nueva Entrada</span>
            </div>
          )}
        </div>

        {formOpen && (
          <PostForm 
            setFormulario={setFormOpen}
            functions={functions}
            dato={dato}
            refresh={refresh}
          />
        )}
      </div>
    </div>
  );
}