import { useEffect, useState, useCallback } from "react";
import { getAboutUs } from "../Servicios/homeService";

export function useMostrar() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [info, setInfo] = useState([]);

    // Definimos Obtener con useCallback para que sea estable y exportable
    const refresh = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getAboutUs();
            setInfo(data);
            setError(null); // Limpiamos errores previos si la carga es exitosa
        } catch (err) {
            setError("Error al cargar la información sobre nosotros");
        } finally {
            setLoading(false);
        }
    }, []); // Dependencias vacías porque getAboutUs es externa y estable

    useEffect(() => {
        refresh();
    }, [refresh]); // Se ejecuta al montar el componente

    return { loading, error, info, refresh };
}