"use client";
import { useEffect, useState } from "react";
import { check } from "../Servicio/Servicio";
import Link from "next/link";

export default function AccesPage() {
  const [authorized, setAuthorized] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    check().then((res) => {
        setAuthorized(true);
        setRoles(res || []); // 
      })
      .catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setAuthorized(false);
        }
      });
  }, []);

  if (authorized === null) {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <p className="text-gray-500 text-lg">Verificando acceso…</p>
    </div>
  );
}

  if (authorized === false) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-center">
        <div>
          <h2 className="text-2xl font-semibold text-red-600">
            Acceso restringido
          </h2>
          <p className="text-neutral-600 mt-2">
            No tienes autorización para ingresar a esta sección.
          </p>
        </div>
      </div>
    );
  }

  
  const canAccess = (allowedRoles) => roles.some((role) => allowedRoles.includes(role));

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Panel Interno</h1>
      <p className="mt-2 text-neutral-600 mb-8">
        Bienvenido al área privada. Selecciona una de las secciones a las que tienes acceso:
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {canAccess(["Tesorero", "Pastor", "Admin", "Dev"]) && (
          <Link
            href="/Tesoreria"
            className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-xl font-medium text-center hover:bg-blue-700 transition"
          >
            Tesorería
          </Link>
        )}

        {canAccess(["Pastor", "Admin", "Dev"]) && (
          <Link
            href="/Almacen"
            className="flex-1 bg-green-600 text-white px-6 py-4 rounded-xl font-medium text-center hover:bg-green-700 transition"
          >
            Almacén
          </Link>
        )}

        {canAccess(["Pastor"]) && (
          <Link
            href="/Components/Modules/Control/Panel"
            className="flex-1 bg-purple-600 text-white px-6 py-4 rounded-xl font-medium text-center hover:bg-purple-700 transition"
          >
            Panel de Control
          </Link>
        )}
      </div>
    </div>
  );
}
