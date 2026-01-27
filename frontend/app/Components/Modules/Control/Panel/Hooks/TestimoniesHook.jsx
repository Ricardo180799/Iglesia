"use client"
import {getTestimoniesALL} from "../Service/Service"
import { useState,useEffect,useCallback } from "react"

export function useTestimonies(){

 const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const descargar = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTestimoniesALL();
      setInfo(data);
      console.log(data)
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