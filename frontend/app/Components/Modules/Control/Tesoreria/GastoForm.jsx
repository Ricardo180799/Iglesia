"use client";
import { useState } from "react";
import { addExpense } from "../Servicio/Servicio";

export default function GastoForm({ userId, onClose }) {
  const [form, setForm] = useState({
    Amount: "",
    Category: "General",
    Description: "",
    Date: "",
    InvoiceLink: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Amount: form.Amount,
      Category: form.Category,
      Description: form.Description,
      Dates: form.Date,
      Created_by: userId,
      Images: form.InvoiceLink || null, 
    };

    try {
      console.log("Enviando gasto:", payload);
      await addExpense(payload);

      setStatus({
        type: "success",
        message: "Gasto registrado correctamente.",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message:
          err.response?.data?.message ||
          "Ocurrió un error al registrar el gasto.",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-[400px] relative text-gray-900"
      >
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-900 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Registrar Gasto
        </h2>

       
        <input
          name="Amount"
          type="number"
          placeholder="Monto"
          className="w-full mb-2 border rounded px-2 py-1 text-gray-900 placeholder-gray-700"
          value={form.Amount}
          onChange={handleChange}
          required
        />

       
        <input
          name="Category"
          placeholder="Categoría"
          className="w-full mb-2 border rounded px-2 py-1 text-gray-900 placeholder-gray-700"
          value={form.Category}
          onChange={handleChange}
          required
        />

       
        <input
          name="Description"
          placeholder="Descripción"
          className="w-full mb-2 border rounded px-2 py-1 text-gray-900 placeholder-gray-700"
          value={form.Description}
          onChange={handleChange}
        />

        
        <input
          name="Date"
          type="date"
          className="w-full mb-2 border rounded px-2 py-1 text-gray-900 placeholder-gray-700"
          value={form.Date}
          onChange={handleChange}
          required
        />

        
        <input
          name="InvoiceLink"
          type="url"
          placeholder="Insertar enlace de factura (opcional)"
          className="w-full mb-4 border rounded px-2 py-1 text-gray-900 placeholder-gray-700"
          value={form.InvoiceLink}
          onChange={handleChange}
        />

        
        <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
          Guardar
        </button>

        
        {status.message && (
          <div
            className={`mt-4 text-sm text-center p-2 rounded ${
              status.type === "success"
                ? "bg-green-100 text-green-900"
                : "bg-red-100 text-red-900"
            }`}
          >
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}
