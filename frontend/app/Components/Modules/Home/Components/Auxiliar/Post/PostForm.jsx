"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaTimes, FaCloudUploadAlt, FaLink, FaUserShield } from "react-icons/fa";

export default function PostForm({ functions, dato = null, setFormulario, refresh }) {
  
  const UserID = useSelector((state) => state.token.userID);
  
  const [info, setInfo] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ID, setID] = useState(null);

  const [form, setForm] = useState({
    Title: "",
    SLUG: "",
    Content: "",
    Created_by: "", 
    Created_At: "",
    Enlace: "",
    Category_id: 1 
  });

  useEffect(() => {
    if (dato) {
      setForm({
        Title: String(dato.Title ?? ""),
        SLUG: String(dato.SLUG ?? ""),
        Content: String(dato.Content ?? ""),
       
        Created_by: dato.Created_by ? Number(dato.Created_by) : Number(UserID),
        Created_At: dato.Created_At ? dato.Created_At.split("T")[0] : "",
        Enlace: String(dato.Visual || ""), 
        Category_id: dato.Category_id ?? 1
      });
      setID(dato.ID);
    } else {
      
      setForm(prev => ({ 
        ...prev, 
        Created_At: new Date().toISOString().split("T")[0],
        Created_by: Number(UserID) 
      }));
    }
  }, [dato, UserID]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    if (name === "Title" && !dato) {
      setForm(prev => ({ 
        ...prev, 
        SLUG: value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") 
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setInfo(null);

    const formData = new FormData();
   
    formData.append("Title", form.Title || "");
    formData.append("SLUG", form.SLUG || "");
    formData.append("Content", form.Content || "");
    formData.append("Created_by", Number(form.Created_by)); 
    formData.append("Category_id", Number(form.Category_id));

    if (file) {
      formData.append("File", file);
    } else if (form.Enlace.trim() !== "") {
      formData.append("Enlace", form.Enlace.trim());
    }

    if (dato && ID) {
      formData.append("ID", ID);
    }

    try {
      const response = await functions(formData);
      setInfo(response?.data?.message || "Publicación guardada");
      setTimeout(() => {
        refresh();
        setFormulario(false);
      }, 1500);
    } catch (err) {
      setInfo("Error al procesar la solicitud");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const inputStyles = "w-full bg-white/[0.05] border border-white/[0.15] rounded-2xl px-6 py-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/60 transition-all duration-300 text-sm";
  const labelStyles = "text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2 block ml-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <form onSubmit={handleSubmit} className="relative bg-[#0a0a0a] border border-white/[0.08] text-white w-full max-w-2xl p-8 md:p-12 rounded-[3rem] shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        <button type="button" onClick={() => setFormulario(false)} className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors">
          <FaTimes size={20} />
        </button>

        <header className="mb-10">
          <h2 className="text-3xl font-light tracking-tighter">
            {dato ? "Editar" : "Crear"} <span className="font-serif italic text-indigo-400">Reflexión</span>
          </h2>
          
          <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <FaUserShield className="text-indigo-400 text-xs" />
            <span className="text-[10px] text-indigo-300 uppercase tracking-widest font-bold">Autor ID: {form.Created_by}</span>
          </div>
        </header>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelStyles}>Título de la Reflexión</label>
              <input name="Title" value={form.Title} onChange={handleChange} className={inputStyles} placeholder="Ej: La quietud del alma" required />
            </div>
            
            <div>
              <label className={labelStyles}>Slug (URL)</label>
              <input name="SLUG" value={form.SLUG} onChange={handleChange} className={`${inputStyles} text-indigo-300/70`} placeholder="la-quietud-del-alma" required />
            </div>

            <div>
              <label className={labelStyles}>Fecha de Publicación</label>
              <input type="date" name="Created_At" value={form.Created_At} onChange={handleChange} className={`${inputStyles} [color-scheme:dark]`} required />
            </div>
          </div>

          <div>
            <label className={labelStyles}>Contenido Principal</label>
            <textarea name="Content" value={form.Content} onChange={handleChange} rows={6} className={`${inputStyles} resize-none leading-relaxed`} placeholder="Escribe aquí la reflexión..." required />
          </div>

         
          <div className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-[2rem]">
            <label className={labelStyles}>Imagen o Video (Visual)</label>
            <div className="flex flex-col gap-4">
              <div className={`transition-all ${form.Enlace ? "opacity-30 grayscale pointer-events-none" : ""}`}>
                <input type="file" id="post-file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                <label htmlFor="post-file" className="flex items-center justify-center gap-3 p-4 border border-dashed border-white/20 rounded-xl cursor-pointer hover:border-indigo-500/50">
                  <FaCloudUploadAlt className="text-indigo-400" />
                  <span className="text-xs text-zinc-400">{file ? file.name : "Subir archivo"}</span>
                </label>
              </div>

              <div className={`relative ${file ? "opacity-30 grayscale pointer-events-none" : ""}`}>
                <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 text-xs" />
                <input name="Enlace" value={form.Enlace} onChange={handleChange} placeholder="O pega un enlace de imagen/video" className={`${inputStyles} pl-10 py-3 text-xs`} />
              </div>
            </div>
          </div>
        </div>

        {info && <p className="mt-6 text-center text-[10px] font-black uppercase tracking-widest text-indigo-400 animate-pulse">{info}</p>}

        <button type="submit" disabled={loading} className="w-full mt-8 bg-white text-black hover:bg-indigo-500 hover:text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 disabled:opacity-20">
          {loading ? "Sincronizando..." : (dato ? "Actualizar Publicación" : "Publicar Reflexión")}
        </button>
      </form>
    </div>
  );
}