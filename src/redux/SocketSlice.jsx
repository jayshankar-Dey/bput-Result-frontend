import {createSlice} from "@reduxjs/toolkit"

export const socketSlice=createSlice({
    name:"socket",
    initialState:{
        Io:null
    },
    reducers:{
        setSocket:(state,action)=>{
         state.Io=action.payload
        }
    }
})

export const {setSocket}=socketSlice.actions
