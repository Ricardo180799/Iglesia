import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function PostsSummary({ text, href }) {
  return (
    <div className="flex justify-center">
      <Link
        href={href}
        className="group relative inline-flex items-center gap-4 px-12 py-5 
                   bg-white/[0.03] border border-white/10 text-white/80 
                   rounded-full text-[10px] font-bold uppercase tracking-[0.4em] 
                   hover:text-white hover:border-indigo-500/50
                   transition-all duration-700 active:scale-95 overflow-hidden"
      >
        {/* Fondo con brillo radial en hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Línea de luz que recorre el botón (Shimmer mejorado) */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] transition-transform" />
        
        {/* Texto dinámico */}
        <span className="relative z-10">{text}</span>
        
        {/* Icono minimalista */}
        <div className="relative z-10 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/20 transition-all duration-500">
          <FaChevronRight 
            className="text-indigo-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" 
            size={8} 
          />
        </div>

        {/* Resplandor exterior (Drop Shadow Glow) */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-700 -z-10" />
      </Link>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}