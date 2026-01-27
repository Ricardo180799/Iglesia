import api from "../../../Services/apiAxios"
export const check = async () => {
    try{
        const response = await api.get("/Api/Ministerio");
  return response.data.GetRols
    }catch(err){throw err}
  
};
export const addIncome = async(datos)=>{
    const Source = datos.Source
    const User_Id = datos.User_Id
    const Type = datos.Type
    const Amount = datos.Amount
    const Description = datos.Description
    const Dates = datos.Dates
    const Created_By = datos.Created_By
    
    try{
     const response =   await api.post("/Api/Panel/Tesoreria/Incomes/Add",{Source, User_Id, Type, Amount, Description, Dates, Created_By})
     return response.data.message
    }catch(err){throw err}
   
}
export const addExpense = async(datos)=>{
      const Category = datos.Category
    const Images = datos.Images
    
    const Amount = datos.Amount
    const Description = datos.Description
    const Dates = datos.Dates
    const Created_by = datos.Created_by
    
    try{
     const response =   await api.post("/Api/Panel/Tesoreria/Expenses/Add",{Amount, Category, Description, Images, Dates, Created_by})
     return response.data.message
    }catch(err){throw err}
   
}

export const getBalance = async () => {
  const { data } = await api.get("/Api/Panel/Tesoreria/Reportes/getBalances");
  return data;
};

export const getIncomesByMonth = async () => {
  const { data } = await api.get("/Api/Panel/Tesoreria/Reportes/getIncomesByMonths");
  return data;
};

export const getExpensesByMonth = async () => {
  const { data } = await api.get("/Api/Panel/Tesoreria/Reportes/getExpensesByMonths");
  return data;
};

export const getMonthlyReport = async () => {
  const { data } = await api.get("/Api/Panel/Tesoreria/Reportes/getMontlyReports");
  return data;
};
export const getAssets = async()=>{
  try{
    const response = await api.get("/Api/Panel/Inventario/getAssetss")
    return response.data
  }catch(err){throw err}
}
export const addAssets = async( Name,Cantidad,
      Category,
      Adquisition_date,
      Price,
      Status,
      Location,
      Responsible_id)=>{
  try{
    const response = await api.post("/Api/Panel/Inventario/AddAssetss",{ Name,Cantidad,
      Category,
      Adquisition_date,
      Price,
      Status,
      Location,
      Responsible_id})
    return response.data.message
  }catch(err){throw err}
}
export const updateAssets = async( Name,Cantidad,Category,Adquisition_date,Price,Status,Locations,Responsible_id,Id)=>{

       
  try{
    const response = await api.put("/Api/Panel/Inventario/UpdateAssetss",{Name,Cantidad,
      Category,
      Adquisition_date,
      Price,
      Status,
      Locations,
      Responsible_id,
      Id})
    return response.data.message
  }catch(err){throw err}
}
export const deleteAssets = async (Id) => { 
  try {
    const response = await api.delete(`/Api/Panel/Inventario/DeleteAssetss/${Id}`);
    return response.data.message;
  } catch (err) {
    throw err;
  }
};