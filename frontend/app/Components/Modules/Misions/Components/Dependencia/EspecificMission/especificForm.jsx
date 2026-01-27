"use client";

import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FaRegSave, FaTimes, FaCloudUploadAlt, FaLink, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function PostMissionForm({ functions, dato = null, setOnclose, setAct, missionIdFromProps }) {
  const params = useParams();
  const Created_by_Redux = useSelector(state => state.token.userID);
  const fileInputRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  // Esta constante guarda el ID de forma silenciosa para el sistema
  const currentMissionID = dato?.ID_Missions || missionIdFromProps || params.id;

  const [form, setForm] = useState({
    Title: "",
    Slug: "",
    Content: "",
    Link: "",
    File: null,
    Created_by: "",
    Created_at: "",
  });

  const [ID, setID] = useState(null);
  const [errors, setErrors] = useState({});
  const [uploadType, setUploadType] = useState("file");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dato) {
      setForm({
        Title: String(dato.Title ?? ""),
        Slug: String(dato.Slug ?? ""),
        Content: String(dato.Content ?? ""),
        Link: String(dato.Imagens ?? ""),
        File: null,
        Created_by: String(dato.Created_by ?? ""),
        Created_at: dato.Created_at ? dato.Created_at.split("T")[0] : "",
      });
      setID(dato.ID);
      if (dato.Imagens && dato.Imagens.startsWith("http")) setUploadType("link");
    } else {
      setForm(prev => ({ ...prev, Created_by: Created_by_Redux || "" }));
    }
  }, [dato, Created_by_Redux]);

  const validate = () => {
    const newErrors = {};
    if (!form.Title.trim()) newErrors.Title = "Requerido";
    if (!form.Content.trim()) newErrors.Content = "Requerido";
    if (!form.Created_by) newErrors.Created_by = "Requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    
    // AQUÍ SE MANDA EL ID AUTOMÁTICAMENTE SIN ESTAR EN EL FORMULARIO
    formData.append("ID_Missions", currentMissionID);
    
    formData.append("Title", form.Title);
    formData.append("Slug", form.Slug);
    formData.append("Content", form.Content);
    formData.append("Created_by", form.Created_by);
    formData.append("Created_at", form.Created_at);

    if (uploadType === "file" && form.File) {
      formData.append("Visual", form.File);
    } else if (uploadType === "link" && form.Link.trim() !== "") {
      formData.append("Link", form.Link);
    }

    if (dato) formData.append("ID", ID);

    try {
      const response = await functions(formData);
      setMessageType("success");
      setMessage(response?.data?.message || "Guardado con éxito");
      setTimeout(() => {
        setOnclose(false);
        setAct(true);
      }, 2000);
    } catch (err) {
      setMessageType("error");
      setMessage(err.response?.data?.message || "Error en el servidor");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "w-full bg-white/[0.05] border border-white/[0.15] rounded-2xl px-6 py-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.08] transition-all duration-300 text-sm font-light";
  const labelStyles = "text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 ml-1 mb-2 block";

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-6 animate-in fade-in duration-500">
      <section className="relative bg-[#0d0d0d] border border-white/[0.08] rounded-[2.5rem] p-10 md:p-12 shadow-2xl max-w-2xl w-full mx-auto overflow-y-auto max-h-[90vh] custom-scrollbar">
        
        <button onClick={() => setOnclose(false)} type="button" className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors p-2 hover:rotate-90 duration-300">
          <FaTimes size={22} />
        </button>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-[1px] w-8 bg-indigo-500/50"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">
              Gestión de Contenido
            </span>
          </div>
          <h2 className="text-4xl font-light text-white tracking-tighter">
            {dato ? "Editar" : "Crear"} <span className="font-serif italic text-indigo-400">Crónica</span>
          </h2>
        </header>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          
          {/* SECCIÓN MULTIMEDIA */}
          <div className="flex flex-col gap-4 p-6 bg-white/[0.02] rounded-3xl border border-white/[0.05]">
            <label className={labelStyles}>Recurso Visual</label>
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 mb-2">
              <button 
                type="button" 
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${uploadType === "file" ? "bg-white text-black" : "text-zinc-500"}`}
                onClick={() => setUploadType("file")}
              >
                <FaCloudUploadAlt /> Archivo
              </button>
              <button 
                type="button" 
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${uploadType === "link" ? "bg-white text-black" : "text-zinc-500"}`}
                onClick={() => setUploadType("link")}
              >
                <FaLink /> Link
              </button>
            </div>

            {uploadType === "file" ? (
              <div className="relative group">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*,video/*" 
                  onChange={(e) => setForm({...form, File: e.target.files[0]})} 
                  className="hidden" 
                  id="file-upload"
                />
                <label htmlFor="file-upload" className={`${inputStyles} flex items-center justify-center gap-3 cursor-pointer border-dashed`}>
                  <FaCloudUploadAlt className="text-indigo-400" size={20} />
                  <span className="truncate">{form.File ? form.File.name : "Subir Imagen o Video..."}</span>
                </label>
              </div>
            ) : (
              <input 
                value={form.Link} 
                onChange={(e) => setForm({...form, Link: e.target.value})} 
                placeholder="https://..." 
                className={inputStyles} 
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelStyles}>Título</label>
              <input value={form.Title} onChange={(e) => setForm({...form, Title: e.target.value})} placeholder="Título llamativo..." className={inputStyles} />
              {errors.Title && <p className="text-[9px] text-red-400 mt-2 ml-1 font-bold uppercase">{errors.Title}</p>}
            </div>

            <div className="md:col-span-2">
              <label className={labelStyles}>Slug (URL)</label>
              <input value={form.Slug} onChange={(e) => setForm({...form, Slug: e.target.value})} placeholder="nombre-de-la-noticia" className={inputStyles} />
            </div>

            <div>
              <label className={labelStyles}>Autor (ID)</label>
              <input type="number" value={form.Created_by} onChange={(e) => setForm({...form, Created_by: e.target.value})} className={inputStyles} />
              {errors.Created_by && <p className="text-[9px] text-red-400 mt-2 ml-1 font-bold uppercase">{errors.Created_by}</p>}
            </div>

            <div>
              <label className={labelStyles}>Fecha</label>
              <input type="date" value={form.Created_at} onChange={(e) => setForm({...form, Created_at: e.target.value})} className={`${inputStyles} [color-scheme:dark]`} />
            </div>

            <div className="md:col-span-2">
              <label className={labelStyles}>Contenido</label>
              <textarea 
                value={form.Content} 
                onChange={(e) => setForm({...form, Content: e.target.value})} 
                rows={5} 
                className={`${inputStyles} resize-none`} 
                placeholder="Escribe los detalles aquí..."
              />
              {errors.Content && <p className="text-[9px] text-red-400 mt-2 ml-1 font-bold uppercase">{errors.Content}</p>}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black hover:bg-indigo-600 hover:text-white rounded-2xl py-5 font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 shadow-xl disabled:opacity-20 flex items-center justify-center gap-3"
          >
            <FaRegSave size={14} />
            {loading ? "Enviando..." : (dato ? "Guardar Cambios" : "Publicar")}
          </button>

          {message && (
            <div className={`flex items-center justify-center gap-2 p-4 rounded-xl border animate-pulse transition-all duration-500 ${
              messageType === "success" 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}>
              {messageType === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
              <p className="text-[10px] uppercase tracking-widest font-bold">
                {message}
              </p>
            </div>
          )}
        </form>
      </section>
    </div>
  );
}