"use client";
import { useAlmacen } from "../Hook/AlmacenHook";
import Link from "next/link";
import { addAssets, updateAssets, deleteAssets } from "../../Servicio/Servicio";
import { useEffect, useState } from "react";
import AssetForm from "./Add";

export default function ListaAssets() {
  const { info, loading, error,refresh } = useAlmacen();
  const [assets, setAssets] = useState([]);
  const [onClose, setOnclose] = useState(false);
  const [dato, setDato] = useState(null);
  const [functions, setFunctions] = useState(null);

  useEffect(() => {
    if (info) setAssets(info);
  }, [info]);

  if (loading) return <p className="text-black">Cargando activos...</p>;
  if (error) return <p className="text-red-600">Error al cargar</p>;

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-6">

      {/* Formulario modal */}
      {onClose && (
        <AssetForm
          dato={dato}
          onSubmitAction={functions}
          setOnclose={setOnclose}
          setAssets={assets}
          refresh={refresh}
        />
      )}

      <Link href="/Ministery" className="text-blue-600 hover:underline">
        ← Volver al panel del Ministerio
      </Link>

      {/* Título principal */}
      <h1 className="text-3xl font-bold text-white">Lista de Activos</h1>

      {/* Grid de assets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Card para añadir nuevo activo */}
        <div
          className="bg-green-100 shadow-md rounded-xl p-5 flex items-center justify-center
                     cursor-pointer hover:bg-green-200 transition"
          onClick={() => {
            
            setFunctions(() => addAssets);
            setDato(null);
            console.log("ewfewfewfew ",dato, onClose,functions)
            setOnclose(true);
            
            
          }}
        >
          <span className="text-black font-semibold text-lg">+ Añadir objeto</span>
        </div>

        {/* Cards de assets */}
        {assets.map((asset) => (
          <div
            key={asset.Id}
            className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-black mb-2">{asset.Name}</h2>

              <p className="text-black"><strong>Categoría:</strong> {asset.Category}</p>
              <p className="text-black"><strong>Cantidad:</strong> {asset.Cantidad}</p>
              <p className="text-black">
                <strong>Fecha:</strong>{" "}
                {new Date(asset.Adquisition_date).toLocaleDateString("es-ES")}
              </p>
              <p className="text-black"><strong>Precio:</strong> ${asset.Price}</p>
              <p className="text-black"><strong>Estado:</strong> {asset.Status}</p>
              <p className="text-black"><strong>Ubicación:</strong> {asset.Location}</p>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                onClick={() => {
                  setFunctions(() => updateAssets);
                  setDato(asset);
                  setOnclose(true);
                }}
              >
                Actualizar
              </button>

              <button
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                onClick={async () => {
                  const Id = asset.Id
                  console.log("iddddddd ", Id)
                  await deleteAssets(Id);
                  refresh()
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
