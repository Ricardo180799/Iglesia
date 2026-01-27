"use client";

import { useEffect, useState } from "react";
import {  getHomeConfigs } from "../Servicios/homeService";

export function useHomeData() {
  const [activities, setActivities] = useState([]);
  const [home, setHome] = useState(null);
  const [posts, setPosts] = useState([]);
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadHome() {
      try {
        const response = await getHomeConfigs()
        const info = response?.info
       setHome(info?.home ?? null);
       setPosts(info?.posts ?? []);
       setActivities(info?.activities ??        []);
       setTestimonies(info?.       testimonies ?? []);
      
      } catch (err) {
        setError("Error cargando la información del home");
      } finally {
        setLoading(false);
      }
    }

    loadHome();
  }, []);
    
  return {
    activities,
    home,
    posts,
    testimonies,
    loading,
    error,
  };
}
