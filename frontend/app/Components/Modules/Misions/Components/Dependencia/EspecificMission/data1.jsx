"use client";

export default function MissionInfo({ mission }) {
  if (!mission) return null;

  return (
    <div className="p-4 border rounded-lg shadow mb-6">
      <h2 className="text-2xl font-bold mb-2">{mission.Name}</h2>

      {mission.Imagens && (
        <img
          src={mission.Imagens}
          alt="Imagen misión"
          className="w-full h-64 object-cover rounded mb-3"
        />
      )}

      <p><strong>Ubicación:</strong> {mission.Locations}</p>
      <p><strong>Descripción:</strong> {mission.Description}</p>
      <p><strong>Encargado:</strong> {mission.Manager}</p>
      <p><strong>Miembros:</strong> {mission.Members}</p>
      <p><strong>Fecha de inicio:</strong> {mission.Start_Date}</p>
    </div>
  );
}