"use client"
import { useState,useEffect } from "react";
import { useUsers } from "../../Hooks/UsuariosHook";
import { UpdateRol, DeleteUsuario } from "../../Service/Service";

export default function ListaUsuariosDashboard() {
  const { info, loading, error, refresh } = useUsers();
  const [message, setMessage] = useState("");
  const[filtro,setFiltro]=useState(null)
  const[busqueda,setBusqueda]=useState("")
  const[marcado,setMarcado]=useState("")
  const[procesar,setProcesar]=useState(info)
  
  useEffect(() => {
  if (!info) return;

  
  if (!busqueda || !filtro) {
    setProcesar(info);
    return;
  }

  const resultado = info.filter((user) => {
    
    const valorCampo = user[filtro] ? String(user[filtro]).toLowerCase() : "";
    const valorBusqueda = busqueda.toLowerCase();

   
    return valorCampo.startsWith(valorBusqueda);
  });

  setProcesar(resultado);
}, [busqueda, filtro, info])
 
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRoles, setNewRoles] = useState([]);

  
  const rolesDisponibles = ["Pastor", "Admin", "Tesorero", "Miembro","Dev","Misionero"];

  const abrirModal = (user) => {
    setSelectedUser(user);
   
    const rolesActuales = user.Roles ? user.Roles.split(',').map(r => r.trim()) : [];
    setNewRoles(rolesActuales);
  };

  const handleToggleRol = (rol) => {
    setNewRoles(prev => 
      prev.includes(rol) ? prev.filter(r => r !== rol) : [...prev, rol]
    );
  };

  const confirmarUpdate = async () => {
    try {
      const response = await UpdateRol(selectedUser.ID, newRoles);
      setMessage(response);
      setSelectedUser(null);
      refresh();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error al actualizar");
    }
  };

  if (loading) return <p className="p-4 text-zinc-400 animate-pulse">Cargando...</p>;

  return (
    <div className="relative flex flex-col h-full bg-zinc-950 text-zinc-100 p-6 border-r border-zinc-800 w-full max-w-md">
      <h2 className="text-xl font-bold mb-8">Lista de Usuarios</h2>

      
      {message && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
          {message}
        </div>
      )}

      <div className="mb-6 space-y-3">
  <p className="text-sm font-medium text-zinc-400">Filtrar por:</p>
  
  <div className="flex gap-2">
    {["Name", "LastName", "Roles"].map((opcion) => (
      <div
        key={opcion}
        onClick={() => {
          setFiltro(opcion);
          setMarcado(opcion);
        }}
        className={`flex-1 text-center py-2 text-xs rounded-lg cursor-pointer border transition-all ${
          marcado === opcion 
            ? "border-blue-500 bg-blue-500/10 text-blue-400" 
            : "border-zinc-800 bg-zinc-900 text-zinc-500"
        }`}
      >
        {opcion === "Name" ? "Nombre" : opcion === "LastName" ? "Apellido" : "Rol"}
      </div>
    ))}
  </div>

  <input
    type="text"
    placeholder={filtro ? `Buscando por ${filtro}...` : "Selecciona un filtro primero"}
    value={busqueda || ""}
    onChange={(e) => setBusqueda(e.target.value)}
    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
  />
</div>
      <div className="space-y-4 overflow-y-auto">
        {procesar?.map((user) => (
          <div key={user.ID} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
            <p className="font-semibold text-white">{user.Name} {user.LastName}</p>
            <p className="text-xs text-zinc-500 mb-3">{user.Roles || "Sin roles"}</p>
            
            <div className="flex gap-2">
              <button 
                onClick={() => abrirModal(user)}
                className="flex-1 py-1 text-xs bg-zinc-100 text-black rounded hover:bg-white"
              >
                Gestionar Roles
              </button>
              <button 
                onClick={async () => { if(confirm("¿Eliminar?")) { await DeleteUsuario(user.ID); refresh(); } }}
                className="flex-1 py-1 text-xs border border-red-900/50 text-red-400 rounded hover:bg-red-950/30"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DE GESTIÓN DE ROLES */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold mb-1">Roles de {selectedUser.Name}</h3>
            <p className="text-xs text-zinc-500 mb-6">Selecciona los roles que deseas asignar o quitar.</p>

            <div className="space-y-3 mb-8">
              {rolesDisponibles.map(rol => (
                <label key={rol} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 cursor-pointer hover:bg-zinc-800 transition-colors">
                  <span className="text-sm">{rol}</span>
                  <input 
                    type="checkbox"
                    checked={newRoles.includes(rol)}
                    onChange={() => handleToggleRol(rol)}
                    className="w-4 h-4 rounded border-zinc-600 bg-zinc-700 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setSelectedUser(null)}
                className="flex-1 py-2 text-sm font-medium text-zinc-400 hover:text-white"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmarUpdate}
                className="flex-1 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-900/20"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}