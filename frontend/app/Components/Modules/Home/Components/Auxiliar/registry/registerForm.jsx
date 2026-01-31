"use client";

import { useState, useEffect } from "react";
import { Registry } from "../../../Servicios/homeService"; 
import { saveToken, saveUserId } from "../../../../../Redux/TokenSlice";
import { useDispatch, useSelector } from "react-redux";

export default function RegisterForm() {
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null); // Para la vista previa de la imagen

  const [form, setForm] = useState({
    Nombre: "",
    Apellidos: "",
    Email: "",
    Password: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);

  // Limpiar la URL de previsualización para evitar fugas de memoria
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo inmediatamente al seleccionar
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setInfo("Formato de imagen no válido (solo JPG, PNG o WEBP)");
        e.target.value = ""; // Resetear input
        return;
      }

      setAvatarFile(file);
      setInfo(null);
      
      // Generar previsualización
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  }

  function validate() {
    if (!form.Nombre.trim()) return "El nombre es obligatorio";
    if (!form.Apellidos.trim()) return "Los apellidos son obligatorios";
    if (!form.Email.trim()) return "El email es obligatorio";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.Email)) return "Email inválido";
    if (!form.Password) return "La contraseña es obligatoria";
    if (form.Password.length < 8) return "La contraseña debe tener al menos 8 caracteres";

    if (avatarFile) {
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (avatarFile.size > maxSize) return "La imagen no debe superar los 2MB";
    }

    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const error = validate();
    if (error) {
      setInfo(error);
      return;
    }

    setLoading(true);
    setInfo(null);

    // --- CONSTRUCCIÓN DEL FORMDATA ---
    const formData = new FormData();
    formData.append("Name", form.Nombre);
    formData.append("LastName", form.Apellidos);
    formData.append("Email", form.Email);
    formData.append("Password", form.Password);
    
    if (avatarFile) {
      formData.append("Avatar", avatarFile);
    }

    try {
      const response = await Registry(formData);

      setInfo(response.message?.message || "Registrado con éxito");
      
      if (response.token) dispatch(saveToken(response.token));
      if (response.ID) dispatch(saveUserId(response.ID));
      
    } catch (err) {
      setInfo(err.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-md mx-auto my-10 bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
        Crear cuenta
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Previsualización del Avatar */}
        <div className="flex justify-center mb-2">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 text-xs text-center px-2">Sin foto</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="Nombre"
            value={form.Nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="border rounded-xl px-4 py-2 text-gray-900 focus:ring-2 focus:ring-gray-200 outline-none"
            required
          />
          <input
            name="Apellidos"
            value={form.Apellidos}
            onChange={handleChange}
            placeholder="Apellidos"
            className="border rounded-xl px-4 py-2 text-gray-900 focus:ring-2 focus:ring-gray-200 outline-none"
            required
          />
        </div>

        <input
          name="Email"
          value={form.Email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="border rounded-xl px-4 py-2 text-gray-900 focus:ring-2 focus:ring-gray-200 outline-none"
          required
        />

        <input
          name="Password"
          value={form.Password}
          onChange={handleChange}
          placeholder="Contraseña"
          type="password"
          className="border rounded-xl px-4 py-2 text-gray-900 focus:ring-2 focus:ring-gray-200 outline-none"
          required
        />

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-600 ml-1">FOTO DE PERFIL (OPCIONAL)</label>
          <input
            name="Avatar"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-gray-900 text-white rounded-xl py-3 font-semibold hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Procesando..." : "Registrarse"}
        </button>

        {info && (
          <div className={`text-sm text-center mt-3 p-2 rounded-lg ${info.includes("éxito") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {info}
          </div>
        )}
      </form>
    </section>
  );
}