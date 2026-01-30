import api from "../../../Services/apiAxios";


export const getHomeConfigs = async () => {
  const { data } = await api.get("/Api/home");
  
  return data;
};
export const getEspecificTestimonie = async (ID) => {
  const response = await api.get(`/Api/especificTestimonies/${ID}`);
  return response.data; 
};
export const AddTestimonie = async(info)=>{
  try{
    const response= await api.post("/Api/Testimonies/SendTestimonies",info)
    return response.data
  }catch(err){const message =
      err.response?.data?.message ||
      err.message ||
      "Error desconocido al subir el testimonio"
     throw new Error(message)}
}
export const Registry = async(info)=>{
  try{
    const response= await api.post(`/Api/Registrar`,info)
    return response.data
  }catch(err){const message =
      err.response?.data?.message ||
      err.message ||
      "Error desconocido al subir el testimonio"
     throw new Error(message)}
}
export const Logout = async()=>{
  try{ const response =await api.post(`/Api/Logout`)
     return response.data
  }catch(err){
     throw new Error(message)}
} 
export const getAllTestimonies = async()=>{
  try{
    const response = await api.get("/Api/Testimonies")
    
    return response.data
  }catch(err){throw err}
}
export const getAllPost= async()=>{
  try {
    const response = await api.get("/Api/Post")
    return response.data.info
  }catch(err){throw err}
}
export const getAboutUs = async()=>{
  try{
    const response = await api.get("/Api/About")
    return response.data.info
  }catch(err){throw err}
}

export const check = async()=>{
  try{
    const response = await api.get("/Api/Ministerio")
    return response.data.message
    
  }catch(err){throw err}
}