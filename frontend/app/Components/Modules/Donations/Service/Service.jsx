import api from "../../../Services/apiAxios";

export const PostInfo = async(amount, currency, name, email)=>{
    try{
        const response = await api.post("/Api/DonarI",{amount, currency, name, email})
        return response.data.clientSecret
    }catch(err){throw err}
}
