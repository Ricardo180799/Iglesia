import api from "../../../Services/apiAxios";

export const getActivities = async () => {
    try {
        const response = await api.get("/Api/Actividades");
        return response.data;
    } catch (err) { throw err; }
};

export const deleteActivities = async (ID) => {
    try {
        await api.delete(`/Api/DeleteActivitiess/${ID}`);
    } catch (err) { throw err; }
};


export const updateActivities = async (data) => {
    try {
       
        return await api.put("/Api/UpdateActivitiess", data);
    } catch (err) { 
        throw err; 
    }
};

export const addActivities = async (data) => {
    try {
       
        return await api.post("/Api/AddActivitiess", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (err) { 
        throw err; 
    }
};