"use client";

import Link from "next/link";
import { Card } from "../UI/Card";
import { CardContent } from "../UI/CardContainer";
import { FaLock, FaChevronRight } from "react-icons/fa";

export default function PrivateAccessCard() {
  return (
    <div className="flex justify-center px-4 w-full">
      <Card className="max-w-4xl w-full border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden">
        <CardContent className="p-0 flex flex-col md:flex-row items-stretch">
          
          {/* Lado Izquierdo: Indicador visual de "Privado" */}
          <div className="bg-zinc-100 md:w-16 flex items-center justify-center py-4 md:py-0">
            <FaLock className="text-zinc-400" size={20} />
          </div>

          {/* Contenido Principal */}
          <div className="flex-1 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                Portal Ministerial
              </h3>
              <p className="text-zinc-500 text-sm md:text-base max-w-md leading-relaxed">
                Acceso exclusivo para líderes, equipo pastoral y servidores 
                autorizados. Gestiona actividades y recursos internos.
              </p>
            </div>

            {/* Botón de Acción */}
            <Link
              href="/Ministery"
              className="
                group
                flex items-center gap-3
                px-8 py-4
                rounded-xl
                bg-zinc-900
                text-white
                font-bold
                text-sm
                hover:bg-zinc-800
                active:scale-95
                transition-all
                whitespace-nowrap
              "
            >
              INGRESAR AL PANEL
              <FaChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}