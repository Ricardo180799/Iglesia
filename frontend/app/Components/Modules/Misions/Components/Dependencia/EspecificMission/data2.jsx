"use client";

import PostMissionForm from "./especificForm";
import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export default function MissionPosts({ posts, editMode, DeletePostmissions, UpdatePostmissions, setAct }) {
  const [formu, setFormu] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleDelete = async (ID) => {
    if (window.confirm("¿Deseas eliminar esta crónica permanentemente?")) {
      try {
        await DeletePostmissions(ID);
        setAct(true);
      } catch (err) {
        console.error("Error al eliminar:", err);
      }
    }
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setFormu(true);
  };

  return (
    <div className="flex flex-col gap-32">
      {posts?.map((post, index) => (
        <article key={post.ID || index} className="group relative border-b border-white/[0.05] pb-32 last:border-0">
          
          <div className="max-w-3xl mx-auto w-full px-4">
            
            {/* CABECERA LIMPIA */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                <span className="text-indigo-500">#</span> {String(index + 1).padStart(2, '0')}
                <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
                <span>{post.Created_by || "Corresponsal"}</span>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-light text-white tracking-tighter leading-tight">
                {post.Title}
              </h3>
            </header>

            {/* CUERPO DE TEXTO UNIFORME SIN IMÁGENES */}
            <div className="relative">
              <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed whitespace-pre-line">
                {post.Content}
              </p>
            </div>

            {/* PANEL DE CONTROL */}
            {editMode && (
              <div className="flex gap-6 mt-12 pt-8 border-t border-white/[0.05]">
                <button
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-indigo-400 transition-colors"
                  onClick={() => handleEdit(post)}
                >
                  <FaRegEdit /> Editar
                </button>

                <button
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-red-400 transition-colors"
                  onClick={() => handleDelete(post.ID)}
                >
                  <FaRegTrashAlt /> Eliminar
                </button>
              </div>
            )}
          </div>

          {formu && selectedPost?.ID === post.ID && (
            <PostMissionForm
              dato={selectedPost}
              functions={UpdatePostmissions}
              setAct={setAct}
              setOnclose={() => {
                setFormu(false);
                setSelectedPost(null);
              }}
            />
          )}
        </article>
      ))}
    </div>
  );
}