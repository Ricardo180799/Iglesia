"use client";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FaRegSave, FaTimes, FaCloudUploadAlt, FaLink } from "react-icons/fa";

export default function ProjectForm({ functions, dato = null, setFormulario, refresh, message, setMessage }) {
  const Update_By = useSelector(state => state.token.userID);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    Name: "",
    Link: "",
    File: null,
    Locations: "",
    Description: "",
    Manager: "",
    Members: "",
    Start_Date: "",
  });

  const [ID, setID] = useState(null);
  const [errors, setErrors] = useState({});
  const [uploadType, setUploadType] = useState("file");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dato) {
      setForm({
        Name: String(dato.Name ?? ""),
        Link: String(dato.Imagens ?? ""),
        File: null,
        Locations: String(dato.Locations ?? ""),
        Description: String(dato.Description ?? ""),
        Manager: String(dato.Manager ?? ""),
        Members: String(dato.Members ?? ""),
        Start_Date: dato.Start_Date ? dato.Start_Date.split("T")[0] : "",
      });
      setID(dato.ID);
      if (dato.Imagens) setUploadType("link");
    }
  }, [dato]);

  const validate = () => {
    const newErrors = {};
    if (!form.Name.trim()) newErrors.Name = "Requerido";
    if (!form.Locations.trim()) newErrors.Locations = "Requerido";
    if (!form.Description.trim()) newErrors.Description = "Requerido";
    if (!form.Manager || isNaN(Number(form.Manager))) newErrors.Manager = "Manager inválido";
    if (!form.Members || isNaN(Number(form.Members))) newErrors.Members = "Members inválido";
    if (!form.Start_Date) newErrors.Start_Date = "Fecha requerida";
    
    // El recurso visual (File/Link) ya no genera error si está vacío (Opcional)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("Name", form.Name);
    formData.append("Locations", form.Locations);
    formData.append("Description", form.Description);
    formData.append("Manager", form.Manager);
    formData.append("Members", form.Members);
    formData.append("Start_Date", form.Start_Date);

    // Adjuntar recurso visual solo si existe
    if (uploadType === "file" && form.File) {
      formData.append("Visual", form.File);
    } else if (uploadType === "link" && form.Link.trim() !== "") {
      formData.append("Link", form.Link);
    }

    if (dato) {
      formData.append("ID", ID);
      formData.append("Update_By", Update_By);
    }

    try {
      const response = await functions(formData);
      setMessage(response?.data?.message || "Éxito al guardar");
      if (!dato) setFormulario(false);
      refresh();
    } catch (err) {
      setMessage("Error en el servidor");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "w-full bg-white/[0.05] border border-white/[0.15] rounded-2xl px-6 py-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.08] transition-all duration-300 text-sm font-light";
  const labelStyles = "text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 ml-1 mb-2 block";

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-6 animate-in fade-in duration-500">
      <section className="relative bg-[#0d0d0d] border border-white/[0.08] rounded-[2.5rem] p-10 md:p-12 shadow-2xl max-w-2xl w-full mx-auto overflow-y-auto max-h-[90vh] custom-scrollbar">
        
        <button onClick={() => setFormulario(false)} type="button" className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors p-2 hover:rotate-90 duration-300">
          <FaTimes size={22} />
        </button>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-[1px] w-8 bg-indigo-500/50"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">
              {dato ? "Gestión de Crónicas" : "Nuevo Registro"}
            </span>
          </div>
          <h2 className="text-4xl font-light text-white tracking-tighter">
            {dato ? "Editar" : "Crear"} <span className="font-serif italic text-indigo-400">Proyecto</span>
          </h2>
        </header>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          
          {/* SELECTOR DE RECURSO OPCIONAL */}
          <div className="flex flex-col gap-4 p-6 bg-white/[0.02] rounded-3xl border border-white/[0.05]">
            <label className={labelStyles}>Recurso Visual (Opcional)</label>
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 mb-2">
              <button 
                type="button" 
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${uploadType === "file" ? "bg-white text-black" : "text-zinc-500"}`}
                onClick={() => setUploadType("file")}
              >
                <FaCloudUploadAlt /> Subir Archivo
              </button>
              <button 
                type="button" 
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${uploadType === "link" ? "bg-white text-black" : "text-zinc-500"}`}
                onClick={() => setUploadType("link")}
              >
                <FaLink /> Enlace Externo
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
                <label htmlFor="file-upload" className={`${inputStyles} flex items-center justify-center gap-3 cursor-pointer hover:border-indigo-500/40 border-dashed`}>
                  <FaCloudUploadAlt className="text-indigo-400" size={20} />
                  <span className="truncate">{form.File ? form.File.name : "Seleccionar de la PC..."}</span>
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

          {/* DATOS GENERALES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelStyles}>Nombre del Proyecto</label>
              <input value={form.Name} onChange={(e) => setForm({...form, Name: e.target.value})} placeholder="Ej: Operación Horizonte" className={inputStyles} />
              {errors.Name && <p className="text-[9px] text-red-400 mt-2 ml-1 uppercase font-bold">{errors.Name}</p>}
            </div>

            <div>
              <label className={labelStyles}>Ubicación</label>
              <input value={form.Locations} onChange={(e) => setForm({...form, Locations: e.target.value})} placeholder="Ciudad, País" className={inputStyles} />
              {errors.Locations && <p className="text-[9px] text-red-400 mt-2 ml-1 uppercase font-bold">{errors.Locations}</p>}
            </div>

            <div>
              <label className={labelStyles}>Fecha de Inicio</label>
              <input type="date" value={form.Start_Date} onChange={(e) => setForm({...form, Start_Date: e.target.value})} className={`${inputStyles} [color-scheme:dark]`} />
            </div>

            <div>
              <label className={labelStyles}>Manager (ID)</label>
              <input type="number" value={form.Manager} onChange={(e) => setForm({...form, Manager: e.target.value})} placeholder="0" className={inputStyles} />
            </div>

            <div>
              <label className={labelStyles}>Miembros</label>
              <input type="number" value={form.Members} onChange={(e) => setForm({...form, Members: e.target.value})} placeholder="0" className={inputStyles} />
            </div>

            <div className="md:col-span-2">
              <label className={labelStyles}>Descripción</label>
              <textarea 
                value={form.Description} 
                onChange={(e) => setForm({...form, Description: e.target.value})} 
                rows={3} 
                placeholder="Detalles del proyecto..." 
                className={`${inputStyles} resize-none`} 
              />
              {errors.Description && <p className="text-[9px] text-red-400 mt-2 ml-1 uppercase font-bold">{errors.Description}</p>}
            </div>
          </div>

          {/* BOTÓN Y MENSAJES */}
          <div className="mt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-black hover:bg-indigo-600 hover:text-white rounded-2xl py-5 font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 shadow-xl disabled:opacity-20 flex items-center justify-center gap-3"
            >
              <FaRegSave size={14} />
              {loading ? "Procesando..." : (dato ? "Actualizar Registro" : "Guardar Proyecto")}
            </button>
            
            {message && (
              <p className="text-[10px] text-center text-indigo-400 mt-6 uppercase tracking-widest animate-pulse font-bold">
                {message}
              </p>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}