"use client";

import { use } from "react";
import MissionPage from "../../Components/Modules/Misions/Components/Dependencia/EspecificMission/especificMissions";

export default function Page({ params }) {
  const { ID } = use(params); // 
  return <MissionPage ID={ID} />;
}