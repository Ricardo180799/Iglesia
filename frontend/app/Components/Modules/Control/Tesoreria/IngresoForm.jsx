"use client";
import { useState } from "react";
import { addIncome } from "../Servicio/Servicio";

export default function IngresoForm({ userId, onClose }) {
  const [form, setForm] = useState({
    Source: "Manual",
    User_Id: "",
    Type: "Diezmo",
    Amount: "",
    Description: "",
    Date: "",
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
      Source: form.Source,
      User_Id: form.User_Id,
      Type: form.Type,
      Amount: form.Amount,
      Description: form.Description,
      Dates: form.Date,
      Created_By: userId,
    };

    try {
        console.log(payload)
      await addIncome(payload);

      setStatus({
        type: "success",
        message: "Ingreso registrado correctamente.",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.response?.data?.message ||
          "Ocurrió un error al registrar el ingreso.",
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
          Registrar Ingreso
        </h2>

        
        <select
          name="Source"
          value={form.Source}
          onChange={handleChange}
          className="w-full mb-2 border rounded px-2 py-1 text-gray-900"
        >
          <option value="Stripe">Stripe</option>
          <option value="Manual">Manual</option>
        </select>

       
        <input
          name="User_Id"
          placeholder="ID del usuario"
          className="w-full mb-2 border rounded px-2 py-1 text-gray-900 placeholder-gray-700"
          onChange={handleChange}
        />

        
        <select
          name="Type"
          value={form.Type}
          onChange={handleChange}
          className="w-full mb-2 border rounded px-2 py-1 text-gray-900"
        >
          <option>Diezmo</option>
          <option>Ofrenda</option>
          <option>Mision</option>
          <option>Otro</option>
        </select>

        
        <input
          name="Amount"
          type="number"
          placeholder="Monto"
          className="w-full mb-2 border rounded px-2 py-1 text-gray-900 placeholder-gray-700"
          onChange={handleChange}
        />

        
        <input
          name="Description"
          placeholder="Descripción"
          className="w-full mb-2 border rounded px-2 py-1 text-gray-900 placeholder-gray-700"
          onChange={handleChange}
        />

        
        <input
          name="Date"
          type="date"
          className="w-full mb-4 border rounded px-2 py-1 text-gray-900 placeholder-gray-700"
          onChange={handleChange}
        />

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
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
