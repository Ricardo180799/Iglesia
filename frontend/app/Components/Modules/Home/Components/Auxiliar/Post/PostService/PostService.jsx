import api from "../../../../../../Services/apiAxios";
 export const deletePost = async(ID)=>{
    try{
    await api.delete(`/Api/Posts/DeletePost/${ID}`)
    }catch(err){throw err}
 }
  export const addPost = async(Data)=>{
    try{
    await api.post("/Api/Posts/Agregar",Data)
    }catch(err){throw err}
 }
  export const updatePost = async(Data)=>{
    try{
    await api.put("/Api/Posts/UpdatePostss",Data)
    }catch(err){throw err}
 }
 