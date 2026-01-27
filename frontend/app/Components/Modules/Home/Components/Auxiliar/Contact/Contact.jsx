"use client";

import { useState } from "react";
import Link from "next/link";
import api from "../../../../../Services/apiAxios"; 

export default function ContactForm() {
  const [form, setForm] = useState({
    Nombre: "",
    Apellidos: "",
    Email: "",
    Telefono: "",
    Mensaje: "",
    Tipo: "Contacto", // valor por defecto
  });

  const [info, setInfo] = useState(null);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Validación simple de campos
  const validateForm = () => {
    if (!form.Nombre.trim()) return "El nombre es obligatorio";
    if (!form.Apellidos.trim()) return "Los apellidos son obligatorios";
    if (!form.Email.trim()) return "El email es obligatorio";
    if (!form.Mensaje.trim()) return "El mensaje es obligatorio";
    return null;
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setInfo(error);
      return;
    }
    
    try {
   
      const response = await api.post("/Api/Messages/Contact", 
        {Name:form.Nombre,Apellidos:form.Apellidos,Email:form.Email,Teléfono:form.Telefono,Mensaje:form.Mensaje,Tipo:form.Tipo})
       ; 
      setInfo(response.data.message);
      setForm({
        Nombre: "",
        Apellidos: "",
        Email: "",
        Telefono: "",
        Mensaje: "",
        Tipo: "Contacto",
      });
    } catch (err) {
      setInfo("Error al enviar el formulario");
    }
  };

  return (
    <section className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Contáctanos / Solicitar Oración
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="Nombre"
          value={form.Nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="border border-gray-300 px-4 py-2 rounded-xl text-gray-900 placeholder-gray-400"
          required
        />

        <input
          type="text"
          name="Apellidos"
          value={form.Apellidos}
          onChange={handleChange}
          placeholder="Apellidos"
          className="border border-gray-300 px-4 py-2 rounded-xl text-gray-900 placeholder-gray-400"
          required
        />

        <input
          type="email"
          name="Email"
          value={form.Email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-gray-300 px-4 py-2 rounded-xl text-gray-900 placeholder-gray-400"
          required
        />

        <input
          type="tel"
          name="Telefono"
          value={form.Telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className="border border-gray-300 px-4 py-2 rounded-xl text-gray-900 placeholder-gray-400"
        />

        <textarea
          name="Mensaje"
          value={form.Mensaje}
          onChange={handleChange}
          placeholder="Mensaje"
          className="border border-gray-300 px-4 py-2 rounded-xl text-gray-900 placeholder-gray-400 resize-none"
          rows={4}
          required
        />

        <select
          name="Tipo"
          value={form.Tipo}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded-xl text-gray-900"
        >
          <option value="Contacto">Contacto</option>
          <option value="Oración">Oración</option>
        </select>

        <button
          type="submit"
          className="bg-gray-900 text-white py-2 rounded-xl font-medium hover:bg-gray-800 transition"
        >
          Enviar
        </button>
      </form>

      {info && <p className="mt-4 text-center text-gray-800">{info}</p>}

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-gray-900 hover:underline"
        >
          Volver a la página principal
        </Link>
      </div>
    </section>
  );
}
