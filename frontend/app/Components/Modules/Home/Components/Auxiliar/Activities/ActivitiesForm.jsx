"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaTimes, FaCloudUploadAlt, FaLink } from "react-icons/fa";

export default function ActivityForm({ functions, dato = null, setFormulario, refresh }) {
  const Update_By = useSelector((state) => state.token.userID);
  
  const [info, setInfo] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ID, setID] = useState(null);

  const [form, setForm] = useState({
    Title: "",
    Text: "",
    Activity_Date: "",
    Enlace: "",
  });

  // Cargar datos si es edición
  useEffect(() => {
    if (dato) {
      setForm({
        Title: String(dato.Title ?? ""),
        Text: String(dato.Text ?? ""),
        Activity_Date: dato.Activity_Date ? dato.Activity_Date.split("T")[0] : "",
        Enlace: String(dato.Image || dato.Video_Url || ""),
      });
      setID(dato.ID);
    }
  }, [dato]);

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

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setInfo(null);

    // 1. Creación del FormData
    const formData = new FormData();
    formData.append("Title", form.Title);
    formData.append("Text", form.Text);
    formData.append("Activity_Date", form.Activity_Date);

   
    if (file) {
      
      formData.append("File", file);
    } else if (form.Enlace.trim() !== "") {
      const link = form.Enlace.trim();
     
      const esFormatoVideo =
        /\.(mp4|webm|ogg|mov)$/i.test(link) ||
        link.includes("youtube.com") ||
        link.includes("youtu.be") ||
        link.includes("vimeo.com");

      if (esFormatoVideo) {
        formData.append("Enlace", link);
      } else {
        formData.append("Enlace", link);
      }
    }

   
    if (dato && ID) {
      formData.append("ID", ID);
      formData.append("Update_By", Update_By);
    }

    try {
      console.log("forrmmmm ",formData)
      const response = await functions(formData);
      
      setInfo(response?.data?.message || "Operación realizada con éxito");
      
      setTimeout(() => {
        refresh();
        setFormulario(false);
      }, 2000);
    } catch (err) {
      setInfo("Error al procesar la solicitud");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const inputStyles = "w-full bg-white/[0.05] border border-white/[0.15] rounded-2xl px-6 py-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/60 transition-all duration-300";
  const labelStyles = "text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400 mb-2 block";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <form
        onSubmit={handleSubmit}
        className="relative bg-[#0d0d0d] border border-white/[0.08] text-white w-full max-w-2xl p-10 rounded-[2.5rem] shadow-2xl max-h-[95vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={() => setFormulario(false)}
          className="absolute top-8 right-8 text-zinc-400 hover:text-white transition-colors"
        >
          <FaTimes size={20} />
        </button>

        <header className="mb-8">
          <h2 className="text-3xl font-light tracking-tighter">
            {dato ? "Actualizar" : "Nueva"}{" "}
            <span className="font-serif italic text-indigo-400">Actividad</span>
          </h2>
        </header>

        {info && (
          <div className={`mb-6 p-4 rounded-xl text-center border ${info.toLowerCase().includes("error") ? "bg-red-500/10 border-red-500 text-red-500" : "bg-indigo-500/10 border-indigo-500/20 text-indigo-300"}`}>
            <p className="text-xs font-bold uppercase tracking-widest">{info}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className={labelStyles}>Título del Evento</label>
            <input name="Title" value={form.Title} onChange={handleChange} className={inputStyles} placeholder="Ej: Ayuno Congregacional" required />
          </div>

          <div>
            <label className={labelStyles}>Fecha</label>
            <input type="date" name="Activity_Date" value={form.Activity_Date} onChange={handleChange} className={inputStyles} required />
          </div>

          <div>
            <label className={labelStyles}>Descripción</label>
            <textarea name="Text" value={form.Text} onChange={handleChange} rows={3} className={`${inputStyles} resize-none`} placeholder="Detalles de la actividad..." required />
          </div>

          {/* Sección Multimedia Unificada */}
          <div className="mt-4 p-6 bg-white/[0.02] border border-white/[0.05] rounded-3xl">
            <p className={labelStyles}>Multimedia (Opcional)</p>
            
            {/* Opción A: Archivo */}
            <div className={`transition-all duration-300 ${form.Enlace.trim() ? "opacity-20 grayscale pointer-events-none" : "opacity-100"}`}>
              <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} disabled={!!form.Enlace.trim()} />
              <label htmlFor="file-upload" className="flex items-center justify-center gap-3 p-4 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-indigo-500/50 transition-colors">
                <FaCloudUploadAlt className="text-indigo-400" size={24} />
                <span className="text-sm text-zinc-400 truncate">{file ? file.name : "Subir desde PC"}</span>
              </label>
              {file && (
                <button type="button" onClick={() => setFile(null)} className="text-[10px] text-red-400 mt-2 font-bold uppercase tracking-tighter">
                  ✕ Eliminar archivo
                </button>
              )}
            </div>

            <div className="flex items-center my-4">
              <div className="flex-grow h-[1px] bg-white/5"></div>
              <span className="px-4 text-[10px] text-zinc-600 font-bold italic">O</span>
              <div className="flex-grow h-[1px] bg-white/5"></div>
            </div>

            {/* Opción B: Enlace */}
            <div className={`relative transition-all duration-300 ${file ? "opacity-20 grayscale pointer-events-none" : "opacity-100"}`}>
              <FaLink className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                name="Enlace" 
                value={form.Enlace} 
                onChange={handleChange} 
                disabled={!!file} 
                placeholder="URL de imagen o video" 
                className={`${inputStyles} pl-12`} 
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-10 bg-white text-black hover:bg-indigo-500 hover:text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 disabled:opacity-20"
        >
          {loading ? "Procesando..." : (dato ? "Confirmar Cambios" : "Guardar Actividad")}
        </button>
      </form>
    </div>
  );
}