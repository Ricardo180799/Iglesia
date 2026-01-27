"use client"
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Registry from "../Components/Modules/Home/Components/Auxiliar/registry/registerForm"
import LoginForm from "../Components/Modules/Home/Components/Auxiliar/registry/sesionForm"
export default function Mostrar(){
    const searchParams =  useSearchParams()
    const mode = searchParams.get("mode") || "register"
    return(
        <section className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
      {mode === "register" ? <Registry /> : <LoginForm />}

      <div className="mt-6 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          Volver a la página principal
        </Link>
      </div>
    </section>
    )
}