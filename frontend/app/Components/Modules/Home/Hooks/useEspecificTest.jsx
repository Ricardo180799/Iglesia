"use client";
import { useEffect, useState } from "react";
import { getEspecificTestimonie } from "../Servicios/homeService";

export function useEspecific(ID) {
  const [especific, setEspecific] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ID)return
      ;

    async function LoadEspecific() {
      try {
        
        setLoading(true);
        const response = await getEspecificTestimonie(ID);
        
        if (!response?.info) {
          setError("No se encontró el testimonio");
          setEspecific(null);
        } else {
          setEspecific(response.info);
          setError(null);
        }
      } catch (err) {
        setError("Error cargando la información del testimonio");
        setEspecific(null);
      } finally {
        setLoading(false);
      }
    }

    LoadEspecific();
  }, [ID]);

  return { especific, loading, error };
}
