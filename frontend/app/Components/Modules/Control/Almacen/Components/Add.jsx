"use client";
import { useEffect, useState } from "react";

export default function AssetForm({ dato = null, onSubmitAction, setOnclose,refresh }) {
  
  const [form, setForm] = useState({
    Name: "",
    Cantidad: "",
    Category: "",
    Adquisition_date: "",
    Price: "",
    Status: "nuevo",
    Locations: "",
    Responsible_id: 20,
  });

  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    if (dato) {
      setForm({
        Name: dato.Name ?? "",
        Cantidad: dato.Cantidad ?? "",
        Category: dato.Category ?? "",
        Adquisition_date: dato.Adquisition_date
          ? dato.Adquisition_date.split("T")[0]
          : "",
        Price: dato.Price ?? "",
        Status: dato.Status ?? "nuevo",
        Locations: dato.Locations ?? "",
        Responsible_id: dato.Responsible_id ?? 20,
      });
    }
  }, [dato]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.Name.trim()) newErrors.Name = "El nombre es obligatorio";
    if (!form.Cantidad || Number(form.Cantidad) <= 0)
      newErrors.Cantidad = "Cantidad inválida";
    if (!form.Adquisition_date) newErrors.Adquisition_date = "Fecha requerida";
    if (Number(form.Price) < 0) newErrors.Price = "Precio inválido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!onSubmitAction) return;
     
    
    const Name = form.Name;
    const Cantidad = Number(form.Cantidad);
    const Category = form.Category;
    const Adquisition_date = form.Adquisition_date || null;
    const Price = Number(form.Price);
    const Status = form.Status;
    const Locations = form.Locations;
    const Responsible_id = Number(form.Responsible_id);
    const Id = dato?.Id;
     
    try {
      
      if (onSubmitAction.name === "addAssets") {
        await onSubmitAction(
          Name,
          Cantidad,
          Category,
          Adquisition_date,
          Price,
          Status,
          Locations,
          Responsible_id
        ); 
      } else if (onSubmitAction.name === "updateAssets") {
     
        await onSubmitAction(
          Name,
          Cantidad,
          Category,
          Adquisition_date,
          Price,
          Status,
          Locations,
          Responsible_id,
          Id
        );
      }

      refresh()
      setOnclose(false);
    } catch (err) {
      console.error("Error en la operación:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white w-full max-w-xl rounded-xl p-6 shadow-xl
                      transform transition-all duration-300 scale-100 opacity-100">
        <button
          onClick={() => setOnclose(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-black mb-4">
          {dato ? "Editar activo" : "Añadir activo"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="Name"
            value={form.Name}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full border p-2 rounded text-black"
          />
          {errors.Name && <p className="text-red-600 text-sm">{errors.Name}</p>}

          <input
            name="Cantidad"
            type="number"
            value={form.Cantidad}
            onChange={handleChange}
            placeholder="Cantidad"
            className="w-full border p-2 rounded text-black"
          />
          {errors.Cantidad && (
            <p className="text-red-600 text-sm">{errors.Cantidad}</p>
          )}

          <input
            name="Category"
            value={form.Category}
            onChange={handleChange}
            placeholder="Categoría"
            className="w-full border p-2 rounded text-black"
          />

          <input
            name="Adquisition_date"
            type="date"
            value={form.Adquisition_date}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
          />
          {errors.Adquisition_date && (
            <p className="text-red-600 text-sm">{errors.Adquisition_date}</p>
          )}

          <input
            name="Price"
            type="number"
            step="0.01"
            value={form.Price}
            onChange={handleChange}
            placeholder="Precio"
            className="w-full border p-2 rounded text-black"
          />
          {errors.Price && (
            <p className="text-red-600 text-sm">{errors.Price}</p>
          )}

          <select
            name="Status"
            value={form.Status}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
          >
            <option value="nuevo">Nuevo</option>
            <option value="usado">Usado</option>
            <option value="dañado">Dañado</option>
          </select>

          <input
            name="Locations"
            value={form.Locations}
            onChange={handleChange}
            placeholder="Ubicación"
            className="w-full border p-2 rounded text-black"
          />

          <input
            type="number"
            name="Responsible_id"
            value={form.Responsible_id}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}
