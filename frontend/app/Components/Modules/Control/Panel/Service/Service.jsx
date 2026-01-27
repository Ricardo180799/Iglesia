import api from "../../../../Services/apiAxios";



export const  UpdateRol = async(Id_User, Roles)=>{
    try{
        const response = await api.put("/Api/Panel/GetUsers/UpdateRolll",{Id_User, Roles})
        return response.data.message
    }catch(err){throw err}
}
export const  DeleteUsuario = async(ID)=>{
    try{
        const response = await api.delete(`/Api/Panel/GetUsers/DeleteUsuario/${ID}`)
        return response.data.message
    }catch(err){throw err}
}
export const  getUsersALL = async()=>{
    try{
        const response = await api.get("/Api/Panel/GetUsers")
        return response.data
    }catch(err){throw err}
}
export const  getTestimoniesALL = async()=>{
    try{
        const response = await api.get("/Api/Panel/TestimoniesPanel/GetTestimonies")
        return response.data
    }catch(err){throw err}
}

export const  ChangeStatus = async(ID,Status)=>{
    try{
        const response = await api.put("/Api/Panel/TestimoniesPanel/ChangeStatus",{ID,Status})
        return response.data.message
    }catch(err){throw err}
}
export const  deleteTestimonies = async(ID)=>{
    try{
         await api.delete(`/Api/Panel/TestimoniesPanel/DeleteTestimonie/${ID}`)
        
    }catch(err){throw err}
}

export const  getHome = async()=>{
    try{
        const response = await api.get("/Api/Panel/homee")
        return response.data
        
    }catch(err){throw err}
}
export const  updateHome = async(Campo, Valor)=>{
    try{
        const response = await api.put("/Api/Panel/home/UpdateHomes",{Campo, Valor})
        return response.data.message
        
    }catch(err){throw err}
}

