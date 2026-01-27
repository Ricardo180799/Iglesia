"use client";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { clearToken } from "../Redux/TokenSlice";
import { Logout } from "../Modules/Home/Servicios/homeService";

export default function Footer() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await Logout();
      dispatch(clearToken());
      window.location.href = "/"; // Redirigir al inicio
    } catch (err) { console.log("Error al cerrar sesión"); }
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h4 className="text-white font-bold mb-4">Iglesia de la Calle</h4>
          <p className="text-sm">Un lugar para todos. Ven y conócenos.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Síguenos</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white"><FaFacebook size={20}/></a>
            <a href="#" className="hover:text-white"><FaInstagram size={20}/></a>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <button onClick={handleLogout} className="text-left hover:text-red-400 transition w-fit">
            Cerrar Sesión Administrativa
          </button>
        </div>
      </div>
      <div className="border-t border-zinc-900 pt-8 text-center text-xs">
        © {new Date().getFullYear()} Iglesia de la Calle. Todos los derechos reservados.
      </div>
    </footer>
  );
}