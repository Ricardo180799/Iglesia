"use client";

import { Card } from "../../../../UI/Card";
import { CardContent } from "../../../../UI/CardContainer";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";

// Función interna de formateo por si la importada falla o para personalizarla
const formatFriendlyDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export default function Events({ events = [] }) {
  if (!events.length) return null;

  return (
    <section className="my-32 px-6 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="flex flex-col items-center mb-16 text-center">
        <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
          Agenda Ministerial
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Próximas <span className="text-zinc-500">Actividades</span>
        </h2>
        <div className="h-1.5 w-20 bg-blue-600 mt-6 rounded-full"></div>
      </div>

      {/* CONTENEDOR CENTRADO DINÁMICO */}
      <div className="flex flex-wrap justify-center gap-10">
        {events.map((event, index) => (
          <Card 
            key={index} 
            className="group relative flex flex-col bg-zinc-900/50 border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 shadow-xl w-full sm:w-[calc(50%-2.5rem)] lg:w-[calc(33.333%-2.5rem)] max-w-[450px]"
          >
            <CardContent className="p-0 flex flex-col h-full">
              {/* Contenedor de Imagen */}
              {event.Image && (
                <div className="relative w-full h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10 opacity-60" />
                  <Image
                    src={event.Image}
                    alt={event.Title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* BADGE DE FECHA FLOTANTE MEJORADO */}
                  {event.Activity_Date && (
                    <div className="absolute top-6 left-6 z-20 flex flex-col items-center bg-blue-600 backdrop-blur-md text-white px-4 py-2 rounded-2xl shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                      <span className="text-lg font-black leading-none">
                        {new Date(event.Activity_Date).getDate() + 1} 
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-tighter">
                        {new Date(event.Activity_Date).toLocaleString('es-ES', { month: 'short' }).replace('.', '')}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Contenido de la Tarjeta */}
              <div className="p-8 md:p-10 flex flex-col flex-1">
                
                {/* FECHA LEGIBLE (Subtítulo) */}
                {event.Activity_Date && (
                  <div className="flex items-center gap-2 mb-4 text-blue-400/80">
                    <FaCalendarAlt className="text-xs" />
                    <span className="text-xs font-semibold uppercase tracking-widest">
                      {formatFriendlyDate(event.Activity_Date)}
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-6 leading-tight group-hover:text-blue-400 transition-colors">
                  {event.Title}
                </h3>

                {event.Text && (
                  <p className="text-zinc-400 text-base leading-relaxed whitespace-pre-line font-light italic border-l-2 border-blue-600/30 pl-4">
                    "{event.Text}"
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}