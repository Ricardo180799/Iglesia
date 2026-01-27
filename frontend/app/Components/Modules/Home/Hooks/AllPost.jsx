import { useEffect, useState, useCallback } from "react";
import { getAllPost } from "../Servicios/homeService";

export function useMostrar() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState([]);

 
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPost();
      setInfo(data);
    } catch (err) {
      setError("Error al cargar testimonios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []); 

  
  useEffect(() => {
    refresh();
  }, [refresh]);

  return { loading, error, info, refresh };
}