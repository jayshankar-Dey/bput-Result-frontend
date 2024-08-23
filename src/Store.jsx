import { configureStore } from "@reduxjs/toolkit";
import {socketSlice} from "./redux/SocketSlice";



export const store =configureStore({
    reducer:{
       socket:socketSlice.reducer
    }
})