"use client";
import { useState, useEffect, useCallback } from "react";
import { getAssets } from "../../Servicio/Servicio";

export function useAlmacen() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const descargar = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAssets();
      setInfo(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    descargar();
  }, [descargar]);

  return { info, loading, error, refresh: descargar };
}
