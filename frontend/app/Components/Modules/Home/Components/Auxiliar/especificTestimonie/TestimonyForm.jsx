"use client";
import { useState } from "react";
import { AddTestimonie } from "../../../Servicios/homeService";
import { FaTimes, FaCloudUploadAlt } from "react-icons/fa";

export default function TestimonyForm({ onClose }) {
  const [type, setType] = useState("Article");
  const [info, setInfo] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    Title: "",
    Author: "",
    Content: "",
    Text: "",
    Enlace: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  const ContentWordCount = form.Content.trim()
    ? form.Content.trim().split(/\s+/).length
    : 0;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setInfo(null);

    const formData = new FormData();
    
    formData.append("Type", type);
    formData.append("Title", form.Title);
    formData.append("Author", form.Author);
    formData.append("Content", form.Content);

    if (type === "Article") {
      formData.append("Text", form.Text);
    }

    // LÓGICA OPCIONAL: Solo añade si existen
    if (file) {
      formData.append("File", file);
    } 
    else if (form.Enlace.trim() !== "") {
      const link = form.Enlace.trim();
      const esFormatoVideo =
        /\.(mp4|webm|ogg|mov)$/i.test(link) ||
        link.includes("youtube.com") ||
        link.includes("youtu.be") ||
        link.includes("vimeo.com");

      if (esFormatoVideo) {
        formData.append("Video_url", link);
      } else {
        formData.append("Thumbnail_url", link);
      }
    }

    try {
      await AddTestimonie(formData);
      setInfo("Testimonio enviado con éxito");
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      setInfo(err.message || "Error al enviar el formulario");
    } finally {
      setLoading(false);
    }
  }

  const inputStyles = "w-full bg-white/[0.05] border border-white/[0.15] rounded-2xl px-6 py-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.08] transition-all duration-300 text-base font-light";
  const labelStyles = "text-[11px] font-black uppercase tracking-[0.25em] text-zinc-300 ml-1";

  return (
    <section className="relative bg-[#0d0d0d] border border-white/[0.08] rounded-[2.5rem] p-10 md:p-14 shadow-2xl max-w-2xl w-full mx-auto backdrop-blur-2xl">
      <button onClick={onClose} type="button" className="absolute top-8 right-8 text-zinc-400 hover:text-white transition-colors p-2">
        <FaTimes size={22} />
      </button>

      <header className="mb-12">
        <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter leading-tight">
          Narra tu <span className="font-serif italic text-indigo-400">Historia</span>
        </h2>
      </header>

      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        
        <div className="flex flex-col gap-3">
          <label className={labelStyles}>Formato del testimonio</label>
          <select 
            value={type} 
            onChange={(e) => {
                setType(e.target.value);
                setFile(null); 
            }} 
            className={`${inputStyles} appearance-none cursor-pointer font-normal`}
          >
            <option value="Article" className="bg-[#0a0a0a]">📝 Artículo Escrito</option>
            <option value="Video" className="bg-[#0a0a0a]">🎥 Video / Multimedia</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <label className={labelStyles}>Título</label>
            <input name="Title" value={form.Title} onChange={handleChange} placeholder="Ej: Un nuevo comienzo" className={inputStyles} required />
          </div>
          <div className="flex flex-col gap-3">
            <label className={labelStyles}>Autor</label>
            <input name="Author" value={form.Author} onChange={handleChange} placeholder="Tu nombre" className={inputStyles} required />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-end">
            <label className={labelStyles}>Resumen Breve</label>
            <span className={`text-xs font-bold ${ContentWordCount > 50 ? "text-red-400" : "text-zinc-500"}`}>
              {ContentWordCount} / 50 PALABRAS
            </span>
          </div>
          <textarea name="Content" value={form.Content} onChange={handleChange} rows={3} placeholder="De qué trata tu relato..." className={`${inputStyles} resize-none`} required />
        </div>

        {type === "Article" && (
          <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
            <label className={labelStyles}>Relato Completo</label>
            <textarea 
              name="Text" 
              value={form.Text} 
              onChange={handleChange} 
              rows={6} 
              placeholder="Escribe tu historia detallada aquí..." 
              className={`${inputStyles} resize-none`} 
              required 
            />
          </div>
        )}

        <div className="flex flex-col gap-6 p-6 bg-white/[0.02] rounded-3xl border border-white/[0.05]">
          <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest text-center">Multimedia (Opcional)</h3>
          
          <div className={`flex flex-col gap-3 transition-all ${form.Enlace ? 'opacity-30 pointer-events-none scale-95' : 'opacity-100'}`}>
            <label className={labelStyles}>Subir desde PC</label>
            <div className="relative group">
              <input 
                type="file" 
                accept={type === "Article" ? "image/*" : "video/*,image/*"} 
                onChange={handleFileChange} 
                className="hidden" 
                id="file-upload"
                disabled={!!form.Enlace} 
              />
              <label htmlFor="file-upload" className={`${inputStyles} flex items-center justify-center gap-3 cursor-pointer hover:border-indigo-500/40`}>
                <FaCloudUploadAlt className="text-indigo-400" size={24} />
                <span className="truncate">{file ? file.name : "Seleccionar archivo..."}</span>
              </label>
              {file && (
                <button type="button" onClick={() => setFile(null)} className="text-[10px] uppercase tracking-widest text-red-400 mt-2 hover:text-red-300 transition-colors ml-1 font-bold">
                  ✕ Eliminar archivo
                </button>
              )}
            </div>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/[0.05]"></div>
            <span className="flex-shrink mx-4 text-zinc-600 text-[10px] font-black uppercase">O</span>
            <div className="flex-grow border-t border-white/[0.05]"></div>
          </div>

          <div className={`flex flex-col gap-3 transition-all ${file ? 'opacity-30 pointer-events-none scale-95' : 'opacity-100'}`}>
            <label className={labelStyles}>Enlace externo</label>
            <input 
              name="Enlace" 
              value={form.Enlace} 
              onChange={handleChange} 
              placeholder={file ? "Archivo seleccionado" : "https://youtube.com/..."}
              className={inputStyles} 
              disabled={!!file} 
            />
          </div>
        </div>

        {info && (
          <div className="bg-indigo-500/10 border border-indigo-500/20 py-4 rounded-2xl text-center animate-pulse">
            <p className="text-xs uppercase tracking-widest text-indigo-300 font-bold">{info}</p>
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading || ContentWordCount > 50} 
          className="mt-6 w-full bg-white text-black hover:bg-indigo-500 hover:text-white rounded-2xl py-5 font-black text-xs uppercase tracking-widest transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando..." : "Enviar Testimonio"}
        </button>
      </form>
    </section>
  );
}