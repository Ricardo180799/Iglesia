"use client";

import Link from "next/link";
import { Card } from "../../../../UI/Card";
import { CardContent } from "../../../../UI/CardContainer";
import Image from "next/image";
import { formatDate } from "../../../../Utils/Formatdate";
import { FaPlayCircle, FaQuoteLeft, FaArrowRight } from "react-icons/fa";

export default function Testimonies({ testimonies = [] }) {
  if (!testimonies.length) return null;

  return (
    <section className="my-32 px-6 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="text-center mb-20">
        <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.4em] mb-4 block">
          Impacto Real
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          Testimonios de <span className="text-zinc-500">Transformación</span>
        </h2>
        <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full mb-8"></div>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed italic">
          "Historias que inspiran. Conoce lo que Dios está haciendo en los corazones de nuestra comunidad."
        </p>
      </div>

      {/* CONTENEDOR CENTRADO DINÁMICO */}
      <div className="flex flex-wrap justify-center gap-10">
        {testimonies.map((e) => (
          <Card 
            key={e.ID} 
            className="group relative flex flex-col bg-zinc-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm hover:bg-zinc-900/80 transition-all duration-500 shadow-2xl w-full sm:w-[calc(50%-2.5rem)] lg:w-[calc(33.333%-2.5rem)] max-w-[450px]"
          >
            <CardContent className="p-8 md:p-10 flex flex-col h-full">
              
              {/* Icono de Comilla Decorativo */}
              <div className="absolute top-6 right-8 text-blue-600/10 group-hover:text-blue-600/30 transition-colors">
                <FaQuoteLeft size={40} />
              </div>

              {/* Título del Testimonio */}
              <h3 className="text-2xl font-bold text-white mb-6 pr-8 leading-tight group-hover:text-blue-400 transition-colors">
                {e.Title}
              </h3>

              {/* Lógica según Tipo (Artículo o Video) */}
              <div className="relative mb-8">
                {e.Type === "Article" ? (
                  <>
                    {e.Thumbnail && (
                      <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 border border-white/5 shadow-inner">
                        <Image
                          src={e.Thumbnail}
                          alt={e.Title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}
                    {e.Content && (
                      <p className="text-zinc-400 text-base leading-relaxed whitespace-pre-line font-light italic">
                        "{e.Content}"
                      </p>
                    )}
                  </>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-white/5 group/video shadow-2xl">
                    <video
                      src={e.Video_Url}
                      className="w-full aspect-video object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/40">
                      <FaPlayCircle size={60} className="text-white opacity-80 group-hover/video:scale-110 group-hover/video:opacity-100 transition-all cursor-pointer shadow-white/20" />
                    </div>
                  </div>
                )}
              </div>

              {/* Info del Autor y Link */}
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white tracking-wide">
                    {e.Author || "Anónimo"}
                  </span>
                  <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-1">
                    {formatDate(e.Created_At)}
                  </span>
                </div>
                
                <Link
                  href={`/especificTestimonie/${e.ID}`}
                  className="h-12 w-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all shadow-lg group/btn"
                >
                  <FaArrowRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}