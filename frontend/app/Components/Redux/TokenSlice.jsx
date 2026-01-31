import { createSlice } from "@reduxjs/toolkit";
const initialState = {token:"",authenticated:false,userID:"",Rol:null}

const tokenSlice = createSlice({
    name:"tokenSlice",
    initialState:initialState,
    reducers:{
        saveToken:(state,action)=>{state.token = action.payload;state.authenticated=true},
       clearToken:(state)=>{state.token = "";state.authenticated=false;state.userID="";state.Rol = null },
        saveToken1:(state,action)=>{state.token1 = action.payload},
        saveUserId:(state,action)=>{state.userID = action.payload},
        saveRol:(state,action)=>{state.Rol = action.payload}
        
    }
}

)


export const { saveToken,  clearToken,saveToken1,saveUserId,saveRol } = tokenSlice.actions;
export default tokenSlice.reducer;