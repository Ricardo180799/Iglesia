"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import { Registry } from "../../../Servicios/homeService"; 
import {saveToken,  saveUserId} from "../../../../../Redux/TokenSlice"
import { useDispatch, useSelector } from "react-redux";

export default function RegisterForm() {

  const {token, authenticated} = useSelector
  (state=>state.token)
  const dispatch = useDispatch();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  if (token) {
    console.log("Token actualizado:", token);
  }
}, [token])
  ;
  const [form, setForm] = useState({
    Nombre: "",
    Apellidos: "",
    Email: "",
    Password: "",
    Avatar: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.Nombre.trim()) return "El nombre es obligatorio";
    if (!form.Apellidos.trim()) return "Los apellidos son obligatorios";

    if (!form.Email.trim()) return "El email es obligatorio";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.Email))
      return "Email inválido";

    if (!form.Password) return "La contraseña es obligatoria";
    if (form.Password.length < 8)
      return "La contraseña debe tener al menos 8 caracteres";

    if (form.Avatar && !/^https?:\/\/.+/.test(form.Avatar))
      return "El avatar debe ser una URL válida";

    return null;
  }

  async function handleSubmit(e) {
  e.preventDefault();
  console.log("handleSubmit ejecutado");

  const error = validate();
  if (error) {
    setInfo(error);
    return;
  }

  setLoading(true);
  setInfo(null);

  try {
    console.log("Antes de Registry");
    const response = await Registry({
      Name: form.Nombre,
      LastName: form.Apellidos,
      Email: form.Email,
      Password: form.Password,
      Avatar: form.Avatar || null,
    });
    console.log("Después de Registry", response);

    setInfo(response.message?.message || "Registrado con éxito");
    dispatch(saveToken(response.token));
    dispatch(saveToken(response.ID));
  } catch(err) {
    console.error("Error Registry:", err);
    setInfo(err.message || "Error al registrar usuario");
  } finally {
    setLoading(false);
  }
}


  return (
    <section className="max-w-md mx-auto my-20 bg-white rounded-2xl p-8 shadow-xl">
      {/* Volver */}
      

      <h2 className="text-2xl font-bold text-center mt-4 mb-6 text-gray-900">
        Crear cuenta
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="Nombre"
          value={form.Nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="border rounded-xl px-4 py-2 text-gray-900 placeholder-gray-400"
          required
        />

        <input
          name="Apellidos"
          value={form.Apellidos}
          onChange={handleChange}
          placeholder="Apellidos"
          className="border rounded-xl px-4 py-2 text-gray-900 placeholder-gray-400"
          required
        />

        <input
          name="Email"
          value={form.Email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="border rounded-xl px-4 py-2 text-gray-900 placeholder-gray-400"
          required
        />

        <input
          name="Password"
          value={form.Password}
          onChange={handleChange}
          placeholder="Contraseña"
          type="password"
          className="border rounded-xl px-4 py-2 text-gray-900 placeholder-gray-400"
          required
        />

        <input
          name="Avatar"
          value={form.Avatar}
          onChange={handleChange}
          placeholder="Avatar (URL opcional)"
          className="border rounded-xl px-4 py-2 text-gray-900 placeholder-gray-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-gray-900 text-white rounded-xl py-3 font-medium hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        {info && (
          <p className="text-sm text-center mt-3 text-gray-800">
            {info}
          </p>
        )}
      </form>
    </section>
  );
}
