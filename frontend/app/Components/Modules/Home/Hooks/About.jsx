import { useEffect,useState } from "react"
import {getAboutUs} from "../Servicios/homeService"
export function useMostrar(){
const [loading,setLoading] = useState(true)
const [error,setError] = useState(null)
const [info,setInfo] = useState([])
useEffect(()=>{
    async function Obtener(){
        try{
             
         const info = await getAboutUs()
       
         setInfo( info)
    }catch(err){
        setError("Error al cargar la información sobre nosotros")
    }finally{setLoading(false)}
        }
       
   Obtener()
},[])
return{loading,error,info}
}