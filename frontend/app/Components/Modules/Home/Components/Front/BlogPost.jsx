"use client";

import { Card } from "../../../../UI/Card";
import { CardContent } from "../../../../UI/CardContainer";
import Image from "next/image";
import { formatDate } from "../../../../Utils/Formatdate";
import { FaUserCircle, FaClock } from "react-icons/fa";

export default function BlogPosts({ posts = [] }) {
  if (!posts.length) return null;

  return (
    <section className="my-32 px-6 max-w-7xl mx-auto">
      {/* Encabezado de Sección */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-xl text-center md:text-left mx-auto md:mx-0">
          <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
            Palabra & Vida
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Últimas <span className="text-zinc-500">Publicaciones</span>
          </h2>
        </div>
        <div className="hidden md:block h-px flex-1 bg-zinc-800 mx-10 mb-4"></div>
      </div>

      {/* CONTENEDOR CENTRADO DINÁMICO */}
      <div className="flex flex-wrap justify-center gap-10">
        {posts.map((post, index) => (
          <Card 
            key={index} 
            className="group flex flex-col bg-zinc-900/40 border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 shadow-xl w-full sm:w-[calc(50%-2.5rem)] lg:w-[calc(33.333%-2.5rem)] max-w-[450px]"
          >
            <CardContent className="p-0 flex flex-col h-full">
              
              {/* Contenedor de Imagen */}
              {post.Image && (
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={post.Image}
                    alt={post.Title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-40" />
                </div>
              )}

              <div className="p-8 md:p-10 flex flex-col flex-1">
                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  {post.Created_by && (
                    <div className="flex items-center gap-1.5 text-blue-400">
                      <FaUserCircle size={14} />
                      <span>{post.Created_by}</span>
                    </div>
                  )}
                  {post.Created_At && (
                    <div className="flex items-center gap-1.5">
                      <FaClock size={12} />
                      <span>{formatDate(post.Created_At)}</span>
                    </div>
                  )}
                </div>

                {/* Título - Sin límite de líneas */}
                <h3 className="text-2xl font-bold text-white mb-6 leading-tight group-hover:text-blue-400 transition-colors">
                  {post.Title}
                </h3>

                {/* Contenido - Aparece completo y con mejor lectura */}
                {post.Content && (
                  <p className="text-zinc-400 text-base leading-relaxed whitespace-pre-line font-light">
                    {post.Content}
                  </p>
                )}
                
                {/* El footer con "Leer artículo" ha sido eliminado */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}