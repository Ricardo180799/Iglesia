"use client";

import { useState } from "react";
import Link from "next/link";
import {saveToken,saveUserId,saveRol} from "../../../../../Redux/TokenSlice"
import api from "../../../../../Services/apiAxios"
import { useDispatch, useSelector } from "react-redux";
export default function LoginForm() {
  const dispatch = useDispatch()
  
  const [form, setForm] = useState({
    Nombre: "",
    Contraseña: "",
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
    if (!form.Contraseña.trim()) return "La contraseña es obligatoria";
    if (form.Contraseña.length < 6) return "La contraseña debe tener al menos 6 caracteres";
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
      const response = await api.post("/Api/Sesion",{Name:form.Nombre,Pass:form.Contraseña});
     
      setInfo(response.data.message);
      dispatch(saveToken(response.data.accessToken));
      dispatch(saveUserId(response.data.ID));
      dispatch(saveRol(response.data.Rol))
      
      
      
    } catch (err) {
      setInfo("Error al conectar con el servidor");
    }
  };

  return (
    <section className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Iniciar Sesión
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
          type="password"
          name="Contraseña"
          value={form.Contraseña}
          onChange={handleChange}
          placeholder="Contraseña"
          className="border border-gray-300 px-4 py-2 rounded-xl text-gray-900 placeholder-gray-400"
          required
        />

        <button
          type="submit"
          className="bg-gray-900 text-white py-2 rounded-xl font-medium hover:bg-gray-800 transition"
        >
          Iniciar Sesión
        </button>
      </form>

      {info && <p className="mt-4 text-center text-gray-800">{info}</p>}

      <div className="mt-6 text-center">
     
      </div>
    </section>
  );
}
