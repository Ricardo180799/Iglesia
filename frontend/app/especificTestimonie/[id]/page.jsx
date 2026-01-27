"use client";

import { use } from "react";
import TestimonyDetail from "../../Components/Modules/Home/Components/Auxiliar/especificTestimonie/testimonyClient";

export default function Page({ params }) {
  const { id } = use(params); // 
  return <TestimonyDetail ID={id} />;
}