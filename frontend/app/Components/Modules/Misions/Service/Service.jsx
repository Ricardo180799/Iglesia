import api from "../../../Services/apiAxios"

export const getEspecificMisions = async(ID)=>{
  try{
    const response = await api.get(`/Api/EspecificMissions/${ID}`)
    return response.data
  }catch(err){throw err}
}

export const getMisions = async()=>{
  try{
    const response = await api.get("/Api/Missions")
    return response.data
  }catch(err){throw err}
}
export const addMisions = async(Dato
      )=>{
 try {
 const response = await api.post("/Api/Missions/Agregar",Dato)

  return response
} catch (err) {
  throw err;
  
}
}
export const updateMisions = async( Dato)=>{

       
  try{
    const response = await api.put("Api/Missions/UpdateMissionss",Dato)
    return response.data.message
  }catch(err){throw err}
}
export const deleteMissions = async (ID) => { 
  try {
    const response = await api.delete(`/Api/Missions/DeleteMissionss/${ID}`);
    return response.data.message;
  } catch (err) {
    throw err;
  }
};
export const getPostMissions= async(ID)=>{
  try{
    const info = await api.get(`/Api/PostMissions/${ID}`)
    return info
  }catch(err){throw err}
}
export const getAllPostMissions= async()=>{
  try{
    const info = await api.get("/Api/AllPostMissions")
    return info
  }catch(err){throw err}
}
export const DeletePostmissions = async(ID)=>{
   try{
    const response = await api.delete(`/Api/PostMissions/DeletePostmissionss/${ID}`)
    return response.data.message
  }catch(err){throw err}
}

export const UpdatePostmissions = async(Dato)=>{
   try{
    const response = await api.put("/Api/PostMissions/UpdatePostmissionss",Dato)
    return response.data.message
  }catch(err){throw err}
}
export const AddPostmissions = async(Dato)=>{
   try{
    const response = await api.post("/Api/PostMissions/AddPostmissionss",Dato)
    
    return response.data.message
    
  }catch(err){throw err}
}