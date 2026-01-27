import { createSlice } from "@reduxjs/toolkit";
const initialState ={tema: "claro",idioma:"Español"}

const temaSlice = createSlice({
    name:"temaSlice",
    initialState:initialState,
    reducers:{
        changeTema:(state,action)=>{state.tema = action.payload;},
        changeIdioma:(state,action)=>{state.idioma = action.payload;}
        
    }
}

)

export const { changeTema } = temaSlice.actions
export default temaSlice.reducer;