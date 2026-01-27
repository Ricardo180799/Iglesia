"use client";

import { useState, useEffect, useCallback } from "react";
import { getEspecificMisions, getPostMissions } from "../../Service/Service";

export function useMissionsById(ID_Missions) {
  const [info1, setInfo1] = useState([]);
  const [info2, setInfo2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const descargar = useCallback(async () => {
    if (!ID_Missions) return;

    setLoading(true);
    try {
      const response1 = await getEspecificMisions(ID_Missions);
      
      
      setInfo1(response1);
      
      const response2 = await getPostMissions(ID_Missions);
      const data2 = response2.data
      setInfo2(data2);
      

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [ID_Missions]);

  useEffect(() => {
    descargar();
  }, [descargar]);

  return { info1, info2, loading, error, refresh: descargar };
}
